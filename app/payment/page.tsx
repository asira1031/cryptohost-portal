"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const params = useSearchParams();
  const plan = params.get("plan");

  const planLabel =
    plan === "starter"
      ? "Starter Plan"
      : plan === "professional"
      ? "Professional Plan"
      : "Enterprise Plan";

  const price =
    plan === "starter"
      ? "$99"
      : plan === "professional"
      ? "$199"
      : "$299";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#2f66d0",
            color: "#ffffff",
            padding: "22px 28px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          CryptoHost Payment
        </div>

        <div style={{ padding: "30px 28px" }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: "10px",
              fontSize: "34px",
              color: "#111827",
            }}
          >
            Activate Subscription
          </h1>

          <p
            style={{
              marginTop: 0,
              marginBottom: "24px",
              color: "#6b7280",
              fontSize: "17px",
            }}
          >
            Complete your payment to activate your CryptoHost client portal access.
          </p>

          <div
            style={{
              border: "2px solid #2f66d0",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "28px",
              background: "#f8fbff",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#2f66d0",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              SELECTED PLAN
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {planLabel}
            </div>

            <div
              style={{
                fontSize: "40px",
                fontWeight: 700,
                color: "#2f66d0",
                marginTop: "6px",
              }}
            >
              {price}
            </div>
          </div>

          <h2
            style={{
              fontSize: "24px",
              marginBottom: "16px",
              color: "#111827",
            }}
          >
            Choose Payment Method
          </h2>

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <div
              style={{
                background: "#fff8e1",
                border: "1px solid #f2d28b",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "10px", color: "#111827" }}>
                PayPal
              </h3>
              <p style={{ marginTop: 0, color: "#6b7280" }}>
                Click your PayPal payment link to complete the subscription payment.
              </p>

              <a
                href="YOUR_PAYPAL_LINK"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  background: "#ffc439",
                  color: "#111",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Pay with PayPal
              </a>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "14px", color: "#111827" }}>
                Crypto Wallet Payment
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
                  BEP20
                </div>
                <div style={{ color: "#2f66d0", wordBreak: "break-all", fontWeight: 700 }}>
                  0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
                  USDT ERC20
                </div>
                <div style={{ color: "#2f66d0", wordBreak: "break-all", fontWeight: 700 }}>
                  0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
                  ETH ERC20
                </div>
                <div style={{ color: "#2f66d0", wordBreak: "break-all", fontWeight: 700 }}>
                  0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}