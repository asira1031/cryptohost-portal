"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#2f66d0",
            color: "#ffffff",
            padding: "18px 24px",
            borderRadius: "14px 14px 0 0",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Asira CryptoHost Dashboard
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "0 0 14px 14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "30px 24px",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "10px",
              fontSize: "34px",
              color: "#111827",
            }}
          >
            Welcome to Your Dashboard
          </h1>

          <p
            style={{
              marginTop: 0,
              marginBottom: "28px",
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Manage your CryptoHost subscription, upload files, and monitor transactions securely.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "22px",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#111827" }}>Subscription</h2>
              <p style={{ color: "#6b7280" }}>
                Choose your plan before file upload is enabled.
              </p>
              <Link
                href="/subscription"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  background: "#2f66d0",
                  color: "#ffffff",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Choose Subscription
              </Link>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "22px",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#111827" }}>File Upload</h2>
              <p style={{ color: "#6b7280" }}>
                Upload financial or transaction files after subscription activation.
              </p>
              <Link
                href="/upload"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  background: "#2f66d0",
                  color: "#ffffff",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Upload File
              </Link>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "22px",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#111827" }}>Transaction Monitor</h2>
              <p style={{ color: "#6b7280" }}>
                Track processing updates, verification status, and dashboard activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}