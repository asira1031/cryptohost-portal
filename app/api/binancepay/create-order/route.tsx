import { NextResponse } from "next/server";
import crypto from "crypto";

const BINANCE_PAY_BASE =
  process.env.BINANCE_PAY_ENV === "prod"
    ? "https://bpay.binanceapi.com"
    : "https://bpay.binanceapi.com";

function signPayload(timestamp: string, nonce: string, body: string) {
  const secret = process.env.BINANCE_PAY_SECRET_KEY || "";
  const payload = `${timestamp}\n${nonce}\n${body}\n`;
  return crypto.createHmac("sha512", secret).update(payload).digest("hex").toUpperCase();
}

export async function POST(req: Request) {
  try {
    const { paymentId, amount } = await req.json();

    if (!paymentId || !amount) {
      return NextResponse.json(
        { success: false, message: "paymentId and amount are required" },
        { status: 400 }
      );
    }

    const merchantTradeNo = paymentId;
    const body = JSON.stringify({
      env: {
        terminalType: "WEB",
      },
      merchantTradeNo,
      orderAmount: Number(amount),
      currency: "USDT",
      goods: {
        goodsType: "01",
        goodsCategory: "D000",
        referenceGoodsId: paymentId,
        goodsName: `CryptoHost Payment ${paymentId}`,
        goodsDetail: `Payment for order ${paymentId}`,
      },
      returnUrl: `http://localhost:3000/pay/${paymentId}/success`,
      cancelUrl: `http://localhost:3000/pay/${paymentId}`,
    });

    const timestamp = Date.now().toString();
    const nonce = crypto.randomBytes(16).toString("hex");
    const signature = signPayload(timestamp, nonce, body);

    const res = await fetch(`${BINANCE_PAY_BASE}/binancepay/openapi/v3/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": process.env.BINANCE_PAY_CERT_SN || "",
        "BinancePay-Signature": signature,
      },
      body,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Binance Pay create order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create Binance Pay order" },
      { status: 500 }
    );
  }
}