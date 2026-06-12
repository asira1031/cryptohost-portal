"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

function formatNow() {
  return new Date().toLocaleString();
}

function StatusBadge({
  label,
  tone = "cyan",
}: {
  label: string;
  tone?: "cyan" | "amber" | "emerald" | "red";
}) {

  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
      : tone === "amber"
      ? "border-amber-400/30 bg-amber-500/15 text-amber-200"
      : tone === "red"
      ? "border-red-400/30 bg-red-500/15 text-red-200"
      : "border-cyan-400/30 bg-cyan-500/15 text-cyan-200";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}
    >
      {label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/6 py-3 last:border-b-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
      <div className="max-w-[65%] text-right text-sm text-white/88">
        {value}
      </div>
    </div>
  );
}

function TerminalLine({
  children,
  ok = false,
}: {
  children: React.ReactNode;
  ok?: boolean;
}) {
  return (
    <div
      className={`font-mono text-[12px] leading-6 ${
        ok ? "text-emerald-300" : "text-cyan-100/90"
      }`}
    >
      {children}
    </div>
  );
}

export default function Report1BPage() {
  const router = useRouter();
  
  const [expanded, setExpanded] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [approvalCode, setApprovalCode] = useState("");
  const [approvalResult, setApprovalResult] = useState("");

  const [prices, setPrices] = useState<any>(null);

 const handleValidate = () => {
  if (isBlocked) {
    setApprovalResult(
      "🔒 Validation Portal Locked - Please Contact Support"
    );
    return;
  }

  const cleanCode = approvalCode.trim();

  if (cleanCode.length < 6) {
    setApprovalResult("❌ Invalid Approval Code");
    return;
  }

  setApprovalResult(
    "⏳ Validation In Progress (Estimated Time: 1 Minute)"
  );

  setTimeout(() => {
    const newAttempts = attempts + 1;

    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      setIsBlocked(true);

      setApprovalResult(
        "🔒 Validation Portal Locked - Please Contact Support"
      );

      return;
    }

    setApprovalResult(
      `❌ Invalid Approval Code (${newAttempts}/3)`
    );
  }, 1 * 60 * 1000);
};

  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userEmail = (user?.email || "").toLowerCase().trim();

     const isAdmin =
  userEmail === "jans103174@gmail.com" ||
  userEmail === "ceo@kerogenresource.com";

if (!userEmail) {
  router.replace("/login");
  return;
}

