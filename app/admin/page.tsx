"use client";

import { useEffect, useState } from "react";

type UserRecord = {
  fullName: string;
  email: string;
  company: string;
  password: string;
  createdAt: string;
};

type PaymentRecord = {
  plan?: string;
  amount?: string;
  method?: string;
  network?: string;
  date?: string;
};

type FeeRecord = {
  type?: string;
  amount?: string;
  method?: string;
  network?: string;
  address?: string;
  txHash?: string;
  date?: string;
  status?: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);

  useEffect(() => {
    const savedUsers = JSON.parse(
      localStorage.getItem("cryptohost_users") || "[]"
    );
    const savedPayments = JSON.parse(
      localStorage.getItem("cryptohost_payments") || "[]"
    );
    const savedFees = JSON.parse(
      localStorage.getItem("cryptohost_transaction_fees") || "[]"
    );

    setUsers(savedUsers);
    setPayments(savedPayments);
    setFees(savedFees);
  }, []);

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
        CryptoHost Admin Dashboard
      </h1>

      <p style={{ color: "#9fb0d1", marginBottom: "30px" }}>
        Monitor registered clients, subscription payments, and transaction fee submissions.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={statCard}>
          <div style={statLabel}>Registered Clients</div>
          <div style={statValue}>{users.length}</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Subscription Payments</div>
          <div style={statValue}>{payments.length}</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Transaction Fees</div>
          <div style={statValue}>{fees.length}</div>
        </div>
      </div>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={sectionTitle}>Registered Clients</h2>

        {users.length === 0 ? (
          <div style={emptyCard}>No registered clients yet.</div>
        ) : (
          users.map((user, index) => (
            <div key={index} style={dataCard}>
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {user.company}</p>
              <p><strong>Registered:</strong> {user.createdAt}</p>
            </div>
          ))
        )}
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={sectionTitle}>Priority Subscription Payments</h2>

        {payments.length === 0 ? (
          <div style={emptyCard}>No subscription payments yet.</div>
        ) : (
          payments.map((payment, index) => (
            <div key={index} style={dataCard}>
              <p><strong>Plan:</strong> {payment.plan || "-"}</p>
              <p><strong>Amount:</strong> ${payment.amount || "-"}</p>
              <p><strong>Method:</strong> {payment.method || "-"}</p>
              <p><strong>Network:</strong> {payment.network || "-"}</p>
              <p><strong>Date:</strong> {payment.date || "-"}</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 style={sectionTitle}>Transaction Fee Submissions</h2>

        {fees.length === 0 ? (
          <div style={emptyCard}>No transaction fee submissions yet.</div>
        ) : (
          fees.map((fee, index) => (
            <div key={index} style={dataCard}>
              <p><strong>Type:</strong> {fee.type || "Transaction Fee"}</p>
              <p><strong>Amount:</strong> {fee.amount || "-"}</p>
              <p><strong>Method:</strong> {fee.method || "-"}</p>
              <p><strong>Network:</strong> {fee.network || "-"}</p>
              <p><strong>Wallet:</strong> {fee.address || "-"}</p>
              <p><strong>TX Hash:</strong> {fee.txHash || "-"}</p>
              <p><strong>Status:</strong> {fee.status || "Pending Review"}</p>
              <p><strong>Date:</strong> {fee.date || "-"}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

const statCard: React.CSSProperties = {
  background: "#0f1d38",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
};

const statLabel: React.CSSProperties = {
  color: "#9fb0d1",
  fontSize: "14px",
  marginBottom: "10px",
};

const statValue: React.CSSProperties = {
  fontSize: "32px",
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