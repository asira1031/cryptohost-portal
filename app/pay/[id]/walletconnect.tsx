"use client";

import { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnectButton() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      setLoading(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWallet(accounts[0]);
    } catch (error) {
      console.error(error);
      alert("Wallet connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={connectWallet}
        style={{
          background: "#12f0a4",
          color: "black",
          border: "none",
          padding: "14px 26px",
          fontSize: "22px",
          cursor: "pointer",
          borderRadius: "2px",
          fontWeight: 600,
        }}
      >
        {loading ? "Connecting..." : wallet ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {wallet && (
        <p style={{ marginTop: "12px", wordBreak: "break-all" }}>
          Connected: {wallet}
        </p>
      )}
    </div>
  );
}