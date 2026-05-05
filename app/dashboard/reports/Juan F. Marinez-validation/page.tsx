"use client";

import { useState } from "react";

export default function ValidationPage() {
  const [data, setData] = useState({
    name: "Juan F. Martinez",
    card: "**** **** **** 5323",
    expiry: "04/30",
    amount: "11,000,000,000.00",
    currency: "EUR",
    status: "APPROVED",
    ref: "CHX-DEMO-20260505-123000",
    time: new Date().toLocaleString(),
  });

  return (
    <div style={{ padding: 30, background: "#0b0e11", minHeight: "100vh", color: "#eaecef" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        <h1 style={{ marginBottom: 10 }}>CryptoHost Validation Report</h1>
        <p style={{ color: "#888" }}>Secure Payment Simulation (Demo)</p>

        <div style={{
          background: "#161a1e",
          padding: 20,
          borderRadius: 12,
          marginTop: 20
        }}>
          <h2 style={{ marginBottom: 15 }}>Transaction Summary</h2>

          <Row label="Reference" value={data.ref} />
          <Row label="Timestamp" value={data.time} />
          <Row label="Cardholder" value={data.name} />
          <Row label="Card" value={data.card} />
          <Row label="Expiry" value={data.expiry} />
          <Row label="Amount" value={`${data.currency} ${data.amount}`} />

          <div style={{ marginTop: 20 }}>
            <Status status={data.status} />
          </div>
        </div>

        <div style={{
          marginTop: 20,
          padding: 15,
          background: "#0f1419",
          borderRadius: 10,
          color: "#aaa"
        }}>
          ⚠ Demo only — no real transaction processed
        </div>

      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #2b3139"
    }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Status({ status }: { status: string }) {
  return (
    <div style={{
      padding: "10px 15px",
      background: "#0ecb81",
      color: "#000",
      borderRadius: 8,
      fontWeight: "bold",
      textAlign: "center"
    }}>
      {status}
    </div>
  );
}