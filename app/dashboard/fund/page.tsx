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
  gross_amount: number;
  fee_percent: number;
  fee_amount: number;
  net_amount: number;
  status: string;
  note: string | null;
  created_at: string;
};

export default function FundPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [walletAddress] = useState("0xc47133a6bd653793562a1ea25cb1d3161fbd99cd");
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  useEffect(() => {
    const loadDeposits = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to view deposits.");
        setLoading(false);
        return;
      }

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

    loadDeposits();
  }, []);

  const totals = useMemo(() => {
    const gross = deposits.reduce((sum, d) => sum + Number(d.gross_amount || 0), 0);
    const fees = deposits.reduce((sum, d) => sum + Number(d.fee_amount || 0), 0);
    const net = deposits.reduce((sum, d) => sum + Number(d.net_amount || 0), 0);
    return { gross, fees, net };
  }, [deposits]);

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
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
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
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>Deposit USDT</h1>
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
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Buy USDT
          </a>
        </div>

        <div
          style={{
            background: "#161a1e",
            border: "1px solid #2b3139",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 20 }}>Deposit Wallet</h2>
          <p style={{ color: "#848e9c", marginBottom: 8 }}>
            Send only USDT using the supported network shown below.
          </p>

          <div
            style={{
              background: "#0f1419",
              border: "1px solid #2b3139",
              borderRadius: 12,
              padding: 14,
              wordBreak: "break-all",
              marginBottom: 12,
              color: "#f0b90b",
              fontWeight: 700,
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
              Network: <strong>BEP20 / ERC20 only</strong>
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
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              {totals.gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
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
            <div style={{ fontSize: 26, fontWeight: 700, color: "#f0b90b" }}>
              {totals.fees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
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
            <div style={{ fontSize: 26, fontWeight: 700, color: "#0ecb81" }}>
              {totals.net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
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

          {!loading && error && (
            <p style={{ color: "#ff4d4f" }}>{error}</p>
          )}

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

          {!loading && !error && deposits.length > 0 && (
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
                  {deposits.map((deposit) => (
                    <tr key={deposit.id} style={{ borderBottom: "1px solid #2b3139" }}>
                      <td style={{ padding: "14px 10px" }}>
                        {new Date(deposit.created_at).toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 10px" }}>{deposit.asset || "USDT"}</td>
                      <td style={{ padding: "14px 10px" }}>{deposit.network || "-"}</td>
                      <td style={{ padding: "14px 10px", textAlign: "right" }}>
                        {Number(deposit.gross_amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "right", color: "#f0b90b" }}>
                        {Number(deposit.fee_amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "right", color: "#0ecb81" }}>
                        {Number(deposit.net_amount).toLocaleString(undefined, {
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
                            background:
                              deposit.status === "completed"
                                ? "rgba(14,203,129,0.12)"
                                : deposit.status === "pending"
                                ? "rgba(240,185,11,0.12)"
                                : "rgba(255,77,79,0.12)",
                            color:
                              deposit.status === "completed"
                                ? "#0ecb81"
                                : deposit.status === "pending"
                                ? "#f0b90b"
                                : "#ff4d4f",
                          }}
                        >
                          {deposit.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 10px", maxWidth: 180, wordBreak: "break-all" }}>
                        {deposit.tx_hash || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}