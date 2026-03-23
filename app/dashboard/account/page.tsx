"use client";

import { useState } from "react";

type BankAccount = {
  bank: string;
  accountName: string;
  accountNumber: string;
  swift: string;
  currency: string;
  note: string;
};

export default function AccountPage() {
  const [showBanks, setShowBanks] = useState(false);
  const [buyerWallet, setBuyerWallet] = useState("");

  const gatewayWallet = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

  const bankAccounts: BankAccount[] = [
    {
      bank: "MariBank",
      accountName: "Janica Maldives",
      accountNumber: "1032-431-2229",
      swift: "LAUIPHM2",
      currency: "PHP",
      note: "Primary digital banking option",
    },
    {
      bank: "Security Bank",
      accountName: "Janica Maldive",
      accountNumber: "0000076867520",
      swift: "SETCPHMM",
      currency: "PHP",
      note: "Local funding option",
    },
    {
      bank: "UnionBank",
      accountName: "Janica Maldives",
      accountNumber: "103200011788",
      swift: "UBPHPHMMXXX",
      currency: "PHP",
      note: "Primary local receiving account",
    },
    {
      bank: "BDO",
      accountName: "Janica Maldives",
      accountNumber: "012516004148",
      swift: "BNORPHMMXXX",
      currency: "PHP",
      note: "Standard bank transfer option",
    },
    {
      bank: "BPI",
      accountName: "JANICA MALDIVES",
      accountNumber: "0629075905",
      swift: "BOPIPHMM",
      currency: "PHP",
      note: "PHP receiving account",
    },
    {
      bank: "BPI",
      accountName: "JANICA MALDIVES",
      accountNumber: "0574196219",
      swift: "BOPIPHMM",
      currency: "USD",
      note: "USD receiving account",
    },
    {
      bank: "Maya Bank",
      accountName: "Janica Maldives",
      accountNumber: "808529591832",
      swift: "MYYAPHM2XX",
      currency: "PHP",
      note: "Digital funding option",
    },
  ];

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied successfully.");
    } catch {
      alert("Copy failed.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b2d",
        padding: "40px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1120,
          background: "#101a49",
          borderRadius: 22,
          padding: 32,
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          Fund Account
        </h1>

        <p
          style={{
            marginTop: 14,
            marginBottom: 26,
            color: "#c7d2fe",
            fontSize: 15,
            lineHeight: 1.8,
            maxWidth: 920,
          }}
        >
          Choose your preferred funding method below. You may buy USDT from an
          external provider, send to the designated gateway wallet, or use bank
          payment when required for your transaction flow.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <a
            href="https://www.binance.com/en/buy-sell-crypto"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#f4b400",
              color: "#111827",
              textDecoration: "none",
              padding: "16px 20px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 16,
              textAlign: "center",
              display: "block",
            }}
          >
            Buy USDT via Binance
          </a>

          <a
            href="https://www.coinbase.com/buy"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              padding: "16px 20px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 16,
              textAlign: "center",
              display: "block",
            }}
          >
            Buy Crypto via Coinbase
          </a>

          <button
            onClick={() => setShowBanks((prev) => !prev)}
            style={{
              background: showBanks ? "#334155" : "#1f2b5c",
              color: "#ffffff",
              border: "1px solid #42568f",
              padding: "16px 20px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {showBanks ? "Hide Bank Accounts" : "Bank Payment"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#1a2556",
              border: "1px solid #33457a",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div
              style={{
                color: "#93c5fd",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 10,
                letterSpacing: 0.3,
              }}
            >
              GATEWAY WALLET
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "14px 16px",
                color: "#ffffff",
                fontSize: 15,
                lineHeight: 1.7,
                wordBreak: "break-word",
                marginBottom: 14,
              }}
            >
              {gatewayWallet}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => copyText(gatewayWallet)}
                style={smallButtonStyle("#f4b400", "#111827")}
              >
                Copy Gateway Wallet
              </button>

              <div
                style={{
                  ...pillStyle,
                  background: "#0f766e",
                }}
              >
                ERC20 / BEP20
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#1a2556",
              border: "1px solid #33457a",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div
              style={{
                color: "#93c5fd",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 10,
                letterSpacing: 0.3,
              }}
            >
              BUYER WALLET
            </div>

            <textarea
              value={buyerWallet}
              onChange={(e) => setBuyerWallet(e.target.value)}
              placeholder="Paste buyer wallet here"
              rows={4}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "14px 16px",
                color: "#ffffff",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 14,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => copyText(buyerWallet)}
                style={smallButtonStyle("#2563eb", "#ffffff")}
                disabled={!buyerWallet.trim()}
              >
                Copy Buyer Wallet
              </button>

              <button
                onClick={() => setBuyerWallet("")}
                style={smallButtonStyle("#475569", "#ffffff")}
              >
                Clear
              </button>
            </div>

            <div
              style={{
                color: "#cbd5e1",
                fontSize: 13,
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              Paste the buyer wallet address here before proceeding with funding
              or wallet assignment.
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#1f2b5c",
            border: "1px solid #33457a",
            borderRadius: 16,
            padding: 20,
            marginBottom: showBanks ? 22 : 0,
          }}
        >
          <div
            style={{
              color: "#93c5fd",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: 0.3,
            }}
          >
            FUNDING INSTRUCTIONS
          </div>

          <div
            style={{
              color: "#e5e7eb",
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            1. Choose Binance or Coinbase if purchasing USDT externally.
            <br />
            2. After purchase, send USDT to the designated gateway wallet using
            the correct network.
            <br />
            3. If using bank transfer, click Bank Payment to reveal approved
            bank accounts.
            <br />
            4. After funding, upload your file through the portal.
            <br />
            5. Monitor your processing status in the Reports section.
          </div>
        </div>

        {showBanks && (
          <div style={{ marginTop: 22 }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Approved Bank Accounts
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 18,
              }}
            >
              {bankAccounts.map((account, index) => (
                <div
                  key={`${account.bank}-${account.accountNumber}-${index}`}
                  style={{
                    background: "#1a2556",
                    border: "1px solid #33457a",
                    borderRadius: 16,
                    padding: 22,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.14)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff",
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {account.bank}
                    </div>

                    <div
                      style={{
                        background:
                          account.currency === "USD" ? "#2563eb" : "#f4b400",
                        color:
                          account.currency === "USD" ? "#ffffff" : "#111827",
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "6px 10px",
                        borderRadius: 999,
                      }}
                    >
                      {account.currency}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <InfoRow label="Account Name" value={account.accountName} />
                    <InfoRow
                      label="Account Number"
                      value={account.accountNumber}
                    />
                    <InfoRow label="SWIFT Code" value={account.swift} />
                    <InfoRow label="Note" value={account.note} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 24,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 18,
            color: "#cbd5e1",
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          Important: Always verify the correct network, wallet address, and
          funding method before sending any payment. Incorrect bank details or
          mismatched transfer routes may delay processing.
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          color: "#93c5fd",
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 6,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 500,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function smallButtonStyle(background: string, color: string): React.CSSProperties {
  return {
    background,
    color,
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  };
}

const pillStyle: React.CSSProperties = {
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 13,
};