"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const plan = params.get("plan");

  const prices: any = {
    basic: 99,
    advanced: 199,
    premium: 299,
  };

  const amount = prices[plan || "basic"];

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const [loading, setLoading] = useState(false);

  const confirmPayment = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("clients").update({
      subscription_plan: plan,
      subscription_status: "active",
      subscription_started_at: new Date().toISOString(),
    }).eq("id", user.id);

    router.push("/dashboard");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>USDT Payment</h1>

        <p>Selected Plan: <b>{plan?.toUpperCase()}</b></p>

        <p style={{ fontSize: 22, color: "#facc15" }}>
          Amount: {amount} USDT
        </p>

        <div style={box}>
          <p>Send USDT (ERC20 / BEP20)</p>
          <p style={{ wordBreak: "break-all", fontWeight: "bold" }}>
            {walletAddress}
          </p>
        </div>

        <p style={{ color: "#94a3b8", fontSize: 13 }}>
          After sending payment, click confirm below.
        </p>

        <button style={button} onClick={confirmPayment}>
          {loading ? "Processing..." : "I Have Paid"}
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card: React.CSSProperties = {
  background: "#0f172a",
  padding: 30,
  borderRadius: 14,
  width: 400,
  color: "#fff",
  textAlign: "center",
};

const box: React.CSSProperties = {
  background: "#111827",
  padding: 12,
  borderRadius: 8,
  marginTop: 15,
  marginBottom: 15,
};

const button: React.CSSProperties = {
  background: "#facc15",
  color: "#020617",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  fontWeight: "bold",
  width: "100%",
  cursor: "pointer",
};