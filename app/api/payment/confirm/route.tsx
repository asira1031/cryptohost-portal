import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { paymentId } = body

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: "Payment ID missing" },
        { status: 400 }
      )
    }

    console.log("Payment confirmed:", paymentId)

    // Here later you can update database
    // Example: update payment status = paid

    return NextResponse.json({
      success: true,
      paymentId,
      status: "paid"
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Confirmation failed" },
      { status: 500 }
    )
  }
}