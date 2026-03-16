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
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            background: "#3b6edc",
            color: "white",
            padding: "14px 20px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Asira CryptoHost Dashboard
        </div>

        <div style={{ padding: "30px" }}>
          <h2>Welcome to Your Dashboard</h2>
          <p>
            Manage your CryptoHost subscription, upload files, and monitor
            transactions securely.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {/* Subscription */}
            <div
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>Subscription</h3>
              <p>Choose your plan before file upload is enabled.</p>

              <Link href="/subscription">
                <button
                  style={{
                    marginTop: "10px",
                    background: "#3b6edc",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "6px",
                  }}
                >
                  Choose Subscription
                </button>
              </Link>
            </div>

            {/* Upload */}
            <div
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>File Upload</h3>
              <p>Upload financial or transaction files after subscription activation.</p>

              <Link href="/upload">
                <button
                  style={{
                    marginTop: "10px",
                    background: "#3b6edc",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "6px",
                  }}
                >
                  Upload File
                </button>
              </Link>
            </div>

            {/* Monitor */}
            <div
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h3>Transaction Monitor</h3>
              <p>Track processing updates, verification status, and dashboard activity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}