"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#031B34",
        color: "white",
        fontFamily: "Arial",
        padding: "60px 20px",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "42px", marginBottom: "50px" }}>
        Choose Your CryptoHost Subscription
      </h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >

        {/* STARTER */}
        <div
          style={{
            border: "1px solid #3b4a6b",
            borderRadius: "12px",
            padding: "30px",
            width: "300px",
          }}
        >
          <h2>Starter Plan</h2>
          <h3>$299</h3>

          <ul>
            <li>Client Portal Dashboard</li>
            <li>Upload transaction files</li>
            <li>Transaction monitoring</li>
            <li>Blockchain verification tracking</li>
            <li>Secure encrypted data storage</li>
            <li>Email support</li>
          </ul>

          <button
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
              background: "#d9d9d9",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Subscribe
          </button>
        </div>

        {/* PROFESSIONAL */}
        <div
          style={{
            border: "1px solid #3b4a6b",
            borderRadius: "12px",
            padding: "30px",
            width: "300px",
          }}
        >
          <h2>Professional Plan</h2>
          <h3>$499</h3>

          <ul>
            <li>Everything in Starter</li>
            <li>Priority transaction processing</li>
            <li>Advanced monitoring dashboard</li>
            <li>Upload multiple financial files</li>
            <li>Faster blockchain updates</li>
            <li>Priority support</li>
          </ul>

          <button
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
              background: "#d9d9d9",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Subscribe
          </button>
        </div>

        {/* ENTERPRISE */}
        <div
          style={{
            border: "1px solid #3b4a6b",
            borderRadius: "12px",
            padding: "30px",
            width: "300px",
          }}
        >
          <h2>Enterprise Plan</h2>
          <h3>$999</h3>

          <ul>
            <li>Everything in Professional</li>
            <li>VIP processing priority</li>
            <li>Real-time blockchain tracking</li>
            <li>Dedicated transaction monitoring</li>
            <li>Enterprise security layer</li>
            <li>Dedicated support assistance</li>
          </ul>

          <button
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
              background: "#d9d9d9",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
}