"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navStyle = (href: string): React.CSSProperties => ({
    display: "block",
    padding: "14px 16px",
    marginBottom: 14,
    borderRadius: 8,
    background: pathname === href ? "#1f2937" : "#171717",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 500,
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      <aside
        style={{
          width: 180,
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "20px 12px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 18,
            padding: "0 6px",
          }}
        >
          CryptoHost
        </div>

        <Link href="/dashboard" style={navStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/dashboard/fund" style={navStyle("/dashboard/fund")}>
          Upload File
        </Link>

        <Link href="/dashboard/reports" style={navStyle("/dashboard/reports")}>
          Reports
        </Link>

        <Link
          href="/dashboard/subscription"
          style={navStyle("/dashboard/subscription")}
        >
          Subscription
        </Link>

        <Link href="/dashboard/fund" style={navStyle("/dashboard/fund")}>
          💰 Fund Account
        </Link>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "12px 14px",
            borderRadius: 8,
            border: "none",
            background: "#dc2626",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}