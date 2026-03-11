// app/reports/[ref]/page.tsx

type Props = {
  params: Promise<{ ref: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { ref: reference } = await params;

  const TIMESTAMP = "2026-02-25 08:12 (UTC+8)";

  const STAGE_LABEL = "LIQUIDITY ROUTING REVIEW — PRIORITY RESTRICTED";
  const STATUS_BADGE = "PRIORITY EXECUTION NOT AUTHORIZED";
  const LIQUIDITY_LINE =
    "Liquidity: Structure Initialized — Priority Routing Restricted (Fee Threshold Unmet)";

  const NOTICE_TITLE = "Priority Execution Review — 99.5M EURC";
  const NOTICE_BODY =
    "The liquidity structure and allocation framework have been successfully configured for the EURC/WBNB V3 pool. " +
    "During execution review, the submitted processing fee was validated against the required priority routing threshold. " +
    "The current fee allocation does not qualify for escalated liquidity execution under the routing protocol.";

  const REASON =
    "Fee allocation below required threshold for priority routing authorization.";

  const REQUIRED_ACTION =
    "Submit required priority fee top-up to activate escalated liquidity routing and execution channel.";

  const SYSTEM_NAME = "Binance Exchange Validation";

  const PAIR = "EURC / WBNB";
  const CURRENT_PRICE = "0.05845 WBNB"; // 1 EURC = 0.05845 WBNB
  const BAND_MIN = "0.04000 WBNB";
  const BAND_MAX = "0.09000 WBNB";

  const terminal = `VALIDATION NOTICE
LIQUIDITY ROUTING REVIEW — 99.5M EURC
------------------------------------------------------------

CONFIGURATION SUMMARY
- Base Amount (Reference) : 99,500,000.00 EURC
- Allocation Structure    : 32.5% / 7.5% / 5% / 55%
- Network                 : BNB Chain
- Pool Pairing            : ${PAIR}
- Fee Tier                : V3 (Configured)
- Price Band (Configured) : ${BAND_MIN} – ${BAND_MAX}
- Current Market Price    : 1 EURC = ${CURRENT_PRICE}

STATUS
- Liquidity structure initialized
- Price band configured and saved
- Priority routing: RESTRICTED
- Escalated execution: NOT AUTHORIZED
- Fee validation: BELOW REQUIRED THRESHOLD
- STATUS: Priority Execution Not Authorized — Fee Threshold Unmet

NEXT STEP (REQUIRED)
- Submit priority fee top-up
- Activate escalated liquidity routing
- Generate execution reference
- Enable market routing

SYSTEM STATUS : PRIORITY EXECUTION NOT AUTHORIZED — FEE THRESHOLD UNMET
COMPLIANCE    : ${SYSTEM_NAME}
TIMESTAMP     : ${TIMESTAMP}
REFERENCE     : ${reference}
------------------------------------------------------------`;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0b1220",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: 270,
          padding: 26,
          background: "linear-gradient(180deg,#0b1630,#071225)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 24, fontWeight: 900 }}>CryptoHost</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Secure Client Portal</div>
        </div>

        <nav style={{ display: "grid", gap: 14 }}>
          <div>📊 Dashboard</div>
          <div>📁 My Files</div>
          <div>💧 Liquidity</div>
          <div>⛓️ Blockchain</div>
          <div>🔒 Security</div>
        </nav>

        <div style={{ marginTop: 22, fontSize: 12, opacity: 0.8 }}>
          <div style={{ marginBottom: 6 }}>
            <b>Environment</b>
          </div>
          <div>Network: BNB Chain</div>
          <div>Mode: Verification Console</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: 30 }}>
        <div style={{ fontSize: 26, fontWeight: 800 }}>Welcome, Client</div>

        <div style={{ marginBottom: 20 }}>
          Status: <b style={{ color: "#22c55e" }}>System Online</b>
        </div>

        <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
          {/* ACTIVE FILE */}
          <div style={{ flex: 1 }}>
            <h3 style={{ marginTop: 0 }}>Active File</h3>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div>
                Reference: <b>{reference}</b>
              </div>

              <div style={{ marginTop: 10 }}>
                Stage: <b style={{ color: "#60a5fa" }}>{STAGE_LABEL}</b>
              </div>

              <div style={{ marginTop: 6 }}>
                Status: <b style={{ color: "#ef4444" }}>{STATUS_BADGE}</b>
              </div>

              <div style={{ marginTop: 8, opacity: 0.9 }}>{LIQUIDITY_LINE}</div>

              <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  Pair: <b style={{ opacity: 1 }}>{PAIR}</b>
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  Current Price: <b style={{ opacity: 1 }}>1 EURC = {CURRENT_PRICE}</b>
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  Price Band: <b style={{ opacity: 1 }}>{BAND_MIN}</b> –{" "}
                  <b style={{ opacity: 1 }}>{BAND_MAX}</b>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
                Timestamp: {TIMESTAMP}
              </div>
            </div>
          </div>

          {/* NOTICE CARD */}
          <div style={{ flex: 1.3 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <b>VALIDATION NOTICE</b>
              </div>

              <h2 style={{ marginTop: 6 }}>{NOTICE_TITLE}</h2>

              <p style={{ lineHeight: 1.6, opacity: 0.95 }}>{NOTICE_BODY}</p>

              <div
                style={{
                  marginTop: 15,
                  background: "rgba(0,0,0,0.2)",
                  padding: 15,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <b>Reason:</b> {REASON}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <b>Next Step:</b> {REQUIRED_ACTION}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <b>Fee Status:</b>{" "}
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>
                    Priority Execution Not Authorized — Fee Threshold Unmet
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <b>System:</b> {SYSTEM_NAME}
                </div>
                <div>
                  <b>Timestamp:</b> {TIMESTAMP}
                </div>
              </div>

              <details style={{ marginTop: 15 }}>
                <summary style={{ cursor: "pointer" }}>▼ View Full Technical Log</summary>

                <pre
                  style={{
                    marginTop: 10,
                    background: "#000",
                    color: "#c8ffcf",
                    padding: 15,
                    borderRadius: 12,
                    overflow: "auto",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {terminal}
                </pre>
              </details>

              <div style={{ marginTop: 14, fontSize: 12, opacity: 0.75 }}>
                Powered by CryptoHost Secure Automation
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}