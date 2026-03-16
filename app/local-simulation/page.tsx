export default function LocalSimulationPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #081224, #0d1b34)",
        color: "white",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "260px",
          background: "#09162c",
          padding: "28px 22px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "34px", fontWeight: 700 }}>CryptoHost</h2>
        <p style={{ marginTop: 4, color: "#b9c4d6", fontSize: 14 }}>Secure Client Portal</p>

        <div style={{ marginTop: 28, lineHeight: 2 }}>
          <div>📊 Dashboard</div>
          <div>📁 My Files</div>
          <div>💧 Liquidity</div>
          <div>⛓ Blockchain</div>
          <div>🔐 Security</div>
        </div>

        <div style={{ marginTop: 40, fontSize: 13, color: "#9fb0c8" }}>
          <div><b>Environment</b></div>
          <div>Network: BNB Chain</div>
          <div>Mode: Verification Console</div>
          <div style={{ marginTop: 12, color: "#ffd76a" }}>LOCAL SIMULATION ONLY</div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "36px" }}>
        <h1 style={{ margin: 0, fontSize: 42 }}>Welcome, Client</h1>
        <p style={{ color: "#42d67c", marginTop: 10, fontWeight: 600 }}>Status: System Online</p>

        <div style={{ display: "flex", gap: 24, marginTop: 26, alignItems: "flex-start", flexWrap: "wrap" }}>
          <section
            style={{
              width: 360,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 24,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Active File</h3>
            <p><b>Reference:</b> CH-2026-LIVE</p>
            <p><b>Stage:</b> <span style={{ color: "#58a6ff" }}>LIQUIDITY CONFIGURATION — PRICE BAND SET</span></p>
            <p><b>Status:</b> <span style={{ color: "#ffcc4d" }}>AWAITING CONFIRMATION</span></p>
            <p>Liquidity: Structure Initialized — Price Band Configured (Final Injection Pending Confirmation)</p>
            <p>Price Band: 8.55 – 34.21</p>
            <p>Current Price (Indicative): 17.10</p>
            <p style={{ color: "#98a8bf", fontSize: 13 }}>Timestamp: 2026-02-23 09:10 (UTC+8)</p>
          </section>

          <section
            style={{
              flex: 1,
              minWidth: 420,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 24,
            }}
          >
            <div style={{ color: "#d7deea", fontWeight: 700, fontSize: 14 }}>VALIDATION NOTICE</div>
            <h2 style={{ marginTop: 10, fontSize: 38, lineHeight: 1.15 }}>
              Liquidity Configuration Update — 99.5M EURC
            </h2>

            <p style={{ color: "#d2dae7", lineHeight: 1.7 }}>
              The liquidity structure has been successfully initialized and the price band has been configured
              within the designated range. The position framework is aligned for activation. Final capital
              injection will be completed upon confirmation, after which the pool will proceed to full
              operational activation.
            </p>

            <div
              style={{
                marginTop: 18,
                background: "rgba(0,0,0,0.18)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: 18,
                lineHeight: 1.7,
              }}
            >
              <div><b>Reason:</b> Liquidity structure initialized and band configuration completed — awaiting confirmation to proceed</div>
              <div><b>Next Step:</b> Provide confirmation to execute final capital injection and complete pool activation</div>
              <div><b>System:</b> Binance Exchange Validation</div>
              <div><b>Timestamp:</b> 2026-02-23 09:10 (UTC+8)</div>
            </div>

            <div style={{ marginTop: 20, color: "#d7deea", fontWeight: 700 }}>▼ View Full Technical Log</div>

            <pre
              style={{
                marginTop: 14,
                background: "#071019",
                color: "#b7ffbf",
                padding: 18,
                borderRadius: 14,
                overflowX: "auto",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >{`VALIDATION NOTICE
LIQUIDITY CONFIGURATION PHASE — 99.5M EURC
-------------------------------------------------------
CONFIGURATION SUMMARY
- Base Amount (Reference): 99,500,000.00 EURC
- Allocation Structure   : 32.5% / 7.5% / 5% / 55%
- Network               : BNB Chain
- Pool Pairing          : EURC / BNB
- Fee Tier              : V3 (Configured)
- Price Band            : 8.55 - 34.21
- Current Price         : 17.10

SYSTEM STATUS
- Structure Init        : COMPLETE
- Band Configuration    : COMPLETE
- Capital Injection     : PENDING CONFIRMATION
- Routing               : STANDBY
- Final Activation      : WAITING
`}</pre>
          </section>
        </div>
      </main>
    </div>
  );
}