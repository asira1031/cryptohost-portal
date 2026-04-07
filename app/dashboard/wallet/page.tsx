"use client";

import { useMemo } from "react";

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
  const walletAddress = "0xC47133A6bd653793562A1Ea25Cb1D3161fBD99cD";

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
      name: "BNB",
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

  return (
    <div
      style={{
        padding: "24px",
        color: "#ffffff",
        background: "#03113a",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
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
          Secure digital wallet dashboard — UI preview only
        </p>
      </div>

      {/* Wallet Overview */}
      <div
        style={{
          background: "linear-gradient(135deg, #081a52 0%, #0d245f 100%)",
          border: "1px solid #1d3b8b",
          borderRadius: "18px",
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
                color: "#8ea7d8",
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
              }}
            >
              Full Address: {walletAddress}
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
                color: "#8ea7d8",
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
                color: "#9fb3d9",
                marginTop: "6px",
              }}
            >
              Demo display only
            </div>
          </div>
        </div>

        {/* Buttons */}
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
            onClick={() => alert("Send feature UI only for now.")}
          >
            Send
          </button>

          <button
            type="button"
            style={buttonSecondary}
            onClick={() => alert("Receive feature UI only for now.")}
          >
            Receive
          </button>
        </div>
      </div>

      {/* Token Balance Cards */}
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
                borderRadius: "16px",
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

      {/* Recent Transactions */}
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
            borderRadius: "16px",
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
                    background:
                      tx.status === "Completed" ? "#11361f" : "#4b3a0f",
                    color:
                      tx.status === "Completed" ? "#6ee7a8" : "#ffd76a",
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