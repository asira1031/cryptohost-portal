"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export default function PriorityMintPage() {
  const [timestamp, setTimestamp] = useState("");
  const [confirmIndex, setConfirmIndex] = useState(0);
  const [lineTick, setLineTick] = useState(0);

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

  const confirmationLines = [
    "FINAL CONFIRMATION PROCESS RUNNING",
    "MINT CONFIRMATION CHECK ACTIVE",
    "LIQUIDITY VALIDATION IN PROGRESS",
    "ROUTING CONFIRMATION STILL PROCESSING",
    "SWAP ENABLEMENT AWAITING FINAL CONFIRMATION",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setConfirmIndex((prev) => (prev + 1) % confirmationLines.length);
    }, 1800);

    const lineInterval = setInterval(() => {
      setLineTick((prev) => (prev + 1) % 6);
    }, 250);

    return () => {
      clearInterval(messageInterval);
      clearInterval(lineInterval);
    };
  }, [confirmationLines.length]);

  const runningLine = "=".repeat(18 + lineTick * 4);

  const FILE_LABEL = "99.5M LIQUIDITY FILE";
  const FILE_AMOUNT = "99,500,000.00 EUR";

  const STAGE_LABEL = "LIQUIDITY PRIORITY MINT — MINT CONFIRMATION PHASE";
  const STATUS_BADGE = "MINT CONFIRMATION PENDING";
  const SYSTEM_STATUS = "ONLINE / MINT VALIDATION ACTIVE";

  const MINT_PROGRESS = 95;

  const ACTIVE_TRANCHE = "5,000,000 EURC";
  const ACTIVATED_AMOUNT = "4,750,000 EURC";

  const LIQUIDITY_LINE =
    "Liquidity routing remains online and validation is active. The current 5,000,000 EURC tranche is now under continuous confirmation processing, and swapping remains disabled until full mint confirmation is completed.";

  const NOTICE_TITLE = "Swap Status — Temporarily Restricted";
  const NOTICE_BODY =
    "Status: Online. Withdrawal-based swapping remains disabled until full mint confirmation is completed. Current liquidity is still under active validation, and partial withdrawal attempts may return insufficient status until the minting cycle is fully confirmed and released for executable swap routing.";

  const REASON =
    "The minting cycle has not yet reached full confirmation. As a result, executable swap routing remains restricted and withdrawal-triggered swaps may return insufficient status.";

  const REQUIRED_ACTION =
    "No swapping or withdrawal-based conversion should be attempted until the minting cycle is fully confirmed. Once full mint confirmation is achieved, executable swap routing will be enabled and validated liquidity may proceed to conversion.";

  const SYSTEM_NAME = "Blockchain Liquidity Engine (CLAMM Routing Core)";

  const BAND_CURRENT = "23,183.2";
  const BAND_MIN = "8.56";
  const BAND_MAX = "34.01";

  const POSITION_PAIR = "EURC / BNB";
  const POSITION_MIN = "0.057393075";
  const POSITION_MAX = "0.057509972";
  const POSITION_LIQUIDITY = "99.5M INDEXED";
  const POSITION_STATE = "Mint Validation Active / Swap Restricted";
  const POSITION_EARNINGS = "NOT ACTIVE";
  const POSITION_APR = "2.60%";

  const FEE_STATE = "MINT VALIDATION ACTIVE";
  const PAYOUT_STATE = "SWAP RESTRICTED";
  const GAS_STATE = "ONLINE";
  const ROUTING_STATE = "ACTIVE";

  const USDT_EURC_LIQUIDITY = "$1.88";
  const USDT_EURC_USDT_SIDE = "1.88923";
  const USDT_EURC_EURC_SIDE = "1205690000";
  const USDT_EURC_APR = "1,545.91%";
  const USDT_EURC_POOL_SHARE = "99.9992407%";

  const EURC_BNB_POOL_ID = "#5239977";
  const EURC_BNB_FEE = "0.01%";
  const EURC_BNB_RANGE = "Min 16.9363 / Max 17.1065 EURC = 1 BNB";

  const BNB_EURC_POOL_ID = "#6547046";
  const BNB_EURC_FEE = "1%";
  const BNB_EURC_RANGE = "Min 0 / Max ∞ BNB = 1 EURC";

  const APPROVAL_STATUS = "VALID";
  const APPROVAL_AMOUNT = "323,971,324.226828625927174825";
  const APPROVAL_ASSET = "EURC";
  const APPROVAL_TX =
    "0x1784381fb5fb75188a5884ae9817c053b315c2cb8eac8ae821d8ad144e18ea70";

  const EXPLORER_URL = `https://bscscan.com/tx/${APPROVAL_TX}`;

  const terminal = `99.5M LIQUIDITY PRIORITY MINT — MINT CONFIRMATION MONITOR
SMART CONTRACT ROUTING INITIALIZED
------------------------------------------------------------

FILE SUMMARY
- File Label               : ${FILE_LABEL}
- Indexed Amount           : ${FILE_AMOUNT}
- Reference                : 99.5M-PRIORITY-MINT

SYSTEM STATUS
- Network                  : BNB Chain
- Execution Layer          : Smart Mint Engine (CLAMM)
- Routing Engine           : ${ROUTING_STATE}
- Validation State         : ACTIVE
- Gas State                : ${GAS_STATE}
- Qualified Swap Minimum   : 1,000,000
- Conversion Path          : EURC -> USDT
- Swap Execution           : DISABLED (Pending Full Mint Confirmation)

LIVE CONFIRMATION ACTIVITY
- Confirmation State       : RUNNING
- Active Tranche           : ${ACTIVE_TRANCHE}
- Activated Amount         : ${ACTIVATED_AMOUNT}
- Progress                 : ${MINT_PROGRESS}%
- Current Phase            : Final confirmation processing
- Routing Monitor          : ACTIVE
- Continuity Requirement   : Full mint confirmation required before swap execution
- Settlement Route         : EURC conversion toward USDT enablement

APPROVAL SNAPSHOT
- Approval Status          : ${APPROVAL_STATUS}
- Approval Amount          : ${APPROVAL_AMOUNT} ${APPROVAL_ASSET}
- Approval TX              : ${APPROVAL_TX}

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
- Earnings State           : ${POSITION_EARNINGS}

PRICE BAND
- Price Band               : ${BAND_MIN} – ${BAND_MAX}
- Current Price            : ${BAND_CURRENT}

NOTICE
- Confirmation process is currently running at ${MINT_PROGRESS}%
- Withdrawal-based swapping is not enabled at this stage
- Final mint confirmation is still required before executable swap routing
- Routing remains online and under active validation

SYSTEM STATUS : ONLINE — SWAP RESTRICTED UNTIL FULL MINT CONFIRMATION
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
              Mode: <b>Mint Validation Console</b>
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
                Mint validation is active and liquidity routing remains online.
                Withdrawal-based swapping remains disabled until full mint
                confirmation is completed.
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
                <span style={badgeStyle("rgba(245,158,11,0.18)", colors.orange)}>
                  ● {STATUS_BADGE}
                </span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: colors.muted }}>
                Swap Restricted
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
                  ● RESTRICTED
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
                    <div style={labelStyle}>Min Price</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_MIN}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: colors.muted }}>
                      BNB = 1 EURC
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Max Price</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {POSITION_MAX}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: colors.muted }}>
                      BNB = 1 EURC
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
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
                Timestamp: {timestamp}
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
                <div style={{ color: colors.text, lineHeight: 1.8 }}>
                  {NOTICE_BODY}
                </div>
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
                  LIVE CONFIRMATION ACTIVITY
                </div>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: colors.cyan,
                    marginBottom: 8,
                  }}
                >
                  {confirmationLines[confirmIndex]}
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#9fffe0",
                    marginBottom: 10,
                    fontFamily: "Consolas, Monaco, monospace",
                  }}
                >
                  {runningLine}
                </div>

                <div
                  style={{
                    marginTop: 6,
                    color: "#d7fffa",
                    lineHeight: 1.8,
                    fontFamily: "Consolas, Monaco, monospace",
                    fontSize: 14,
                  }}
                >
                  <div>STATUS            : RUNNING</div>
                  <div>CONFIRMATION MODE : CONTINUOUS</div>
                  <div>MINT PROGRESS     : {MINT_PROGRESS}%</div>
                  <div>ROUTING STATE     : ACTIVE</div>
                  <div>SWAP STATUS       : RESTRICTED</div>
                </div>

                <div
                  style={{
                    marginTop: 12,
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

                <div
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    color: "#8bded0",
                    fontFamily: "Consolas, Monaco, monospace",
                  }}
                >
                  CONFIRMATION STATUS: {runningLine} RUNNING
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
                  APPROVAL / SWAP VALIDATION
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                  <div style={metricCard}>
                    <div style={labelStyle}>Approval Status</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>{APPROVAL_STATUS}</div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Valid Amount</div>
                    <div style={{ marginTop: 6, fontWeight: 800 }}>
                      {APPROVAL_AMOUNT} {APPROVAL_ASSET}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Transaction Hash</div>
                    <div
                      style={{
                        marginTop: 6,
                        fontWeight: 700,
                        wordBreak: "break-all",
                        fontSize: 13,
                      }}
                    >
                      {APPROVAL_TX}
                    </div>
                  </div>
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
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {USDT_EURC_LIQUIDITY}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Pool Share</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {USDT_EURC_POOL_SHARE}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>USDT Side</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {USDT_EURC_USDT_SIDE}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>EURC Side</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {USDT_EURC_EURC_SIDE}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>LP Reward APR</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {USDT_EURC_APR}
                    </div>
                  </div>

                  <div style={metricCard}>
                    <div style={labelStyle}>Activated Amount</div>
                    <div style={{ marginTop: 4, fontWeight: 800 }}>
                      {ACTIVATED_AMOUNT}
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
                      <a
                        href={EXPLORER_URL}
                        style={buttonStyle}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View on Explorer
                      </a>
                    </div>
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