"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const plan = params.get("plan") || "basic";

  const planInfo = useMemo(() => {
    const plans: Record<
      string,
      {
        amount: number;
        title: string;
        shortLabel: string;
        description: string;
        includes: string[];
        limitations: string[];
      }
    > = {
      basic: {
        amount: 99,
        title: "Basic Validation",
        shortLabel: "BASIC",
        description:
          "This plan is designed for initial financial file review and validation. It helps determine whether the submitted file appears to be a legitimate financial document based on structure, presentation, and basic processing readiness.",
        includes: [
          "Initial validation of the submitted financial file",
          "Basic review of document format and presentation",
          "Preliminary processing suitability check",
          "Basic status review for possible next-step handling",
        ],
        limitations: [
          "Does not include conversion approval",
          "Does not include advanced compliance review",
          "Does not include priority handling or full workflow verification",
        ],
      },
      advanced: {
        amount: 199,
        title: "Advanced Validation",
        shortLabel: "ADVANCED",
        description:
          "This plan is intended for deeper evaluation of the submitted file and its operational potential. It helps assess whether the file is more workable for processing and whether conversion readiness may proceed to the next review level.",
        includes: [
          "Enhanced validation and financial file assessment",
          "Deeper review of document consistency and processing structure",
          "Stronger readiness check for workflow handling",
          "Advanced indication of conversion workability",
        ],
        limitations: [
          "Does not guarantee final conversion approval",
          "Does not include full priority execution",
          "May still require final internal review before activation",
        ],
      },
      premium: {
        amount: 299,
        title: "Full Validation",
        shortLabel: "FULL",
        description:
          "This plan is for the most complete validation level. It is designed for files requiring a broader processing review, stronger workflow assessment, and priority evaluation for whether conversion and next-stage handling may be approved if the file is workable.",
        includes: [
          "Full validation and priority-level review",
          "Broad assessment of legitimacy and workflow readiness",
          "Evaluation for conversion workability and approval pathway",
          "Priority handling within the validation queue",
        ],
        limitations: [
          "Final approval still depends on actual file condition and review outcome",
          "Does not automatically guarantee release or conversion success",
          "Additional requirements may still be requested if needed",
        ],
      },
    };

    return plans[plan] || plans.basic;
  }, [plan]);

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
    <div style={pageWrap}>
      <div style={contentWrap}>
        <div style={infoPanel}>
          <div style={badge}>Validation Payment Gateway</div>

          <h1 style={mainHeading}>{planInfo.title}</h1>

          <p style={leadText}>{planInfo.description}</p>

          <div style={sectionCard}>
            <h3 style={sectionTitle}>What this plan includes</h3>
            <ul style={listStyle}>
              {planInfo.includes.map((item) => (
                <li key={item} style={listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={sectionCard}>
            <h3 style={sectionTitle}>Plan limitations</h3>
            <ul style={listStyle}>
              {planInfo.limitations.map((item) => (
                <li key={item} style={listItemMuted}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={paymentPanel}>
          <div style={paymentBadge}>USDT Payment</div>

          <h2 style={paymentHeading}>Selected Plan: {planInfo.shortLabel}</h2>

          <p style={amountText}>Amount: {planInfo.amount} USDT</p>

          <div style={walletBox}>
            <p style={walletLabel}>Send USDT (ERC20 / BEP20)</p>
            <p style={walletAddressStyle}>{walletAddress}</p>
          </div>

          <p style={noteText}>
            Please complete the USDT payment to activate this validation level.
            After sending the payment, click the confirmation button below to
            proceed to your dashboard.
          </p>

          <button style={button} onClick={confirmPayment} disabled={loading}>
            {loading ? "Processing..." : "I Have Paid"}
          </button>
        </div>
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

const pageWrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "#020617",
  padding: "40px 32px",
};

const contentWrap: React.CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.3fr 0.9fr",
  gap: 28,
  alignItems: "start",
};

const infoPanel: React.CSSProperties = {
  background: "#08152d",
  border: "1px solid #173056",
  borderRadius: 18,
  padding: 28,
  boxShadow: "0 10px 35px rgba(0,0,0,0.30)",
};

const paymentPanel: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 18,
  padding: 28,
  color: "#fff",
  boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
  position: "sticky",
  top: 24,
};

const badge: React.CSSProperties = {
  display: "inline-block",
  background: "#1f2b15",
  color: "#facc15",
  border: "1px solid #4d5d18",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 18,
};

const paymentBadge: React.CSSProperties = {
  display: "inline-block",
  background: "#1f2b15",
  color: "#facc15",
  border: "1px solid #4d5d18",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 16,
};

const mainHeading: React.CSSProperties = {
  margin: 0,
  marginBottom: 14,
  color: "#f8fafc",
  fontSize: 36,
  lineHeight: 1.15,
};

const paymentHeading: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 10,
  color: "#f8fafc",
  fontSize: 28,
};

const leadText: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 22,
  color: "#cbd5e1",
  lineHeight: 1.75,
  fontSize: 16,
};

const sectionCard: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 14,
  padding: 20,
  marginBottom: 18,
};

const sectionTitle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  color: "#facc15",
  fontSize: 18,
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
};

const listItem: React.CSSProperties = {
  color: "#e2e8f0",
  marginBottom: 10,
  lineHeight: 1.6,
};

const listItemMuted: React.CSSProperties = {
  color: "#94a3b8",
  marginBottom: 10,
  lineHeight: 1.6,
};

const amountText: React.CSSProperties = {
  fontSize: 34,
  color: "#facc15",
  fontWeight: 800,
  marginTop: 0,
  marginBottom: 18,
};

const walletBox: React.CSSProperties = {
  background: "#111827",
  border: "1px solid #1e293b",
  padding: 16,
  borderRadius: 12,
  marginTop: 12,
  marginBottom: 18,
};

const walletLabel: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 10,
  color: "#e2e8f0",
  fontWeight: 600,
};

const walletAddressStyle: React.CSSProperties = {
  wordBreak: "break-all",
  fontWeight: "bold",
  color: "#ffffff",
  lineHeight: 1.7,
  margin: 0,
};

const noteText: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: 14,
  lineHeight: 1.7,
  marginBottom: 18,
};

const button: React.CSSProperties = {
  background: "#facc15",
  color: "#020617",
  padding: "14px",
  borderRadius: 10,
  border: "none",
  fontWeight: "bold",
  width: "100%",
  cursor: "pointer",
  fontSize: 16,
};