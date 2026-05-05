"use client";

import { useState } from "react";

export default function Page() {
  const [amount] = useState(11000000000);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleValidate = () => {
    if (code !== "7001") {
      setResult("❌ ERROR: INVALID VALIDATION CODE");
    } else {
      setResult("❌ ERROR: SYSTEM BLOCKED (SIMULATION)");
    }
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
            <Row label="Reference" value="CHX-LIVE-20260505-123000" />
            <Row label="Cardholder" value="Juan F. Martinez" />
            <Row label="Card" value="**** **** **** 5323" />
            <Row label="Amount" value={`EUR ${amount.toLocaleString()}`} />

            <div style={approved}>APPROVED</div>
          </div>

          <div style={card}>
            <h3>Validation Details</h3>
            <Row label="Protocol" value="101.1" />
            <Row label="Validation Code" value="7001" />
            <Row label="Status" value="SUCCESS" />

            <div style={notice}>
              LIVE — online transaction processed
            </div>
          </div>

        </div>

        {/* WALLET */}
        <div style={card}>
          <h3>Wallet Allocation (5 Slots)</h3>

          {[1, 2, 3, 4, 5].map((slot) => (
            <WalletRow key={slot} slot={slot} amount={amount} />
          ))}
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
  const percentage = 20;
  const computed = (amount * percentage) / 100;

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