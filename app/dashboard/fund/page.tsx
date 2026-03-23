"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type UserEmail = string | null;

export default function FundPage() {
  const supabase = createClient();

  const [buyerWallet, setBuyerWallet] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<UserEmail>(null);

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

  async function handleSaveBuyerWallet(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in.");
      return;
    }

    if (!buyerWallet.trim()) {
      setMessage("Please enter buyer wallet address.");
      return;
    }

    const { error } = await supabase.from("buyer_wallets").insert({
      user_id: user.id,
      wallet_address: buyerWallet.trim(),
      network,
    });

    if (error) {
      setMessage("Error saving buyer wallet.");
      return;
    }

    setMessage("Buyer wallet saved successfully.");
    setBuyerWallet("");
    setNetwork("ERC20");
  }

  function handleBuyUsdt() {
    window.open("https://www.binance.com/en/buy-crypto", "_blank");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          background: "#020817",
          borderRadius: "18px",
          padding: "28px",
          color: "#ffffff",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Deposit USDT
            </h1>

            <div
              style={{
                marginTop: "8px",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Logged in as: {userEmail ?? "Loading..."}
            </div>
          </div>

          <button
            onClick={handleBuyUsdt}
            style={{
              background: "#facc15",
              color: "#111827",
              border: "none",
              borderRadius: "10px",
              padding: "12px 18px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Buy USDT
          </button>
        </div>

        {/* Deposit Wallet */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Deposit Wallet
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              marginBottom: "14px",
            }}
          >
            Send only USDT using the supported network shown below.
          </div>

          <div
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "12px 14px",
              color: "#facc15",
              fontWeight: 700,
              wordBreak: "break-all",
              marginBottom: "12px",
            }}
          >
            {gatewayWallet}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {["Asset: USDT", "Network: BEP20 / ERC20 only", "Platform Fee: 3%"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    color: "#dbeafe",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* Buyer Wallet */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Buyer Wallet
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              marginBottom: "14px",
            }}
          >
            Enter the buyer wallet address that will receive the crypto.
          </div>

          <form onSubmit={handleSaveBuyerWallet}>
            <input
              type="text"
              placeholder="Enter buyer wallet address"
              value={buyerWallet}
              onChange={(e) => setBuyerWallet(e.target.value)}
              style={{
                width: "100%",
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "14px",
                color: "#ffffff",
                fontSize: "14px",
                marginBottom: "12px",
                outline: "none",
              }}
            />

            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              style={{
                width: "100%",
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "14px",
                color: "#ffffff",
                fontSize: "14px",
                marginBottom: "14px",
                outline: "none",
              }}
            >
              <option value="ERC20">ERC20</option>
              <option value="BEP20">BEP20</option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#facc15",
                color: "#111827",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Save Buyer Wallet
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "12px",
                color: "#22c55e",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
              Total Deposits
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800 }}>1,000.00 USDT</div>
          </div>

          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
              Total Fees Earned
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#facc15" }}>
              30.00 USDT
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
              Net Balance
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#22c55e" }}>
              970.00 USDT
            </div>
          </div>
        </div>

        {/* Deposit History */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 800 }}>Deposit History</div>

            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#facc15",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "#e5e7eb",
                minWidth: "860px",
              }}
            >
              <thead>
                <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                  <th style={{ padding: "12px 10px" }}>Date</th>
                  <th style={{ padding: "12px 10px" }}>Asset</th>
                  <th style={{ padding: "12px 10px" }}>Network</th>
                  <th style={{ padding: "12px 10px" }}>Gross</th>
                  <th style={{ padding: "12px 10px" }}>Fee</th>
                  <th style={{ padding: "12px 10px" }}>Net</th>
                  <th style={{ padding: "12px 10px" }}>Status</th>
                  <th style={{ padding: "12px 10px" }}>TX Hash</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid #1f2937" }}>
                  <td style={{ padding: "12px 10px" }}>3/21/2026, 12:26:13 PM</td>
                  <td style={{ padding: "12px 10px" }}>USDT</td>
                  <td style={{ padding: "12px 10px" }}>BEP20</td>
                  <td style={{ padding: "12px 10px" }}>1,000.00</td>
                  <td style={{ padding: "12px 10px", color: "#facc15" }}>30.00</td>
                  <td style={{ padding: "12px 10px", color: "#22c55e" }}>970.00</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span
                      style={{
                        background: "#3f1d1d",
                        color: "#f87171",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      Pending
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px" }}>TEST-TX-001</td>
                </tr>

                <tr style={{ borderTop: "1px solid #1f2937" }}>
                  <td style={{ padding: "12px 10px" }}>3/19/2026, 6:35:36 PM</td>
                  <td style={{ padding: "12px 10px" }}>USDT</td>
                  <td style={{ padding: "12px 10px" }}>BEP20</td>
                  <td style={{ padding: "12px 10px" }}>0.00</td>
                  <td style={{ padding: "12px 10px", color: "#facc15" }}>0.00</td>
                  <td style={{ padding: "12px 10px", color: "#22c55e" }}>0.00</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span
                      style={{
                        background: "#123524",
                        color: "#22c55e",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      Credited
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px" }}>0xTEST123456789</td>
                </tr>

                <tr style={{ borderTop: "1px solid #1f2937" }}>
                  <td style={{ padding: "12px 10px" }}>3/18/2026, 4:21:34 PM</td>
                  <td style={{ padding: "12px 10px" }}>USDT</td>
                  <td style={{ padding: "12px 10px" }}>ERC20</td>
                  <td style={{ padding: "12px 10px" }}>0.00</td>
                  <td style={{ padding: "12px 10px", color: "#facc15" }}>0.00</td>
                  <td style={{ padding: "12px 10px", color: "#22c55e" }}>0.00</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span
                      style={{
                        background: "#123524",
                        color: "#22c55e",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      Credited
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px" }}>0x8d34demo91ab</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}