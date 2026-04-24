export default function FundPage() {
  return (
    <div style={{ padding: "24px", color: "#fff" }}>
      <h1 style={{ fontSize: "42px", fontWeight: 700, marginBottom: "10px" }}>
        Fund Account
      </h1>

      <p style={{ marginBottom: "20px" }}>
        Logged in as: 
      </p>

      {/* COIN BUTTONS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          maxWidth: "260px",
          marginBottom: "25px",
        }}
      >
        <button style={coinStyle}>USDT</button>
        <button style={coinStyle}>BTC</button>
        <button style={coinStyle}>ETH</button>
        <button style={coinStyle}>BNB</button>
      </div>

      {/* BUY BUTTONS (CLICKABLE) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "280px",
          marginBottom: "25px",
        }}
      >
        <a
          href="https://www.binance.com/en/buy-sell-crypto"
          target="_blank"
          rel="noopener noreferrer"
          style={binanceStyle}
        >
          Buy USDT via Binance
        </a>

        <a
          href="https://www.coinbase.com/buy"
          target="_blank"
          rel="noopener noreferrer"
          style={coinbaseStyle}
        >
          Buy USDT via Coinbase
        </a>
      </div>

      {/* GATEWAY WALLET */}
      <div
        style={{
          background: "#1e2a5a",
          padding: "16px",
          borderRadius: "12px",
          maxWidth: "420px",
          marginBottom: "30px",
        }}
      >
        <div style={{ fontSize: "14px", marginBottom: "8px", color: "#ccc" }}>
          Gateway Wallet
        </div>

        <div
          style={{
            fontSize: "14px",
            wordBreak: "break-all",
            marginBottom: "10px",
          }}
        >
          0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
        </div>

        <div style={{ fontSize: "13px", color: "#00ff88" }}>
          Asset: USDT | Network: ERC20 / BEP20
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div>
        <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
          Upload Financial File
        </h2>

        <input
          type="file"
          style={{
            marginBottom: "12px",
            display: "block",
          }}
        />

        <button style={submitStyle}>Submit File</button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const coinStyle: React.CSSProperties = {
  background: "#2f6df6",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "14px",
  fontWeight: 700,
  fontSize: "18px",
  cursor: "pointer",
};

const binanceStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  textDecoration: "none",
  background: "#f0b90b",
  color: "#000",
  borderRadius: "10px",
  padding: "16px",
  fontWeight: 700,
  fontSize: "16px",
};

const coinbaseStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  textDecoration: "none",
  background: "#4d8dff",
  color: "#fff",
  borderRadius: "10px",
  padding: "16px",
  fontWeight: 700,
  fontSize: "16px",
};

const submitStyle: React.CSSProperties = {
  background: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  padding: "12px 18px",
  fontWeight: 700,
  cursor: "pointer",
};