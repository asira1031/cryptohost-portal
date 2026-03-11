"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071225",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#0f1d38",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "38px", marginTop: 0 }}>
          Payment Successful
        </h1>

        <p style={{ color: "#9fb0d1", marginBottom: "24px" }}>
          Your payment has been recorded successfully.
        </p>

        <div
          style={{
            background: "#091325",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ margin: 0 }}>
            Thank you for completing your CryptoHost payment process.
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: "10px",
            background: "#31d67b",
            color: "#071225",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}