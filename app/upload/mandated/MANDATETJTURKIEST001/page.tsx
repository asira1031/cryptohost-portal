"use client";

import { useState } from "react";


export default function MandatedUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const mandatedCode = "PARTNERTJAUSTRALIA001";

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ Please select a file first.");
      return;
    }

    setStatus("⏳ Preparing upload...");

    setTimeout(() => {
      setStatus(`✅ File ready for mandated validation: ${mandatedCode}`);
    }, 1000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07111f",
        color: "white",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#111c2e",
          borderRadius: 20,
          padding: 24,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p style={{ color: "#22d3ee", fontSize: 12, letterSpacing: 2 }}>
          MANDATED PORTAL
        </p>

        <h1 style={{ fontSize: 30 }}>
          TJ Turkiest Mandated Upload
        </h1>

        <p style={{ opacity: 0.7 }}>
          Code: {mandatedCode}
        </p>

        <div style={{ marginTop: 24 }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              background: "#0b1628",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          />
        </div>

        {file && (
          <div
            style={{
              marginTop: 18,
              background: "rgba(255,255,255,0.05)",
              padding: 14,
              borderRadius: 12,
            }}
          >
            <p><strong>Selected:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          style={{
            marginTop: 24,
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "none",
            background: "#facc15",
            color: "#000",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Upload File
        </button>

        {status && (
          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {status}
          </div>
        )}
      </div>
    </main>
  );
}