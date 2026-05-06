"use client";
import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/app/lib/supabase/client";

type TokenCard = {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
};

type TxItem = {
  type: "Received" | "Sent";
  token: string;
  amount: string;
  address: string;
  status: "Completed" | "Pending";
  date: string;
};

export default function WalletPage() {
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

 const defaultWalletAddress = "0xC47133A6bd653793562A1Ea25Cb1D3161fBD99cD";

 const supabase = createClient();

const [walletAddress, setWalletAddress] = useState("");

useEffect(() => {
  async function loadWallet() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_address")
      .eq("id", user.id)
      .single();

    if (profile?.wallet_address) {
      setWalletAddress(profile.wallet_address);
    }
  }

  loadWallet();
}, []);
  const shortAddress = useMemo(() => {
    return `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`;
  }, [walletAddress]);

  const tokens: TokenCard[] = [
    {
      symbol: "USDT",
      name: "Tether USD",
      balance: "0.00",
      usdValue: "$0.00",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "0.00",
      usdValue: "$0.00",
    },
    {
      symbol: "BNB",
      name: "BNB Smart Chain",
      balance: "0.00",
      usdValue: "$0.00",
    },
  ];

  const transactions: TxItem[] = [
    {
      type: "Received",
      token: "USDT",
      amount: "0.00",
      address: "0x8F3c...21A9",
      status: "Completed",
      date: "2026-04-08 10:45 AM",
    },
    {
      type: "Sent",
      token: "ETH",
      amount: "0.00",
      address: "0xA9D2...90B7",
      status: "Pending",
      date: "2026-04-07 04:20 PM",
    },
    {
      type: "Received",
      token: "BNB",
      amount: "0.00",
      address: "0x12CF...5D44",
      status: "Completed",
      date: "2026-04-06 09:12 AM",
    },
  ];

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(walletAddress);
      showToast("Wallet address copied");
    } catch {
      showToast("Copy not available on this browser");
    }
  }

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 2200);
  }

  return (
    <div
      style={{
        padding: "24px",
        color: "#ffffff",
        background: "#041548",
        minHeight: "100vh",
      }}
    >
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 1000,
            background: "#102867",
            border: "1px solid #2e56c5",
            color: "#ffffff",
            padding: "12px 18px",
            borderRadius: "12px",
            boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {toastMessage}
        </div>
      )}

      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            marginBottom: "6px",
            color: "#ffffff",
          }}
        >
          CryptoHost Wallet
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#9fb3d9",
            margin: 0,
          }}
        >
          Secure digital wallet dashboard — premium UI preview
        </p>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #081a52 0%, #0d245f 100%)",
          border: "1px solid #1d3b8b",
          borderRadius: "20px",
          padding: "22px",
          marginBottom: "24px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#ffffff",
