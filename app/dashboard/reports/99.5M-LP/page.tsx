"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function PriorityMintPage() {
  const router = useRouter();
  const supabase = createClient();

  const [timestamp, setTimestamp] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");
  const [hasValidated, setHasValidated] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "processing" | "on_hold" | "verified" | "not_verified"
  >("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (error || !user?.email) {
          router.replace("/login");
          return;
        }

        const allowedEmails = [
  "jans103174@gmail.com",
  "ceo@kerogenresource.com",
];

const allowed = allowedEmails.includes(
  user.email.toLowerCase().trim()
);;

        if (!allowed) {
          router.replace("/dashboard/my-files");
          return;
        }

        setIsAdmin(true);
      } catch {
        router.replace("/login");
      } finally {
        if (isMounted) {
          setIsCheckingAccess(false);
        }
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  useEffect(() => {
    const updateTimestamp = () => {
      const formatted =
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Manila",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
          .format(new Date())
          .replace(",", "") + " (UTC+8)";

      setTimestamp(formatted);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleValidateCode = () => {
    const cleanCode = submittedCode.trim();

    if (!cleanCode) {
      setHasValidated(true);
      setValidationStatus("not_verified");
      setValidationMessage(
        "Please enter an authorization / approval / release code first."
      );
      return;
    }

    setHasValidated(true);
    setValidationStatus("processing");
    setValidationMessage(
      "Authorization code submitted. Processing validation request..."
    );

    setTimeout(() => {
      setValidationStatus("on_hold");
      setValidationMessage(
        "Validation is currently on hold pending full authorization review and execution path check."
      );

      setTimeout(() => {
        setValidationStatus("not_verified");
        setValidationMessage(
          "The submitted authorization reference could not be verified under current validation requirements. No executable authorization record is available."
        );
      }, 5000);
    }, 180000);
  };

  const FILE_LABEL = "99.5M LIQUIDITY FILE";
  const FILE_AMOUNT = "99,500,000.00 EUR";

  const STAGE_LABEL = "RELEASE STAGE — PENDING SENDER AUTHORIZATION";
  const STATUS_BADGE = "AUTHORIZATION REQUIRED";
  const SYSTEM_STATUS = "PENDING AUTHORIZATION SUBMISSION";

  const AUTHORIZATION_LINE =
    "Execution is currently on hold pending sender-side submission of the required authorization reference and supporting release data.";

  const NOTICE_TITLE = "Release Stage — Pending Sender Authorization";
  const NOTICE_BODY =
    "This file is currently awaiting sender-provided authorization data. Release validation cannot continue until the required approval reference and supporting release credentials are submitted for review.";

  const REASON =
    "No executable authorization reference has been submitted yet. The file remains in a pending state until sender-side approval data is provided for validation review.";

  const REQUIRED_ACTION =
    "Sender must provide the required authorization reference, approval code, or release code together with any supporting release credentials needed for validation review.";

  const SYSTEM_NAME = "CryptoHost Release Validation Console";

  const POSITION_PAIR = "AUTHORIZATION / RELEASE";
  const POSITION_STATE = "Pending Sender Input";
  const POSITION_EARNINGS = "NOT ACTIVE";

  const terminal = `99.5M PRIORITY VALIDATION — AUTHORIZATION SUBMISSION MONITOR
RELEASE VALIDATION CONSOLE INITIALIZED
------------------------------------------------------------

FILE SUMMARY
- File Label               : ${FILE_LABEL}
- Indexed Amount           : ${FILE_AMOUNT}
- Reference                : 99.5M-PRIORITY-MINT

SYSTEM STATUS
- Network                  : BNB Chain
- Validation Layer         : Release Authorization Review
- Validation Mode          : Sender Reference Submission
- Execution State          : ON HOLD
- Release Stage            : Pending Sender Authorization
- Approval Path            : Authorization / Approval / Release Code Input

CURRENT RESULT
- Authorization State      : NOT VERIFIED
- Submission Requirement   : REQUIRED
- Executable Record        : NOT AVAILABLE
- Review State             : PENDING VALID AUTHORIZATION
- Final Action             : WAITING FOR SENDER INPUT

NOTICE
- Sender must provide the required authorization reference
- Approval / release credentials are still pending submission
- Execution remains on hold until reviewable authorization data is received
- No executable authorization record is currently available

SYSTEM STATUS : ${SYSTEM_STATUS}
COMPLIANCE    : ${SYSTEM_NAME}
TIMESTAMP     : ${timestamp}
REFERENCE     : 99.5M-PRIORITY-MINT
------------------------------------------------------------`;

  const colors = {
    bg: "#0b0e11",
    panel: "#12161c",
    panel2: "#161b22",
    border: "rgba(255,255,255,0.08)",
    text: "#eaecef",
    muted: "#9aa4af",
    yellow: "#f0b90b",
    green: "#0ecb81",
    cyan: "#00ffc3",
    orange: "#f59e0b",
    red: "#ff5b5b",
  };

  const cardStyle: CSSProperties = {
    background: `linear-gradient(180deg, ${colors.panel}, ${colors.panel2})`,
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
    border: active ? "none" : "1px solid transparent",
  });

  const badgeStyle = (
    bg: string,
    color: string = "#111"
  ): CSSProperties => ({
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

  if (isCheckingAccess) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: colors.bg,
          color: colors.text,
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            background: `linear-gradient(180deg, ${colors.panel}, ${colors.panel2})`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontWeight: 700,
          }}
        >
          Checking admin access...
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

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
            width: 260,
            padding: 22,
            borderRight: `1px solid ${colors.border}`,
            background:
              "linear-gradient(180deg, rgba(240,185,11,0.06) 0%, rgba(18,22,28,1) 18%, rgba(11,14,17,1) 100%)",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: colors.yellow,
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
            <div style={sidebarItem()}>🧾 Release Stage</div>
            <div style={sidebarItem()}>⛓️ Validation</div>
            <div style={sidebarItem()}>🔒 Security</div>
          </div>

          <div
            style={{
              marginTop: 28,
              padding: 16,
              borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ fontSize: 11, color: colors.muted, marginBottom: 8 }}>
              ENVIRONMENT
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Network: <b>BNB Chain</b>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Mode: <b>Release Validation</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Engine: <b>Authorization Review Console</b>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: 28 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>
                Welcome, Admin
              </div>
              <div style={{ marginTop: 10 }}>
                <span style={badgeStyle("rgba(245,158,11,0.16)", colors.orange)}>
                  ● AUTHORIZATION REQUIRED
                </span>
              </div>
            </div>

            <div
              style={{
                ...cardStyle,
                minWidth: 320,
                padding: 18,
                borderColor: "rgba(240,185,11,0.18)",
              }}
            >
              <div style={{ ...labelStyle, marginBottom: 8 }}>SYSTEM STATUS</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: colors.yellow }}>
                {SYSTEM_STATUS}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: colors.muted }}>
                Sender-side authorization data is required before release
                validation can proceed.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0,1fr))",
              gap: 16,
              marginBottom: 22,
            }}
          >
            <div style={metricCard}>
              <div style={labelStyle}>Indexed Amount</div>
              <div style={{ marginTop: 8, fontSize: 24, fontWeight: 900 }}>
                99.5M
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
                EUR Liquidity File
              </div>
            </div>

            <div style={metricCard}>
              <div style={labelStyle}>Release Stage</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 900 }}>
                Pending Input
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
                Sender Authorization
              </div>
            </div>

            <div style={metricCard}>
              <div style={labelStyle}>Reference Type</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 900 }}>
                Authorization
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
                Approval / Release Code
              </div>
            </div>

            <div style={metricCard}>
              <div style={labelStyle}>Execution State</div>
              <div style={{ marginTop: 8 }}>
                <span style={badgeStyle("rgba(245,158,11,0.18)", colors.orange)}>
                  ● {STATUS_BADGE}
                </span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: colors.muted }}>
                On Hold
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            <div style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 14,
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: colors.muted }}>ACTIVE FILE</div>
                  <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4 }}>
                    99.5M-PRIORITY-MINT
                  </div>
                </div>

                <span style={badgeStyle("rgba(245,158,11,0.18)", colors.orange)}>
                  ● ON HOLD
                </span>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <div style={labelStyle}>File</div>
                  <div style={{ marginTop: 5, fontWeight: 700 }}>{FILE_LABEL}</div>
                </div>

                <div>
                  <div style={labelStyle}>Indexed Amount</div>
                  <div style={{ marginTop: 5, fontWeight: 700 }}>{FILE_AMOUNT}</div>
                </div>

                <div>
                  <div style={labelStyle}>Stage</div>
                  <div
                    style={{
                      marginTop: 5,
                      fontWeight: 800,
                      color: "#6ea8fe",
                    }}
                  >
                    {STAGE_LABEL}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Release State</div>
                  <div style={{ marginTop: 5, color: colors.text }}>
                    {AUTHORIZATION_LINE}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div style={metricCard}>
                  <div style={labelStyle}>Authorization State</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>REQUIRED</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Execution</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>ON HOLD</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Validation Mode</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>
                    REFERENCE SUBMISSION
                  </div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Review Engine</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>ACTIVE</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  borderRadius: 16,
                  padding: 18,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    Submission Snapshot
                  </div>
                  <span style={badgeStyle("rgba(240,185,11,0.14)", colors.yellow)}>
                    {POSITION_PAIR}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div style={metricCard}>
                    <div style={labelStyle}>Current State</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_STATE}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Execution Output</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_EARNINGS}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, fontSize: 12, color: colors.muted }}>
                Timestamp: {timestamp}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 8 }}>
                VALIDATION NOTICE
              </div>

              <div
                style={{
                  marginBottom: 16,
                  border: "2px solid rgba(245,158,11,0.28)",
                  background:
                    "linear-gradient(180deg, rgba(245,158,11,0.10) 0%, rgba(120,70,0,0.08) 100%)",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 0 25px rgba(245,158,11,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#ffd08a",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontWeight: 700,
                  }}
                >
                  AUTHORIZATION REFERENCE REQUIRED
                </div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: colors.yellow,
                    marginBottom: 8,
                  }}
                >
                  PENDING AUTHORIZATION SUBMISSION
                </div>

                <div
                  style={{
                    color: "#ffe3bf",
                    lineHeight: 1.7,
                    fontSize: 14,
                  }}
                >
                  This file has reached the release review stage. Execution cannot
                  proceed until the sender provides the required authorization
                  reference and supporting release credentials for validation.
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "Consolas, Monaco, monospace",
                    color: "#ffd8a6",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  <div>STATUS          : PENDING AUTHORIZATION</div>
                  <div>RELEASE STAGE   : AWAITING SENDER INPUT</div>
                  <div>VALIDATION MODE : REFERENCE SUBMISSION REQUIRED</div>
                  <div>EXECUTION       : ON HOLD</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                {NOTICE_TITLE}
              </div>

              <div
                style={{
                  background: "rgba(240,185,11,0.06)",
                  border: "1px solid rgba(240,185,11,0.18)",
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <div style={{ color: colors.text, lineHeight: 1.8 }}>
                  {NOTICE_BODY}
                </div>
              </div>

              <div
                style={{
                  marginBottom: 16,
                  borderRadius: 16,
                  padding: 16,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ fontSize: 12, color: colors.muted, marginBottom: 10 }}>
                  AUTHORIZATION SUBMISSION
                </div>

                <div style={{ marginBottom: 10, color: colors.text, lineHeight: 1.7 }}>
                  Enter the sender-provided authorization / approval / release code
                  for validation review.
                </div>

                <input
  type="text"
  value={submittedCode}
  onChange={(e) => {
    const value = e.target.value;
    setSubmittedCode(value);

    // 👉 RESET kapag binura ang input
    if (value.trim() === "") {
      setHasValidated(false);
      setValidationStatus("idle");
      setValidationMessage("");
    }
  }}
                  placeholder="Enter authorization / approval / release code"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1px solid ${colors.border}`,
                    background: "#0a1016",
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    marginBottom: 12,
                  }}
                />

                <button
                  onClick={handleValidateCode}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "none",
                    background: "rgba(0,255,195,0.14)",
                    color: "#8fffe5",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Validate Code
                </button>

                <div
                  style={{
                    marginTop: 14,
                    borderRadius: 14,
                    padding: 14,
                    minHeight: 170,
                    background:
                      validationStatus === "verified"
                        ? "rgba(14,203,129,0.08)"
                        : validationStatus === "processing"
                        ? "rgba(59,130,246,0.10)"
                        : "rgba(245,158,11,0.08)",
                    border:
                      validationStatus === "verified"
                        ? "1px solid rgba(14,203,129,0.22)"
                        : validationStatus === "processing"
                        ? "1px solid rgba(59,130,246,0.22)"
                        : "1px solid rgba(245,158,11,0.18)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color:
                        validationStatus === "verified"
                          ? "#86efac"
                          : validationStatus === "processing"
                          ? "#93c5fd"
                          : "#ffd08a",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 0.7,
                      fontWeight: 700,
                    }}
                  >
                    Validation Result
                  </div>

                  {hasValidated ? (
                    <>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color:
                            validationStatus === "verified"
                              ? colors.green
                              : validationStatus === "processing"
                              ? "#60a5fa"
                              : colors.orange,
                          marginBottom: 8,
                        }}
                      >
                        {validationStatus === "processing"
                          ? "PROCESSING..."
                          : validationStatus === "on_hold"
                          ? "ON HOLD"
                          : validationStatus === "verified"
                          ? "VERIFIED"
                          : "NOT VERIFIED"}
                      </div>

                      <div
                        style={{
                          color:
                            validationStatus === "verified"
                              ? "#d1fae5"
                              : validationStatus === "processing"
                              ? "#dbeafe"
                              : "#ffe3bf",
                          lineHeight: 1.7,
                          fontSize: 14,
                        }}
                      >
                        {validationMessage}
                      </div>

                      <div
                        style={{
                          marginTop: 10,
                          fontFamily: "Consolas, Monaco, monospace",
                          color:
                            validationStatus === "verified"
                              ? "#bbf7d0"
                              : validationStatus === "processing"
                              ? "#bfdbfe"
                              : "#ffd8a6",
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        <div>
                          STATUS          :{" "}
                          {validationStatus === "processing"
                            ? "PROCESSING"
                            : validationStatus === "on_hold"
                            ? "ON HOLD"
                            : validationStatus === "verified"
                            ? "VERIFIED"
                            : "NOT VERIFIED"}
                        </div>
                        <div>
                          EXECUTION       :{" "}
                          {validationStatus === "processing"
                            ? "VALIDATION RUNNING"
                            : validationStatus === "on_hold"
                            ? "ON HOLD"
                            : validationStatus === "verified"
                            ? "READY FOR REVIEW"
                            : "ON HOLD"}
                        </div>
                        <div>
                          REVIEW STATE    :{" "}
                          {validationStatus === "processing"
                            ? "AUTHORIZATION CHECK IN PROGRESS"
                            : validationStatus === "on_hold"
                            ? "PENDING AUTHORIZATION REVIEW"
                            : validationStatus === "verified"
                            ? "AUTHORIZATION ACCEPTED"
                            : "PENDING VALID AUTHORIZATION"}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        color: "#9aa4af",
                        fontSize: 14,
                        lineHeight: 1.7,
                        paddingTop: 10,
                      }}
                    >
                      &nbsp;
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div style={metricCard}>
                  <div style={labelStyle}>Reason</div>
                  <div style={{ marginTop: 6, fontWeight: 700 }}>{REASON}</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Required From Sender</div>
                  <div style={{ marginTop: 6, lineHeight: 1.7 }}>{REQUIRED_ACTION}</div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div style={metricCard}>
                    <div style={labelStyle}>System</div>
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{SYSTEM_NAME}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Timestamp</div>
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{timestamp}</div>
                  </div>
                </div>
              </div>

              <details open style={{ marginTop: 10 }}>
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 800,
                    color: colors.yellow,
                    marginBottom: 12,
                  }}
                >
                  ▼ View Full Technical Log
                </summary>

                <pre
                  style={{
                    marginTop: 10,
                    background: "#050607",
                    color: "#c8ffcf",
                    padding: 18,
                    borderRadius: 16,
                    overflow: "auto",
                    border: "1px solid rgba(240,185,11,0.12)",
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
        </main>
      </div>
    </div>
  );
}