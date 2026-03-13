"use client";

export default function SubscribePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#031B34",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "52px",
            marginBottom: "40px",
            fontWeight: 800,
          }}
        >
          Choose Your CryptoHost Subscription
        </h1>

        <div
          style={{
            display: "flex",
            gap: "36px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "32px",
              width: "380px",
              background: "#031B34",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Starter Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$299</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "28px" }}>
              <li>Client Portal Dashboard</li>
              <li>Upload transaction files</li>
              <li>Transaction monitoring</li>
              <li>Blockchain verification tracking</li>
              <li>Secure encrypted data storage</li>
              <li>Email support</li>
            </ul>

            <button
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>

          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "32px",
              width: "380px",
              background: "#031B34",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Professional Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$499</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "28px" }}>
              <li>Everything in Starter</li>
              <li>Priority transaction processing</li>
              <li>Advanced monitoring dashboard</li>
              <li>Upload multiple financial files</li>
              <li>Faster blockchain updates</li>
              <li>Priority support</li>
            </ul>

            <button
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>

          <div
            style={{
              border: "1px solid #3b4a6b",
              borderRadius: "16px",
              padding: "32px",
              width: "380px",
              background: "#031B34",
            }}
          >
            <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>Enterprise Plan</h2>
            <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>$999</h3>

            <ul style={{ lineHeight: 1.5, fontSize: "18px", marginBottom: "28px" }}>
              <li>Everything in Professional</li>
              <li>VIP processing priority</li>
              <li>Real-time blockchain tracking</li>
              <li>Dedicated transaction monitoring</li>
              <li>Enterprise security layer</li>
              <li>Dedicated support assistance</li>
            </ul>

            <button
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "14px",
                background: "#d9d9d9",
                color: "#111827",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}