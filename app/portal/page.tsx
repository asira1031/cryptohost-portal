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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "900px" }}>
        <h1 style={{ fontSize: "64px", marginBottom: "16px", fontWeight: 800 }}>
          Asira CryptoHost
        </h1>

        <p
          style={{
            fontSize: "24px",
            lineHeight: 1.5,
            color: "#cbd5e1",
            marginBottom: "36px",
          }}
        >
          Secure client portal for subscription management, file upload,
          transaction monitoring, and professional dashboard access.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/login"
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid #5c6f91",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              background: "#2f66d0",
              color: "white",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Sign Up
          </Link>

          <Link
            href="/dashboard"
            style={{
              background: "#d9d9d9",
              color: "#111827",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}