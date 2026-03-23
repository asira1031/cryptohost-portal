import type { CSSProperties } from "react";

export default function PriorityMintPage() {
  const TIMESTAMP =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(new Date())
      .replace(",", "") + " (UTC+8)";

  const FILE_LABEL = "99.5M LIQUIDITY FILE";
  const FILE_AMOUNT = "99,500,000.00 EUR";

  const STAGE_LABEL = "LIQUIDITY PRIORITY MINT — PRODUCTION PHASE";
  const STATUS_BADGE = "BAND CONFIRMATION PENDING";
  const SYSTEM_STATUS = "PRODUCTION MINTING / BAND VALIDATION";

  const MINT_PROGRESS = 56;
  const ACTIVE_TRANCHE = "5,000,000 EURC";
  const ACTIVATED_AMOUNT = "2,800,000 EURC";

  const LIQUIDITY_LINE =
    "The indexed 99.5M position remains in production mint flow while the active 5,000,000 EURC tranche has reached 56% completion and continues under full band confirmation monitoring for conversion routing.";

  const NOTICE_TITLE = "5M Production Mint Update — 56% Complete";
  const NOTICE_BODY =
    "Production minting remains active and the current 5,000,000 EURC liquidity tranche has reached 56% completion. Live liquidity positioning is active across EURC-BNB, BNB-EURC, and USDT-EURC channels. The system is now awaiting full band confirmation before releasing the active tranche for final EURC-to-USDT conversion routing. All liquidity components remain visible, paired, and operating within production parameters.";

  const REASON =
    "Production minting is active at 56% completion; the active 5,000,000 EURC tranche remains under full band confirmation before conversion release.";

  const REQUIRED_ACTION =
    "No manual intervention is required at this stage. The system is monitoring band completion, live LP positioning, routing stability, and mint continuity. Upon confirmation of the full operating band, the active tranche will be released for EURC-to-USDT conversion and settlement continuation.";

  const SYSTEM_NAME = "Blockchain Liquidity Engine (CLAMM Routing Core)";

  const BAND_CURRENT = "23,083.2";
  const BAND_MIN = "8.55";
  const BAND_MAX = "34.21";

  const POSITION_PAIR = "EURC / BNB";
  const POSITION_MIN = "0.0584";
  const POSITION_MAX = "0.0590";
  const POSITION_LIQUIDITY = "99.5M INDEXED";
  const POSITION_STATE = "Production Mint / Awaiting Full Band Confirmation";
  const POSITION_EARNINGS = "NOT ACTIVE";
  const POSITION_APR = "2.60%";

  const FEE_STATE = "PRODUCTION MINT";
  const PAYOUT_STATE = "LOCKED UNTIL BAND CONFIRMATION";
  const GAS_STATE = "IN PROGRESS";
  const ROUTING_STATE = "ACTIVE";

  const USDT_EURC_LIQUIDITY = "$1.88";
  const USDT_EURC_USDT_SIDE = "1.889";
  const USDT_EURC_EURC_SIDE = "1205000000";
  const USDT_EURC_APR = "1,545.91%";
  const USDT_EURC_POOL_SHARE = "99.9992407%";

  const EURC_BNB_POOL_ID = "#5239977";
  const EURC_BNB_FEE = "0.01%";
  const EURC_BNB_RANGE = "Min 16.9363 / Max 17.1065";

  const BNB_EURC_POOL_ID = "#6547046";
  const BNB_EURC_FEE = "1%";
  const BNB_EURC_RANGE = "Min 0 / Max ∞";

  const EXPLORER_URL = "#";

  const terminal = `99.5M LIQUIDITY PRIORITY MINT — PRODUCTION MONITOR
SMART CONTRACT ROUTING INITIALIZED
------------------------------------------------------------

FILE SUMMARY
- File Label               : ${FILE_LABEL}
- Indexed Amount           : ${FILE_AMOUNT}
- Reference                : 99.5M-PRIORITY-MINT

MINT ENGINE STATUS
- Network                  : BNB Chain
- Execution Layer          : Smart Mint Engine (CLAMM)
- Routing Engine           : ${ROUTING_STATE}
- Mint State               : PRODUCTION
- Gas Optimization         : ${GAS_STATE}
- Band Confirmation        : PENDING
- Conversion Path          : EURC -> USDT

LIVE MINT ACTIVITY
- Active Mint Signal       : +${ACTIVE_TRANCHE}
- Activated Amount         : ${ACTIVATED_AMOUNT}
- Progress                 : ${MINT_PROGRESS}%
- Current Phase            : Full band confirmation monitoring
- Release Condition        : Full configured band must be confirmed
- Settlement Route         : EURC conversion toward USDT enablement

LIVE LP SNAPSHOTS
- EURC-BNB LP             : ${EURC_BNB_POOL_ID} / Fee ${EURC_BNB_FEE} / ACTIVE
- Range                   : ${EURC_BNB_RANGE}
- BNB-EURC LP             : ${BNB_EURC_POOL_ID} / Fee ${BNB_EURC_FEE} / ACTIVE
- Range                   : ${BNB_EURC_RANGE}
- USDT-EURC LP Liquidity  : ${USDT_EURC_LIQUIDITY}
- USDT Side               : ${USDT_EURC_USDT_SIDE}
- EURC Side               : ${USDT_EURC_EURC_SIDE}
- LP Reward APR           : ${USDT_EURC_APR}
- Pool Share              : ${USDT_EURC_POOL_SHARE}

POSITION SUMMARY
- Asset Pair               : ${POSITION_PAIR}
- Position Range           : ${POSITION_MIN} – ${POSITION_MAX}
- Liquidity Allocation     : ${POSITION_LIQUIDITY}
- Current Tranche          : ${ACTIVE_TRANCHE}
- Earnings State           : ${POSITION_EARNINGS} (Pre-Conversion)

PRICE BAND (CONFIGURED)
- Price Band               : ${BAND_MIN} – ${BAND_MAX}
- Current Price            : ${BAND_CURRENT}

NEXT STEP
- Confirm full operating band
- Release active 5,000,000 EURC tranche
- Route released liquidity for EURC conversion
- Enable EURC-to-USDT settlement path
- Continue production mint monitoring

SYSTEM STATUS : MINTING IN PRODUCTION — AWAITING FULL BAND CONFIRMATION
COMPLIANCE    : ${SYSTEM_NAME}
TIMESTAMP     : ${TIMESTAMP}
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
    border: active ? "none" : `1px solid transparent`,
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

  const buttonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    background: colors.yellow,
    color: "#111",
    borderRadius: 10,
    fontWeight: 800,
    textDecoration: "none",
    border: "none",
  };

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
            <div style={sidebarItem()}>💧 Liquidity</div>
            <div style={sidebarItem()}>⛓️ Blockchain</div>
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
              Mode: <b>Verification Console</b>
            </div>
            <div style={{ fontSize: 13 }}>
              Engine: <b>CLAMM Routing Core</b>
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
                Welcome, Client
              </div>
              <div style={{ marginTop: 10 }}>
                <span style={badgeStyle("rgba(14,203,129,0.16)", colors.green)}>
                  ● SYSTEM ONLINE
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
                Production mint monitoring is active while the system waits for full
                band confirmation before releasing the convertible liquidity tranche.
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
              <div style={labelStyle}>Price Band</div>
              <div style={{ marginTop: 8, fontSize: 24, fontWeight: 900 }}>
                {BAND_MIN} – {BAND_MAX}
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
                Configured Range
              </div>
            </div>

            <div style={metricCard}>
              <div style={labelStyle}>Current Price</div>
              <div style={{ marginTop: 8, fontSize: 24, fontWeight: 900 }}>
                {BAND_CURRENT}
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
                Live Market Reference
              </div>
            </div>

            <div style={metricCard}>
              <div style={labelStyle}>Execution State</div>
              <div style={{ marginTop: 8 }}>
                <span style={badgeStyle("rgba(240,185,11,0.18)", colors.yellow)}>
                  ● {STATUS_BADGE}
                </span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: colors.muted }}>
                Production Queue Active
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

                <span style={badgeStyle("rgba(240,185,11,0.18)", colors.yellow)}>
                  ● PRODUCTION
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
                  <div style={labelStyle}>Liquidity State</div>
                  <div style={{ marginTop: 5, color: colors.text }}>
                    {LIQUIDITY_LINE}
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
                  <div style={labelStyle}>Fee Status</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>{FEE_STATE}</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Payout Trigger</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>{PAYOUT_STATE}</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Gas Optimization</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>{GAS_STATE}</div>
                </div>

                <div style={metricCard}>
                  <div style={labelStyle}>Routing Engine</div>
                  <div style={{ marginTop: 6, fontWeight: 800 }}>{ROUTING_STATE}</div>
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
                  <div style={{ fontSize: 18, fontWeight: 800 }}>Position Snapshot</div>
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
                    <div style={labelStyle}>Price Range</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_MIN} – {POSITION_MAX}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Liquidity</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_LIQUIDITY}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>State</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_STATE}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Earnings / APR</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_EARNINGS} / {POSITION_APR}
                    </div>
                  </div>
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
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
                  Live LP Status
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  <div style={metricCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={labelStyle}>EURC-BNB LP</div>
                        <div style={{ marginTop: 6, fontWeight: 800 }}>
                          {EURC_BNB_POOL_ID} • Fee {EURC_BNB_FEE}
                        </div>
                        <div style={{ marginTop: 4, color: colors.muted, fontSize: 13 }}>
                          {EURC_BNB_RANGE}
                        </div>
                      </div>
                      <span style={badgeStyle("rgba(14,203,129,0.16)", colors.green)}>
                        Active
                      </span>
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <div style={labelStyle}>BNB-EURC LP</div>
                        <div style={{ marginTop: 6, fontWeight: 800 }}>
                          {BNB_EURC_POOL_ID} • Fee {BNB_EURC_FEE}
                        </div>
                        <div style={{ marginTop: 4, color: colors.muted, fontSize: 13 }}>
                          {BNB_EURC_RANGE}
                        </div>
                      </div>
                      <span style={badgeStyle("rgba(14,203,129,0.16)", colors.green)}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, fontSize: 12, color: colors.muted }}>
                Timestamp: {TIMESTAMP}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 13, color: colors.muted, marginBottom: 8 }}>
                VALIDATION NOTICE
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
                <div style={{ color: colors.text, lineHeight: 1.8 }}>{NOTICE_BODY}</div>
              </div>

              <div
                style={{
                  marginBottom: 16,
                  border: "2px solid rgba(0,255,180,0.28)",
                  background:
                    "linear-gradient(180deg, rgba(0,255,180,0.12) 0%, rgba(0,180,140,0.08) 100%)",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 0 24px rgba(0,255,180,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#66f3d7",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                    fontWeight: 700,
                  }}
                >
                  Live Mint Activity
                </div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#00ffc3",
                    marginBottom: 8,
                  }}
                >
                  +{ACTIVE_TRANCHE}
                </div>

                <div style={{ marginTop: 6, color: "#d7fffa", lineHeight: 1.7 }}>
                  Minting is in production. The active 5,000,000 EURC tranche has
                  reached 56% completion and remains under live band validation for
                  final liquidity release and conversion routing.
                </div>

                <div
                  style={{
                    marginTop: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.10)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${MINT_PROGRESS}%`,
                      height: "100%",
                      background: "linear-gradient(90deg,#00ffd0,#28c6ff)",
                    }}
                  />
                </div>

                <div style={{ fontSize: 12, marginTop: 8, color: "#8bded0" }}>
                  Mint Progress: {MINT_PROGRESS}% — Activated {ACTIVATED_AMOUNT} / {ACTIVE_TRANCHE}
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
                  USDT–EURC LP LIVE SNAPSHOT
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={metricCard}>
                    <div style={labelStyle}>Liquidity</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>{USDT_EURC_LIQUIDITY}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Pool Share</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>{USDT_EURC_POOL_SHARE}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>USDT Side</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>{USDT_EURC_USDT_SIDE}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>EURC Side</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>{USDT_EURC_EURC_SIDE}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>LP Reward APR</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>{USDT_EURC_APR}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Tranche Status</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {MINT_PROGRESS}% Complete
                    </div>
                  </div>
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
                  <div style={labelStyle}>Next Step</div>
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

                    <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                      <a href={EXPLORER_URL} style={buttonStyle}>
                        View on Explorer
                      </a>
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Timestamp</div>
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{TIMESTAMP}</div>
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