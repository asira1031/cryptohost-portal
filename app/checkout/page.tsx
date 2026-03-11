"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") || "unknown";
  const price = searchParams.get("price") || "0";

  const [subscriptionStatus, setSubscriptionStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Awaiting Payment");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [network, setNetwork] = useState("");

  const walletAddress =
    "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const handlePayPal = () => {
    setPaymentMethod("PayPal");
    setNetwork("PayPal");
    setPaymentStatus("Processing PayPal Payment...");

    setTimeout(() => {
      const paymentRecord = {
        plan,
        amount: price,
        method: "PayPal",
        network: "PayPal",
        date: new Date().toLocaleString(),
      };

      const existing = JSON.parse(
        localStorage.getItem("cryptohost_payments") || "[]"
      );

      existing.push(paymentRecord);

      localStorage.setItem(
        "cryptohost_payments",
        JSON.stringify(existing)
      );

      setPaymentStatus("Payment Received");
      setSubscriptionStatus("Subscribed");
    }, 1200);
  };

  const handleCrypto = (method: string) => {
    setPaymentMethod(method);

    if (method === "USDT") {
      setNetwork("Ethereum (ERC20)");
    } else if (method === "ETH") {
      setNetwork("Ethereum Mainnet");
    } else if (method === "BNB") {
      setNetwork("BNB Smart Chain (BEP20)");
    }

    setPaymentStatus(`Waiting for ${method} payment...`);
  };

  const handleSentPayment = () => {
    const paymentRecord = {
      plan,
      amount: price,
      method: paymentMethod,
      network,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("cryptohost_payments") || "[]"
    );

    existing.push(paymentRecord);

    localStorage.setItem(
      "cryptohost_payments",
      JSON.stringify(existing)
    );

    setPaymentStatus(`${paymentMethod} Payment Submitted`);
    setSubscriptionStatus("Pending Review");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied");
  };

  const statusColor =
    subscriptionStatus === "Subscribed"
      ? "#31d67b"
      : subscriptionStatus === "Pending Review"
      ? "#f3ba2f"
      : "#ffb84d";

  const paymentColor =
    paymentStatus.includes("Received") ||
    paymentStatus.includes("Submitted")
      ? "#31d67b"
      : paymentStatus.includes("Waiting")
      ? "#f3ba2f"
      : "#ff6666";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071225",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
        CryptoHost Checkout
      </h1>

      <p style={{ color: "#9fb0d1", marginBottom: "30px" }}>
        Review your selected subscription plan and complete payment.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <div
          style={{
            background: "#0f1d38",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "18px" }}>
            Subscription Details
          </h2>

          <p>
            <strong>Plan:</strong> {plan}
          </p>

          <p>
            <strong>Price:</strong> ${price} / month
          </p>

          <p>
            <strong>Subscription Status:</strong>{" "}
            <span
              style={{
                color: statusColor,
                fontWeight: "bold",
              }}
            >
              {subscriptionStatus}
            </span>
          </p>

          <p>
            <strong>Payment Status:</strong>{" "}
            <span
              style={{
                color: paymentColor,
                fontWeight: "bold",
              }}
            >
              {paymentStatus}
            </span>
          </p>

          <p>
            <strong>Payment Method:</strong>{" "}
            {paymentMethod || "Not Selected"}
          </p>

          <p>
            <strong>Network:</strong>{" "}
            {network || "Not Selected"}
          </p>
        </div>

        <div
          style={{
            background: "#0f1d38",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "18px" }}>
            Choose Payment
          </h2>

          <button
            onClick={handlePayPal}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#ffc439",
              color: "#111",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Pay with PayPal
          </button>

          <button
            onClick={() => handleCrypto("USDT")}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#26a17b",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Pay with USDT
          </button>

          <button
            onClick={() => handleCrypto("ETH")}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#627eea",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Pay with ETH
          </button>

          <button
            onClick={() => handleCrypto("BNB")}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#f3ba2f",
              color: "#111",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Pay with BNB
          </button>
        </div>
      </div>

      {paymentMethod && paymentMethod !== "PayPal" && (
        <div
          style={{
            marginTop: "24px",
            background: "#0f1d38",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Send Payment</h2>

          <p style={{ color: "#b9c7e3" }}>
            Send the exact payment amount using the selected method.
          </p>

          <p>
            <strong>Amount:</strong> ${price}
          </p>

          <p>
            <strong>Network:</strong> {network}
          </p>

          <p
            style={{
              color: "#ffb84d",
              fontSize: "13px",
              marginTop: "6px",
            }}
          >
            Only send funds using the specified network. Sending on the wrong
            network may result in loss of funds.
          </p>

          <p>
            <strong>Wallet Address:</strong>
          </p>

          <div
            style={{
              background: "#091325",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              wordBreak: "break-all",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "14px",
            }}
          >
            {walletAddress}
          </div>

          <button
            onClick={copyAddress}
            style={{
              marginBottom: "12px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#627eea",
              color: "white",
              cursor: "pointer",
            }}
          >
            Copy Wallet Address
          </button>

          <br />

          <button
            onClick={handleSentPayment}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#31d67b",
              color: "#071225",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            I Sent Payment
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: "24px",
          background: "#0f1d38",
          padding: "28px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Account Access Preview</h2>

        <p style={{ color: "#b9c7e3", marginBottom: 0 }}>
          Once payment is confirmed, the client status becomes{" "}
          <strong>Subscribed</strong> and dashboard access can be activated.
        </p>
      </div>
    </div>
  );
}