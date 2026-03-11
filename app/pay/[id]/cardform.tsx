"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CardForm({ amount }: { amount: number }) {

  return (
    <Elements stripe={stripePromise}>
      <div style={{ marginTop: "20px" }}>
        <p>Enter Card Details</p>

        <div
          style={{
            background: "white",
            padding: "12px",
            borderRadius: "6px",
            width: "320px"
          }}
        >
          <CardElement />
        </div>

        <button
          style={{
            padding: "12px 24px",
            background: "#635bff",
            color: "white",
            border: "none",
            marginTop: "15px",
            borderRadius: "6px"
          }}
        >
          Pay {amount} USD with Card
        </button>

      </div>
    </Elements>
  )
}