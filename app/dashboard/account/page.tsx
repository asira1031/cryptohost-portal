"use client";

import { useMemo, useState } from "react";

type BankAccount = {
  bank: string;
  accountName: string;
  accountNumber: string;
  swift: string;
  currency: string;
  note: string;
};

type AssetKey = "USDT" | "BTC" | "ETH" | "BNB";

export default function AccountPage() {
  const [showBanks, setShowBanks] = useState(false);
  const [buyerWallet, setBuyerWallet] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<AssetKey>("USDT");

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

  const assetConfig = useMemo(
    () => ({
      USDT: {
        network: "ERC20 / BEP20",
        binanceLabel: "Buy USDT via Binance",
        coinbaseLabel: "Buy USDT via Coinbase",
        providerText:
          "Choose Binance or Coinbase if purchasing USDT externally.",
        sendText:
          "After purchase, send USDT to the designated gateway wallet using the correct network.",
      },
      BTC: {
        network: "Bitcoin",
        binanceLabel: "Buy BTC via Binance",
        coinbaseLabel: "Buy BTC via Coinbase",
        providerText:
          "Choose Binance or Coinbase if purchasing BTC externally.",
        sendText:
          "After purchase, send BTC to the designated gateway wallet using the Bitcoin network only.",
      },
      ETH: {
        network: "ERC20",
        binanceLabel: "Buy ETH via Binance",
        coinbaseLabel: "Buy ETH via Coinbase",
        providerText:
          "Choose Binance or Coinbase if purchasing ETH externally.",
        sendText:
          "After purchase, send ETH to the designated gateway wallet using the ERC20 network.",
      },
      BNB: {
        network: "BEP20",
        binanceLabel: "Buy BNB via Binance",
        coinbaseLabel: "Buy BNB via Coinbase",
        providerText:
          "Choose Binance or Coinbase if purchasing BNB externally.",
        sendText:
          "After purchase, send BNB to the designated gateway wallet using the BEP20 network.",
      },
    }),
    []
  );

  const currentAsset = assetConfig[selectedAsset];

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
          Choose your preferred funding method below. You may buy crypto from an
          external provider, send it to the designated gateway wallet, or use
          bank payment when required for your transaction flow.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 22,
          }}
        >
          {(["USDT", "BTC", "ETH", "BNB"] as AssetKey[]).map((asset) => (
            <button
              key={asset}
              type="button"
              onClick={() => setSelectedAsset(asset)}
              style={{
                ...assetChipStyle,
                background:
                  selectedAsset === asset ? "#2563eb" : "rgba(255,255,255,0.08)",
                border:
                  selectedAsset === asset
                    ? "1px solid #3b82f6"
                    : "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
              }}
            >
              {asset}
            </button>
          ))}
        </div>

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
            {currentAsset.binanceLabel}
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
            {currentAsset.coinbaseLabel}
          </a>

          <button
            type="button"
            onClick={() => setShowBanks((prev) => !prev)}
            style={{
              background: "#111",
              color: "#ffffff",
              border: "1px solid #42568f",
              padding: "16px 20px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 16,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {showBanks ? "Hide Bank Payment" : "Bank Payment"}
            <div
              style={{
                fontSize: "11px",
                color: "#a5b4fc",
                marginTop: "6px",
                fontWeight: 600,
              }}
            >
              Approved bank accounts
            </div>
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
                type="button"
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
                {currentAsset.network}
              </div>

              <div
                style={{
                  ...pillStyle,
                  background: "#1d4ed8",
                }}
              >
                {selectedAsset}
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
                type="button"
                onClick={() => copyText(buyerWallet)}
                style={smallButtonStyle("#2563eb", "#ffffff")}
                disabled={!buyerWallet.trim()}
              >
                Copy Buyer Wallet
              </button>

              <button
                type="button"
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
            1. {currentAsset.providerText}
            <br />
            2. {currentAsset.sendText}
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

function smallButtonStyle(
  background: string,
  color: string
): React.CSSProperties {
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

const assetChipStyle: React.CSSProperties = {
  border: "none",
  padding: "10px 16px",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 13,
};