opacity: 0.78,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Wallet Address
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              {shortAddress}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#9fb3d9",
                wordBreak: "break-all",
                marginBottom: "14px",
              }}
            >
              Full Address: {walletAddress}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button type="button" style={smallButton} onClick={handleCopyAddress}>
                Copy Address
              </button>

              <button
                type="button"
                style={smallButtonOutline}
                onClick={() => setShowReceiveModal(true)}
              >
                View Receive
              </button>
            </div>
          </div>

          <div
            style={{
              minWidth: "220px",
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#ffffff",
opacity: 0.8,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Portfolio Value
            </div>
            <div
              style={{
                fontSize: "34px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              $0.00
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#ffffff",
opacity: 0.78,
                marginTop: "6px",
              }}
            >
              Demo display only
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            style={buttonPrimary}
            onClick={() => setShowSendModal(true)}
          >
            Send
          </button>

          <button
            type="button"
            style={buttonSecondary}
            onClick={() => setShowReceiveModal(true)}
          >
            Receive
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "14px",
            color: "#ffffff",
          }}
        >
          Token Balances
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {tokens.map((token) => (
            <div
              key={token.symbol}
              style={{
                background: "#08153f",
                border: "1px solid #1a2f74",
                borderRadius: "18px",
                padding: "18px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {token.symbol}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#8ea7d8",
                      marginTop: "2px",
                    }}
                  >
                    {token.name}
                  </div>
                </div>

                <div
                  style={{
                    background: "#102867",
                    color: "#7fb3ff",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "6px 10px",
                    borderRadius: "999px",
                  }}
                >
                  Active
                </div>
              </div>

              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                {token.balance}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#9fb3d9",
                }}
              >
                {token.usdValue}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "14px",
            color: "#ffffff",
          }}
        >
          Recent Transactions
        </div>

        <div
          style={{
            background: "#08153f",
            border: "1px solid #1a2f74",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr 1.4fr 1fr 1.2fr",
              gap: "12px",
              padding: "14px 18px",
              background: "#0d1d52",
              color: "#8ea7d8",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <div>Type</div>
            <div>Amount</div>
            <div>Address</div>
            <div>Status</div>
            <div>Date</div>
          </div>

          {transactions.map((tx, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr 1.4fr 1fr 1.2fr",
                gap: "12px",
                padding: "16px 18px",
                borderTop: index === 0 ? "none" : "1px solid #14265f",
                alignItems: "center",
                fontSize: "14px",
                color: "#ffffff",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{tx.type}</div>
                <div style={{ fontSize: "12px", color: "#8ea7d8", marginTop: "3px" }}>
                  {tx.token}
                </div>
              </div>

              <div>{tx.amount}</div>
              <div style={{ color: "#9fb3d9" }}>{tx.address}</div>

              <div>
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: tx.status === "Completed" ? "#11361f" : "#4b3a0f",
                    color: tx.status === "Completed" ? "#6ee7a8" : "#ffd76a",
                  }}
                >
                  {tx.status}
                </span>
              </div>

              <div style={{ color: "#9fb3d9", fontSize: "13px" }}>{tx.date}</div>
            </div>
          ))}
        </div>
      </div>

      {showReceiveModal && (
        <ModalShell title="Receive Funds" onClose={() => setShowReceiveModal(false)}>
          <div style={{ textAlign: "center" }}>
            <div
  style={{
    width: "200px",
    height: "200px",
    margin: "0 auto 16px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid #2a4ea8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    boxSizing: "border-box",
  }}
>
  <QRCodeSVG
    value={walletAddress}
    size={170}
    bgColor="#ffffff"
    fgColor="#0b163f"
    level="H"
    includeMargin={false}
  />
</div>

            <div
              style={{
                fontSize: "13px",
                color: "#8ea7d8",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Wallet Address
            </div>

            <div
              style={{
                background: "#08153f",
                border: "1px solid #1a2f74",
                borderRadius: "12px",
                padding: "12px",
                color: "#ffffff",
                fontSize: "13px",
                wordBreak: "break-all",
                marginBottom: "16px",
              }}
            >
              {walletAddress}
            </div>

            <button
              type="button"
              style={buttonPrimary}
              onClick={async () => {
                await handleCopyAddress();
                setShowReceiveModal(false);
              }}
            >
              Copy Wallet Address
            </button>
          </div>
        </ModalShell>
      )}

      {showSendModal && (
        <ModalShell title="Send Funds" onClose={() => setShowSendModal(false)}>
          <div style={{ display: "grid", gap: "14px" }}>
            <div>
              <label style={labelStyle}>Select Token</label>
              <select style={inputStyle} defaultValue="USDT">
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="BNB">BNB</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Recipient Address</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Enter wallet address"
              />
            </div>

            <div>
              <label style={labelStyle}>Amount</label>
              <input style={inputStyle} type="text" placeholder="0.00" />
            </div>

            <div
              style={{
                background: "#08153f",
                border: "1px solid #1a2f74",
                borderRadius: "12px",
                padding: "12px",
                color: "#ffffff",
opacity: 0.88,
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              Demo mode only. Sending is disabled in this version for platform safety.
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                style={smallButtonOutline}
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                style={buttonPrimary}
                onClick={() => {
                  setShowSendModal(false);
                  showToast("Send feature UI only for now");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function ModalShell({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(1, 6, 22, 0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "linear-gradient(180deg, #081a52 0%, #06143e 100%)",
          border: "1px solid #21459a",
          borderRadius: "22px",
          padding: "22px",
          boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #2b4ca3",
              color: "#ffffff",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

const buttonPrimary: React.CSSProperties = {
  background: "#1b5cff",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "12px 22px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(27, 92, 255, 0.28)",
};

const buttonSecondary: React.CSSProperties = {
  background: "transparent",
  color: "#ffffff",
  border: "1px solid #2b4ca3",
  borderRadius: "12px",
  padding: "12px 22px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};

const smallButton: React.CSSProperties = {
  background: "#12317d",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "10px 14px",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
};

const smallButtonOutline: React.CSSProperties = {
  background: "transparent",
  color: "#ffffff",
  border: "1px solid #2b4ca3",
  borderRadius: "10px",
  padding: "10px 14px",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#9fb3d9",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#08153f",
  border: "1px solid #1f3e92",
  color: "#ffffff",
  borderRadius: "12px",
  padding: "12px 14px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};