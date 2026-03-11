// app/reports/[ref]/page.tsx

type Props = {
  params: { ref: string } | Promise<{ ref: string }>;
};

export default async function ReportPage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const reference = resolved.ref;

  // === INPUTS (replace anytime per file) ===
  const SORT_CODE = "026-009-593";
  const FED_AUTH = "FED-TXN-8829-9910-AUTH-SYST-21";

  // === DASHBOARD TEXT ===
  const noticeTitle = "VALIDATION NOTICE";
  const noticeHeadline = "Settlement Reference Structure Review — Action Required";
  const noticeBody =
    "The submitted settlement identifiers have undergone structural validation screening. " +
    "During automated compliance review, inconsistencies were detected.";

  const reason = "Unverifiable / non-standard settlement identifiers";
  const requiredAction =
    "Provide formal interbank confirmation or official bank-issued settlement documentation confirming legitimacy of routing + authorization references.";
  const system = "CryptoHost Secure Validation";
  const timestamp = "2026-02-11 (UTC+8)";

  // Terminal log (right side, expandable)
  const terminal = `VALIDATION NOTICE
SETTLEMENT REFERENCE STRUCTURE REVIEW — ACTION REQUIRED
-------------------------------------------------------

SUBMITTED IDENTIFIERS (SENDER-SUBMITTED / UNVERIFIED)
- SORT CODE                    : ${SORT_CODE}
- FED / SETTLEMENT AUTH         : ${FED_AUTH}

VALIDATION FINDINGS
1) SORT CODE REVIEW
   - Format does not align with recognized clearing reference structures
   - Structure appears inconsistent with declared sending bank routing standards

2) FED / SETTLEMENT AUTHORIZATION REVIEW
   - Reference does not match recognized interbank settlement trace formatting
   - "AUTH-SYST" labeling is not part of standard clearing trace syntax

PROCESSING RISK ADVISORY
- Identifiers cannot be programmatically validated
- Reference may fail compliance screening
- Transaction processing may be delayed or blocked
- Liquidity activation cannot proceed under current reference structure

REQUIRED ACTION
- Provide formal interbank confirmation or official bank-issued settlement documentation
  confirming the legitimacy of the routing and authorization references

SYSTEM STATUS : PENDING REFERENCE VALIDATION
ENGINE        : CRYPTOHOST SECURE VALIDATION
TIMESTAMP     : ${timestamp}
`;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0b1220",
        color: "#e5e7eb",
        fontFamily: "system-ui, Arial",
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: 260,
          padding: 24,
          background: "linear-gradient(180deg,#0b1630,#071225)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>CryptoHost</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Secure Client Portal</div>
        </div>

        <nav style={{ display: "grid", gap: 14, fontSize: 16 }}>
          <div>📊 Dashboard</div>
          <div>📁 My Files</div>
          <div>💧 Liquidity</div>
          <div>⛓️ Blockchain</div>
          <div>🔒 Security</div>
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main style={{ flex: 1, padding: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
          Welcome, Client
        </div>

        <div style={{ marginBottom: 18 }}>
          Status: <b style={{ color: "#22c55e" }}>System Online</b>
        </div>

        {/* ACTIVE FILE + NOTICE */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Active File */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
              Active File
            </div>

            <div style={{ fontSize: 18, lineHeight: 1.6 }}>
              <div>
                Reference: <b>{reference}</b>
              </div>
              <div>
                Stage:{" "}
                <b style={{ color: "#60a5fa" }}>
                  REFERENCE VALIDATION — ACTION REQUIRED
                </b>
              </div>
              <div>
                Liquidity: <b style={{ color: "#f59e0b" }}>Activation Blocked</b>
              </div>
            </div>
          </div>

          {/* NOTICE CARD + COLLAPSIBLE LOG */}
          <div style={{ flex: 1.15 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 18,
                boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#f59e0b",
                    display: "inline-block",
                  }}
                />
                <div style={{ fontSize: 12, opacity: 0.85, letterSpacing: 0.6 }}>
                  {noticeTitle}
                </div>
              </div>

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginTop: 10,
                  marginBottom: 8,
                }}
              >
                {noticeHeadline}
              </div>

              <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.55 }}>
                {noticeBody}
              </div>

              <div
                style={{
                  marginTop: 14,
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                <div>
                  <b>Reason:</b> {reason}
                </div>
                <div>
                  <b>Required action:</b> {requiredAction}
                </div>
                <div>
                  <b>System:</b> {system}
                </div>
                <div>
                  <b>Timestamp:</b> {timestamp}
                </div>
              </div>

              <details style={{ marginTop: 14 }}>
                <summary
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    fontSize: 13,
                    opacity: 0.9,
                    marginBottom: 10,
                  }}
                >
                  ▼ View Full Technical Log
                </summary>

                <div
                  style={{
                    background: "#000",
                    color: "#c8ffcf",
                    padding: 16,
                    borderRadius: 12,
                    border: "1px solid rgba(0,255,128,0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                    maxHeight: 420,
                    overflow: "auto",
                  }}
                >
                  {terminal}
                </div>
              </details>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
