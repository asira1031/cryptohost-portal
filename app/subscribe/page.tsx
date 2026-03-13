"use client";

import { useState } from "react";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const handleChoosePlan = (plan: string, price: string) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setPaymentMethod("");
  };

  const handleProceed = () => {
    if (!selectedPlan || !paymentMethod) {
      alert("Please choose a subscription plan and payment method first.");
      return;
    }

    alert(
      `Plan: ${selectedPlan}\nPrice: ${selectedPrice}\nPayment Method: ${paymentMethod}\nWallet: ${walletAddress}`
    );

    // Next step tomorrow:
    // save selected plan + payment method
    // redirect to payment confirmation page or dashboard
    // window.location.href = "/dashboard";
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
          padding: "18px 28px",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        Asira CryptoHost
      </div>

      <div
        style={{
          maxWidth: "1420px",
          margin: "32px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "#1697d5",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "18px 20px",
            }}
          >
            Subscription Plans
          </div>

          <div style={{ padding: "24px 20px 28px" }}>
            <p
              style={{
                color: "#334155",
                fontSize: "18px",
                marginBottom: "22px",
              }}
            >
              Select a subscription plan and payment method to unlock file upload.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={cardStyle}>
                <h2 style={planTitleStyle}>Basic</h2>
                <div style={priceStyle}>$299</div>
                <p style={textStyle}>Access to upload portal</p>
                <p style={textStyle}>Basic transaction processing</p>

                <div style={walletBoxStyle}>
                  <p><strong>PayPal:</strong> Available</p>
                  <p><strong>USDT:</strong> {walletAddress}</p>
                  <p><strong>BNB:</strong> {walletAddress}</p>
                  <p><strong>ETH:</strong> {walletAddress}</p>
                </div>

                <button
                  style={buttonStyle}
                  onClick={() => handleChoosePlan("Basic", "$299")}
                >
                  Choose Basic
                </button>
              </div>

              <div style={cardStyle}>
                <h2 style={planTitleStyle}>Professional</h2>
                <div style={priceStyle}>$499</div>
                <p style={textStyle}>Priority processing</p>
                <p style={textStyle}>Higher file processing limit</p>

                <div style={walletBoxStyle}>
                  <p><strong>PayPal:</strong> Available</p>
                  <p><strong>USDT:</strong> {walletAddress}</p>
                  <p><strong>BNB:</strong> {walletAddress}</p>
                  <p><strong>ETH:</strong> {walletAddress}</p>
                </div>

                <button
                  style={buttonStyle}
                  onClick={() => handleChoosePlan("Professional", "$499")}
                >
                  Choose Professional
                </button>
              </div>

              <div style={cardStyle}>
                <h2 style={planTitleStyle}>Enterprise</h2>
                <div style={priceStyle}>$999</div>
                <p style={textStyle}>Unlimited file processing</p>
                <p style={textStyle}>Priority blockchain settlement</p>

                <div style={walletBoxStyle}>
                  <p><strong>PayPal:</strong> Available</p>
                  <p><strong>USDT:</strong> {walletAddress}</p>
                  <p><strong>BNB:</strong> {walletAddress}</p>
                  <p><strong>ETH:</strong> {walletAddress}</p>
                </div>

                <button
                  style={buttonStyle}
                  onClick={() => handleChoosePlan("Enterprise", "$999")}
                >
                  Choose Enterprise
                </button>
              </div>
            </div>

            {selectedPlan && (
              <div style={selectedSectionStyle}>
                <h2 style={{ marginTop: 0, fontSize: "28px", color: "#0f172a" }}>
                  Selected Plan
                </h2>

                <div style={walletBoxStyle}>
                  <p>
                    <strong>Plan:</strong> {selectedPlan}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedPrice}
                  </p>
                </div>

                <h3 style={{ fontSize: "22px", color: "#0f172a" }}>
                  Choose Payment Method
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    marginTop: "14px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("PayPal")}
                    style={paymentButtonStyle(paymentMethod === "PayPal")}
                  >
                    PayPal
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("USDT")}
                    style={paymentButtonStyle(paymentMethod === "USDT")}
                  >
                    USDT
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("BNB")}
                    style={paymentButtonStyle(paymentMethod === "BNB")}
                  >
                    BNB
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("ETH")}
                    style={paymentButtonStyle(paymentMethod === "ETH")}
                  >
                    ETH
                  </button>
                </div>

                {paymentMethod && (
                  <div style={{ ...walletBoxStyle, marginTop: "18px" }}>
                    <p>
                      <strong>Selected Payment Method:</strong> {paymentMethod}
                    </p>
                    <p>
                      <strong>Wallet Address:</strong> {walletAddress}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceed}
                  style={proceedButtonStyle}
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "20px",
  background: "#f8fafc",
};

const planTitleStyle: React.CSSProperties = {
  fontSize: "26px",
  marginBottom: "8px",
  color: "#0f172a",
};

const priceStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#2d66d3",
  marginBottom: "14px",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#475569",
  marginBottom: "8px",
};

const walletBoxStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  padding: "14px",
  marginTop: "16px",
  marginBottom: "16px",
  lineHeight: "1.7",
  color: "#0f172a",
  fontSize: "14px",
  wordBreak: "break-all",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  fontSize: "17px",
  fontWeight: "bold",
  background: "#2d66d3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const selectedSectionStyle: React.CSSProperties = {
  marginTop: "28px",
  padding: "24px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "#f8fafc",
};

const paymentButtonStyle = (active: boolean): React.CSSProperties => ({
  padding: "14px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  border: active ? "2px solid #2d66d3" : "1px solid #cbd5e1",
  background: active ? "#2d66d3" : "white",
  color: active ? "white" : "#0f172a",
});

const proceedButtonStyle: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "15px",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};