"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#031B34",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: 700 }}>
            Asira CryptoHost
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/login"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #5c6f91",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>

            <Link
              href="/register"
              style={{
                background: "#2f66d0",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Sign Up
            </Link>

            <Link
              href="/dashboard"
              style={{
                background: "#d9d9d9",
                color: "#111827",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "56px",
            marginBottom: "50px",
            fontWeight: 800,
          }}
        >
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
          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "36px",
              width: "380px",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Starter Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$299</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "30px" }}>
              <li>Client Portal Dashboard</li>
              <li>Upload transaction files</li>
              <li>Transaction monitoring</li>
              <li>Blockchain verification tracking</li>
              <li>Secure encrypted data storage</li>
              <li>Email support</li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                borderRadius: "6px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Subscribe
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "36px",
              width: "380px",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Professional Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$499</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "30px" }}>
              <li>Everything in Starter</li>
              <li>Priority transaction processing</li>
              <li>Advanced monitoring dashboard</li>
              <li>Upload multiple financial files</li>
              <li>Faster blockchain updates</li>
              <li>Priority support</li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                borderRadius: "6px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Subscribe
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "36px",
              width: "380px",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Enterprise Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$999</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "30px" }}>
              <li>Everything in Professional</li>
              <li>VIP processing priority</li>
              <li>Real-time blockchain tracking</li>
              <li>Dedicated transaction monitoring</li>
              <li>Enterprise security layer</li>
              <li>Dedicated support assistance</li>
            </ul>

            <Link
              href="/register"
              style={{
                display: "block",
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                borderRadius: "6px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}