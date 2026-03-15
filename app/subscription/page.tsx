"use client";

import { useEffect } from "react";

export default function SubscriptionPage() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=BA48ggEiAiLcG_4Y13TIpawdZ8bis2Zrmg4cN_vewZSeOnnaFB3aHXtBHnecACam-5CxH9HZJiEMSis&components=hosted-buttons&disable-funding=venmo&currency=PHP";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.paypal) {
        // @ts-ignore
        window.paypal.HostedButtons({
          hostedButtonId: "DBWVXD8UBUEZS",
        }).render("#paypal-container-DBWVXD8UBUEZS");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>CryptoHost Processing Service</h1>
        <p>Secure payment for CryptoHost infrastructure services.</p>

        <div id="paypal-container-DBWVXD8UBUEZS"></div>

      </div>
    </div>
  );
}