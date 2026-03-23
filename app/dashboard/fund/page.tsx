"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function FundPage() {
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

    const input = document.getElementById("fund-file-input") as HTMLInputElement | null;
    if (input) input.value = "";
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
          maxWidth: 760,
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
          Upload Financial File
        </h1>

        <p
          style={{
            marginTop: 12,
            marginBottom: 22,
            color: "#c7d2fe",
            fontSize: 14,
          }}
        >
          Upload your transaction file securely to CryptoHost.
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