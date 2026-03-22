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

      // Get user
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
    } catch (err) {
      setMessage("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>Upload File</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginTop: "20px" }}
      />

      <br />

      <button
        onClick={handleUpload}
        style={{
          marginTop: "20px",
          background: "#f3c400",
          color: "#111",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}