"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: string;
  name: string;
  price: number;
};

export default function PaymentPage() {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handlePayment = () => {
    alert("Payment successful!");
    window.location.href = "/portal";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2>CryptoHost Payment</h2>

        {plan && (
          <>
            <h3>{plan.name}</h3>
            <h1>${plan.price}</h1>
          </>
        )}

        <p>Select your payment method</p>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "16px",
            marginTop: "20px",
            background: "#3568cf",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}