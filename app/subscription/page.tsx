"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

const plans = [
  {
    name: "Starter",
    price: 10,
    description: "Ideal for basic portal access and first-level client onboarding.",
    features: [
      "Secure client account access",
      "Basic dashboard visibility",
      "Single file upload access",
      "Standard transaction viewing",
    ],
  },
  {
    name: "Professional",
    price: 20,
    description: "Best for active clients needing more workflow access and monitoring tools.",
    features: [
      "Everything in Starter",
      "Multiple file uploads",
      "Priority dashboard access",
      "Transaction monitoring tools",
      "Enhanced subscription support",
    ],
  },
  {
    name: "Enterprise",
    price: 50,
    description: "Full access for premium clients managing larger and ongoing transactions.",
    features: [
      "Everything in Professional",
      "Full dashboard access",
      "Advanced transaction monitoring",
      "Priority processing visibility",
      "Premium client support",
      "Best option for ongoing financial file handling",
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChoosePlan = async (planName: string, price: number) => {
    setSelectedPlan(planName);
    setMessage("");
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to choose a subscription.");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("clients")
        .update({
          subscription_plan: planName,
          subscription_amount: price,
        })
        .eq("id", user.id);

      if (error) {
        setMessage(`Subscription update failed: ${error.message}`);
        setLoading(false);
        return;
      }

      setMessage(`${planName} plan selected successfully.`);
      setLoading(false);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      setMessage(`Subscription update failed: ${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#dfe5eb",
        fontFamily: "Arial, sans-serif",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#3568cf",
            color: "#ffffff",
            padding: "26px 30px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Choose Your CryptoHost Subscription
        </div>

        <div style={{ padding: "36px 30px 40px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Subscription Plans
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: "34px",
              fontSize: "18px",
              color: "#6b7280",
              maxWidth: "900px",
            }}
          >
            Select the subscription plan that matches your CryptoHost client access level.
            Your subscription enables dashboard tools, upload access, and transaction monitoring features.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  border: selectedPlan === plan.name ? "2px solid #3568cf" : "1px solid #d1d9e6",
                  borderRadius: "18px",
                  padding: "26px",
                  background: selectedPlan === plan.name ? "#f4f8ff" : "#ffffff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {plan.name}
                </h2>

                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "34px",
                    fontWeight: "bold",
                    color: "#3568cf",
                  }}
                >
                  ${plan.price}
                </div>

                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "16px",
                    color: "#6b7280",
                    lineHeight: 1.5,
                  }}
                >
                  {plan.description}
                </p>

                <div style={{ marginTop: "18px" }}>
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        marginBottom: "10px",
                        fontSize: "15px",
                        color: "#374151",
                      }}
                    >
                      • {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleChoosePlan(plan.name, plan.price)}
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "24px",
                    padding: "14px",
                    background: "#3568cf",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "17px",
                    fontWeight: "bold",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.8 : 1,
                  }}
                >
                  {loading && selectedPlan === plan.name
                    ? "Processing..."
                    : `Choose ${plan.name}`}
                </button>
              </div>
            ))}
          </div>

          {message && (
            <p
              style={{
                marginTop: "24px",
                fontSize: "16px",
                color: message.toLowerCase().includes("failed") ? "red" : "green",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}