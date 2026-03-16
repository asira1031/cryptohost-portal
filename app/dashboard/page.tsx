"use client";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b1220", color: "white" }}>

      {/* SIDEBAR */}

      <div style={{
        width: "260px",
        background: "#0f1b34",
        padding: "30px",
        borderRight: "1px solid #1f2b46"
      }}>

        <h2 style={{ marginBottom: "30px" }}>CryptoHost</h2>

        <p>Dashboard</p>
        <p>My Files</p>
        <p>Liquidity</p>
        <p>Blockchain</p>
        <p>Security</p>

        <div style={{ marginTop: "50px", fontSize: "12px", color: "#9ca3af" }}>
          Environment
          <br/>
          Network: BNB Chain
          <br/>
          Mode: Verification Console
        </div>

      </div>

      {/* MAIN AREA */}

      <div style={{ flex: 1, padding: "40px" }}>

        <h1>Welcome, Client</h1>
        <p style={{ color: "#4ade80" }}>Status: System Online</p>

        <div style={{ display: "flex", gap: "30px", marginTop: "30px" }}>

          {/* ACTIVE FILE */}

          <div style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "10px",
            width: "420px"
          }}>

            <h3>Active File</h3>

            <p><b>Reference:</b> CH-2026-LIVE</p>
            <p><b>Stage:</b> LIQUIDITY CONFIGURATION — PRICE BAND SET</p>

            <p style={{ color: "#facc15" }}>
              <b>Status:</b> AWAITING CONFIRMATION
            </p>

            <p>
              Liquidity Structure Initialized —
              Price Band Configured
              (Final Injection Pending Confirmation)
            </p>

            <p>
              Price Band: 8.55 – 34.21
            </p>

            <p>
              Current Price (Indicative): 17.10
            </p>

            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              Timestamp: 2026-02-23 09:10 (UTC+8)
            </p>

          </div>

          {/* VALIDATION NOTICE */}

          <div style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "10px",
            width: "520px"
          }}>

            <h3>Validation Notice</h3>

            <h2 style={{ marginTop: "10px" }}>
              Liquidity Configuration Update — 99.5M EURC
            </h2>

            <p style={{ marginTop: "15px", color: "#d1d5db" }}>
              The liquidity structure has been successfully initialized
              and the price band has been configured within the designated
              range. The position framework is aligned for activation.
              Final capital injection will be completed upon confirmation,
              after which the pool will proceed to full operational
              activation.
            </p>

            <p style={{ marginTop: "20px" }}>
              <b>Reason:</b> Liquidity structure initialized and band configuration completed.
            </p>

            <p>
              <b>Next Step:</b> Provide confirmation to execute final capital injection
              and enable market routing.
            </p>

            <p>
              <b>System:</b> Binance Exchange Validation
            </p>

            <p>
              <b>Timestamp:</b> 2026-02-23 09:10 (UTC+8)
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}