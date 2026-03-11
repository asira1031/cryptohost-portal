"use client";

import { useState } from "react";

export default function Cryptopay({
  paymentId,
  amount,
}: {
  paymentId: string;
  amount: string;
}) {
  const [selected, setSelected] = useState<"ETH" | "USDT">("ETH");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState("");

  const walletAddress = "0xC726dF1DE0E40419bf04c5f68244992ec2701E06";

  async function detectPayment() {
    try {
      setChecking(true);
      setResult("");

      const res = await fetch("/api/payment/detect");
      const data = await res.json();

      if (data.success) {
        setResult("Payment detection checked successfully.");
      } else {
        setResult("No payment detected yet.");
      }
    } catch (error) {
      console.error(error);
      setResult("Detection failed.");
    } finally {
      setChecking(false);
    }
  }

  async function confirmManualPayment() {
    try {
      const res = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(`Payment ${data.paymentId} marked as ${data.status}.`);
      } else {
        setResult("Confirmation failed.");
      }
    } catch (error) {
      console.error(error);
      setResult("Confirmation failed.");
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
        Pay with Crypto
      </h3>

      <p style={{ color: "white", marginBottom: "10px" }}>
        Payment ID: {paymentId}
      </p>

      <p style={{ color: "white", marginBottom: "18px" }}>
        Amount Due: {amount} USD
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
        <button
          onClick={() => setSelected("ETH")}
          style={{
            background: selected === "ETH" ? "#12f0a4" : "#222",
            color: selected === "ETH" ? "black" : "white",
            border: "none",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: 700,
            borderRadius: "8px",
          }}
        >
          ETH
        </button>

        <button
          onClick={() => setSelected("USDT")}
          style={{
            background: selected === "USDT" ? "#12f0a4" : "#222",
            color: selected === "USDT" ? "black" : "white",
            border: "none",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: 700,
            borderRadius: "8px",
          }}
        >
          USDT
        </button>
      </div>

      <div
        style={{
          background: "black",
          border: "1px solid #333",
          padding: "14px",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        <p style={{ color: "#12f0a4", marginBottom: "8px", fontWeight: 700 }}>
          Send {selected} to:
        </p>
        <p style={{ color: "white", wordBreak: "break-all", margin: 0 }}>
          {walletAddress}
        </p>
      </div>

      <div
        style={{
          background: "white",
          color: "black",
          width: "180px",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          marginBottom: "16px",
          fontWeight: 700,
        }}
      >
        QR PLACEHOLDER
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={detectPayment}
          style={{
            background: "#f5b82e",
            color: "black",
            border: "none",
            padding: "12px 16px",
            cursor: "pointer",
            fontWeight: 700,
            borderRadius: "8px",
          }}
        >
          {checking ? "Checking..." : "Auto Detect Payment"}
        </button>

        <button
          onClick={confirmManualPayment}
          style={{
            background: "#12f0a4",
            color: "black",
            border: "none",
            padding: "12px 16px",
            cursor: "pointer",
            fontWeight: 700,
            borderRadius: "8px",
          }}
        >
          Confirm Payment
        </button>
      </div>

      {result && (
        <p style={{ color: "white", marginTop: "16px" }}>
          {result}
        </p>
      )}
    </div>
  );
}