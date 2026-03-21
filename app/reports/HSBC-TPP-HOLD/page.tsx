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
CRYPTOHOST SECURE AUTOMATION — COMPLIANCE HOLD NOTICE (BLACKSCREEN CONSOLE)
Module      : Secure Channel (mTLS) + OAuth Onboarding Validator
Reference   : CH-2026-LIVE
Hold Code   : CHX-COMP-HOLD-JURISD-CERT-240226
Timestamp   : ${liveTimestamp}

=======================================================================

STATUS      : HOLD (COMPLIANCE)
STAGE       : JURISDICTION & CERTIFICATE INTEGRITY REVIEW
PROGRESS    : 80% — COMPLIANCE REVIEW
MODE        : READ-ONLY (No Broadcast / No Token Access / No Release)

1) PRIMARY HOLD REASONS
-----------------------------------------------------------------------
[A] CERTIFICATE EXPIRY (LEAF CERT)
- Subject (CN)        : www.hsbc.co.uk
- Issuer              : DigiCert EV RSA CA G2
- Valid From          : 2024-08-01
- Valid Until         : 2025-09-01 23:59:59Z
- Result              : EXPIRED — Cannot be used for current authorization
- Fingerprints        : SHA-256 665d5deeaddf0260a903383ced61e0a343ba41dcb2402ac29d8f38e5b170989
- SHA-1               : 5afdcb7b46a19ce4cc5706025756f766db9741b8

[B] HOSTNAME / IDENTITY MISMATCH
- Expected Hostname   : banking.hsbc.co.uk
- Provided CN         : www.hsbc.co.uk
- Result              : MISMATCH — Endpoint identity not aligned (SAN/CN mismatch)

[C] JURISDICTION / PLATFORM MISMATCH (OAUTH ENVIRONMENT)
- Declared Entity     : HSBC UK BANK PLC (SWIFT: HBUKGB4BXXX)
- UK OB Host          : api.ob.hsbc.co.uk:443
- Provided Endpoint   : https://api.hsbc.com.hk/live
- Result              : MISMATCH — HK platform credentials do not validate UK-declared flow

[D] ROOT CA CERT (INFORMATIONAL)
- Root CA             : VeriSign Class 3 CA Group 3
- Status              : VALID (ROOT CA — not proof of onboarding)

2) CURRENT SYSTEM STATE
-----------------------------------------------------------------------
Secure Channel Parameters : REVIEWED
mTLS Handshake Auth       : NOT ESTABLISHED (Expired + Host mismatch)
OAuth Token Issuance      : NOT ACTIVE (Jurisdiction mismatch)
Funds / Transfer Confirm  : NOT VERIFIED (No valid bank-side onboarding proof)

ACTION LOCKS
- Broadcast Engine        : DISABLED
- Liquidity Routing       : DISABLED
- Settlement Trigger      : DISABLED
- Audit Export            : ENABLED (Read-only)

3) REQUIRED TO CLEAR HOLD (SENDER ACTION ITEMS)
-----------------------------------------------------------------------
1. Active leaf certificate chain required (leaf + intermediate + root) — must be current (not expired)
2. Endpoint identity alignment required (CN/SAN must match expected hostname used for onboarding)
3. Jurisdiction alignment required (UK-declared entity must use UK OAuth environment unless formally migrated)
4. HSBC UK OAuth onboarding confirmation required (client registration + token endpoints + consent/authorization_code or approved client_credentials)

