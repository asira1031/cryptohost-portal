"use client";

import { useRouter } from "next/navigation";

export default function Portal() {

  const router = useRouter();

  const subscribe = (plan: string, price: number) => {
    router.push(`/checkout?plan=${plan}&price=${price}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1320",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        CryptoHost Client Portal
      </h1>

      <p style={{ color: "#9aa4c7" }}>
        Secure subscription access for CryptoHost services
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {/* BASIC */}
        <div
          style={{
            background: "#111a2e",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h2>Basic Plan</h2>
          <p>$299 / month</p>

          <button
            onClick={() => subscribe("basic", 299)}
            style={{ marginTop: "10px" }}
          >
            Subscribe
          </button>
        </div>

        {/* PROFESSIONAL */}
        <div
          style={{
            background: "#111a2e",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h2>Professional</h2>
          <p>$499 / month</p>

          <button
            onClick={() => subscribe("professional", 499)}
            style={{ marginTop: "10px" }}
          >
            Subscribe
          </button>
        </div>

        {/* ENTERPRISE */}
        <div
          style={{
            background: "#111a2e",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h2>Enterprise</h2>
          <p>$999 / month</p>

          <button
            onClick={() => subscribe("enterprise", 999)}
            style={{ marginTop: "10px" }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}