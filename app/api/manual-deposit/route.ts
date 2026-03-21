import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);
    const user_id = body.user_id;

    const fee = amount * 0.03;
    const net = amount - fee;

    const { data, error } = await supabase.from("deposits").insert([
      {
        user_id,
        amount,
        fee_percent: 3,
        fee_amount: fee,
        net_amount: net,
        status: "completed",
        token: "USDT",
        network: "BEP20",
        tx_hash: "MANUAL-" + Date.now(),
        wallet_address: "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd",
        notes: "Manual processed deposit",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      amount,
      fee,
      net,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}