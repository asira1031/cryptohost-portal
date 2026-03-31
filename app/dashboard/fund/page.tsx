"use client";

export default function FundPage() {
  const openMoonPay = async () => {
    const { loadMoonPay } = await import("@moonpay/moonpay-js");

    const moonPay = await loadMoonPay();

    const isLocal =
      typeof window !== "undefined" &&
      window.location.hostname === "localhost";

    const widget = moonPay?.({
      flow: "buy",
      environment: "sandbox",
      variant: isLocal ? "newTab" : "overlay",
      params: {
        apiKey: "pk_live_pS8QcroK1xTqXZMYOWRvV3BDPPtgyFh",
        currencyCode: "usdt",
        baseCurrencyCode: "php",
      },
    });

    widget?.show();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Fund Account</h1>

      <button
        onClick={openMoonPay}
        style={{
          background: "#3b6edc",
          color: "white",
          padding: "12px 18px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Buy USDT via MoonPay
      </button>
    </div>
  );
}