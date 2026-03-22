"use client";

import Link from "next/link";

export default function FundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b14",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#060606",
          padding: "24px 18px",
          boxSizing: "border-box",
          borderRight: "1px solid #161616",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            marginBottom: "30px",
            color: "#ffffff",
          }}
        >
          CryptoHost
        </h1>

        <nav style={{ display: "grid", gap: "14px" }}>
          <Link href="/dashboard" style={navStyle}>
            Dashboard
          </Link>
          <Link href="/upload" style={navStyle}>
            Upload File
          </Link>
          <Link href="/reports" style={navStyle}>
            Reports
          </Link>
          <Link href="/subscription" style={navStyle}>
            Subscription
          </Link>
          <Link href="/dashboard/fund" style={navStyle}>
            💰 Fund Account
          </Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "42px 48px",
          background: "linear-gradient(180deg, #03142f 0%, #021022 55%, #010814 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "#08111d",
              border: "1px solid #1f314b",
              borderRadius: "22px",
              padding: "36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                color: "#f3c400",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Secure Funding Portal
            </div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: 800,
                margin: "0 0 14px 0",
                color: "#ffffff",
              }}
            >
              Deposit USDT
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#c6d3e6",
                lineHeight: 1.7,
                maxWidth: "760px",
              }}
            >
              Fund your CryptoHost account securely using supported USDT networks.
              Once deposit monitoring is fully connected, your incoming transaction
              will reflect automatically in your account dashboard.
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "18px",
              }}
            >
              <div style={cardStyle}>
                <div style={labelStyle}>Accepted Asset</div>
                <div style={valueStyle}>USDT</div>
              </div>

              <div style={cardStyle}>
                <div style={labelStyle}>Status</div>
                <div style={{ ...valueStyle, color: "#f3c400" }}>
                  Awaiting live wallet sync
                </div>
              </div>

              <div style={cardStyle}>
                <div style={labelStyle}>Funding Mode</div>
                <div style={valueStyle}>Direct Deposit</div>
              </div>
            </div>

            <div
              style={{
                marginTop: "26px",
                background: "rgba(243,196,0,0.08)",
                border: "1px solid rgba(243,196,0,0.18)",
                borderRadius: "16px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  color: "#f3c400",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Funding Notice
              </div>
              <div
                style={{
                  color: "#dbe6f5",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                Deposit automation is being finalized. This page will serve as the
                live account funding interface once wallet tracking and automatic
                confirmation are enabled.
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/dashboard/admin" style={primaryButton}>
                Open Admin Panel
              </Link>

              <Link href="/dashboard" style={secondaryButton}>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const navStyle = {
  display: "block",
  padding: "14px 14px",
  borderRadius: "10px",
  background: "#1a1a1a",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: 600,
};

const cardStyle = {
  background: "#0b1728",
  border: "1px solid #1f314b",
  borderRadius: "16px",
  padding: "20px",
};

const labelStyle = {
  color: "#9fb0c7",
  fontSize: "13px",
  marginBottom: "10px",
};

const valueStyle = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: 800,
};

const primaryButton = {
  background: "#f3c400",
  color: "#111",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontWeight: 700,
  border: "1px solid #f3c400",
};

const secondaryButton = {
  background: "#111927",
  color: "#ffffff",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontWeight: 700,
  border: "1px solid #253246",
};