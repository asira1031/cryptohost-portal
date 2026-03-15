"use client";

export default function SubscriptionPage() {
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

      <div style={{ padding: "30px" }}>
        <p style={{ marginBottom: "30px", fontSize: "17px" }}>
          Select a subscription plan and payment method to activate your
          CryptoHost client portal access.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
          }}
        >

{/* STARTER */}

          <div style={card}>
            <h2>Starter</h2>
            <h1 style={price}>$99</h1>

            <p>Basic portal access for single file processing.</p>

            <div style={features}>
              <p>• Access to CryptoHost dashboard</p>
              <p>• Secure file upload</p>
              <p>• Basic transaction monitoring</p>
              <p>• Standard processing queue</p>
              <p>• Email support</p>
            </div>

            <PaymentBox />

            <button style={button}>Choose Starter</button>
          </div>

{/* PROFESSIONAL */}

          <div style={card}>
            <h2>Professional</h2>
            <h1 style={price}>$199</h1>

            <p>Recommended for active clients processing multiple files.</p>

            <div style={features}>
              <p>• Everything in Starter</p>
              <p>• Multiple file uploads</p>
              <p>• Higher processing allowance</p>
              <p>• Faster validation queue</p>
              <p>• Advanced transaction monitor</p>
              <p>• Priority support</p>
            </div>

            <PaymentBox />

            <button style={button}>Choose Professional</button>
          </div>

{/* ENTERPRISE */}

          <div style={card}>
            <h2>Enterprise</h2>
            <h1 style={price}>$299</h1>

            <p>Full CryptoHost platform access for large file operations.</p>

            <div style={features}>
              <p>• Everything in Professional</p>
              <p>• Unlimited file uploads</p>
              <p>• Priority processing queue</p>
              <p>• Real-time transaction monitoring</p>
              <p>• Dedicated support channel</p>
              <p>• Best for high value transactions</p>
            </div>

            <PaymentBox />

            <button style={button}>Choose Enterprise</button>
          </div>

        </div>
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
};

const price = {
  color: "#2d66d3",
  fontSize: "48px",
};

const features = {
  marginTop: "15px",
  lineHeight: "1.8",
};

const button = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  background: "#2d66d3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

function PaymentBox() {
  return (
    <div
      style={{
        marginTop: "18px",
        padding: "14px",
        border: "1px solid #d9e0ea",
        borderRadius: "10px",
        background: "#f8fafc",
        fontSize: "14px",
        lineHeight: "1.8",
      }}
    >
      <p><b>PayPal:</b> Available</p>
      <p><b>USDT:</b> 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd</p>
      <p><b>BNB:</b> 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd</p>
      <p><b>ETH:</b> 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd</p>
    </div>
  );
}