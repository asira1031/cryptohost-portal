import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    console.log("Binance Pay webhook received:", body);

    // Later:
    // 1. verify signature
    // 2. parse payload
    // 3. update payment status in DB
    // 4. mark order as PAID

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Binance Pay webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Webhook failed" },
      { status: 500 }
    );
  }
}