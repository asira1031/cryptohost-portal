import PayButton from "./paybutton";
import WalletConnectButton from "./walletconnect";
import CryptoPay from "./cryptopay";
import BinancePay from "./binancepay";

async function getPayment(id: string) {
  const base =
    process.env.NEXT_PUBLIC_GATEWAY_API_BASE || "http://localhost:3000";

  const res = await fetch(`${base}/api/gateway/payment/status/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load payment");
  }

  return res.json();
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payment = await getPayment(id);

  return (
    <div
      style={{
        background: "black",
        color: "white",
        padding: "40px",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "52px", marginBottom: "28px" }}>
        CryptoHost Checkout
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "12px" }}>
        Payment ID: {payment.id}
      </p>

      <p style={{ fontSize: "18px", marginBottom: "12px" }}>
        Amount: {payment.amount} USD
      </p>

      <p style={{ fontSize: "18px", marginBottom: "24px" }}>
        Status: {payment.status}
      </p>

      <div style={{ marginTop: "30px", marginBottom: "36px" }}>
        <p style={{ marginBottom: "12px" }}>Wallet:</p>
        <WalletConnectButton />
      </div>

      <div style={{ marginTop: "20px", marginBottom: "36px" }}>
        <p style={{ marginBottom: "12px", fontSize: "18px" }}>
          Pay with PayPal
        </p>

        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "420px",
          }}
        >
          <PayButton paymentId={payment.id} amount={String(payment.amount)} />
        </div>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <CryptoPay paymentId={payment.id} amount={String(payment.amount)} />
      </div>

      <div style={{ marginBottom: "36px" }}>
        <BinancePay paymentId={payment.id} amount={String(payment.amount)} />
      </div>
    </div>
  );
}