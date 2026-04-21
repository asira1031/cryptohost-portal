export default function HSBCTPPHoldPage() {
  const walletSlots = [
    { wallet: "WALLET_1_HERE", percentage: "00.00%" },
    { wallet: "WALLET_2_HERE", percentage: "00.00%" },
    { wallet: "WALLET_3_HERE", percentage: "00.00%" },
    { wallet: "WALLET_4_HERE", percentage: "00.00%" },
    { wallet: "WALLET_5_HERE", percentage: "00.00%" },
    { wallet: "WALLET_6_HERE", percentage: "00.00%" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "28px 22px 40px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            background: "#18296f",
            borderRadius: 20,
            padding: "28px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 20,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                color: "#8ec5ff",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.4,
                marginBottom: 8,
              }}
            >
              CryptoHost Secure Validation System
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                color: "white",
              }}
            >
              HSBC TPP HOLD Report
            </h1>

            <p
              style={{
                marginTop: 10,
                marginBottom: 0,
                color: "#dbe4ff",
                fontSize: 15,
              }}
            >
              Ready-for-execution validation view with transaction summary,
              account details, and wallet allocation slots.
            </p>
          </div>

          <div
            style={{
              background: "rgba(32,197,94,0.12)",
              color: "#7CFFB2",
              border: "1px solid rgba(124,255,178,0.35)",
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            Ready for Execution
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#18296f",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
              File Reference
            </div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              HSBC-TPP-HOLD
            </div>
          </div>

          <div
            style={{
              background: "#18296f",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
              Progress
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#7CFFB2" }}>
              100%
            </div>
          </div>

          <div
            style={{
              background: "#18296f",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
              Conversion Status
            </div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>AUTHORIZED</div>
          </div>

          <div
            style={{
              background: "#18296f",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
              Broadcast Status
            </div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>READY</div>
          </div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#8ec5ff",
              marginBottom: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            Validation Result
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#7CFFB2",
              lineHeight: 1.3,
              marginBottom: 14,
            }}
          >
            Validation Completed — Ready for Execution
          </div>

          <div
            style={{
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 16,
              color: "#dbe4ff",
              lineHeight: 1.7,
            }}
          >
            The transaction has successfully completed all required validation
            stages and is now prepared for execution under secure system
            conditions. No further action is required at this stage.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#18296f",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 22,
                fontWeight: 800,
                color: "white",
              }}
            >
              Transaction Summary
            </h2>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["Reference ID", "HBUKG85H5CMAF590"],
                ["Amount", "€ 1,001,020,109.00"],
                ["Currency", "EUR"],
                ["Value Date", "12 August 2025"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div
                    style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}
                  >
                    {label}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#18296f",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 18,
                fontSize: 22,
                fontWeight: 800,
                color: "white",
              }}
            >
              Account Details
            </h2>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["Sender", "MATECHPOWER LTD"],
                ["Sender Acc", "GB91HBUK40362272831120"],
                ["Beneficiary", "MATECHPOWER LTD"],
                ["Beneficiary Acc", "GB91HBUK40362272831120"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div
                    style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}
                  >
                    {label}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 18,
              fontSize: 22,
              fontWeight: 800,
              color: "white",
            }}
          >
            Validation Checks
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {[
              "Infrastructure Validation — PASSED",
              "Routing Alignment — VERIFIED",
              "Allocation Sequencing — COMPLETED",
              "System Integrity Check — STABLE",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  padding: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontWeight: 800,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 18,
              fontSize: 22,
              fontWeight: 800,
              color: "white",
            }}
          >
            Wallet Allocation Slots
          </h2>

          <div style={{ display: "grid", gap: 12 }}>
            {walletSlots.map((slot, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "14px 16px",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 140px",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}
                  >
                    Wallet {index + 1}
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      wordBreak: "break-all",
                    }}
                  >
                    {slot.wallet}
                  </div>
                </div>

                <div>
                  <div
                    style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}
                  >
                    Percentage
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>
                    {slot.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              color: "#8ec5ff",
              fontSize: 13,
              marginBottom: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            Timestamp
          </div>

          <div style={{ fontSize: 15, color: "#dbe4ff" }}>
            April 21, 2026 • 18:40 (UTC+8)
          </div>

          <div style={{ marginTop: 24, color: "#64748b", fontSize: 13 }}>
            Powered by CryptoHost Secure Automation
          </div>
        </div>
      </div>
    </div>
  );
}