if (!isAdmin) {
  router.replace("/dashboard/my-files");
  return;
}

      setCheckingAccess(false);
    };

    checkAccess();
  }, [router]);

  const lastUpdate = useMemo(() => formatNow(), []);
  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple,usd-coin,solana"
      );

      const data = await res.json();

      console.log(data);

      setPrices(data);
    } catch (err) {
      console.error("Price fetch error:", err);
    }
  };

  fetchPrices();

  const interval = setInterval(fetchPrices, 30000);

  return () => clearInterval(interval);
}, []);

  

  if (checkingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#061018] text-white">
        Checking access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061018] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/8 bg-[#0a1821] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="mb-5 border-b border-white/8 pb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300/70">
                CryptoHost
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white">
                Validation Portal 
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Secure client report dashboard
              </p>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/reports"
                className="block rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-3 text-sm font-medium text-cyan-200"
              >
                Active Report
              </Link>
              <Link
                href="/dashboard/files"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                My Files
              </Link>
              <Link
                href="/dashboard/security"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                Security
              </Link>
            </nav>

            <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                Reference
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-white">
                1B-251364873390811009ARCGB22XXX
              </p>
              <div className="mt-3">
                <StatusBadge label="executed
                 " tone="emerald" />
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
                    Active File Summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    1B Validation Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the uploaded BARCLAYS-linked
                    transmission file. This dashboard reflects  the file-level
                    transmission and validation information currently visible from
                    BARCLAYS BANK PORTAL.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="LEDGER TO LEDGER" />
                  <StatusBadge label="BARCLAYS BANK PLC" />
                  <StatusBadge label="Blockchain Execution" tone="amber" />
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                      Validation Notice
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      Current File Status
                    </h3>
                  </div>
                  <StatusBadge label="Executed" tone="emerald" />
                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                  This file has completed technical validation and compliance
                  review. The transmission record is verified and the file is now
                  authorized for execution. Blockchain conversion and fund release
                  can proceed based on system conditions.
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Amount" value="EUR100000000.00" />
                  <InfoRow label="File Name" value="1B GB26BUKB20769043248232" />
                  <InfoRow
                    label="Transaction Type"
                    value="CASH / Financial Transmission LEDGER TO LEDGER"
                  />
                  <InfoRow
                    label="Bank Source"
                    value="BARCLAYS BANK PLC (BUKBGB22XXX)"
                  />
                  <InfoRow label="Sender" value="TRUSTEE OF THE HENRY FAMILY TRUST FOUNDATION PRIVATE TRUST" />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Transmission Layer" value=" LEDGER TO LEDGER / FIN" />
                  <InfoRow
                    label="Authentication"
                    value="TLS / Certificate-based"
                  />
                  <InfoRow label="Blockchain Layer" value="executed" />
                  <InfoRow label="Last Update" value={lastUpdate} />
                </div>
              </div>
<div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
  <div className="flex items-center justify-between">
    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
      Live Crypto Market
    </p>

    <a
      href="https://www.coingecko.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] text-cyan-300 hover:text-cyan-200"
    >
      Open Market ↗
    </a>
  </div>

  <div className="mt-4 overflow-x-auto">
    <div className="min-w-[760px]">
      <div className="grid grid-cols-[40px_1.6fr_1fr_0.8fr_0.8fr_1.2fr_1.2fr] border-b border-white/8 pb-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
        <div>#</div>
        <div>Coin</div>
        <div>Price</div>
        <div>1H</div>
        <div>24H</div>
        <div>Volume</div>
        <div>Market Cap</div>
      </div>

      {prices ? (
        prices.map((coin: any, index: number) => (
          <div
            key={coin.id}
            className="grid grid-cols-[40px_1.6fr_1fr_0.8fr_0.8fr_1.2fr_1.2fr] items-center border-b border-white/6 py-4 text-sm"
          >
            <div className="text-white/70">{index + 1}</div>

            <div className="flex items-center gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="h-6 w-6 rounded-full"
              />

              <div>
                <div className="font-medium text-white">
                  {coin.name}
                </div>

                <div className="text-xs uppercase text-white/45">
                  {coin.symbol}
                </div>
              </div>
            </div>

            <div className="text-white">
              $
              {coin.current_price?.toLocaleString()}
            </div>

            <div
              className={
                coin.price_change_percentage_1h_in_currency >= 0
                  ? "text-emerald-300"
                  : "text-red-300"
              }
            >
              {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
            </div>

            <div
              className={
                coin.price_change_percentage_24h_in_currency >= 0
                  ? "text-emerald-300"
                  : "text-red-300"
              }
            >
              {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
            </div>

            <div className="text-white/80">
              $
              {coin.total_volume?.toLocaleString()}
            </div>

            <div className="text-white/80">
              $
              {coin.market_cap?.toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <div className="py-6 text-sm text-white/50">
          Loading live market data...
        </div>
      )}
    </div>
  </div>

  <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
    <span>Source: CoinGecko API</span>
    <span>Updates every 30 seconds</span>
  </div>
</div>
              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Status Matrix
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Validation Checkpoints
                  </h3>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        File Received
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Financial locate and download from Global System.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Transmission Metadata Detected
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        BARCLAYS BANK PLC, WITH FULL BANKING RESPONSIBILITY, 
                        HEREBY CONFIRM THE ISSUANCE OF A LEDGER-TO-LEDGER CASH TRANSFER 
                        DIRECT TO A COMMON ACCOUNT FOR FURTHER CREDIT TO 
                        TRUSTEE OF THE HENRY FAMILY TRUST FOUNDATION PRIVATE TRUST,
                         DATED 27/05/2026 20:20:02. THIS LEDGER-TO-LEDGER CASH TRANSFER
                          DIRECT TO THE COMMON ACCOUNT IS FOR AN AMOUNT OF EUR 1,000,000,000.00.
                           THE INTERNAL LEDGER TRANSFER HAS BEEN SENT TO HENRY TRUSTEE OF THE HENRY FAMILY TRUST FOUNDATION PRIVATE TRUST, 
                           ACCOUNT NUMBER: GB26BUKB20769043248232.
                            WE HEREBY AUTHORIZE BARCLAYS BANK PLC TO DOWNLOAD 
                            AND CREDIT FUNDS TO TRUSTEE OF THE HENRY FAMILY TRUST FOUNDATION PRIVATE TRUST. 
                            PLEASE ADVISE BENEFICIARY OF THE SAID TRANSFER. THIS TRANSFER WAS EXECUTED VIA LEDGER-TO-COMMON 
                            ACCOUNT DIRECTLY ON: 27/05/2026 20:20:02 +0100  
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Compliance Review Pending
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        Process final review and confirmation of all supporting
                        details.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Blockchain Executed Active
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        release, mint, conversion, or broadcast action has been
                        initiated on-chain.
                      </p>
                    </div>
                  </div>
                </section>

  <section className="rounded-[30px] border border-white/8 bg-[#07131b] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-6">
  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
    Approval System
  </p>

  <div className="mt-3 flex items-center gap-2">
    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

    <div className="text-xs tracking-[0.22em] text-green-300">
      LIVE VALIDATION NETWORK
    </div>
  </div>

  <h3 className="mt-4 text-2xl font-semibold text-white">
    Approval Code Validation
  </h3>

  <p className="mt-2 text-sm leading-7 text-slate-300">
    Enter authorization or approval sequence code to begin
    institutional validation routing and transaction confirmation.
  </p>

  <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-black/30 p-4">
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/60">
        Secure Validation Slot
      </span>

      <span className="animate-pulse text-[11px] uppercase tracking-[0.24em] text-green-400">
        Active
      </span>
    </div>

    <input
      type="text"
      value={approvalCode}
      onChange={(e) => setApprovalCode(e.target.value)}
      placeholder="Enter Approval Code"
      className="mt-4 w-full rounded-xl border border-cyan-400/20 bg-black/40 px-4 py-3 text-white outline-none"
    />

    <button
      type="button"
      onClick={handleValidate}
      className="mt-4 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
    >
      Validate
    </button>

    {approvalResult && (
      <div className="mt-6 rounded-xl border border-cyan-400/10 bg-black/40 p-4">
        <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/60">
          Validation Result
        </div>

        <div
          className={`mt-3 font-semibold ${
            approvalResult.includes("Invalid")
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {approvalResult}
        </div>
      </div>
    )}
  </div>
</section>

<section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
  <h3 className="text-xl font-semibold text-white">
    System Summary
  </h3>

  <p className="mt-4 text-sm leading-7 text-white/72">
  </p>
</section>

              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Full Technical Log
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Transmission View
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/25"
                >
                  {expanded ? "Hide Technical Log" : "Show Technical Log"}
                </button>
              </div>

              {expanded ? (
                <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-[#06131b] p-4">
                  <TerminalLine ok>
                    CRYPTOHOST SECURE VALIDATION SYSTEM
                  </TerminalLine>
                  <TerminalLine>BARC CODE: 889671471BCCCFRR6</TerminalLine>
                  <TerminalLine>FILE: 1B BARC-DEUT682415</TerminalLine>
                  <TerminalLine>TYPE: CASH /  LEDGER TO LEDGER TRANSMISSION</TerminalLine>
                  <TerminalLine>
                    BANK SOURCE: BARCLAYS BANK PLC ( BUKBGB22XXX)
                  </TerminalLine>
                  <TerminalLine>SENDER: PT. INDHO TAMA PERSADA</TerminalLine>
                  <TerminalLine>CURRENCY: EUR</TerminalLine>
                  <TerminalLine>AUTH MODE: TLS / CERTIFICATE-BASED</TerminalLine>
                  <TerminalLine ok>TRANSMISSION LEVEL: COMPLETED</TerminalLine>
                  <TerminalLine>BLOCKCHAIN LAYER:  ACTIVE</TerminalLine>
                  <TerminalLine>COMPLIANCE REVIEW: IN PROGRESS</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
<TerminalLine>------------------------------------------</TerminalLine>
<TerminalLine ok>WALLET DISTRIBUTION STRUCTURE</TerminalLine>
<TerminalLine>WALLET 1 – 22.5%</TerminalLine>
<TerminalLine>0x34CD790d7c148dDA50F42677aD27cD429223C019</TerminalLine>
<TerminalLine>€225,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0x36b4bbcaf1473b07ab025e0373c89d2830570f306905caa6ba7444b8881f9947</TerminalLine>

<TerminalLine>WALLET 2 – 5%</TerminalLine>
<TerminalLine>0xC3803daA2D632211007391B98FC19fbC65738F5C</TerminalLine>
<TerminalLine>€50,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0xd057606826a02750e7cbbc07f7c98a1b1aecb37b8735a634020c3648f12ea861</TerminalLine>

<TerminalLine>WALLET 3 – 5%</TerminalLine>
<TerminalLine>0xBfCAF252856A8F2cd7C68ac9d12808454A487C76</TerminalLine>
<TerminalLine>€50,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0xe3a58bccc37d728bae1a450a8e98d675ca17ef3a71eb466d54ee53a8eb4553c8</TerminalLine>

<TerminalLine>WALLET 4 – 5%</TerminalLine>
<TerminalLine>0x49489c55431fAc64A46106214454Fb9A934B047A</TerminalLine>
<TerminalLine>€50,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0x731eb48e59c3d901b4e0233ffb4495e6772cd4bc39d0a0ad30ce04730aad7f5a</TerminalLine>

<TerminalLine>WALLET 5 – 7.5%</TerminalLine>
<TerminalLine>0xe22C142aEe1fbb83DcBbE05dfD07E69D5B736538</TerminalLine>
<TerminalLine>€75,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0xd6db50d67c19c39b5e04168dff3e0d85d92f9f7c5e84dddc495cf3c1c3eacbe1</TerminalLine>

<TerminalLine>WALLET 6 – 5%</TerminalLine>
<TerminalLine>0x0668431F1FF68a6FcC5dAcc4FDE03DA861284894</TerminalLine>
<TerminalLine>€50,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0x641d34ae330c7c64c7c458081f82841605b666d2d6685fa5e5a75f3d3a9e07aa</TerminalLine>

<TerminalLine ok>MAIN WALLET – 55%</TerminalLine>
<TerminalLine>0xc47133a6bd653793562a1ea25cb1d3161fbd99cd</TerminalLine>
<TerminalLine>€550,000,000.00</TerminalLine>
<TerminalLine>TXN HASH: 0x46bbf0238491094faccf87f860a1e06946e4c0c66dbb05ca5409f624a0c27989</TerminalLine>
<TerminalLine>------------------------------------------</TerminalLine>
<TerminalLine ok>TOTAL DISTRIBUTION: 100% CONFIRMED</TerminalLine>
                </div>
              ) : null}
            </section>
          </main>
                 </div>
      </div>
    </div>
  );
}