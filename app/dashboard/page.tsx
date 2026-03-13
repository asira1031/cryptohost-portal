"use client";

import Link from "next/link";

export default function DashboardPage() {
  const reference = "CH-2026-LIVE";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#081226",
        color: "#ffffff",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Welcome, Client
      </h1>

      <p style={{ marginBottom: "30px" }}>
        Status: <span style={{ color: "#22c55e" }}>System Online</span>
      </p>

      <Link href={`/result/${reference}`}>
        <button
          style={{
            background: "#2563eb",
            border: "none",
            padding: "14px 26px",
            borderRadius: "10px",
            color: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          View File Result
        </button>
      </Link>
    </main>
  );
}