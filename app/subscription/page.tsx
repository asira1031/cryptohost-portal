"use client";

export default function SubscriptionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: "50px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "500px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          CryptoHost Client Portal
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Subscribe to access the CryptoHost infrastructure, secure transaction
          monitoring dashboard, and blockchain transaction processing tools.
        </p>

        <div
          style={{
            background: "#1a1a1a",
            padding: "25px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            Monthly Subscription
          </h2>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            $50 / month
          </p>

          <a
            href="YOUR_PAYPAL_SUBSCRIPTION_LINK"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#ffc439",
              color: "#111",
              padding: "14px 28px",
              borderRadius: "6px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Subscribe with PayPal
          </a>
        </div>

        <p
          style={{
            fontSize: "13px",
            opacity: "0.7",
          }}
        >
          Secure payment powered by PayPal Business
        </p>
      </div>
    </div>
  );
}