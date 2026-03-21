
<h1 style={{color:"red"}}>NEW VERSION</h1>
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

type Deposit = {
  id: string;
  user_id: string;
  wallet_address: string | null;
  tx_hash: string | null;
  network: string | null;
  asset: string | null;
  gross_amount: number | null;
  fee_percent: number | null;
  fee_amount: number | null;
  net_amount: number | null;
  status: string;
  note: string | null;
  created_at: string;
  amount?: number | null;
};

export default function FundPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [walletAddress] = useState("0xc47133a6bd653793562a1ea25cb1d3161fbd99cd");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [manualAmount, setManualAmount] = useState("1000");

  const loadDeposits = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("You must be logged in to view deposits.");
      setDeposits([]);
      setLoading(false);
      return;
    }

    setUserId(user.id);
    setUserEmail(user.email || "");

    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setDeposits([]);
    } else {
      setDeposits((data || []) as Deposit[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDeposits();
  }, []);

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Failed to copy wallet address.");
    }
  };

  const handleManualDeposit = async () => {
    setError("");
    setSuccess("");

    const amount = Number(manualAmount);

    if (!userId) {
      setError("User not loaded yet. Please refresh and try again.");
      return;
    }

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setSubmitting(true);

    const fee = Number((amount * 0.03).toFixed(2));
    const net = Number((amount - fee).toFixed(2));

    const { error } = await supabase.from("deposits").insert([
      {
        user_id: userId,
        amount: amount,
        wallet_address: walletAddress,
        tx_hash: `MANUAL-${Date.now()}`,
        network: "BEP20",
        asset: "USDT",
        gross_amount: amount,
        fee_percent: 3.0,
        fee_amount: fee,
        net_amount: net,
        status: "Pending",
        note: "Manual deposit test from dashboard",
      },
    ]);

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setSuccess(`Manual deposit added: ${amount.toFixed(2)} USDT`);
    setManualAmount("1000");
    await loadDeposits();
    setSubmitting(false);
  };

  const totals = useMemo(() => {
    const gross = deposits.reduce((sum, d) => sum + Number(d.gross_amount || d.amount || 0), 0);
    const fees = deposits.reduce((sum, d) => sum + Number(d.fee_amount || 0), 0);
    const net = deposits.reduce((sum, d) => sum + Number(d.net_amount || 0), 0);
    return { gross, fees, net };
  }, [deposits]);

  const getStatusStyle = (status: string) => {
    if (status === "Credited") {
      return {
        background: "rgba(14,203,129,0.12)",
        color: "#0ecb81",
      };
    }

    if (status === "Pending") {
      return {
        background: "rgba(240,185,11,0.12)",
        color: "#f0b90b",
      };
    }

    return {
      background: "rgba(255,77,79,0.12)",
      color: "#ff4d4f",
    };
  };

  const quickAmounts = [100, 250, 500, 1000];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0e11",
        color: "#eaecef",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>Deposit USDT</h1>
            <div style={{ color: "red", fontWeight: 800 }}>
  NEW VERSION TEST
