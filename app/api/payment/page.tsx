"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cryptohost_payments");
    if (saved) {
      setPayments(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ padding: "40px", color: "white", background: "#081120", minHeight: "100vh" }}>
      <h1>CryptoHost Payments</h1>

      {payments.length === 0 && <p>No payment submissions yet.</p>}

      {payments.map((p, i) => (
        <div
          key={i}
          style={{
            background: "#111a2e",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        >
          <p><strong>Plan:</strong> {p.plan}</p>
          <p><strong>Amount:</strong> ${p.amount}</p>
          <p><strong>Method:</strong> {p.method}</p>
          <p><strong>Date:</strong> {p.date}</p>
          <p><strong>Status:</strong> Pending Review</p>
        </div>
      ))}
    </div>
  );
}