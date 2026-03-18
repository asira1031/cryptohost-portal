"use client";

import { useState } from "react";

export default function FundPage() {
  const [copied, setCopied] = useState(false);

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";
  const feeRate = 0.03;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleDeposit = 1000;
  const fee = exampleDeposit * feeRate;
  const credited = exampleDeposit - fee;

  return (
    <div style={{ fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        💰 Fund Your Account
      </h1>

      <div style={card}>
        <h2>Deposit USDT</h2>

        <p>Select Network:</p>
        <ul>
          <li>ERC20 (Ethereum)</li>
          <li>BEP20 (BNB Chain)</li>
        </ul>

        <p style={{ marginTop: "10px" }}>Wallet Address:</p>

        <div style={walletBox}>{walletAddress}</div>

        <button onClick={copyAddress} style={btn}>
          {copied ? "Copied!" : "Copy Address"}
        </button>
      </div>

      <div style={card}>
        <h2>Platform Fee</h2>
        <p>
          A <strong>3% processing fee</strong> is applied to all deposits.
        </p>

        <h3>Example:</h3>
        <p>Deposit: {exampleDeposit} USDT</p>
        <p>Fee (3%): {fee} USDT</p>
        <p style={{ fontWeight: "bold", color: "green" }}>
          Credited Balance: {credited} USDT
        </p>
      </div>

      <div style={card}>
        <h2>How to Fund</h2>
        <ol>
          <li>Buy USDT from your preferred provider</li>
          <li>Choose ERC20 or BEP20 carefully</li>
          <li>Send USDT to the wallet above</li>
          <li>Wait for blockchain confirmation</li>
          <li>Your balance will be updated automatically</li>
        </ol>
      </div>

      <div style={{ marginTop: "20px" }}>
        <a
          href="https://www.binance.com/en/buy-sell-crypto"
          target="_blank"
          rel="noopener noreferrer"
          style={buyLink}
        >
          💳 Buy USDT (External Provider)
        </a>
      </div>
    </div>
  );
}

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

const buyLink = {
  display: "inline-block",
  padding: "12px 25px",
  background: "#ffc439",
  color: "#111",
  borderRadius: "6px",
  fontWeight: "bold",
  textDecoration: "none",
  cursor: "pointer",
};