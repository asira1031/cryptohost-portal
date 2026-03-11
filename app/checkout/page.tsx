"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") || "unknown";
  const price = searchParams.get("price") || "0";

  const [subscriptionStatus, setSubscriptionStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Awaiting Payment");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [network, setNetwork] = useState("");

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const handlePayPal = () => {
    setPaymentMethod("PayPal");
    setNetwork("PayPal");
    setPaymentStatus("Processing PayPal Payment...");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Plan: {plan}</p>
      <p>Price: {price}</p>
      <p>Subscription Status: {subscriptionStatus}</p>
      <p>Payment Status: {paymentStatus}</p>
      <p>Payment Method: {paymentMethod}</p>
      <p>Network: {network}</p>
      <p>Wallet Address: {walletAddress}</p>

      <button onClick={handlePayPal}>Pay with PayPal</button>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}