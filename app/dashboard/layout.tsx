"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>CryptoHost</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link href="/dashboard/upload" style={linkStyle}>Upload File</Link>
          <Link href="/dashboard/reports" style={linkStyle}>Reports</Link>
          <Link href="/dashboard/subscription" style={linkStyle}>Subscription</Link>
          <Link href="/dashboard/fund" style={linkStyle}>💰 Fund Account</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f4f4f4",
          color: "#111",
        }}
      >
        {children}
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "6px",
  background: "#222",
};