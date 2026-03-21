import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function decimals() view returns (uint8)",
];

type ChainConfig = {
  chain: "eth" | "bsc";
  rpcUrl: string;
  tokenAddress: string;
};

function getConfigs(): ChainConfig[] {
  return [
    {
      chain: "eth",
      rpcUrl: process.env.ETH_RPC_URL!,
      tokenAddress: process.env.ETH_USDT_CONTRACT!,
    },
    {
      chain: "bsc",
      rpcUrl: process.env.BSC_RPC_URL!,
      tokenAddress: process.env.BSC_USDT_CONTRACT!,
    },
  ].filter((c) => c.rpcUrl && c.tokenAddress);
}

async function getLastScannedBlock(chain: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("deposit_scan_state")
    .select("last_scanned_block")
    .eq("chain", chain)
    .single();

  if (error || !data) return 0;
  return Number(data.last_scanned_block || 0);
}

async function setLastScannedBlock(chain: string, block: number) {
  const { error } = await supabaseAdmin
    .from("deposit_scan_state")
    .upsert({
      chain,
      last_scanned_block: block,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const depositWallet = (process.env.DEPOSIT_WALLET || "").toLowerCase();
  if (!depositWallet) {
    return NextResponse.json({ error: "Missing DEPOSIT_WALLET" }, { status: 500 });
  }

  const results: any[] = [];

  for (const config of getConfigs()) {
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);
    const token = new ethers.Contract(config.tokenAddress, ERC20_ABI, provider);

    const latestBlock = await provider.getBlockNumber();
    const savedBlock = await getLastScannedBlock(config.chain);

    const fromBlock = savedBlock > 0 ? savedBlock + 1 : Math.max(latestBlock - 3000, 0);
    const toBlock = latestBlock;

    if (fromBlock > toBlock) {
      results.push({
        chain: config.chain,
        inserted: 0,
        fromBlock,
        toBlock,
        note: "No new blocks",
      });
      continue;
    }

    const transferTopic = ethers.id("Transfer(address,address,uint256)");
    const toTopic = ethers.zeroPadValue(depositWallet, 32);

    const logs = await provider.getLogs({
      address: config.tokenAddress,
      fromBlock,
      toBlock,
      topics: [transferTopic, null, toTopic],
    });

    let inserted = 0;

    for (const log of logs) {
      try {
        const parsed = token.interface.parseLog(log);
        if (!parsed) continue;

        const from = String(parsed.args.from).toLowerCase();
        const to = String(parsed.args.to).toLowerCase();
        const rawValue = parsed.args.value as bigint;

        const gross = Number(ethers.formatUnits(rawValue, 6)); // USDT = 6 decimals
        const feePercent = 3;
        const feeAmount = Number((gross * 0.03).toFixed(2));
        const netAmount = Number((gross - feeAmount).toFixed(2));

        const txHash = log.transactionHash;
        const blockNumber = log.blockNumber;
        const logIndex = log.index;

        const { error } = await supabaseAdmin
          .from("deposits")
          .insert({
            user_id: null, // admin review unless matched later
            amount: gross, // for your old schema compatibility
            wallet_address: depositWallet,
            tx_hash: txHash,
            network: config.chain === "eth" ? "ERC20" : "BEP20",
            asset: "USDT",
            gross_amount: gross,
            fee_percent: feePercent,
            fee_amount: feeAmount,
            net_amount: netAmount,
            status: "Pending",
            note: "Auto-detected blockchain deposit",
            chain: config.chain,
            token_contract: config.tokenAddress,
            from_address: from,
            to_address: to,
            block_number: blockNumber,
            log_index: logIndex,
            detected_at: new Date().toISOString(),
            credited_automatically: false,
          });

        if (error) {
          // ignore duplicates from unique index
          if (!String(error.message).toLowerCase().includes("duplicate")) {
            console.error(`Insert error [${config.chain}]`, error.message);
          }
        } else {
          inserted += 1;
        }
      } catch (err) {
        console.error(`Parse error [${config.chain}]`, err);
      }
    }

    await setLastScannedBlock(config.chain, toBlock);

    results.push({
      chain: config.chain,
      inserted,
      fromBlock,
      toBlock,
      logsFound: logs.length,
    });
  }

  return NextResponse.json({
    ok: true,
    results,
    scannedAt: new Date().toISOString(),
  });
}