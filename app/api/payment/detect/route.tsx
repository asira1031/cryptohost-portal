import { NextResponse } from "next/server"

export async function GET() {

  console.log("Running payment detection...")

  // later this will check blockchain
  // ETH / USDT transactions

  return NextResponse.json({
    success: true,
    message: "Payment detection executed",
    checked: new Date().toISOString()
  })
}