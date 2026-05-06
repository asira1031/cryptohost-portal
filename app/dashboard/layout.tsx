"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#03113a",
      }}
    >
      <aside
        style={{
          width: 245,
          background: "#000000",
          padding: "20px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 16,
              paddingLeft: 6,
            }}
          >
            CryptoHost
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
            
          >
            <Link href="/dashboard" style={getStyle("/dashboard", pathname)}>
              Dashboard
            </Link>
          
            <a
  href="https://cryptohost-wallet-dw3e.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "block",
    textDecoration: "none",
    background: "#111111",
    color: "#ffffff",
    padding: "14px 16px",
    borderRadius: 12,
    fontWeight: 700,
  }}
>
  CryptoHost Wallet
</a>

            <Link
              href="/dashboard/client-information"
              style={getStyle("/dashboard/client-information", pathname)}
            >
              Client Information
            </Link>

            <Link
              href="/dashboard/upload"
              style={getStyle("/dashboard/upload", pathname)}
            >
              SFTP / Server Access
            </Link>

            <Link
              href="/dashboard/upload-to-server"
              style={getStyle("/dashboard/upload-to-server", pathname)}
            >
              Upload to Server
            </Link>

            <Link
              href="/dashboard/my-files"
              style={getStyle("/dashboard/my-files", pathname)}
            >
              My Files
            </Link>

            <Link
              href="/dashboard/subscription"
              style={getStyle("/dashboard/subscription", pathname)}
            >
              Subscription
            </Link>

            <Link
              href="/dashboard/validation"
              style={getStyle("/dashboard/validation", pathname)}
            >
              Validation
            </Link>

            <Link
              href="/dashboard/fund"
              style={getStyle("/dashboard/fund", pathname)}
            >
              💰 Fund Account
            </Link>

            <Link
              href="/dashboard/blockchain"
              style={getStyle("/dashboard/blockchain", pathname)}
            >
              Blockchain
            </Link>

            <Link
              href="/dashboard/bank-api"
              style={getStyle("/dashboard/bank-api", pathname)}
            >
              Bank API
            </Link>

            <Link
              href="/dashboard/security"
              style={getStyle("/dashboard/security", pathname)}
            >
              Security
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#ffffff",
            border: "none",
            borderRadius: 12,
            padding: "14px 18px",
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "#03113a",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function getStyle(path: string, current: string): React.CSSProperties {
  const isActive = current === path;

  return {
    display: "block",
    textDecoration: "none",
    background: isActive ? "#1d4ed8" : "#111111",
    color: "#ffffff",
    padding: "14px 16px",
    borderRadius: 12,
    fontWeight: 700,
    transition: "0.2s",
    boxShadow: isActive ? "0 0 0 1px rgba(255,255,255,0.08) inset" : "none",
  };
}