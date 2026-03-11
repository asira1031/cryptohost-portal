"use client";

import { useEffect, useState } from "react";

type Payment = {
  plan?: string;
  amount?: string;
  method?: string;
  network?: string;
  date?: string;
};

type Fee = {
  amount?: string;
  method?: string;
  network?: string;
  address?: string;
  status?: string;
  date?: string;
};

export default function DashboardPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);

  useEffect(() => {
    const savedPayments = JSON.parse(
      localStorage.getItem("cryptohost_payments") || "[]"
    );

    const savedFees = JSON.parse(
      localStorage.getItem("cryptohost_transaction_fees") || "[]"
    );

    setPayments(savedPayments);
    setFees(savedFees);
  }, []);

  const latestSubscription = payments[payments.length - 1];
  const latestFee = fees[fees.length - 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071225",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
        CryptoHost Client Dashboard
      </h1>

      <p style={{ color: "#9fb0d1", marginBottom: "30px" }}>
        Monitor your subscription, transaction fee payment, and processing status.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={card}>
          <div style={cardLabel}>Subscription Status</div>
          <div style={cardValue}>
            {latestSubscription ? "Active" : "Not Subscribed"}
          </div>
        </div>

        <div style={card}>
          <div style={cardLabel}>Transaction Fee</div>
          <div style={cardValue}>
            {latestFee ? "Submitted" : "Pending"}
          </div>
        </div>

        <div style={card}>
          <div style={cardLabel}>Processing Status</div>
          <div style={cardValue}>
            {latestFee ? "Under Review" : "Awaiting Fee"}
          </div>
        </div>
      </div>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={sectionTitle}>Priority Subscription</h2>

        {!latestSubscription ? (
          <div style={emptyCard}>No subscription payment found.</div>
        ) : (
          <div style={dataCard}>
            <p><strong>Plan:</strong> {latestSubscription.plan}</p>
            <p><strong>Amount:</strong> ${latestSubscription.amount}</p>
            <p><strong>Method:</strong> {latestSubscription.method}</p>
            <p><strong>Network:</strong> {latestSubscription.network}</p>
            <p><strong>Date:</strong> {latestSubscription.date}</p>
          </div>
        )}
      </section>

      <section>
        <h2 style={sectionTitle}>Transaction Fee Payment</h2>

        {!latestFee ? (
          <div style={emptyCard}>
            No transaction fee payment submitted yet.
          </div>
        ) : (
          <div style={dataCard}>
            <p><strong>Amount:</strong> {latestFee.amount}</p>
            <p><strong>Method:</strong> {latestFee.method}</p>
            <p><strong>Network:</strong> {latestFee.network}</p>
            <p><strong>Wallet:</strong> {latestFee.address}</p>
            <p><strong>Status:</strong> {latestFee.status}</p>
            <p><strong>Date:</strong> {latestFee.date}</p>
          </div>
        )}
      </section>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#0f1d38",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
};

const cardLabel: React.CSSProperties = {
  color: "#9fb0d1",
  fontSize: "14px",
  marginBottom: "10px",
};

const cardValue: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "26px",
  marginBottom: "16px",
};

const dataCard: React.CSSProperties = {
  background: "#0f1d38",
  padding: "22px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
  marginBottom: "14px",
};

const emptyCard: React.CSSProperties = {
  background: "#0f1d38",
  padding: "22px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#9fb0d1",
};