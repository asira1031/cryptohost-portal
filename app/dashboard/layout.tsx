"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

type ClientProfile = {
  email?: string | null;
  receiving_wallet?: string | null;
  wallet_address?: string | null;
  status?: string | null;
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [clientEmail, setClientEmail] = useState("Loading...");
  const [wallet, setWallet] = useState("Not set");
  const [accountStatus, setAccountStatus] = useState("Verified");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadClientInfo() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setClientEmail("Not signed in");
        setWallet("Not set");
        setAccountStatus("Guest");
        return;
      }

      setClientEmail(user.email || "No email");

      const { data: clientRow } = await supabase
        .from("clients")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (clientRow) {
        const profile = clientRow as ClientProfile;

        const foundWallet =
          profile.receiving_wallet || profile.wallet_address || "Not set";

        setWallet(foundWallet);
        setAccountStatus(profile.status || "Verified");
      }
    }

    loadClientInfo();
  }, [supabase]);

  async function handleLogout() {
    setLoggingOut(true);
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

          {/* Client Info Card */}
          <div
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: 14,
              marginBottom: 16,
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                color: "#93c5fd",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.4,
              }}
            >
              Client Information
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 3 }}>
                Email
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  wordBreak: "break-word",
                }}
              >
                {clientEmail}
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 3 }}>
                Receiving Wallet
              </div>
              <div
                style={{
                  color: "#facc15",
                  fontSize: 12,
                  fontWeight: 700,
                  wordBreak: "break-word",
                  lineHeight: 1.4,
                }}
              >
                {wallet}
              </div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 3 }}>
                Status
              </div>
              <div
                style={{
                  color: "#4ade80",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {accountStatus}
              </div>
            </div>
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

            <Link
              href="/dashboard/upload"
              style={getStyle("/dashboard/upload", pathname)}
            >
              Upload File
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

            <Link href="/dashboard/fund" style={getStyle("/dashboard/fund", pathname)}>
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
          disabled={loggingOut}
          style={{
            background: "#ef4444",
            color: "#ffffff",
            border: "none",
            borderRadius: 12,
            padding: "14px 18px",
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
            opacity: loggingOut ? 0.8 : 1,
          }}
        >
          {loggingOut ? "Logging out..." : "Logout"}
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