</div>
            <p style={{ marginTop: 8, color: "#848e9c" }}>
              Logged in as: {userEmail || "Loading..."}
            </p>
          </div>

          <a
            href="https://www.binance.com/en/buy-sell-crypto"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#f0b90b",
              color: "#111",
              padding: "12px 18px",
              borderRadius: 12,
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(240,185,11,0.18)",
            }}
          >
            Buy USDT
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 22 }}>Deposit Wallet</h2>
                <p style={{ margin: 0, color: "#848e9c" }}>
                  Send only USDT using the supported network below.
                </p>
              </div>

              <button
                onClick={handleCopyWallet}
                style={{
                  background: copied ? "#0ecb81" : "#0f1419",
                  color: copied ? "#0b0e11" : "#eaecef",
                  border: "1px solid #2b3139",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  height: "fit-content",
                }}
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </div>

            <div
              style={{
                background: "#0f1419",
                border: "1px solid #2b3139",
                borderRadius: 14,
                padding: 16,
                wordBreak: "break-all",
                marginTop: 16,
                marginBottom: 14,
                color: "#f0b90b",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              {walletAddress}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div
                style={{
                  background: "#0f1419",
                  border: "1px solid #2b3139",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                Asset: <strong>USDT</strong>
              </div>
              <div
                style={{
                  background: "#0f1419",
                  border: "1px solid #2b3139",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                Network: <strong>BEP20 / ERC20</strong>
              </div>
              <div
                style={{
                  background: "#0f1419",
                  border: "1px solid #2b3139",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                Platform Fee: <strong>3%</strong>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 22 }}>Manual Deposit Test</h2>
            <p style={{ margin: 0, color: "#848e9c" }}>
              Temporary tool while we finish full automation.
            </p>

            <div style={{ marginTop: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#848e9c", fontSize: 14 }}>
                Deposit Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: "100%",
                  background: "#0f1419",
                  border: "1px solid #2b3139",
                  color: "#eaecef",
                  borderRadius: 12,
                  padding: "12px 14px",
                  outline: "none",
                  fontSize: 15,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setManualAmount(String(amt))}
                  style={{
                    background: "#0f1419",
                    color: "#eaecef",
                    border: "1px solid #2b3139",
                    borderRadius: 10,
                    padding: "8px 12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {amt}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: 14,
                background: "#0f1419",
                border: "1px solid #2b3139",
                borderRadius: 12,
                padding: 14,
                fontSize: 14,
                color: "#b7bdc6",
                lineHeight: 1.7,
              }}
            >
              <div>
                Fee (3%):{" "}
                <span style={{ color: "#f0b90b", fontWeight: 700 }}>
                  {Number(Number(manualAmount || 0) * 0.03).toFixed(2)} USDT
                </span>
              </div>
              <div>
                Net Balance:{" "}
                <span style={{ color: "#0ecb81", fontWeight: 700 }}>
                  {Number(Number(manualAmount || 0) - Number(manualAmount || 0) * 0.03).toFixed(2)} USDT
                </span>
              </div>
            </div>

            <button
              onClick={handleManualDeposit}
              disabled={submitting || loading}
              style={{
                width: "100%",
                marginTop: 16,
                background: submitting || loading ? "#5f6670" : "#f0b90b",
                color: "#111",
                border: "none",
                borderRadius: 12,
                padding: "13px 18px",
                fontWeight: 800,
                fontSize: 15,
                cursor: submitting || loading ? "not-allowed" : "pointer",
                boxShadow: submitting || loading ? "none" : "0 8px 24px rgba(240,185,11,0.18)",
              }}
            >
              {submitting ? "Adding Deposit..." : "Add Manual Deposit"}
            </button>

            {success && (
              <div
                style={{
                  marginTop: 14,
                  background: "rgba(14,203,129,0.12)",
                  color: "#0ecb81",
                  padding: "12px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                }}
              >
                {success}
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: 14,
                  background: "rgba(255,77,79,0.12)",
                  color: "#ff4d4f",
                  padding: "12px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ color: "#848e9c", marginBottom: 8 }}>Total Deposits</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {totals.gross.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USDT
            </div>
          </div>

          <div
            style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ color: "#848e9c", marginBottom: 8 }}>Total Fees Earned</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#f0b90b" }}>
              {totals.fees.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USDT
            </div>
          </div>

          <div
            style={{
              background: "#161a1e",
              border: "1px solid #2b3139",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ color: "#848e9c", marginBottom: 8 }}>Net Balance</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#0ecb81" }}>
              {totals.net.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USDT
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#161a1e",
            border: "1px solid #2b3139",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Deposit History</h2>
            <Link
              href="/dashboard"
              style={{
                color: "#f0b90b",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Back to Dashboard
            </Link>
          </div>

          {loading && <p style={{ color: "#848e9c" }}>Loading deposits...</p>}

          {!loading && !error && deposits.length === 0 && (
            <div
              style={{
                background: "#0f1419",
                border: "1px dashed #2b3139",
                borderRadius: 12,
                padding: 24,
                color: "#848e9c",
                textAlign: "center",
              }}
            >
              No deposits yet.
              <br />
              Once USDT is received and recorded, it will appear here.
            </div>
          )}

          {!loading && deposits.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 900,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid #2b3139", color: "#848e9c" }}>
                    <th style={{ textAlign: "left", padding: "12px 10px" }}>Date</th>
                    <th style={{ textAlign: "left", padding: "12px 10px" }}>Asset</th>
                    <th style={{ textAlign: "left", padding: "12px 10px" }}>Network</th>
                    <th style={{ textAlign: "right", padding: "12px 10px" }}>Gross</th>
                    <th style={{ textAlign: "right", padding: "12px 10px" }}>Fee</th>
                    <th style={{ textAlign: "right", padding: "12px 10px" }}>Net</th>
                    <th style={{ textAlign: "left", padding: "12px 10px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px 10px" }}>TX Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit) => {
                    const statusStyle = getStatusStyle(deposit.status);

                    return (
                      <tr key={deposit.id} style={{ borderBottom: "1px solid #2b3139" }}>
                        <td style={{ padding: "14px 10px" }}>
                          {new Date(deposit.created_at).toLocaleString()}
                        </td>
                        <td style={{ padding: "14px 10px" }}>{deposit.asset || "USDT"}</td>
                        <td style={{ padding: "14px 10px" }}>{deposit.network || "-"}</td>
                        <td style={{ padding: "14px 10px", textAlign: "right" }}>
                          {Number(deposit.gross_amount || deposit.amount || 0).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                        <td style={{ padding: "14px 10px", textAlign: "right", color: "#f0b90b" }}>
                          {Number(deposit.fee_amount || 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td style={{ padding: "14px 10px", textAlign: "right", color: "#0ecb81" }}>
                          {Number(deposit.net_amount || 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td style={{ padding: "14px 10px" }}>
                          <span
                            style={{
                              padding: "6px 10px",
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 700,
                              background: statusStyle.background,
                              color: statusStyle.color,
                            }}
                          >
                            {deposit.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "14px 10px",
                            maxWidth: 180,
                            wordBreak: "break-all",
                          }}
                        >
                          {deposit.tx_hash || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}