"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type ReceiptRow = {
  wallet: string;
  percent: string;
  amount: string;
  tx: string;
};

const RECEIPTS: ReceiptRow[] = [
  {
    wallet: "0x90a6a82ff6...e1b1937196",
    percent: "15.0%",
    amount: "150,153,016.35",
    tx: "0xb74dfb2dc4aa...d1adf9f5f0",
  },
  {
    wallet: "0x00091363a...e31cf51324",
    percent: "15.0%",
    amount: "150,153,016.35",
    tx: "0x000b585c3a1c...389cb7bc02",
  },
  {
    wallet: "0xc47133a6bd...161fbd99cd",
    percent: "55.0%",
    amount: "550,561,059.95",
    tx: "0x18e8abd6437f...ec70da8f2b",
  },
  {
    wallet: "0xaa15a80957...6a4999c3eb",
    percent: "10.0%",
    amount: "100,102,010.90",
    tx: "0x14861eca7074...14f584cb4e",
  },
  {
    wallet: "0x466bAdE7E4...a5744aCc42",
    percent: "5.0%",
    amount: "50,051,005.45",
    tx: "0xde06acbde960...5acb667fde",
  },
];

function getUtc8Now(date: Date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const utc8 = new Date(utc + 8 * 60 * 60 * 1000);

  const year = utc8.getUTCFullYear();
  const month = String(utc8.getUTCMonth() + 1).padStart(2, "0");
  const day = String(utc8.getUTCDate()).padStart(2, "0");
  const hours = String(utc8.getUTCHours()).padStart(2, "0");
  const minutes = String(utc8.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes} (UTC+8)`;
}

export default function HSBCTPPHoldPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveTimestamp = useMemo(() => getUtc8Now(now), [now]);

  const terminal = `
CRYPTOHOST SECURE AUTOMATION — TRANSACTION SUSPENSION NOTICE
Module      : Compliance Deadline Monitor
Reference   : CH-2026-LIVE
Hold Code   : CHX-TRANSACTION-SUSPENDED-240326
Timestamp   : ${liveTimestamp}

=======================================================================

STATUS      : SUSPENDED
STAGE       : FINAL COMPLIANCE REVIEW CLOSED
PROGRESS    : 100% — SUSPENSION APPLIED
MODE        : READ-ONLY (No Release / No Processing / No Execution)

NOTICE
-----------------------------------------------------------------------
This transaction is now SUSPENDED.

The compliance deadline was March 24, 2026.
As the required compliance conditions were not completed within the
given timeframe, the transaction has been placed under suspension.

No further processing, release, or execution will proceed unless a
formal reactivation review is initiated.

SYSTEM STATUS
-----------------------------------------------------------------------
Processing Engine        : DISABLED
Release Access           : RESTRICTED
Execution Mode           : LOCKED
Audit Export             : ENABLED (Read-only)

DISTRIBUTION RECEIPT (AUDIT ONLY)
-----------------------------------------------------------------------
Sending to: 0x90a6a82ff63cd50b1d47d6e3f3791ce1b1937196
Percent   : 15.0 %
Amount    : 150,153,016.35
Audit     : OK (hash recorded)
TX Hash   : 0xb74dfb2dc4aa7156d3495096e32c557f5af85b18ef159654d4ca50d1adf9f5f0

Sending to: 0x00091363a3d21d684b3cca74d7272be31cf51324
Percent   : 15.0 %
Amount    : 150,153,016.35
Audit     : OK (hash recorded)
TX Hash   : 0x000b585c3a1c097442f2379f30a2ac495b73b6cc95af44b8ca51f4389cb7bc02

Sending to: 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Percent   : 55.0 %
Amount    : 550,561,059.95
Audit     : OK (hash recorded)
TX Hash   : 0x18e8abd6437fe79a969ede33da1d8cc586ffcd8afa1d2251829319ec70da8f2b

Sending to: 0xaa15a80957f9397d888fdcc568f2586a4999c3eb
Percent   : 10.0 %
Amount    : 100,102,010.90
Audit     : OK (hash recorded)
TX Hash   : 0x14861eca70740c32461e3d0539edadd7f50dac5861688b9139b1a114f584cb4e

Sending to: 0x466bAdE7E4cFc15213E0f7E9E25e4aa5744aCc42
Percent   : 5.0 %
Amount    : 50,051,005.45
Audit     : OK (hash recorded)
TX Hash   : 0xde06acbde960c78cf581fe4f888b5926650d1f889f8902aeedbc375acb667fde

TOTAL ALLOCATION: 100.0%
REFERENCE       : CH-2026-LIVE
TIMESTAMP       : ${liveTimestamp}

=======================================================================
FINAL STATUS
- Deadline               : March 24, 2026
- Result                 : TRANSACTION SUSPENDED
- Current mode           : Suspension Lock / Audit Only
`.trim();

  const colors = {
    bg: "#07101d",
    panel: "#101827",
    panel2: "#131f31",
    border: "rgba(255,255,255,0.08)",
    text: "#edf2f7",
    muted: "#9aa8ba",
    yellow: "#f0b90b",
    orange: "#f59e0b",
    green: "#22c55e",
    red: "#ef4444",
    blue: "#60a5fa",
  };

  const cardStyle: CSSProperties = {
    background: `linear-gradient(180deg, ${colors.panel} 0%, ${colors.panel2} 100%)`,
    border: `1px solid ${colors.border}`,
    borderRadius: 18,
    padding: 22,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  };

  const labelStyle: CSSProperties = {
    fontSize: 12,
    color: colors.muted,
  };

  const sidebarItem = (active = false): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 12,
    color: active ? "#111" : colors.text,
    background: active ? colors.yellow : "transparent",
    fontWeight: active ? 700 : 500,
    border: active ? "none" : `1px solid transparent`,
  });

  const badgeStyle = (bg: string, color: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.3,
    background: bg,
    color,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside
          style={{
            width: 230,
            padding: 20,
            borderRight: `1px solid ${colors.border}`,
            background:
              "linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(12,20,35,1) 18%, rgba(7,16,29,1) 100%)",
          }}
        >
          <div style={{ marginBottom: 26 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: 0.2,
              }}
            >
              CryptoHost
            </div>
            <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
              Secure Client Portal
            </div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={sidebarItem(true)}>📊 Dashboard</div>
            <div style={sidebarItem()}>📁 My Files</div>
            <div style={sidebarItem()}>⛓️ Blockchain</div>
            <div style={sidebarItem()}>🏦 Bank API</div>
            <div style={sidebarItem()}>🔒 Security</div>
          </div>

          <div
            style={{
              marginTop: 22,
              padding: 16,
              borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ fontSize: 11, color: colors.muted, marginBottom: 8 }}>
              Environment
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Network: <b>Ethereum Mainnet</b>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Mode: <b>Suspension Console</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Policy: <b>Transaction Suspended</b>
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ fontSize: 11, color: colors.muted, marginBottom: 10 }}>
              Validation
            </div>

            <div
              style={{
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #f0b90b, #ef4444)",
                }}
              />
            </div>

            <div style={{ fontSize: 13, marginBottom: 6 }}>
              FINAL STATUS: <b>100%</b>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Status: <b style={{ color: colors.red }}>SUSPENDED</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Hold Code: <b>CHX-TRANSACTION-SUSPENDED-240326</b>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>
              Welcome, Client
            </div>
            <div style={{ marginTop: 8, fontSize: 18 }}>
              Status:{" "}
              <span style={{ color: colors.green, fontWeight: 800 }}>System Online</span>{" "}
              • Mode:{" "}
              <span style={{ color: colors.red, fontWeight: 800 }}>Transaction Suspended</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.25fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <div style={cardStyle}>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
                  Active File
                </div>

                <div
                  style={{
                    borderRadius: 16,
                    padding: 18,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{ ...labelStyle, marginBottom: 8 }}>
                    Reference: <b style={{ color: colors.text }}>CH-2026-LIVE</b>
                  </div>

                  <div style={{ fontSize: 22, fontWeight: 900, color: colors.red }}>
                    TRANSACTION SUSPENDED
                  </div>

                  <div style={{ marginTop: 8, fontWeight: 800, color: colors.red }}>
                    Status: SUSPENDED
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.75, color: colors.text }}>
                    This transaction is now suspended due to incomplete compliance
                    requirements. The final deadline was March 24, 2026, and the
                    required conditions were not completed within the given timeframe.
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={badgeStyle("rgba(239,68,68,0.16)", "#ff8a8a")}>
                      ● TRANSACTION SUSPENDED
                    </span>
                    <span style={badgeStyle("rgba(245,158,11,0.16)", "#fbbf24")}>
                      🔒 COMPLIANCE DEADLINE PASSED
                    </span>
                    <span style={badgeStyle("rgba(96,165,250,0.16)", "#93c5fd")}>
                      📊 Audit Only
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 800,
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    🔗 Hold Code: CHX-TRANSACTION-SUSPENDED-240326
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <div
                      style={{
                        height: 10,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.10)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, #f0b90b, #ef4444)",
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: colors.muted }}>
                      Final Status Applied
                    </div>
                  </div>

                  <div style={{ marginTop: 14, fontSize: 12, color: colors.muted }}>
                    Timestamp: {liveTimestamp}
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
                  Distribution Receipt
                </div>

                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${colors.border}`,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div style={{ padding: 18, borderBottom: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>
                      On-chain Broadcast Hashes (Audit Only)
                    </div>
                    <div style={{ marginTop: 6, fontSize: 13, color: colors.muted }}>
                      Total Allocation: 100.0% • Status: Suspended
                    </div>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 14,
                      }}
                    >
                      <thead>
                        <tr style={{ textAlign: "left", color: colors.muted }}>
                          <th style={{ padding: "12px 16px" }}>Wallet</th>
                          <th style={{ padding: "12px 16px" }}>Percent</th>
                          <th style={{ padding: "12px 16px" }}>Amount</th>
                          <th style={{ padding: "12px 16px" }}>TX Hash</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECEIPTS.map((item) => (
                          <tr key={item.tx} style={{ borderTop: `1px solid ${colors.border}` }}>
                            <td style={{ padding: "14px 16px" }}>{item.wallet}</td>
                            <td style={{ padding: "14px 16px", fontWeight: 800 }}>
                              {item.percent}
                            </td>
                            <td style={{ padding: "14px 16px" }}>{item.amount}</td>
                            <td style={{ padding: "14px 16px", color: colors.blue }}>
                              {item.tx}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div
                    style={{
                      padding: 16,
                      borderTop: `1px solid ${colors.border}`,
                      fontSize: 12,
                      color: colors.muted,
                    }}
                  >
                    Note: TX hashes are shown for audit reference only. This transaction
                    is suspended and no further release, execution, or processing will
                    proceed unless a formal reactivation review is initiated.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div style={cardStyle}>
                <div style={{ ...labelStyle, marginBottom: 10 }}>TRANSACTION NOTICE</div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  Transaction Suspended
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <div style={{ lineHeight: 1.8 }}>
                    This transaction is now <b>suspended</b>.
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.8 }}>
                    The compliance deadline was <b>March 24, 2026</b>.
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.8 }}>
                    As the required conditions were not completed within the given
                    timeframe, the transaction has been placed under suspension.
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.8 }}>
                    No further processing, release, or execution will proceed unless a
                    formal reactivation review is initiated.
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.8 }}>
                    <b>Status:</b> SUSPENDED
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>System:</b> CryptoHost Secure Automation — Suspension Console
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>Timestamp:</b> {liveTimestamp}
                  </div>

                  <div
                    style={{
                      marginTop: 20,
                      padding: 20,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #2a1a1a, #1a1a2a)",
                      border: "1px solid #ff4d4f",
                    }}
                  >
                    <p style={{ color: "#ff6b6b", fontSize: 12, fontWeight: 600 }}>
                      NOTICE TO SENDER
                    </p>

                    <h3 style={{ color: "#ffd4d4", marginTop: 5 }}>
                      Transaction Suspended
                    </h3>

                    <p style={{ marginTop: 10, color: "#ddd", lineHeight: 1.8 }}>
                      Please be advised that this transaction is under suspension status
                      due to incomplete compliance requirements within the allowed period.
                    </p>

                    <p style={{ marginTop: 10, color: "#aaa", lineHeight: 1.8 }}>
                      This is a system-enforced suspension based on compliance policy and
                      deadline enforcement.
                    </p>
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <details open>
                  <summary
                    style={{
                      cursor: "pointer",
                      fontWeight: 800,
                      color: colors.text,
                      marginBottom: 12,
                    }}
                  >
                    ▼ ▼ View Full Technical Log
                  </summary>

                  <pre
                    style={{
                      marginTop: 10,
                      background: "#050607",
                      color: "#c8ffcf",
                      padding: 18,
                      borderRadius: 16,
                      overflow: "auto",
                      border: `1px solid ${colors.border}`,
                      whiteSpace: "pre-wrap",
                      fontSize: 13,
                      lineHeight: 1.5,
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
                    }}
                  >
                    {terminal}
                  </pre>
                </details>

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: `1px solid ${colors.border}`,
                    fontSize: 12,
                    color: colors.muted,
                  }}
                >
                  Powered by CryptoHost Secure Automation
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}