"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [amount] = useState(0);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h,24h,7d"
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setPrices(data);
        }
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleValidate = async () => {
    if (!code.trim()) {
      setResult("❌ ERROR: PLEASE ENTER VALIDATION CODE");
      return;
    }

    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .eq("protocol_code", code.trim())
      .single();

    if (error || !data) {
      setResult("❌ ERROR: INVALID VALIDATION CODE");
      return;
    }

    const createdAt = new Date(data.created_at).getTime();
    const now = Date.now();
    const hoursPassed = (now - createdAt) / (1000 * 60 * 60);

    if (hoursPassed < 24) {
      setResult("⏳ Processing");
      return;
    }

    if (hoursPassed < 72) {
      setResult("🔍 Validating");
      return;
    }

    setResult("❌ Protocol Code Invalid");
  };

  return (
    <div style={wrap}>
      <div style={container}>
        <div style={header}>
          <div>
            <h1 style={title}>201 Offline-Protocol</h1>
            <p style={subtitle}>Secure offline protocol dashboard</p>
          </div>

          <div style={status}>OFFLINE</div>
        </div>

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

        <div style={grid}>
          <div style={card}>
            <h3>Transaction Summary</h3>
            <Row label="Reference" value="OFF201PRTKEN" />
            <Row label="Cardholder" value="ENTER CARD HOLDER NAME" />
            <Row label="Card" value="ENTER CARD NUMBER" />
            <Row label="Amount" value={`EUR ${amount.toLocaleString()}`} />

            <div style={approved}>PRE-APPROVED</div>
          </div>

          <div style={card}>
            <h3>Validation Details</h3>
            <Row label="Protocol" value="201 Offline-Protocol" />
            <Row label="Validation Code" value="000000" />
            <Row label="Status" value="OFFLINE" />

            <div style={notice}>Offline transaction protocol initialized</div>
          </div>
        </div>

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

        <div style={{ ...card, marginTop: 18 }}>
          <h3 style={{ marginBottom: 16 }}>Live Crypto Market</h3>

          <div style={marketHeader}>
            <span>#</span>
            <span>Coin</span>
            <span>Price</span>
            <span>1h</span>
            <span>24h</span>
            <span>24h Volume</span>
            <span>Market Cap</span>
          </div>

          {prices.length > 0 ? (
            prices.map((coin: any, index: number) => (
              <div key={coin.id} style={marketRow}>
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

                <span>${coin.current_price?.toLocaleString()}</span>

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

                <span>${coin.total_volume?.toLocaleString()}</span>
                <span>${coin.market_cap?.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p style={{ marginTop: 16 }}>Loading market data...</p>
          )}

          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>
            Updates every 30 seconds
          </p>
        </div>

        <div style={terminal}>
          <div style={terminalHeader}>
            POS Terminal Activity <span style={live}>LIVE</span>
          </div>

          <pre style={terminalText}>
{`> Offline protocol ready
> Awaiting validation input...
> System initialized`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div style={row}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function WalletRow({ slot, amount }: any) {
  const percentage = 20;
  const computed = (amount * percentage) / 100;

  return (
    <div style={walletRow}>
      <span style={{ width: 80 }}>Wallet {slot}</span>
      <input style={input} placeholder="0x..." />
      <input style={inputSmall} value={`${percentage}%`} readOnly />
      <input style={inputSmall} value={`€ ${computed.toLocaleString()}`} readOnly />
    </div>
  );
}

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

const title: React.CSSProperties = {
  margin: 0,
  fontSize: 32,
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  color: "#8aa4d4",
};

const status: React.CSSProperties = {
  background: "#f59e0b",
  padding: "10px 15px",
  borderRadius: 8,
  fontWeight: "bold",
  color: "#000",
  height: "fit-content",
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

const notice: React.CSSProperties = {
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

const marketHeader: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "50px 1.7fr 1fr 1fr 1fr 1.3fr 1.4fr",
  padding: "10px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: 13,
  opacity: 0.7,
};

const marketRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "50px 1.7fr 1fr 1fr 1fr 1.3fr 1.4fr",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  fontSize: 14,
};

const terminal: React.CSSProperties = {
  background: "#000",
  padding: 15,
  borderRadius: 12,
};

const terminalHeader: React.CSSProperties = {
  marginBottom: 10,
};

const live: React.CSSProperties = {
  color: "#0ecb81",
  marginLeft: 10,
};

const terminalText: React.CSSProperties = {
  color: "#0ecb81",
};