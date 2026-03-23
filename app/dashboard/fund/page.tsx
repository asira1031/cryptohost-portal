"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function FundPage() {
  const supabase = createClient();

  const [buyerWallet, setBuyerWallet] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const gatewayWallet = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
    }

    loadUser();
  }, [supabase]);

  function handleBuyUsdt() {
    window.open("https://www.binance.com/en/buy-sell-crypto", "_blank");
  }

  function handleBuyCoinbase() {
    window.open("https://www.coinbase.com/buy", "_blank");
  }

  function handleBuyMoonpay() {
    window.open("https://www.moonpay.com/buy", "_blank");
  }

  function handleBuyTransak() {
    window.open("https://global.transak.com", "_blank");
  }

  async function handleSaveBuyerWallet(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in.");
      return;
    }

    const { error } = await supabase.from("buyer_wallets").insert({
      user_id: user.id,
      wallet_address: buyerWallet,
      network,
    });

    if (error) {
      setMessage("Error saving buyer wallet.");
    } else {
      setMessage("Buyer wallet saved successfully.");
      setBuyerWallet("");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        padding: "18px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#020817",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 0 0 1px #1f2937",
          color: "#ffffff",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Deposit USDT</h1>
            <div style={{ color: "#94a3b8" }}>
              Logged in as: {userEmail ?? "Loading..."}
            </div>
          </div>

          {/* MULTI BUTTONS */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={handleBuyUsdt}
              style={{
                background: "#facc15",
                color: "#111827",
                border: "none",
                borderRadius: "10px",
                padding: "12px 18px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Binance
            </button>

            <button
              onClick={handleBuyCoinbase}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 18px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Coinbase
            </button>

            <button
              onClick={handleBuyMoonpay}
              style={{
                background: "#9333ea",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 18px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              MoonPay
            </button>

            <button
              onClick={handleBuyTransak}
              style={{
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 18px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Transak
            </button>
          </div>
        </div>

        {/* DEPOSIT WALLET */}
        <div
          style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>Deposit Wallet</h3>
          <p style={{ color: "#94a3b8" }}>
            Send only USDT using supported network.
          </p>

          <div
            style={{
              background: "#000",
              padding: "12px",
              borderRadius: "8px",
              color: "#facc15",
            }}
          >
            {gatewayWallet}
          </div>

          <div style={{ marginTop: "10px", color: "#94a3b8" }}>
            Asset: USDT | Network: ERC20 / BEP20 | Fee: 3%
          </div>
        </div>

        {/* BUYER WALLET */}
        <div
          style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>Buyer Wallet</h3>

          <form onSubmit={handleSaveBuyerWallet}>
            <input
              type="text"
              placeholder="Enter buyer wallet address"
              value={buyerWallet}
              onChange={(e) => setBuyerWallet(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#000",
                color: "#fff",
                border: "1px solid #333",
              }}
            />

            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#000",
                color: "#fff",
                border: "1px solid #333",
              }}
            >
              <option value="ERC20">ERC20</option>
              <option value="BEP20">BEP20</option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#facc15",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "#111827",
                cursor: "pointer",
              }}
            >
              Save Buyer Wallet
            </button>
          </form>

          {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}