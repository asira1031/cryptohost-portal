"use client";

export default function SubscriptionPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Choose Your CryptoHost Subscription</h1>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center", marginTop: "40px" }}>

        {/* STARTER PLAN */}
        <div style={{ border: "1px solid #ddd", padding: "30px", width: "300px", borderRadius: "10px" }}>
          <h2>Starter Plan</h2>
          <h3>$299</h3>
          <ul>
            <li>Client Portal Dashboard</li>
            <li>Upload transaction files</li>
            <li>Transaction monitoring</li>
            <li>Blockchain verification tracking</li>
            <li>Secure encrypted data storage</li>
            <li>Email support</li>
          </ul>

          <button style={{ marginTop: "20px", padding: "10px", width: "100%" }}>
            Subscribe
          </button>
        </div>

        {/* PROFESSIONAL PLAN */}
        <div style={{ border: "1px solid #ddd", padding: "30px", width: "300px", borderRadius: "10px" }}>
          <h2>Professional Plan</h2>
          <h3>$499</h3>
          <ul>
            <li>Everything in Starter</li>
            <li>Priority transaction processing</li>
            <li>Advanced monitoring dashboard</li>
            <li>Upload multiple financial files</li>
            <li>Faster blockchain updates</li>
            <li>Priority support</li>
          </ul>

          <button style={{ marginTop: "20px", padding: "10px", width: "100%" }}>
            Subscribe
          </button>
        </div>

        {/* ENTERPRISE PLAN */}
        <div style={{ border: "1px solid #ddd", padding: "30px", width: "300px", borderRadius: "10px" }}>
          <h2>Enterprise Plan</h2>
          <h3>$999</h3>
          <ul>
            <li>Everything in Professional</li>
            <li>VIP processing priority</li>
            <li>Real-time blockchain tracking</li>
            <li>Dedicated transaction monitoring</li>
            <li>Enterprise security layer</li>
            <li>Dedicated support assistance</li>
          </ul>

          <button style={{ marginTop: "20px", padding: "10px", width: "100%" }}>
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
}