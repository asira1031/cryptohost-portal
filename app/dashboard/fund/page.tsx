"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

const gatewayWallet = "0xc47133a6bd653793562a1ea25cb1d3161fbd99cd";

const assetButtonStyle: React.CSSProperties = {
  background: "#1e3a8a",
  color: "#ffffff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 700,
};

const buyStyle: React.CSSProperties = {
  background: "#f4b400",
  color: "#111827",
  padding: "12px 20px",
  borderRadius: 8,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const coinbaseStyle: React.CSSProperties = {
  background: "#2563eb",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: 8,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

export default function FundPage() {
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState("USDT");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setUserEmail(user.email);
      }
    }

    loadUser();
  }, [supabase]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You must be logged in to upload.");
      setUploading(false);
      return;
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("client-files")
      .upload(filePath, file);

    if (uploadError) {
      setMessage("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase.from("uploaded_files").insert({
      user_id: user.id,
      file_name: file.name,
      file_path: filePath,
      status: "uploaded",
    });

    if (dbError) {
      setMessage(
        "Uploaded to storage but failed to save to database: " + dbError.message
      );
      setUploading(false);
      return;
    }

    setMessage("File uploaded successfully.");
    setUploading(false);
    setFile(null);

    const input = document.getElementById(
      "fund-file-input"
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  }

  const networkLabel =
    selectedAsset === "BTC"
      ? "Bitcoin"
      : selectedAsset === "ETH"
      ? "ERC20"
      : selectedAsset === "BNB"
      ? "BEP20"
      : "ERC20 / BEP20";

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
          maxWidth: 900,
          background: "#101a49",
          borderRadius: 18,
          padding: 30,
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Fund Account
        </h1>

        <p
          style={{
            marginTop: 12,
            marginBottom: 22,
            color: "#c7d2fe",
            fontSize: 14,
          }}
        >
          Choose your preferred funding asset, then upload your financial file
          securely to CryptoHost.
        </p>

        {userEmail && (
          <p
            style={{
              marginTop: 0,
              marginBottom: 18,
              color: "#93c5fd",
              fontSize: 13,
            }}
          >
            Logged in as: {userEmail}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedAsset("USDT")}
            style={assetButtonStyle}
          >
            USDT
          </button>
          <button
            type="button"
            onClick={() => setSelectedAsset("BTC")}
            style={assetButtonStyle}
          >
            BTC
          </button>
          <button
            type="button"
            onClick={() => setSelectedAsset("ETH")}
            style={assetButtonStyle}
          >
            ETH
          </button>
          <button
            type="button"
            onClick={() => setSelectedAsset("BNB")}
            style={assetButtonStyle}
          >
            BNB
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://www.binance.com/en/buy-crypto"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" style={buyStyle}>
              Buy {selectedAsset} via Binance
            </button>
          </a>

          <a
            href="https://www.coinbase.com/buy"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" style={coinbaseStyle}>
              Buy {selectedAsset} via Coinbase
            </button>
          </a>
        </div>

        <div
          style={{
            background: "#1f2b5c",
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
            border: "1px solid #33457a",
          }}
        >
          <p style={{ color: "#93c5fd", fontSize: 13, marginTop: 0 }}>
            Gateway Wallet
          </p>
          <p style={{ color: "#ffffff", fontSize: 14, wordBreak: "break-all" }}>
            {gatewayWallet}
          </p>
          <p style={{ color: "#22c55e", fontSize: 12, marginBottom: 0 }}>
            Asset: {selectedAsset} | Network: {networkLabel}
          </p>
        </div>

        <h2
          style={{
            marginTop: 0,
            color: "#ffffff",
            fontSize: 22,
            marginBottom: 14,
          }}
        >
          Upload Financial File
        </h2>

        <form onSubmit={handleUpload}>
          <input
            id="fund-file-input"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #33457a",
              background: "#1f2b5c",
              color: "#ffffff",
              marginBottom: 20,
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={uploading}
            style={{
              background: uploading ? "#6b7280" : "#f4b400",
              color: "#111827",
              border: "none",
              padding: "14px 24px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              cursor: uploading ? "not-allowed" : "pointer",
              minWidth: 140,
            }}
          >
            {uploading ? "Uploading..." : "Submit File"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: 18,
              padding: "12px 14px",
              borderRadius: 10,
              background: message.toLowerCase().includes("success")
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
              border: message.toLowerCase().includes("success")
                ? "1px solid rgba(34,197,94,0.35)"
                : "1px solid rgba(239,68,68,0.35)",
              color: "#ffffff",
              fontSize: 14,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}