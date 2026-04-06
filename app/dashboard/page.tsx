"use client";

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

      // KEEP EXISTING 99.5M REDIRECT
      if (userEmail === "ceo@kerogenresource.com") {
        router.replace("/dashboard/reports/99.5M-PRIORITY-MINT");
        return;
      }

      // KEN AUTO-REDIRECT TO 10B
      if (userEmail === "ken@beautuniverse.com") {
        router.replace("/dashboard/reports/10B");
        return;
      }
    };

    checkUser();
  }, [router]);

  const dashboardLinks = [
    {
  title: "Ken — 99.5M Priority Mint",
  status: "ACTIVE",
  color: "#16a34a",
  href: "/dashboard/reports/99.5M-LP",
  note: "Priority mint dashboard",
},
    {
      title: "Ken — 10B Restricted Review",
      status: "PAID / ACTIVE ACCESS",
      color: "#dc2626",
      href: "/dashboard/reports/10B",
      note: "Ken restricted review file",
    },
    {
      title: "890M Preparation Dashboard",
      status: "PREPARATION",
      color: "#2563eb",
      href: "/dashboard/reports/890M",
      note: "Awaiting execution run",
    },
    {
      title: "TJ Deutsche Bank 1.275B",
      status: "SUSPENDED",
      color: "#d97706",
      href: "/dashboard/reports/TJDB1.275B",
      note: "Re-activation required",
    },
  ];

  const paymentRows = [
    {
      email: "ken@beautuniverse.com",
      amount: "99 USDT",
      plan: "Basic",
      status: "PAID",
      action: "/dashboard/validation",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
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

          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#eef2ff",
              borderRadius: "10px",
              border: "1px solid #c7d2fe",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold", color: "#1e3a8a" }}>
              Need Help?
            </p>
            <p style={{ margin: "5px 0 0 0", color: "#334155" }}>
              Contact our support team:
            </p>

            <a
              href="mailto:asiracryptohost@adminjanspay.com"
              style={{
                color: "#3b6edc",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              asiracryptohost@adminjanspay.com
            </a>
          </div>

          <p
            style={{
              margin: "20px 0 28px 0",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Upload your financial file and monitor transaction processing.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "18px",
            }}
          >
            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                Transaction Monitor
              </h3>

              <p style={{ color: "#64748b", marginBottom: 0 }}>
                Once paid, the Transaction Monitor activates.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "16px",
                }}
              >
                Admin Dashboard Monitor
              </h3>

              <p
                style={{
                  color: "#64748b",
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                Open and monitor all active client dashboards from one place.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "14px",
                }}
              >
                {dashboardLinks.map((item) => (
                  <div
                    key={item.href}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                      background: "#f8fafc",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          display: "inline-block",
                          background: `${item.color}14`,
                          color: item.color,
                          border: `1px solid ${item.color}55`,
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: 800,
                          marginBottom: "8px",
                        }}
                      >
                        {item.status}
                      </div>

                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "14px",
                        }}
                      >
                        {item.note}
                      </div>
                    </div>

                    <a
                      href={item.href}
                      style={{
                        display: "inline-block",
                        background: "#111827",
                        color: "#fff",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Open Dashboard
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "16px",
                }}
              >
                Payment Monitor
              </h3>

              <p
                style={{
                  color: "#64748b",
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                Review paid accounts, subscription plans, and activation targets.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "14px",
                }}
              >
                {paymentRows.map((row) => (
                  <div
                    key={row.email}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                      background: "#f8fafc",
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "4px",
                          }}
                        >
                          Email
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {row.email}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "4px",
                          }}
                        >
                          Amount
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {row.amount}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "4px",
                          }}
                        >
                          Plan
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {row.plan}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "4px",
                          }}
                        >
                          Status
                        </div>
                        <div
                          style={{
                            fontWeight: 800,
                            color: "#16a34a",
                          }}
                        >
                          {row.status}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        href={row.action}
                        style={{
                          display: "inline-block",
                          background: "#2563eb",
                          color: "#fff",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                      >
                        Open Validation
                      </a>

                      <a
                        href="/dashboard/payment?plan=basic"
                        style={{
                          display: "inline-block",
                          background: "#f59e0b",
                          color: "#111827",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                      >
                        Open Payment Page
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                border: "1px solid #d7dce5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  color: "#0f172a",
                  marginTop: 0,
                  marginBottom: "16px",
                }}
              >
                Quick Access
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/dashboard/validation"
                  style={quickLinkStyle}
                >
                  Validation
                </a>

                <a
                  href="/dashboard/payment?plan=basic"
                  style={quickLinkStyle}
                >
                  Payment
                </a>

                <a
                  href="/dashboard/upload"
                  style={quickLinkStyle}
                >
                  Upload
                </a>

                <a
                  href="/dashboard/my-files"
                  style={quickLinkStyle}
                >
                  My Files
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickLinkStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#eef2ff",
  color: "#1e3a8a",
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid #c7d2fe",
};