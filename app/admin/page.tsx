"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

const ADMIN_EMAIL = "jans103174@gmail.com";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const loadDeposits = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setAuthorized(false);
        setUserEmail("");
        setError("Please log in first.");
        setDeposits([]);
        setLoading(false);
        return;
      }

      setUserEmail(user.email || "");

      if ((user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setAuthorized(false);
        setError("This account is not authorized to access the admin panel.");
        setDeposits([]);
        setLoading(false);
        return;
      }

      setAuthorized(true);

      const res = await fetch("/api/admin/deposits", {
        method: "GET",
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to load deposits.");
      }

      const rows: Deposit[] = json.deposits || [];
      setDeposits(rows);

      const noteMap: Record<string, string> = {};
      rows.forEach((row) => {
        noteMap[row.id] = row.note || "";
      });
      setNotes(noteMap);
    } catch (err: any) {
      setError(err.message || "Failed to load admin deposits.");
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeposits();
  }, []);

  const updateStatus = async (id: string, status: "Pending" | "Credited" | "Rejected") => {
    try {
      setSavingId(id);
      setError("");
      setSuccess("");

      const res = await fetch("/api/admin/deposits", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          note: notes[id] || "",
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to update deposit.");
      }

      setSuccess(`Deposit updated to ${status}.`);
      await loadDeposits();
    } catch (err: any) {
      setError(err.message || "Failed to update deposit.");
    } finally {
      setSavingId("");
    }
  };

  const summary = useMemo(() => {
    const total = deposits.reduce((sum, d) => sum + Number(d.gross_amount || d.amount || 0), 0);
    const fees = deposits.reduce((sum, d) => sum + Number(d.fee_amount || 0), 0);
    const credited = deposits.filter((d) => d.status === "Credited").length;
    const pending = deposits.filter((d) => d.status === "Pending").length;
    const rejected = deposits.filter((d) => d.status === "Rejected").length;

    return { total, fees, credited, pending, rejected };
  }, [deposits]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0e11",
        color: "#eaecef",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1350, margin: "0 auto" }}>
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
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>Admin Credit Panel</h1>
            <p style={{ marginTop: 8, color: "#848e9c" }}>
              Logged in as: {userEmail || "Loading..."}
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={loadDeposits}
              style={{
                background: "#f0b90b",
                color: "#111",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Refresh
            </button>

            <Link
              href="/dashboard/fund"
              style={{
                background: "#161a1e",
                color: "#f0b90b",
                border: "1px solid #2b3139",
                borderRadius: 10,
                padding: "12px 16px",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Back to Fund Page
            </Link>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginBottom: 18,
              background: "rgba(255,77,79,0.12)",
              color: "#ff4d4f",
              padding: "12px 14px",
              borderRadius: 10,
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: 18,
              background: "rgba(14,203,129,0.12)",
              color: "#0ecb81",
              padding: "12px 14px",
              borderRadius: 10,
            }}
          >
            {success}
          </div>
        )}

        {authorized && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <SummaryCard label="Total Deposit Volume" value={`${summary.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`} />
              <SummaryCard label="Total Fee Earned" value={`${summary.fees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`} highlight="#f0b90b" />
              <SummaryCard label="Credited" value={String(summary.credited)} highlight="#0ecb81" />
              <SummaryCard label="Pending" value={String(summary.pending)} highlight="#f0b90b" />
              <SummaryCard label="Rejected" value={String(summary.rejected)} highlight="#ff4d4f" />
            </div>

            <div
              style={{
                background: "#161a1e",
                border: "1px solid #2b3139",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: 22 }}>All Deposits</h2>

              {loading ? (
                <p style={{ color: "#848e9c" }}>Loading admin deposits...</p>
              ) : deposits.length === 0 ? (
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
                  No deposits found.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      minWidth: 1300,
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid #2b3139", color: "#848e9c" }}>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>User</th>
                        <th style={thStyle}>Asset</th>
                        <th style={thStyle}>Network</th>
                        <th style={thRight}>Gross</th>
                        <th style={thRight}>Fee</th>
                        <th style={thRight}>Net</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>TX Hash</th>
                        <th style={thStyle}>Note</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deposits.map((deposit) => (
                        <tr key={deposit.id} style={{ borderBottom: "1px solid #2b3139" }}>
                          <td style={tdStyle}>{new Date(deposit.created_at).toLocaleString()}</td>
                          <td style={tdStyle}>{deposit.user_id}</td>
                          <td style={tdStyle}>{deposit.asset || "USDT"}</td>
                          <td style={tdStyle}>{deposit.network || "-"}</td>
                          <td style={tdRight}>
                            {Number(deposit.gross_amount || deposit.amount || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td style={{ ...tdRight, color: "#f0b90b" }}>
                            {Number(deposit.fee_amount || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td style={{ ...tdRight, color: "#0ecb81" }}>
                            {Number(deposit.net_amount || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td style={tdStyle}>
                            <StatusBadge status={deposit.status} />
                          </td>
                          <td style={{ ...tdStyle, maxWidth: 180, wordBreak: "break-all" }}>
                            {deposit.tx_hash || "-"}
                          </td>
                          <td style={tdStyle}>
                            <textarea
                              value={notes[deposit.id] || ""}
                              onChange={(e) =>
                                setNotes((prev) => ({
                                  ...prev,
                                  [deposit.id]: e.target.value,
                                }))
                              }
                              rows={2}
                              style={{
                                width: 220,
                                background: "#0f1419",
                                color: "#eaecef",
                                border: "1px solid #2b3139",
                                borderRadius: 10,
                                padding: 10,
                                resize: "vertical",
                              }}
                            />
                          </td>
                          <td style={tdStyle}>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                              <button
                                onClick={() => updateStatus(deposit.id, "Credited")}
                                disabled={savingId === deposit.id}
                                style={actionBtn("#0ecb81")}
                              >
                                Credit
                              </button>
                              <button
                                onClick={() => updateStatus(deposit.id, "Pending")}
                                disabled={savingId === deposit.id}
                                style={actionBtn("#f0b90b")}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => updateStatus(deposit.id, "Rejected")}
                                disabled={savingId === deposit.id}
                                style={actionBtn("#ff4d4f")}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: string;
}) {
  return (
    <div
      style={{
        background: "#161a1e",
        border: "1px solid #2b3139",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div style={{ color: "#848e9c", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: highlight || "#eaecef" }}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let background = "rgba(255,77,79,0.12)";
  let color = "#ff4d4f";

  if (status === "Credited") {
    background = "rgba(14,203,129,0.12)";
    color = "#0ecb81";
  } else if (status === "Pending") {
    background = "rgba(240,185,11,0.12)";
    color = "#f0b90b";
  }

  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background,
        color,
      }}
    >
      {status}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 10px",
};

const thRight: React.CSSProperties = {
  textAlign: "right",
  padding: "12px 10px",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 10px",
  verticalAlign: "top",
};

const tdRight: React.CSSProperties = {
  padding: "14px 10px",
  textAlign: "right",
  verticalAlign: "top",
};

function actionBtn(color: string): React.CSSProperties {
  return {
    background: color,
    color: "#111",
    border: "none",
    borderRadius: 10,
    padding: "8px 12px",
    fontWeight: 800,
    cursor: "pointer",
  };
}