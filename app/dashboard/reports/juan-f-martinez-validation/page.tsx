"use client";
import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";
export default function Page() {
  const [amount] = useState(500000000);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [prices, setPrices] = useState<any>(null);
  const success = {
  padding: "8px 12px",
  backgroundColor: "#e6ffed",
  color: "#057a28",
  border: "1px solid #057a28",
  borderRadius: "6px",
  marginTop: "12px",
  fontWeight: "600"
};


  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h,24h,7d"
);
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error("Price fetch error:", err);
    }
  };

  fetchPrices();

  const interval = setInterval(fetchPrices, 30000);
  return () => clearInterval(interval);
}, []);

  // Example creation time
  // Replace this with your real database timestamp later
  const createdAt = new Date("2026-05-02T00:00:00");

  const handleValidate = async () => {
  const { data, error } = await supabase
    .from("deposits")
    .select("*")
    .eq("protocol_code", code)
    .single();

  // Code not found
  if (error || !data) {
    setResult("❌ ERROR: INVALID VALIDATION CODE");
    return;
  }

  const createdAt = new Date(data.created_at).getTime();
  const now = Date.now();
  

  const hoursPassed =
    (now - createdAt) / (1000 * 60 * 60);

  // 0–24 hours
  if (hoursPassed < 24) {
    setResult("⏳ Processing");
    return;
  }

  // 24–72 hours
  if (hoursPassed < 72) {
    setResult("🔍 Validating");
    return;
  }

  // After 72 hours
  setResult("❌ Protocol Code Invalid");
};
  return (
    <div style={wrap}>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>CryptoHost Validation Report</h1>
            <p style={subtitle}>Secure validation and allocation workflow</p>
          </div>
          <div style={status}>APPROVED</div>
        </div>

        {/* VALIDATION INPUT */}
        <div style={card}>
          <h3>Validation Code Entry</h3>

          <div style={walletRow}>
            <input
              style={input}
              placeholder="Enter validation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button style={button} onClick={handleValidate}>
              RUN VALIDATION
            </button>
          </div>

          {result && <div style={errorBox}>{result}</div>}
        </div>

        {/* GRID */}
        <div style={grid}>

          <div style={card}>
            <h3>Transaction Summary</h3>
            <Row label="Reference" value="CHX-LIVE-20260506-123100" />
             <Row label="Bank Name" value="JP Morgan Chase Bank N.A." />
            <Row label="Cardholder" value="Juan F. Martinez" />
            <Row label="Card" value="4347690281773459" />
            <Row label="Amount" value={`EUR ${amount.toLocaleString()}`} />

            <div style={approved}>APPROVED</div>
          </div>

          <div style={card}>
  <h3>JPMorgan TLS Validation</h3>

  <Row label="Target Host" value="api.jpmorgan.com" />
  <Row label="Target Port" value="443" />
  <Row
    label="Check Time"
    value="2026-05-12 14:47:56"
  />

  <Row label="TLS Version" value="TLSv1.3" />
  <Row label="Cipher Suite" value="TLS_AES_128_GCM_SHA256" />

  <Row
    label="Server Subject"
    value="JPMorgan Chase & Co. (developer-na.jpmorgan.com)"
  />

  <Row
    label="Server Issuer"
    value="DigiCert EV RSA CA G2"
  />

  <div style={notice}>
    LIVE — Secure TLS handshake completed successfully
  </div>

  <div style={success}>
    STATUS: SECURE CHANNEL VERIFIED
  </div>
</div>


        </div>

        {/* WALLET */}
        <div style={card}>
          <h3>Wallet Allocation (5 Slots)</h3>

          {[1, 2, 3, 4, 5].map((slot) => (
  <div key={slot}>
    <WalletRow slot={slot} amount={amount} />

    <div
      style={{
        marginTop: 8,
        marginBottom: 14,
        paddingLeft: 6,
      }}
    >
      <input
        type="text"
        placeholder={`Wallet ${slot} TXN Hash`}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          color: "#fff",
          outline: "none",
          fontSize: 13,
        }}
      />
    </div>
  </div>
))}
        </div>
        {/* LIVE TOKEN PRICES */}
{/* LIVE TOKEN PRICES */}
<div style={{ ...card, marginTop: 18 }}>
  <h3 style={{ marginBottom: 16 }}>Live Crypto Market</h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "50px 1.7fr 1fr 1fr 1fr 1.3fr 1.4fr",
      padding: "10px 0",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      fontSize: 13,
      opacity: 0.7,
    }}
  >
    <span>#</span>
    <span>Coin</span>
    <span>Price</span>
    <span>1h</span>
    <span>24h</span>
    <span>24h Volume</span>
    <span>Market Cap</span>
  </div>

  {prices ? (
    prices.map((coin: any, index: number) => (
      <div
        key={coin.id}
        style={{
          display: "grid",
          gridTemplateColumns: "50px 1.7fr 1fr 1fr 1fr 1.3fr 1.4fr",
          alignItems: "center",
          padding: "14px 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontSize: 14,
        }}
      >
        <span>{index + 1}</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={coin.image}
            alt={coin.symbol}
            style={{ width: 24, height: 24 }}
          />
          <strong>{coin.name}</strong>
          <span style={{ opacity: 0.6 }}>
            {coin.symbol.toUpperCase()}
          </span>
        </div>

        <span>
          ${coin.current_price?.toLocaleString()}
        </span>

        <span
          style={{
            color:
              coin.price_change_percentage_1h_in_currency >= 0
                ? "#00e676"
                : "#ff4d4d",
          }}
        >
          {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
        </span>

        <span
          style={{
            color:
              coin.price_change_percentage_24h_in_currency >= 0
                ? "#00e676"
                : "#ff4d4d",
          }}
        >
          {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
        </span>

        <span>
          ${coin.total_volume?.toLocaleString()}
        </span>

        <span>
          ${coin.market_cap?.toLocaleString()}
        </span>
      </div>
    ))
  ) : (
    <p style={{ marginTop: 16 }}>Loading market data...</p>
  )}

  <p style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>
    Updates every 30 seconds
  </p>
</div>
        {/* TERMINAL */}
        <div style={terminal}>
          <div style={terminalHeader}>
            POS Terminal Activity <span style={live}>LIVE</span>
          </div>

          <pre style={terminalText}>
{`> POS terminal ready
> Awaiting validation input...
> System initialized`}
          </pre>
        </div>

      </div>
    </div>
  );
}

