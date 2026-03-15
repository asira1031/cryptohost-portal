"use client";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 99,
    description: [
      "Client portal dashboard",
      "Upload transaction files",
      "Basic transaction monitoring",
      "Blockchain verification tracking",
      "Secure encrypted data storage",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional Plan",
    price: 199,
    description: [
      "Everything in Starter",
      "Priority transaction processing",
      "Advanced monitoring dashboard",
      "Multiple file upload support",
      "Faster blockchain updates",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 299,
    description: [
      "Everything in Professional",
      "Full client transaction suite",
      "Dedicated processing lane",
      "High-priority file handling",
      "Enhanced compliance support",
      "Premium account assistance",
    ],
  },
];

export default function SubscriptionPage() {
  const handleChoosePlan = (plan: (typeof plans)[0]) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    window.location.href = `/signup?plan=${plan.id}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ececec",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#2d66d3",
          color: "white",
          padding: "22px 28px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Subscription Plans
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <p style={{ marginBottom: "30px", fontSize: "17px", color: "#222" }}>
          Select a subscription plan and payment method to activate your
          CryptoHost client portal access.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: "white",
                borderRadius: "14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                padding: "28px",
                border: "1px solid #d9d9d9",
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "24px",
                  color: "#2d66d3",
                }}
              >
                {plan.name}
              </h2>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "bold",
                  color: "#111",
                  marginBottom: "18px",
                }}
              >
                ${plan.price}
              </div>

              <ul
                style={{
                  paddingLeft: "20px",
                  marginBottom: "24px",
                  color: "#333",
                  lineHeight: "1.8",
                }}
              >
                {plan.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plan)}
                style={{
                  width: "100%",
                  background: "#2d66d3",
                  color: "white",
                  border: "none",
                  padding: "14px 18px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}