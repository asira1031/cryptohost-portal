"use client";

import Link from "next/link";

export default function DashboardPage() {

  const reference = "CH-2026-LIVE";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#081226",
        color: "#fff",
        display: "flex",
      }}
    >

      {/* Sidebar */}

      <aside
        style={{
          width: "250px",
          background: "#050b1d",
          padding: "30px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>CryptoHost</h2>

        <p style={{ opacity: 0.7 }}>Secure Client Portal</p>

        <div style={{ marginTop: "40px" }}>

          <p style={{ marginBottom: "15px" }}>📊 Dashboard</p>

          <p style={{ marginBottom: "15px" }}>📁 My Files</p>

          <p style={{ marginBottom: "15px" }}>💧 Liquidity</p>

          <p style={{ marginBottom: "15px" }}>⛓ Blockchain</p>

          <p style={{ marginBottom: "15px" }}>🔐 Security</p>

        </div>

        <div style={{ marginTop: "60px", fontSize: "14px", opacity: 0.6 }}>

          <p>Network: BNB Chain</p>

          <p>Mode: Verification Console</p>

        </div>

      </aside>

      {/* Main Content */}

      <section
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        <h1 style={{ marginBottom: "10px" }}>Welcome, Client</h1>

        <p style={{ color: "#22c55e", marginBottom: "40px" }}>
          Status: System Online
        </p>

        {/* Active File Card */}

        <div
          style={{
            background: "#111b34",
            borderRadius: "16px",
            padding: "30px",
            border: "1px solid rgba(255,255,255,0.08)",
            maxWidth: "700px",
          }}
        >

          <h2 style={{ marginBottom: "20px" }}>Active File</h2>

          <p>
            <strong>Reference:</strong> {reference}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Status:</strong> Waiting for Subscription
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Result Page:</strong> Available after processing
          </p>

          {/* Button */}

          <div style={{ marginTop: "30px" }}>

            <Link href={`/result/${reference}`}>
              <button
                style={{
                  background: "#2563eb",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View File Result
              </button>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}