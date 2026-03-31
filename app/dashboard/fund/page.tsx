export default function FundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#041a5a",
        color: "white",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: 20 }}>
        Fund Account
      </h1>

      <p style={{ marginBottom: 16 }}>Logged in as: pilotvl@yahoo.com</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(90px, 120px))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <button style={btnStyle}>USDT</button>
        <button style={btnStyle}>BTC</button>
        <button style={btnStyle}>ETH</button>
        <button style={btnStyle}>BNB</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: 260 }}>
        <button
          style={{
            background: "#facc15",
            color: "black",
            border: "none",
            borderRadius: 8,
            padding: "14px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Buy USDT via Binance
        </button>

        <button
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "14px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Buy USDT via Coinbase
        </button>
      </div>

      <div
        style={{
          marginTop: 24,
          maxWidth: 280,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Gateway Wallet</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, wordBreak: "break-all" }}>
          0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
        </div>
        <div style={{ marginTop: 10, color: "#4ade80", fontSize: 13 }}>
          Asset: USDT | Network: ERC20 / BEP20
        </div>
      </div>

      <div style={{ marginTop: 32, maxWidth: 320 }}>
        <h2 style={{ fontSize: 26, marginBottom: 12 }}>Upload Financial File</h2>

        <input
          type="file"
          style={{
            display: "block",
            marginBottom: 12,
            color: "white",
          }}
        />

        <button
          style={{
            background: "#84cc16",
            color: "black",
            border: "none",
            borderRadius: 8,
            padding: "12px 18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit File
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "12px 18px",
  fontWeight: "bold",
  cursor: "pointer",
};