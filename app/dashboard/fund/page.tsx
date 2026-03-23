"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function FundPage() {
  const supabase = createClient();

  const [buyerWallet, setBuyerWallet] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [message, setMessage] = useState("");

  const gatewayWallet =
    "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  async function handleSubmit(e: React.FormEvent) {
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
      setMessage("Error saving wallet.");
    } else {
      setMessage("Buyer wallet saved.");
      setBuyerWallet("");
    }
  }

  return (
    <div style={{ padding: 24, background: "#0b0f19", minHeight: "100vh", color: "#fff" }}>
      
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Deposit USDT</h1>
      <p style={{ color: "#aaa" }}>Logged in system</p>

      {/* GATEWAY WALLET */}
      <div style={{
        background: "#111827",
        padding: 20,
        borderRadius: 12,
        marginTop: 20
      }}>
        <h3>Deposit Wallet</h3>
        <p style={{ color: "#888" }}>
          Send USDT to this gateway wallet
        </p>

        <div style={{
          background: "#000",
          padding: 10,
          borderRadius: 8,
          marginTop: 10
        }}>
          {gatewayWallet}
        </div>

        <div style={{ marginTop: 10, fontSize: 14, color: "#ccc" }}>
          Asset: USDT | Network: ERC20 / BEP20
        </div>
      </div>

      {/* BUYER WALLET INPUT */}
      <div style={{
        background: "#111827",
        padding: 20,
        borderRadius: 12,
        marginTop: 20
      }}>
        <h3>Buyer Wallet</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter buyer wallet address"
            value={buyerWallet}
            onChange={(e) => setBuyerWallet(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "#000",
              color: "#fff"
            }}
          />

          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 10,
              borderRadius: 8,
              background: "#000",
              color: "#fff"
            }}
          >
            <option value="ERC20">ERC20</option>
            <option value="BEP20">BEP20</option>
          </select>

          <button
            type="submit"
            style={{
              marginTop: 15,
              padding: 12,
              width: "100%",
              background: "#facc15",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold"
            }}
          >
            Save Buyer Wallet
          </button>
        </form>

        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </div>

      {/* SUMMARY (OPTIONAL KEEP) */}
      <div style={{
        display: "flex",
        gap: 20,
        marginTop: 20
      }}>
        <div style={{ background: "#111827", padding: 20, borderRadius: 12 }}>
          Total Deposits<br /><b>1,000 USDT</b>
        </div>
        <div style={{ background: "#111827", padding: 20, borderRadius: 12 }}>
          Fees<br /><b>30 USDT</b>
        </div>
        <div style={{ background: "#111827", padding: 20, borderRadius: 12 }}>
          Net<br /><b>970 USDT</b>
        </div>
      </div>

    </div>
  );
}