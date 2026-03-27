"use client";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 99,
    description: [
      "Valid for 10 days",
      "Up to 3 file uploads only",
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
      "Valid for 20 days",
      "Up to 6 file uploads only",
      "Everything in Starter",
      "Priority transaction processing",
      "Advanced monitoring dashboard",
      "Faster blockchain updates",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 299,
    description: [
      "Valid for 30 days",
      "Up to 10 file uploads only",
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
    window.location.href = `/payment?plan=${plan.id}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bitcoin.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 22, 48, 0.78)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Asira CryptoHost
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/login"
                style={{
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                Login
              </a>

              <a
                href="/signup"
                style={{
                  textDecoration: "none",
                  background: "#3568cf",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </a>

              <a
                href="/dashboard"
                style={{
                  textDecoration: "none",
                  background: "#ffffff",
                  color: "#111827",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </a>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "44px",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "64px",
                fontWeight: "bold",
                margin: "0 0 16px 0",
                lineHeight: 1.1,
              }}
            >
              Choose Your CryptoHost Subscription
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "22px",
                maxWidth: "900px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Select a secure subscription plan for blockchain payment
              verification, transaction monitoring, client portal access, and
              financial file processing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
              alignItems: "stretch",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: "rgba(0, 24, 56, 0.88)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "18px",
                  padding: "28px",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <h2
                  style={{
                    color: "#ffffff",
                    marginTop: 0,
                    marginBottom: "14px",
                    fontSize: "22px",
                  }}
                >
                  {plan.name}
                </h2>

                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  ${plan.price}
                </div>

                <div
                  style={{
                    color: "#9ec5ff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {plan.id === "starter" && "10 DAYS • 3 FILES MAX"}
                  {plan.id === "professional" && "20 DAYS • 6 FILES MAX"}
                  {plan.id === "enterprise" && "30 DAYS • 10 FILES MAX"}
                </div>

                <ul
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.9,
                    paddingLeft: "22px",
                    marginBottom: "28px",
                  }}
                >
                  {plan.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <div
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                  }}
                >
                  Access remains active until the plan expires or the file limit
                  is reached, whichever comes first.
                </div>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    color: "#111827",
                    border: "none",
                    padding: "16px 18px",
                    borderRadius: "10px",
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
    </div>
  );
}