"use client";

import Link from "next/link";
import { useState } from "react";

export default function UploadToServerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setMessage("Please choose a file first.");
      setSuccess(false);
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setSuccess(false);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Upload failed.");
      }

      setSuccess(true);
      setMessage("File uploaded successfully to secure server.");
      setFile(null);

      const input = document.getElementById("secure-file-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error: any) {
      setSuccess(false);
      setMessage(error?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#02134a",
        color: "white",
        padding: "28px 32px",
      }}
    >
      <div style={{ maxWidth: 900 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Upload to Secure Server
        </h1>

        <p
          style={{
            fontSize: 16,
            opacity: 0.95,
            marginBottom: 24,
          }}
        >
          Choose your transaction file and upload it directly through the secure
          portal.
        </p>

        <div
          style={{
            background: "#27348b",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
            marginBottom: 20,
          }}
        >
          <form onSubmit={handleUpload}>
            <div
              style={{
                marginBottom: 16,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Select file
            </div>

            <input
              id="secure-file-input"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{
                display: "block",
                width: "100%",
                background: "#111827",
                color: "white",
                padding: 14,
                borderRadius: 12,
                border: "1px solid #374151",
                marginBottom: 18,
              }}
            />

            {file && (
              <div
                style={{
                  marginBottom: 18,
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 14,
                }}
              >
                <div>
                  <strong>File:</strong> {file.name}
                </div>
                <div>
                  <strong>Size:</strong> {Math.round(file.size / 1024)} KB
                </div>
                <div>
                  <strong>Type:</strong> {file.type || "unknown"}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              style={{
                background: uploading ? "#9ca3af" : "#f0b90b",
                color: "#000",
                fontWeight: 800,
                border: "2px solid white",
                borderRadius: 14,
                padding: "14px 26px",
                cursor: uploading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </form>
        </div>

        {message && (
          <div
            style={{
              background: success ? "#14532d" : "#7f1d1d",
              border: `1px solid ${success ? "#22c55e" : "#ef4444"}`,
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link
            href="/dashboard/my-files"
            style={{
              display: "inline-block",
              background: "#111827",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: 14,
              border: "1px solid #374151",
            }}
          >
            Go to My Files
          </Link>

          <Link
            href="/dashboard/sftp"
            style={{
              display: "inline-block",
              background: "#111827",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: 14,
              border: "1px solid #374151",
            }}
          >
            Back to Server Access
          </Link>
        </div>
      </div>
    </div>
  );
}