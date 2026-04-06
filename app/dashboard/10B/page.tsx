"use client";

import Link from "next/link";

export default function Report10BPage() {
  const lastUpdated = "April 6, 2026 • 9:58 AM";
  const reference = "10B-RESTRICTED-REVIEW";
  const status = "RESTRICTED";
  const reviewFlag = "Threshold Review";
  const executionState = "Pending Bank Confirmation";
  const blockchainMinting = "No Confirmed Minting Activity";
  const routingStatus = "Restricted";
  const network = "Ethereum Mainnet";
  const engine = "Compliance Review Layer";
  const sourceBank = "BANK FRICK AG";
  const swift = "BFRILI22XXX";
  const amount = "€10,000,000,000.00";
  const converted = "10,800,000,000.00 USDT";
  const rate = "1.08";
  const fileLabel = "10B TRANSFER FILE";
  const liveState = "RESTRICTED REVIEW ACTIVE";

  const txRows = [
    {
      wallet: "0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd",
      allocation: "5,400,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0xD615eFA01dB5AA907012061F9A7983E8b980D9dC",
      allocation: "1,620,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0xD11aeAE4595ccfd66d6E069ADbFf99fe49C2862C",
      allocation: "1,620,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0x7BD1936308ba81a094AAfd3f969aC0449Dd82A7C",
      allocation: "270,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0xcF65383A96D5f25F90FCFB2A93760E7719FdAd07",
      allocation: "270,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0x49489c55431fAc64A46106214454Fb9A934B047A",
      allocation: "270,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0xe22C142aEe1fbb83DcBbE05dfD07E69D5B736538",
      allocation: "540,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
    {
      wallet: "0x12CA2B89429218Eb08f893C63e83263Cbc1296e7",
      allocation: "810,000,000.00 USDT",
      note: "Restricted / Bank clearing review",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #2a0d0d 0%, #120909 35%, #070707 100%)",
        color: "#f5f5f5",
        padding: "32px 18px 60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1380,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 22,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,70,70,0.12)",
                border: "1px solid rgba(255,90,90,0.28)",
                color: "#ff8f8f",
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.8,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff4d4f",
                  boxShadow: "0 0 12px rgba(255,77,79,0.9)",
                }}
              />
              {liveState}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 34,
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              10B Restricted Review Dashboard
            </h1>

            <div
              style={{
                marginTop: 10,
                color: "#c7c7c7",
                fontSize: 14,
              }}
            >
              Reference: <strong style={{ color: "#ffffff" }}>{reference}</strong>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "14px 16px",
              minWidth: 240,
            }}
          >
            <div style={{ fontSize: 12, color: "#aaaaaa", marginBottom: 4 }}>
              Last Updated
            </div>
            <div style={{ fontWeight: 700, color: "#ffffff", fontSize: 14 }}>
              {lastUpdated}
            </div>
          </div>
        </div>

        {/* Top cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 18,
          }}
        >
          {[
            { label: "STATUS", value: status, color: "#ff6b6b" },
            { label: "REVIEW FLAG", value: reviewFlag, color: "#ffb86b" },
            { label: "EXECUTION STATE", value: executionState, color: "#ffd36b" },
            { label: "BLOCKCHAIN MINTING", value: blockchainMinting, color: "#ff8f8f" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 22,
                padding: 18,
                boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
              }}
            >
              <div style={{ fontSize: 12, color: "#9e9e9e", marginBottom: 8 }}>
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: item.color,
                  lineHeight: 1.2,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 16,
          }}
        >
          {/* Left */}
          <div style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                background: "linear-gradient(180deg, rgba(255,70,70,0.08), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,100,100,0.18)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div style={{ fontSize: 12, color: "#aaaaaa", marginBottom: 10 }}>
                ACTIVE FILE
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                {fileLabel}
              </div>
              <div style={{ color: "#d1d1d1", fontSize: 14, marginBottom: 18 }}>
                Submitted transaction remains under restricted review pending threshold validation and bank-side confirmation.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: 12,
                }}
              >
                {[
                  { label: "Source Bank", value: sourceBank },
                  { label: "SWIFT", value: swift },
                  { label: "Network", value: network },
                  { label: "Engine", value: engine },
                  { label: "Amount", value: amount },
                  { label: "Converted", value: converted },
                  { label: "Rate", value: rate },
                  { label: "Routing Status", value: routingStatus },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#9e9e9e", marginBottom: 6 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 14,
                  color: "#ffffff",
                }}
              >
                Validation Notice
              </div>

              <div
                style={{
                  color: "#d3d3d3",
                  fontSize: 15,
                  lineHeight: 1.8,
                }}
              >
                The submitted file is currently under <strong style={{ color: "#ff8f8f" }}>restricted review</strong>.
                Based on the present transaction volume, the file has triggered a threshold review condition and
                cannot proceed to release or execution routing until direct banking-channel confirmation is completed.
                In addition, <strong style={{ color: "#ffb3b3" }}>no confirmed blockchain minting activity</strong> has been
                identified from the current file data. Status remains restricted pending manual clearance,
                threshold validation, and execution-window confirmation.
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                Restricted Allocation Review
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
                    <tr style={{ textAlign: "left", color: "#9e9e9e" }}>
                      <th style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        Wallet
                      </th>
                      <th style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        Allocation
                      </th>
                      <th style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {txRows.map((row) => (
                      <tr key={row.wallet}>
                        <td
                          style={{
                            padding: "12px 10px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            color: "#f0f0f0",
                            wordBreak: "break-all",
                          }}
                        >
                          {row.wallet}
                        </td>
                        <td
                          style={{
                            padding: "12px 10px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            color: "#ffffff",
                            fontWeight: 700,
                          }}
                        >
                          {row.allocation}
                        </td>
                        <td
                          style={{
                            padding: "12px 10px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            color: "#ff9e9e",
                            fontWeight: 700,
                          }}
                        >
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: 16,
                }}
              >
                Compliance Flags
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "Threshold review condition active",
                  "Pending direct bank-side confirmation",
                  "Execution routing not cleared",
                  "No confirmed minting process identified",
                  "Release state remains restricted",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 16,
                      padding: "12px 14px",
                      color: "#e4e4e4",
                      fontSize: 14,
                    }}
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                Technical Review Summary
              </div>

              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12.5,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  color: "#d5d5d5",
                  background: "#070707",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
{`[FILE] Detected EUR amount: 10,000,000,000.00
[CHAIN] Connected to Ethereum mainnet | chainId=1
[AMOUNT] Extracted: 10,000,000,000.00 EUR
[CONVERT] Converted: 10,800,000,000.00 USDT (rate 1.08)
[REVIEW] Threshold review condition active
[MINTING] No confirmed blockchain minting activity detected
[EXECUTION] Release state restricted
[ACTION] Awaiting bank confirmation and manual validation`}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(180deg, rgba(255,90,90,0.10), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,110,110,0.18)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                Notice to Sender
              </div>

              <div
                style={{
                  color: "#dddddd",
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                The submitted transaction file remains under restricted review and is not currently in execution-ready
                state. Threshold verification and bank-side confirmation are still required before any routing or release
                step can be considered. No confirmed blockchain minting process has been established from the present
                file data.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#8f8f8f",
            fontSize: 12,
            letterSpacing: 0.4,
          }}
        >
          Powered by CryptoHost Secure Review System
        </div>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              color: "#ffffff",
              textDecoration: "none",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "10px 16px",
              borderRadius: 14,
              fontSize: 14,
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}