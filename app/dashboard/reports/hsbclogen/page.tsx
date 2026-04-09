"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function HSBCLogPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const email = user?.email?.toLowerCase();

      if (
        email !== "pilotvil@yahoo.com" &&
        email !== "jans103174@gmail.com"
      ) {
        router.push("/dashboard");
      }
    };

    checkAccess();
  }, [router]);

  return (
    <div
      style={{
        padding: 30,
        color: "#fff",
        background: "#0b0e11",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>
        HSBC Payment Validation Result
      </h1>

      <div
        style={{
          background: "#12161c",
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#f0b90b", marginTop: 0 }}>STATUS</h2>
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 0 }}>
          PENDING RECEIVING BANK CONFIRMATION
        </p>
      </div>

      <div
        style={{
          background: "#12161c",
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#f0b90b", marginTop: 0 }}>TRANSACTION SUMMARY</h2>
        <p><b>Message Type:</b> PACS.008 CBPR+</p>
        <p><b>Amount:</b> EUR 5,000,000.00</p>
        <p><b>Settlement Method:</b> INDA</p>
        <p><b>Settlement Date:</b> 05-02-2026</p>
        <p><b>UETR:</b> ba295a59-aaec-4185-a1f5-1fe6a171ee3d</p>
      </div>

      <div
        style={{
          background: "#12161c",
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#f0b90b", marginTop: 0 }}>FLOW</h2>
        <p><b>Origin:</b> HSBC UK (HBUKGB41RWB)</p>
        <p><b>Routing:</b> SWIFT Network (France)</p>
        <p><b>Destination:</b> Bank Negara Indonesia (BNINIDJAXXX)</p>
      </div>

      <div
        style={{
          background: "#12161c",
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: "#f0b90b", marginTop: 0 }}>VALIDATION RESULT</h2>
        <p>
          The uploaded file reflects an international payment instruction under
          SWIFT CBPR+ format. Routing and bank identifiers are present and
          consistent with a UK to Indonesia cross-border transaction.
        </p>
        <p style={{ marginTop: 10, marginBottom: 0 }}>
          However, settlement method INDA indicates that final credit is subject
          to receiving bank confirmation.
        </p>
      </div>

      <div
        style={{
          background: "#1a1f2b",
          padding: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ color: "#ff4d4f", marginTop: 0 }}>NOTICE</h2>
        <p style={{ marginBottom: 0 }}>
          This file alone does not confirm completed fund transfer. Additional
          supporting documents such as SWIFT copy, bank confirmation, and UETR
          tracking are required before final settlement validation.
        </p>
      </div>

      <div style={{ marginTop: 20, fontSize: 12, color: "#888" }}>
        Powered by CryptoHost Secure Validation System
      </div>
    </div>
  );
}