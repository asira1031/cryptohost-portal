"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Not logged in.");
        return;
      }

      const filePath = `${user.id}/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("client-files")
        .upload(filePath, file);

      if (error) {
        setMessage("Upload failed: " + error.message);
      } else {
        setMessage("✅ File uploaded successfully!");
      }
    } catch {
      setMessage("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#00090f",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#141922",
          border: "1px solid #232b39",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Upload File</h1>
        <p style={{ color: "#cbd5e1" }}>
          Upload your financial file here.
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{
            marginTop: "16px",
            padding: "10px",
            background: "#0c1117",
            color: "#fff",
            border: "1px solid #263143",
            borderRadius: "8px",
          }}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleUpload}
            style={{
              background: "#f3c400",
              color: "#111",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {loading ? "Uploading..." : "Submit Upload"}
          </button>
        </div>

        {message && (
          <p style={{ marginTop: "20px", color: "#fff" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}