4) DISTRIBUTION RECEIPT (BROADCAST HASHES — AUDIT ONLY)
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
DEADLINE POLICY
- Deadline               : March 24, 2026
- Third extension        : NOT ALLOWED
- Current mode           : Compliance Lock / Audit Only
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

  const metricCard: CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    padding: 16,
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
              Mode: <b>Validation Console</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Policy: <b>Compliance Lock (Read-only)</b>
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
                  width: "80%",
                  height: "100%",
                  background: "linear-gradient(90deg, #f0b90b, #ef4444)",
                }}
              />
            </div>

            <div style={{ fontSize: 13, marginBottom: 6 }}>
              COMPLIANCE REVIEW: <b>80%</b>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Status: <b style={{ color: colors.yellow }}>HOLD (AUTHORIZATION PENDING)</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Hold Code: <b>CHX-COMP-HOLD-JURISD-CERT-240226</b>
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
              <span style={{ color: colors.yellow, fontWeight: 800 }}>Compliance Hold</span>
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

                  <div style={{ fontSize: 22, fontWeight: 900, color: colors.yellow }}>
                    COMPLIANCE HOLD — JURISDICTION & CERTIFICATE MISMATCH
                  </div>

                  <div style={{ marginTop: 8, fontWeight: 800, color: colors.yellow }}>
                    Status: HOLD (AUTHORIZATION PENDING)
                  </div>

                  <div style={{ marginTop: 14, lineHeight: 1.75, color: colors.text }}>
                    Secure channel artifacts reviewed. Hold triggered due to expired leaf
                    certificate, hostname mismatch (banking.hsbc.co.uk vs www.hsbc.co.uk),
                    and jurisdiction mismatch (HK API credentials presented for UK-declared
                    entity). Distribution hashes retained for audit only.
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
                      ● HOLD — COMPLIANCE REVIEW (80%)
                    </span>
                    <span style={badgeStyle("rgba(245,158,11,0.16)", "#fbbf24")}>
                      🔐 TLS: TLS 1.2+ / 1.3
                    </span>
                    <span style={badgeStyle("rgba(96,165,250,0.16)", "#93c5fd")}>
                      📊 Allocation: 100.0%
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
                    🔗 Hold Code: CHX-COMP-HOLD-JURISD-CERT-240226
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
                          width: "80%",
                          height: "100%",
                          background: "linear-gradient(90deg, #f0b90b, #ef4444)",
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: colors.muted }}>
                      Validation Progress
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
                      Total Allocation: 100.0% • Progress: 80%
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
                    Note: TX hashes are provided for audit reference only. Compliance
                    Hold is active; no release or settlement actions will proceed until
                    updated bank-side onboarding requirements are satisfied.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div style={cardStyle}>
                <div style={{ ...labelStyle, marginBottom: 10 }}>VALIDATION NOTICE</div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  Compliance Hold — Jurisdiction & Certificate Integrity Review
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
                    A compliance hold has been applied after technical review of the
                    submitted secure-channel materials. The leaf certificate provided is expired,
                    the certificate identity does not align with the expected hostname for the
                    declared UK endpoint, and the OAuth/API credentials provided reference a Hong Kong
                    environment despite the transaction being declared under HSBC UK (HBUKGB4BXXX).
                    No token access, broadcast, or release actions will proceed until valid,
                    aligned mTLS/OAuth onboarding materials are provided.
                  </div>

                  <div style={{ marginTop: 18, lineHeight: 1.8 }}>
                    <b>Reason:</b> Mismatch detected across certificate validity, endpoint
                    hostname alignment, and platform jurisdiction. Root CA presence alone is
                    not proof of live authorization or onboarding.
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>Next Step:</b> Provide an active certification chain (leaf +
                    intermediate + root) matching the live UK endpoint hostname, provide HSBC UK
                    OAuth onboarding confirmation (client registration + token endpoints), and
                    resolve jurisdiction alignment (UK-declared entity must use UK environment
                    unless formally migrated with documentation).
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>Hold Code:</b> CHX-COMP-HOLD-JURISD-CERT-240226
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>System:</b> CryptoHost Secure Automation — Validation Console
                  </div>

                  <div style={{ marginTop: 10, lineHeight: 1.8 }}>
                    <b>Timestamp:</b> {liveTimestamp}
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={{ ...labelStyle, marginBottom: 8 }}>Validation Progress</div>
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
                          width: "80%",
                          height: "100%",
                          background: "linear-gradient(90deg, #f0b90b, #ef4444)",
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: colors.muted }}>
                      COMPLIANCE REVIEW: 80%
                    </div>
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
                      DEADLINE POLICY
                    </p>

                    <h3 style={{ color: "#ffd4d4", marginTop: 5 }}>
                      Deadline: March 24, 2026
                    </h3>

                    <p style={{ marginTop: 10, color: "#ddd", lineHeight: 1.8 }}>
                      Final compliance clearance must be completed on or before March 24, 2026.
                      Due to prior waiting and already granted extension consideration,
                      <b> a third extension is not allowed.</b>
                    </p>

                    <p style={{ marginTop: 10, color: "#aaa", lineHeight: 1.8 }}>
                      If required bank-side onboarding, certificate correction, and TPP / OAuth
                      alignment are not completed by the deadline, the file remains under
                      compliance lock pending formal reactivation review.
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