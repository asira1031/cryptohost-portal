"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function SubscriptionPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleSelect = async (plan: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("clients")
      .update({
        subscription_plan: plan,
        subscription_status: "active",
        subscription_started_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        padding: 40,
      }}
    >
      <h1 style={{ marginBottom: 30 }}>Choose Your Validation Plan</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {/* BASIC */}
        <div style={card}>
          <h2 style={price}>$99</h2>
          <p style={title}>Basic Validation</p>

          <ul style={list}>
            <li>Standard file validation</li>
            <li>Basic monitoring</li>
          </ul>

          <button style={button} onClick={() => handleSelect("basic")}>
            Select Plan
          </button>
        </div>

        {/* ADVANCED */}
        <div style={card}>
          <h2 style={price}>$199</h2>
          <p style={title}>Advanced Validation</p>

          <ul style={list}>
            <li>Enhanced validation</li>
            <li>Faster processing</li>
          </ul>

          <button style={button} onClick={() => handleSelect("advanced")}>
            Select Plan
          </button>
        </div>

        {/* PREMIUM */}
        <div style={card}>
          <h2 style={price}>$299</h2>
          <p style={title}>Full Validation</p>

          <ul style={list}>
            <li>Priority processing</li>
            <li>Full system access</li>
          </ul>

          <button style={button} onClick={() => handleSelect("premium")}>
            Select Plan
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const card: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  padding: 24,
  borderRadius: 14,
  width: 260,
  color: "#fff",
  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
};

const price: React.CSSProperties = {
  color: "#facc15",
  fontSize: "28px",
  marginBottom: 6,
};

const title: React.CSSProperties = {
  color: "#e2e8f0",
  marginBottom: 10,
};

const list: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: 14,
  marginBottom: 16,
};

const button: React.CSSProperties = {
  background: "#facc15",
  color: "#020617",
  border: "none",
  padding: "12px",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
};