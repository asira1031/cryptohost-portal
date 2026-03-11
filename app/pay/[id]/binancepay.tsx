"use client";

import { useState } from "react";

export default function BinancePay({
  paymentId,
  amount,
}: {
  paymentId: string;
  amount: string;
}) {
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [message, setMessage] = useState("");

  async function createBinanceOrder() {
    try {
      setLoading(true);
      setMessage("");
      setQrUrl("");
      setCheckoutUrl("");

      const res = await fetch("/api/binancepay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          amount,
        }),
      });

      const data = await res.json();

      if (data.status === "SUCCESS" || data.code === "000000") {
        setQrUrl(data.data?.qrcodeLink || "");
        setCheckoutUrl(data.data?.checkoutUrl || "");
        setMessage("Binance Pay order created successfully.");
      } else {
        setMessage(data.errorMessage || data.message || "Failed to create Binance Pay order.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Binance Pay request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "24px",
        maxWidth: "520px",
      }}
    >
      <h3 style={{ fontSize: "28px", marginBottom: "16px", color: "white" }}>
        Pay with Binance Pay
      </h3>

      <p style={{ color: "white", marginBottom: "10px" }}>
        Payment ID: {paymentId}
      </p>

      <p style={{ color: "white", marginBottom: "18px" }}>
        Amount Due: {amount}
      </p>

      <button
        onClick={createBinanceOrder}
        style={{
          background: "#f3ba2f",
          color: "black",
          border: "none",
          padding: "12px 18px",
          cursor: "pointer",
          fontWeight: 700,
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        {loading ? "Creating Order..." : "Create Binance Pay Order"}
      </button>

      {qrUrl && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "white", marginBottom: "8px" }}>QR Link:</p>
          <a
            href={qrUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#f3ba2f", wordBreak: "break-all" }}
          >
            {qrUrl}
          </a>
        </div>
      )}

      {checkoutUrl && (
        <div style={{ marginTop: "16px" }}>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#f3ba2f",
              color: "black",
              padding: "12px 18px",
              borderRadius: "8px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Open Binance Pay Checkout
          </a>
        </div>
      )}

      {message && (
        <p style={{ color: "white", marginTop: "16px" }}>
          {message}
        </p>
      )}
    </div>
  );
}