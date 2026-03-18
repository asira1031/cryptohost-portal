"use client";

import { useState } from "react";

export default function FundPage() {
  const [copied, setCopied] = useState(false);

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";
  const feeRate = 0.05;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleDeposit = 1000;
  const fee = exampleDeposit * feeRate;
  const credited = exampleDeposit - fee;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        💰 Fund Your Account
      </h1>

      {/* WALLET SECTION */}
      <div style={card}>
        <h2>Deposit USDT</h2>
        <p>Select Network:</p>
        <ul>
          <li>ERC20 (Ethereum)</li>
          <li>BEP20 (BNB Chain)</li>
        </ul>

        <p style={{ marginTop: "10px" }}>Wallet Address:</p>

        <div style={walletBox}>
          {walletAddress}
        </div>

        <button onClick={copyAddress} style={btn}>
          {copied ? "Copied!" : "Copy Address"}
        </button>
      </div>

      {/* FEE SECTION */}
      <div style={card}>
        <h2>Platform Fee</h2>
        <p>
          A <strong>5% processing fee</strong> is applied to all deposits.
        </p>

        <h3>Example:</h3>
        <p>Deposit: {exampleDeposit} USDT</p>
        <p>Fee (5%): {fee} USDT</p>
        <p style={{ fontWeight: "bold", color: "green" }}>
          Credited Balance: {credited} USDT
        </p>
      </div>

      {/* INSTRUCTIONS */}
      <div style={card}>
        <h2>How to Fund</h2>
        <ol>
          <li>Buy USDT from your preferred provider (Binance, Wallet, etc.)</li>
          <li>Send USDT to the wallet above</li>
          <li>Wait for blockchain confirmation</li>
          <li>Your balance will be updated automatically</li>
        </ol>
      </div>

      {/* OPTIONAL BUTTON */}
      <div style={{ marginTop: "20px" }}>
        <button style={buyBtn}>
          💳 Buy USDT (External Provider)
        </button>
      </div>
    </div>
  );
}

// STYLES
const card = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  background: "#fff",
};

const walletBox = {
  background: "#f4f4f4",
  padding: "10px",
  borderRadius: "6px",
  wordBreak: "break-all" as const,
  marginBottom: "10px",
};

const btn = {
  padding: "10px 20px",
  background: "#2d66d3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const buyBtn = {
  padding: "12px 25px",
  background: "#ffc439",
  color: "#111",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};