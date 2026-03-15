"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const plan = params.get("plan");

  const planLabel =
    plan === "starter"
      ? "Starter Plan"
      : plan === "professional"
      ? "Professional Plan"
      : plan === "enterprise"
      ? "Enterprise Plan"
      : "Starter Plan";

  const price =
    plan === "starter"
      ? "$99"
      : plan === "professional"
      ? "$199"
      : plan === "enterprise"
      ? "$299"
      : "$99";

  const [method, setMethod] = useState<"paypal" | "crypto" | "">("");
  const [cryptoType, setCryptoType] = useState<"USDT ERC20" | "ETH ERC20" | "BNB BEP20">("USDT ERC20");
  const [txHash, setTxHash] = useState("");
  const [receiptName, setReceiptName] = useState("");
  const [message, setMessage] = useState("");

  const walletAddress = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptName(file.name);
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();

    if (!method) {
      setMessage("Please choose a payment method.");
      return;
    }

    if (method === "crypto" && !txHash.trim()) {
      setMessage("Please paste your transaction hash.");
      return;
    }

    if (method === "paypal" && !receiptName) {
      setMessage("Please upload your PayPal receipt.");
      return;
    }

    setMessage("Payment proof submitted successfully.");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#3568cf",
            color: "#ffffff",
            padding: "24px 30px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          CryptoHost Payment
        </div>

        <div style={{ padding: "32px 30px 36px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Complete Your Payment
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: "24px",
              fontSize: "17px",
              color: "#6b7280",
            }}
          >
            Choose your payment method and submit your payment proof to activate your CryptoHost subscription.
          </p>

          <div
            style={{
              background: "linear-gradient(135deg,#e8f0ff,#f5f8ff)",
              border: "2px solid #3568cf",
              padding: "24px",
              borderRadius: "14px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#3568cf",
                marginBottom: "6px",
              }}
            >
              SELECTED PLAN
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              {planLabel}
            </div>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#3568cf",
                marginTop: "6px",
              }}
            >
              {price}
            </div>
          </div>

          <form onSubmit={handleSubmitProof}>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#111827" }}>Choose Payment Method</h3>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setMethod("paypal")}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: method === "paypal" ? "2px solid #3568cf" : "1px solid #cbd5e1",
                    background: method === "paypal" ? "#e8f0ff" : "#ffffff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  PayPal
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("crypto")}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: method === "crypto" ? "2px solid #3568cf" : "1px solid #cbd5e1",
                    background: method === "crypto" ? "#e8f0ff" : "#ffffff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  USDT / ETH / BNB
                </button>
              </div>
            </div>

            {method === "paypal" && (
              <div
                style={{
                  background: "#fff8e1",
                  border: "1px solid #f2d28b",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#111827" }}>PayPal Payment</h3>
                <p style={{ color: "#6b7280" }}>
                  Complete your PayPal payment first, then upload your receipt below.
                </p>

                <a
                  href="YOUR_PAYPAL_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    background: "#ffc439",
                    color: "#111",
                    padding: "14px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    marginBottom: "16px",
                  }}
                >
                  Pay with PayPal
                </a>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color: "#111827",
                    }}
                  >
                    Upload PayPal Receipt
                  </label>
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleReceiptUpload} />
                  {receiptName && (
                    <p style={{ marginTop: "8px", color: "#3568cf", fontWeight: "bold" }}>
                      Uploaded: {receiptName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {method === "crypto" && (
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #dbe2ea",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#111827" }}>Crypto Wallet Payment</h3>

                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#111827",
                  }}
                >
                  Choose Crypto Type
                </label>

                <select
                  value={cryptoType}
                  onChange={(e) =>
                    setCryptoType(e.target.value as "USDT ERC20" | "ETH ERC20" | "BNB BEP20")
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    marginBottom: "16px",
                    fontSize: "16px",
                  }}
                >
                  <option>USDT ERC20</option>
                  <option>ETH ERC20</option>
                  <option>BNB BEP20</option>
                </select>

                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "6px",
                    }}
                  >
                    Wallet Address
                  </div>
                  <div
                    style={{
                      color: "#3568cf",
                      wordBreak: "break-all",
                      fontWeight: "bold",
                    }}
                  >
                    {walletAddress}
                  </div>
                </div>

                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#111827",
                  }}
                >
                  Paste Transaction Hash
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Enter your blockchain transaction hash"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                background: "#3568cf",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit Payment Proof
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "16px",
                color: "#3568cf",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}