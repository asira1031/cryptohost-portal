import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
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
          width: 220,
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
              marginBottom: 20,
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
            <Link href="/dashboard" style={buttonStyle}>
              Dashboard
            </Link>

            <Link href="/dashboard/upload" style={buttonStyle}>
              Upload File
            </Link>

            <Link href="/dashboard/my-files" style={buttonStyle}>
              My Files
            </Link>

            <Link href="/dashboard/subscription" style={buttonStyle}>
              Subscription
            </Link>

            <Link href="/dashboard/fund" style={buttonStyle}>
              💰 Fund Account
            </Link>

            <Link href="/dashboard/blockchain" style={buttonStyle}>
              Blockchain
            </Link>

            <Link href="/dashboard/bank-api" style={buttonStyle}>
              Bank API
            </Link>

            <Link href="/dashboard/security" style={buttonStyle}>
              Security
            </Link>
          </div>
        </div>

        <button
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

const buttonStyle: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  background: "#111111",
  color: "#ffffff",
  padding: "14px 16px",
  borderRadius: 12,
  fontWeight: 700,
};