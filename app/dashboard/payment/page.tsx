"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const plan = params.get("plan") || "basic";

  const prices: Record<string, number> = {
    basic: 99,
    advanced: 199,
    premium: 299,
  };

  const amount = prices[plan] || 99;
  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const confirmPayment = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("clients")
      .update({
        subscription_plan: plan,
        subscription_status: "active",
        subscription_started_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={{ marginTop: 0 }}>USDT Payment</h1>

        <p>
          Selected Plan: <b>{plan.toUpperCase()}</b>
        </p>

        <p style={{ fontSize: 22, color: "#facc15", fontWeight: "bold" }}>
          Amount: {amount} USDT
        </p>

        <div style={box}>
          <p style={{ marginTop: 0 }}>Send USDT (ERC20 / BEP20)</p>
          <p style={{ wordBreak: "break-all", fontWeight: "bold" }}>
            {walletAddress}
          </p>
        </div>

        <p style={{ color: "#94a3b8", fontSize: 13 }}>
          After sending payment, click confirm below.
        </p>

        <button style={button} onClick={confirmPayment} disabled={loading}>
          {loading ? "Processing..." : "I Have Paid"}
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#020617",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading payment...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
};

const card: React.CSSProperties = {
  background: "#0f172a",
  padding: 30,
  borderRadius: 14,
  width: 400,
  color: "#fff",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
};

const box: React.CSSProperties = {
  background: "#111827",
  padding: 12,
  borderRadius: 8,
  marginTop: 15,
  marginBottom: 15,
  border: "1px solid #1e293b",
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