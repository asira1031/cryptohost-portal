"use client";

import Link from "next/link";

export default function DashboardPage() {
  const reference = "CH-2026-LIVE";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#081226",
        color: "#ffffff",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "280px",
          background: "linear-gradient(180deg, #07142d 0%, #020817 100%)",
          padding: "28px 20px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ fontSize: "28px", margin: 0, fontWeight: 700 }}>CryptoHost</h2>
        <p style={{ marginTop: "6px", color: "#cbd5e1", fontSize: "18px" }}>
          Secure Client Portal
        </p>

        <div style={{ marginTop: "34px", display: "grid", gap: "22px" }}>
          <div style={{ fontSize: "18px" }}>📊 Dashboard</div>
          <div style={{ fontSize: "18px" }}>📁 My Files</div>
          <div style={{ fontSize: "18px" }}>💧 Liquidity</div>
          <div style={{ fontSize: "18px" }}>⛓ Blockchain</div>
          <div style={{ fontSize: "18px" }}>🔐 Security</div>
        </div>

        <div style={{ marginTop: "42px" }}>
          <p style={{ margin: "0 0 12px 0", fontWeight: 700, color: "#cbd5e1" }}>
            Environment
          </p>
          <p style={{ margin: "6px 0", color: "#cbd5e1" }}>Network: BNB Chain</p>
          <p style={{ margin: "6px 0", color: "#cbd5e1" }}>Mode: Verification Console</p>
        </div>
      </aside>

      <section style={{ flex: 1, padding: "36px 38px" }}>
        <h1 style={{ fontSize: "48px", margin: 0, fontWeight: 700 }}>Welcome, Client</h1>
        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          Status: <span style={{ color: "#22c55e", fontWeight: 700 }}>System Online</span>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "36px",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              background: "#101a34",
              borderRadius: "22px",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginTop: 0, marginBottom: "22px" }}>Active File</h2>

            <p style={{ fontSize: "18px", marginBottom: "14px" }}>
              <strong>Reference:</strong> {reference}
            </p>

            <p style={{ fontSize: "18px", marginBottom: "14px", color: "#60a5fa", fontWeight: 700 }}>
              <strong style={{ color: "#ffffff" }}>Stage:</strong> LIQUIDITY ROUTING REVIEW — PRIORITY RESTRICTED
            </p>

            <p style={{ fontSize: "18px", marginBottom: "14px", color: "#ef4444", fontWeight: 700 }}>
              <strong style={{ color: "#ffffff" }}>Status:</strong> PRIORITY EXECUTION NOT AUTHORIZED
            </p>

            <p style={{ fontSize: "18px", marginBottom: "18px", color: "#d1d5db", lineHeight: "1.6" }}>
              <strong style={{ color: "#ffffff" }}>Liquidity:</strong> Structure Initialized — Priority Routing
              Restricted (Fee Threshold Unmet)
            </p>

            <p style={{ marginBottom: "10px", color: "#d1d5db" }}>
              <strong style={{ color: "#ffffff" }}>Pair:</strong> EURC / WBNB
            </p>
            <p style={{ marginBottom: "10px", color: "#d1d5db" }}>
              <strong style={{ color: "#ffffff" }}>Current Price:</strong> 1 EURC = 0.05845 WBNB
            </p>
            <p style={{ marginBottom: "10px", color: "#d1d5db" }}>
              <strong style={{ color: "#ffffff" }}>Price Band:</strong> 0.04000 WBNB – 0.09000 WBNB
            </p>
            <p style={{ marginBottom: "24px", color: "#d1d5db" }}>
              <strong style={{ color: "#ffffff" }}>Timestamp:</strong> 2026-02-25 08:12 (UTC+8)
            </p>

            <Link
              href={`/result/${reference}`}
              style={{
                display: "inline-block",
                background: "#2563eb",
                border: "none",
                padding: "14px 26px",
                borderRadius: "12px",
                color: "#ffffff",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              View File Result
            </Link>
          </div>

          <div
            style={{
              background: "#101a34",
              borderRadius: "22px",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
              VALIDATION NOTICE
            </p>

            <h2 style={{ fontSize: "28px", lineHeight: "1.35", marginTop: "18px", marginBottom: "22px" }}>
              Priority Execution Review — 99.5M EURC
            </h2>

            <p style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "17px" }}>
              The liquidity structure and allocation framework have been successfully configured for the EURC/WBNB
              V3 pool. During execution review, the submitted processing fee was validated against the required
              priority routing threshold. The current fee allocation does not qualify for escalated liquidity
              execution under the routing protocol.
            </p>

            <div
              style={{
                marginTop: "22px",
                background: "#0b142b",
                borderRadius: "18px",
                padding: "22px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ margin: "0 0 14px 0", fontSize: "17px", lineHeight: "1.6" }}>
                <strong>Reason:</strong> Fee allocation below required threshold for priority routing authorization.
              </p>

              <p style={{ margin: "0 0 14px 0", fontSize: "17px", lineHeight: "1.6" }}>
                <strong>Next Step:</strong> Submit required priority fee top-up to activate escalated liquidity
                routing and execution channel.
              </p>

              <p style={{ margin: "0 0 14px 0", fontSize: "17px", lineHeight: "1.6", color: "#ef4444", fontWeight: 700 }}>
                <strong style={{ color: "#ffffff" }}>Fee Status:</strong> Priority Execution Not Authorized —
                Fee Threshold Unmet
              </p>

              <p style={{ margin: "0 0 14px 0", fontSize: "17px", lineHeight: "1.6" }}>
                <strong>System:</strong> Binance Exchange Validation
              </p>

              <p style={{ margin: 0, fontSize: "17px", lineHeight: "1.6" }}>
                <strong>Timestamp:</strong> 2026-02-25 08:12 (UTC+8)
              </p>
            </div>

            <details style={{ marginTop: "22px", color: "#ffffff" }}>
              <summary style={{ cursor: "pointer", fontSize: "17px" }}>View Full Technical Log</summary>
            </details>

            <p style={{ marginTop: "22px", color: "#9ca3af", fontSize: "15px" }}>
              Powered by CryptoHost Secure Automation
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}