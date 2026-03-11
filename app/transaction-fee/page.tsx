"use client";

import { useState } from "react";

export default function TransactionFeePage() {
  const [paymentStatus, setPaymentStatus] = useState("Awaiting Payment");
  const [txHash, setTxHash] = useState("");

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";
  const feeAmount = "1.455 ETH";
  const network = "Ethereum Mainnet";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied");
  };

  const handleSentPayment = () => {
    if (!txHash.trim()) {
      alert("Please enter the transaction hash.");
      return;
    }

    const feeRecord = {
      type: "Transaction Fee",
      amount: feeAmount,
      method: "ETH",
      network,
      address: walletAddress,
      txHash: txHash.trim(),
      date: new Date().toLocaleString(),
      status: "Pending Review",
    };

    const existing = JSON.parse(
      localStorage.getItem("cryptohost_transaction_fees") || "[]"
    );

    existing.push(feeRecord);

    localStorage.setItem(
      "cryptohost_transaction_fees",
      JSON.stringify(existing)
    );

    setPaymentStatus("Payment Submitted");
    alert("Transaction fee submitted successfully.");
  };

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
          maxWidth: "900px",
          margin: "0 auto",
          background: "#0f1d38",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1 style={{ marginTop: 0, fontSize: "38px" }}>
          Transaction Processing Fee
        </h1>

        <p style={{ color: "#9fb0d1", marginBottom: "24px" }}>
          Minimum required processing fee for transaction execution.
        </p>

        <p>
          <strong>Required Fee:</strong> {feeAmount}
        </p>
        <p>
          <strong>Network:</strong> {network}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: "#f3ba2f", fontWeight: "bold" }}>
            {paymentStatus}
          </span>
        </p>

        <p style={{ marginTop: "20px" }}>
          <strong>Wallet Address:</strong>
        </p>

        <div
          style={{
            background: "#091325",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.08)",
            wordBreak: "break-all",
            fontWeight: "bold",
            marginBottom: "14px",
          }}
        >
          {walletAddress}
        </div>

        <button
          onClick={handleCopy}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#627eea",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
            marginBottom: "18px",
          }}
        >
          Copy Wallet Address
        </button>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Transaction Hash
          </label>
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Paste blockchain transaction hash here"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#091325",
              color: "white",
            }}
          />
        </div>

        <button
          onClick={handleSentPayment}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#31d67b",
            color: "#071225",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          I Sent Payment
        </button>

        <p style={{ color: "#ffb84d", fontSize: "13px", marginTop: "16px" }}>
          Only send funds using the specified network. Sending on the wrong
          network may result in loss of funds.
        </p>
      </div>
    </div>
  );
}