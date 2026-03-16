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
            Manage your CryptoHost subscription, upload files, and monitor
            transactions securely.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
            }}
          >
            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  margin: "0 0 18px 0",
                  fontSize: "24px",
                  color: "#0f172a",
                }}
              >
                Subscription
              </h3>

              <p
                style={{
                  margin: "0 0 22px 0",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.35",
                }}
              >
                Choose your plan before file upload is enabled.
              </p>

              <Link href="/subscription">
                <button
                  style={{
                    background: "#3b6edc",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Choose Subscription
                </button>
              </Link>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  margin: "0 0 18px 0",
                  fontSize: "24px",
                  color: "#0f172a",
                }}
              >
                File Upload
              </h3>

              <p
                style={{
                  margin: "0 0 22px 0",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.35",
                }}
              >
                Upload financial or transaction files after subscription
                activation.
              </p>

              <Link href="/upload">
                <button
                  style={{
                    background: "#3b6edc",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Upload File
                </button>
              </Link>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  margin: "0 0 18px 0",
                  fontSize: "24px",
                  color: "#0f172a",
                }}
              >
                Transaction Monitor
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.35",
                }}
              >
                Track processing updates, verification status, and dashboard
                activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}