"use client";

import Link from "next/link";

export default function DashboardPage() {
  const reference = "CH-2026-LIVE";
  const selectedPlan = "Professional";
  const amount = "$499";
  const method = "PayPal";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#2f66d0",
          color: "#ffffff",
          padding: "14px 24px",
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        Asira CryptoHost
      </div>

      <div
        style={{
          maxWidth: "980px",
          margin: "30px auto",
          background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#17a2df",
            color: "#ffffff",
            padding: "18px 20px",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Client Dashboard
        </div>

        <div style={{ padding: "24px" }}>
          <p
            style={{
              color: "#5b6472",
              fontSize: "18px",
              marginTop: 0,
              marginBottom: "24px",
            }}
          >
            Manage your subscription, upload access, processing fee, and file status from one place.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "#eef5fb",
                border: "1px solid #dbe7f3",
                borderRadius: "10px",
                padding: "18px",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Subscription Status
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                Not Active
              </div>
            </div>

            <div
              style={{
                background: "#eef5fb",
                border: "1px solid #dbe7f3",
                borderRadius: "10px",
                padding: "18px",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Processing Fee
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                Pending
              </div>
            </div>

            <div
              style={{
                background: "#eef5fb",
                border: "1px solid #dbe7f3",
                borderRadius: "10px",
                padding: "18px",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Processing Status
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                Waiting for Subscription
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "22px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginTop: 0,
                marginBottom: "12px",
                color: "#111827",
              }}
            >
              Subscription
            </h2>

            <p style={{ color: "#6b7280", marginTop: 0, marginBottom: "18px" }}>
              Select your subscription plan before file upload is enabled.
            </p>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe7f3",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "18px",
              }}
            >
              <p style={{ margin: "0 0 16px 0", color: "#111827", fontSize: "18px" }}>
                <strong>Selected Plan:</strong> {selectedPlan}
              </p>
              <p style={{ margin: "0 0 16px 0", color: "#111827", fontSize: "18px" }}>
                <strong>Amount:</strong> {amount}
              </p>
              <p style={{ margin: 0, color: "#111827", fontSize: "18px" }}>
                <strong>Method:</strong> {method}
              </p>
            </div>

            <Link
              href="/subscribe"
              style={{
                display: "inline-block",
                background: "#2f66d0",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Choose Subscription
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginTop: 0,
                marginBottom: "12px",
                color: "#111827",
              }}
            >
              File Status
            </h2>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe7f3",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "18px",
              }}
            >
              <p style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#111827" }}>
                <strong>Current Status:</strong> Waiting for Subscription
              </p>
              <p style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#111827" }}>
                <strong>Reference:</strong> {reference}
              </p>
              <p style={{ margin: 0, fontSize: "18px", color: "#111827" }}>
                <strong>Result Page:</strong> Available after processing
              </p>
            </div>

            <Link
              href={`/result/${reference}`}
              style={{
                display: "inline-block",
                background: "#d1d5db",
                color: "#111827",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View File Result
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}