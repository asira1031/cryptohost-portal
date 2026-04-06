"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
  const checkUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userEmail = (user?.email || "").toLowerCase();

    if (!userEmail) return;

    // 🔥 NEW: check DB assignment
    const { data: client } = await supabase
      .from("client_dashboard_access")
      .select("*")
      .eq("email", userEmail)
      .single();

    // ✅ If found in DB → use DB redirect
    if (client && client.access_enabled && client.payment_status === "PAID") {
      router.replace(`/dashboard/reports/${client.assigned_dashboard}`);
      return;
    }

    // ⚠️ FALLBACK (KEEP YOUR OLD LOGIC SAFE)
    if (userEmail === "ken@example.com") {
      router.replace("/dashboard/reports/10B");
      return;
    }

    if (userEmail === "ceo@kerogenresource.com") {
      router.replace("/dashboard/reports/10B");
      return;
    }
  };

  checkUser();
}, [router]);
  const quickLinkStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 16px",
    background: "#07142b",
    color: "#ffffff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  };

  const dashboardLinks = [
    {
      title: "Ken — 99.5M LP",
      status: "ACTIVE",
      color: "#16a34a",
      href: "/dashboard/reports/99.5M-LP",
      note: "Liquidity dashboard",
    },
    {
      title: "Ken — 10B Restricted Review",
      status: "PAID / ACTIVE ACCESS",
      color: "#dc2626",
      href: "/dashboard/reports/10B",
      note: "Ken restricted review file",
    },
    {
      title: "890M Dashboard",
      status: "ACTIVE",
      color: "#2563eb",
      href: "/dashboard/reports/890M",
      note: "890M client dashboard",
    },
    {
      title: "TJDB1.275B Dashboard",
      status: "ACTIVE",
      color: "#7c3aed",
      href: "/dashboard/reports/TJDB1.275B",
      note: "TJDB 1.275B dashboard",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: 24,
            background: "#ffffff",
            border: "1px solid #dbe3ef",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: "#07142b",
            }}
          >
            CryptoHost Dashboard
          </h1>

          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#5b6472",
              fontSize: 16,
            }}
          >
            Open and monitor active client dashboards from one place.
          </p>
        </div>

        <div
          style={{
            marginBottom: 24,
            background: "#ffffff",
            border: "1px solid #dbe3ef",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 18,
              fontSize: 22,
              fontWeight: 700,
              color: "#07142b",
            }}
          >
            Quick Links
          </h2>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a href="/dashboard/payment?plan=basic" style={quickLinkStyle}>
              Payment
            </a>

            <a href="/dashboard/upload" style={quickLinkStyle}>
              Upload
            </a>

            <a href="/dashboard/my-files" style={quickLinkStyle}>
              My Files
            </a>

            <a href="/dashboard/subscription" style={quickLinkStyle}>
              Subscription
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {dashboardLinks.map((item) => (
            <div
              key={item.href}
              style={{
                border: "1px solid #dbe3ef",
                borderRadius: 18,
                padding: 24,
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 280 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#07142b",
                  }}
                >
                  {item.title}
                </h3>

                <div
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    marginBottom: 12,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: `${item.color}20`,
                    color: item.color,
                    fontWeight: 700,
                    fontSize: 13,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.status}
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#5b6472",
                    fontSize: 15,
                  }}
                >
                  {item.note}
                </p>
              </div>

              <Link
                href={item.href}
                style={{
                  background: "#07142b",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 22px",
                  borderRadius: 12,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 10,
                  pointerEvents: "auto",
                  minWidth: 160,
                }}
              >
                Open Dashboard
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}