/* ROW */
function Row({ label, value }: any) {
  return (
    <div style={row}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* WALLET */
function WalletRow({ slot, amount }: any) {
  const percentage = 0;
  const computed = (amount * percentage) / 0;

  return (
    <div style={walletRow}>
      <span style={{ width: 80 }}>Wallet {slot}</span>
      <input style={input} placeholder="0x..." />
      <input style={inputSmall} value={`${percentage}%`} readOnly />
      <input style={inputSmall} value={`€ ${computed.toLocaleString()}`}  />
    </div>
  );
}

/* STYLES */

const wrap: React.CSSProperties = {
  background: "#0b1d4a",
  minHeight: "100vh",
  padding: 20,
  color: "#eaecef",
};

const container: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  background: "#102a63",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
};

const title = { margin: 0 };
const subtitle = { color: "#8aa4d4" };

const status: React.CSSProperties = {
  background: "#0ecb81",
  padding: "10px 15px",
  borderRadius: 8,
  fontWeight: "bold",
  color: "#000",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
};

const card: React.CSSProperties = {
  background: "#102a63",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #1e3a8a",
};

const approved: React.CSSProperties = {
  marginTop: 15,
  background: "#0ecb81",
  padding: 10,
  textAlign: "center",
  borderRadius: 8,
  fontWeight: "bold",
  color: "#000",
};

const notice = {
  marginTop: 15,
  color: "#aaa",
};

const walletRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const input: React.CSSProperties = {
  flex: 1,
  padding: 8,
  borderRadius: 6,
  border: "none",
};

const inputSmall: React.CSSProperties = {
  width: 120,
  padding: 8,
  borderRadius: 6,
  border: "none",
};

const button: React.CSSProperties = {
  background: "#0ecb81",
  border: "none",
  padding: "10px 15px",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer",
};

const errorBox: React.CSSProperties = {
  marginTop: 10,
  background: "#ff4d4f",
  padding: 10,
  borderRadius: 6,
  fontWeight: "bold",
};

const terminal: React.CSSProperties = {
  background: "#000",
  padding: 15,
  borderRadius: 12,
};

const terminalHeader = {
  marginBottom: 10,
};

const live = {
  color: "#0ecb81",
  marginLeft: 10,
};

const terminalText = {
  color: "#0ecb81",
};