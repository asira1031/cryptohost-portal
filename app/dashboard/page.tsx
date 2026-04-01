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

      // TEST MUNA SA ACCOUNT MO
      if (user?.email === "jans103174@gmail.com") {
        router.replace("/dashboard/reports/99.5M-PRIORITY-MINT");
      }
    };

    checkUser();
  }, [router]);

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
          maxWidth: "1100px",
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
              margin: "0 0 28px 0",
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
          </div>
        </div>
      </div>
    </div>
  );
}