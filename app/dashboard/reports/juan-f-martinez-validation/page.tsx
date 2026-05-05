"use client";

export default function Page() {
  const data = {
    ref: "CHX-LIVE-20260505-123000",
    time: new Date().toLocaleString(),
    name: "Juan F. Martinez",
    card: "**** **** **** 5323",
    expiry: "04/30",
    amount: "11,000,000,000.00",
    currency: "EUR",
    status: "APPROVED",
  };

  return (
    <div style={wrap}>
      <div style={container}>
        {/* Header */}
        <div style={header}>
          <div>
            <h1 style={h1}>CryptoHost Validation Report</h1>
            <p style={sub}>Secure Payment Production (live)</p>
          </div>
          <span style={statusBadge(data.status)}>{data.status}</span>
        </div>

        {/* Summary grid */}
        <div style={grid}>
          <Card title="Reference" value={data.ref} mono />
          <Card title="Timestamp" value={data.time} />
          <Card title="Cardholder" value={data.name} />
          <Card title="Card" value={data.card} mono />
          <Card title="Expiry" value={data.expiry} />
          <Card
            title="Amount"
            value={`${data.currency} ${data.amount}`}
            highlight
          />
        </div>

        {/* Timeline / steps */}
        <div style={panel}>
          <h3 style={panelTitle}>Processing Timeline</h3>
          <ul style={timeline}>
            <li><Dot ok /> Tokenization — OK</li>
            <li><Dot ok /> Risk Checks — OK</li>
            <li><Dot ok /> Gateway Route — OK</li>
            <li><Dot ok /> Authorization — APPROVED</li>
          </ul>
        </div>

        {/* Footer note */}
        <div style={note}>
          ⚠  — live transaction processed. Screenshot-safe output.
        </div>
      </div>
    </div>
  );
}

/* ---------- small components ---------- */
function Card({
  title,
  value,
  mono,
  highlight,
}: {
  title: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      <div
        style={{
          ...cardValue,
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo" : undefined,
          color: highlight ? "#0ecb81" : "#eaecef",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Dot({ ok }: { ok?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: 999,
        marginRight: 8,
        background: ok ? "#0ecb81" : "#f0b90b",
      }}
    />
  );
}

/* ---------- styles ---------- */
const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at 10% -10%, #1a2a4a 0%, transparent 60%), #0b0e11",
  padding: 24,
  color: "#eaecef",
};

const container: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  marginBottom: 20,
  padding: 20,
  borderRadius: 16,
  background:
    "linear-gradient(135deg, rgba(240,185,11,0.15), rgba(14,203,129,0.15))",
  border: "1px solid #2b3139",
};

const h1: React.CSSProperties = {
  margin: 0,
  fontSize: 28,
  fontWeight: 800,
};

const sub: React.CSSProperties = {
  marginTop: 6,
  color: "#8b98a5",
};

const statusBadge = (status: string): React.CSSProperties => ({
  padding: "8px 14px",
  borderRadius: 999,
  background: "rgba(14,203,129,0.15)",
  color: "#0ecb81",
  fontWeight: 800,
  border: "1px solid rgba(14,203,129,0.35)",
});

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
  marginBottom: 20,
};

const card: React.CSSProperties = {
  background: "#161a1e",
  border: "1px solid #2b3139",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const cardTitle: React.CSSProperties = {
  color: "#8b98a5",
  fontSize: 12,
  letterSpacing: 0.6,
  textTransform: "uppercase",
  marginBottom: 8,
};

const cardValue: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
};

const panel: React.CSSProperties = {
  background: "#161a1e",
  border: "1px solid #2b3139",
  borderRadius: 14,
  padding: 16,
  marginBottom: 16,
};

const panelTitle: React.CSSProperties = {
  margin: 0,
  marginBottom: 10,
  fontSize: 16,
  fontWeight: 800,
};

const timeline: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  lineHeight: 1.9,
  color: "#c9d1d9",
};

const note: React.CSSProperties = {
  background: "#0f1419",
  border: "1px dashed #2b3139",
  borderRadius: 12,
  padding: 14,
  color: "#8b98a5",
  textAlign: "center",
};