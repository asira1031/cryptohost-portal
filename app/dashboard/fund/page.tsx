"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function FundPage() {
  const supabase = createClient();

  const [buyerWallet, setBuyerWallet] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showEwalletDetails, setShowEwalletDetails] = useState(false);

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

  const sectionButtonStyle: React.CSSProperties = {
    background: "#1f2937",
    color: "#ffffff",
    border: "1px solid #374151",
    borderRadius: "10px",
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
  };

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
              wordBreak: "break-all",
            }}
          >
            {gatewayWallet}
          </div>

          <div style={{ marginTop: "10px", color: "#94a3b8" }}>
            Asset: USDT | Network: ERC20 / BEP20 | Fee: 3%
          </div>
        </div>

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

        <div
          style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>Alternative Payment Methods</h3>
          <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
            Click to view available bank or e-wallet payment details.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowBankDetails((prev) => !prev)}
              style={sectionButtonStyle}
            >
              {showBankDetails ? "Hide Bank Details" : "Show Bank Details"}
            </button>

            <button
              onClick={() => setShowEwalletDetails((prev) => !prev)}
              style={sectionButtonStyle}
            >
              {showEwalletDetails ? "Hide E-Wallet Details" : "Show E-Wallet Details"}
            </button>
          </div>
        </div>

        {showBankDetails && (
          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <h3>Bank Transfer (Verified Clients Only)</h3>
            <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
              Please use the correct account details and submit proof of payment after transfer.
            </p>

            <div style={{ display: "grid", gap: "12px", color: "#ffffff" }}>
              <div>
                <strong>Maribank:</strong> Janica Maldives — 1032-431-2229 (SWIFT: LAUIPHM2)
              </div>
              <div>
                <strong>Security Bank:</strong> Janica Maldives — 0000076867520 (SWIFT: SETCPHMM)
              </div>
              <div>
                <strong>UnionBank:</strong> Janica Maldives — 103200011788 (SWIFT: UBPHPHMMXXX)
              </div>
              <div>
                <strong>BDO:</strong> Janica Maldives — 012516004148 (SWIFT: BNORPHMMXXX)
              </div>
              <div>
                <strong>BPI (PHP):</strong> Janica Maldives — 0629075905
              </div>
              <div>
                <strong>BPI (USD):</strong> Janica Maldives — 0574196219 (SWIFT: BOPIPHMM)
              </div>
              <div>
                <strong>Maya Bank:</strong> Janica Maldives — 808529591832 (SWIFT: MYYAPHM2XX)
              </div>
            </div>

            <div style={{ marginTop: "15px", color: "#facc15" }}>
              Bank transfers are processed manually. Submit proof of payment after sending.
            </div>
          </div>
        )}

        {showEwalletDetails && (
          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <h3>E-Wallet Payment</h3>
            <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
              Use the correct mobile number and submit proof of payment after sending.
            </p>

            <div style={{ display: "grid", gap: "12px", color: "#ffffff" }}>
              <div>
                <strong>Maya Wallet:</strong> 09498387452
              </div>
              <div>
                <strong>GCash:</strong> 09288985979
              </div>
            </div>

            <div style={{ marginTop: "15px", color: "#facc15" }}>
              E-wallet payments are processed manually. Submit proof of payment after sending.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}