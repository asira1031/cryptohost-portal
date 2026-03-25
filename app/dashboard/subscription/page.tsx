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

    await supabase.from("clients").update({
      subscription_plan: plan,
      subscription_status: "active",
      subscription_started_at: new Date().toISOString(),
    }).eq("id", user.id);

    router.push("/dashboard");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 30 }}>Choose Your Validation Plan</h1>

      <div style={{ display: "flex", gap: 20 }}>
        
        {/* BASIC */}
        <div style={card}>
          <h2>$99</h2>
          <p>Basic Validation</p>
          <ul>
            <li>Standard file validation</li>
            <li>Basic monitoring</li>
          </ul>
          <button onClick={() => handleSelect("basic")}>Select</button>
        </div>

        {/* ADVANCED */}
        <div style={card}>
          <h2>$199</h2>
          <p>Advanced Validation</p>
          <ul>
            <li>Enhanced validation</li>
            <li>Faster processing</li>
          </ul>
          <button onClick={() => handleSelect("advanced")}>Select</button>
        </div>

        {/* PREMIUM */}
        <div style={card}>
          <h2>$299</h2>
          <p>Full Validation</p>
          <ul>
            <li>Priority processing</li>
            <li>Full system access</li>
          </ul>
          <button onClick={() => handleSelect("premium")}>Select</button>
        </div>

      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: 20,
  borderRadius: 10,
  width: 250,
};