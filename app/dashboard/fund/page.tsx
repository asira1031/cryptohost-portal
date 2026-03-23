"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function FundPage() {
  const supabase = createClient();

  const [buyerWallet, setBuyerWallet] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [message, setMessage] = useState("");

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
      return;
    }

    setMessage("Wallet saved successfully.");
    setBuyerWallet("");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Buyer Wallet</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={buyerWallet}
          onChange={(e) => setBuyerWallet(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        >
          <option value="ERC20">ERC20</option>
          <option value="BEP20">BEP20</option>
        </select>

        <button type="submit">Save Wallet</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}