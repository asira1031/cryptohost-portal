"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          background: "#0a0a0a",
          color: "#fff",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>CryptoHost</h2>

        <Link href="/dashboard">
          <div style={navStyle}>Dashboard</div>
        </Link>

        <Link href="/dashboard/fund">
          <div style={navStyle}>Upload File</div>
        </Link>

        <Link href="/dashboard/reports">
          <div style={navStyle}>Reports</div>
        </Link>

        <Link href="/dashboard/subscription">
          <div style={navStyle}>Subscription</div>
        </Link>

        <Link href="/dashboard/account">
          <div style={navStyle}>💰 Fund Account</div>
        </Link>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "12px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#f3f4f6", padding: 24 }}>
        {children}
      </div>
    </div>
  );
}

const navStyle: React.CSSProperties = {
  padding: "10px 12px",
  marginBottom: 10,
  borderRadius: 8,
  background: "#1f2937",
  cursor: "pointer",
};