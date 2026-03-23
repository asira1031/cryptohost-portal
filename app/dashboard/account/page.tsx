"use client";

export default function AccountPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b2d",
        padding: "40px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          background: "#101a49",
          borderRadius: 18,
          padding: 30,
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Fund Account
        </h1>

        <p
          style={{
            marginTop: 12,
            marginBottom: 22,
            color: "#c7d2fe",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Purchase USDT from your preferred provider, then transfer the funds to
          your designated CryptoHost wallet for processing.
        </p>

        <div
          style={{
            background: "#1f2b5c",
            border: "1px solid #33457a",
            borderRadius: 12,
            padding: 18,
            marginBottom: 18,
            color: "#ffffff",
          }}
        >
          <div style={{ fontSize: 13, color: "#93c5fd", marginBottom: 8 }}>
            Recommended Wallet Funding Method
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
            Buy USDT externally, then send to your assigned wallet
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7 }}>
            Use Binance, Coinbase, or another approved provider to purchase USDT.
            After purchase, withdraw and send the USDT to your designated wallet
            using the correct network.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          <a
            href="https://www.binance.com/en/buy-sell-crypto"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#f4b400",
              color: "#111827",
              textDecoration: "none",
              padding: "14px 20px",
              borderRadius: 10,
              fontWeight: 700,
              display: "inline-block",
            }}
          >
            Buy USDT via Binance
          </a>

          <a
            href="https://www.coinbase.com/buy"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              padding: "14px 20px",
              borderRadius: 10,
              fontWeight: 700,
              display: "inline-block",
            }}
          >
            Buy Crypto via Coinbase
          </a>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 10,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#cbd5e1",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          Make sure the wallet address and network shown by your CryptoHost portal
          match the withdrawal network you select on the exchange.
        </div>
      </div>
    </div>
  );
}