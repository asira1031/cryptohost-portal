"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#3b6edc",
            color: "white",
            padding: "18px 24px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Asira CryptoHost Dashboard
        </div>

        <div style={{ padding: "30px 24px" }}>
          <h1
            style={{
              margin: "0 0 10px 0",
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Welcome to Your Dashboard
          </h1>

          <p
            style={{
              margin: "0 0 28px 0",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Upload your financial file and monitor transaction processing.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "18px",
            }}
          >
            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                File Upload
              </h3>

              <p style={{ color: "#64748b", marginBottom: 0 }}>
                Upload financial or transaction files securely to the system.
              </p>

              <Link
                href="/dashboard/upload"
                style={{
                  display: "inline-block",
                  background: "#3b6edc",
                  color: "white",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Upload File
              </Link>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                Transaction Monitor
              </h3>

              <p style={{ color: "#64748b", marginBottom: 0 }}>
                Once paid, the Transaction Monitor activates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}