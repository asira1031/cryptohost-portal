"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function MandatedUploadPage() {
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const sourceCode = "MandateErickaPhilippines001";

  const handleUpload = async () => {
    try {
      if (!file) {
        setStatus("❌ Please select a file.");
        return;
      }

      setStatus("⏳ Uploading file...");

      const filename = `${Date.now()}-${file.name}`;

     // Upload to Supabase Storage
const { error: uploadError } = await supabase.storage
  .from("client-files")
  .upload(filename, file);

if (uploadError) {
  setStatus(`❌ ${uploadError.message}`);
  return;
}

// Get public URL
const { data } = supabase.storage
  .from("client-files")
  .getPublicUrl(filename);

// Save DB row
const { error: dbError } = await supabase
  .from("uploaded_files")
  .insert({
    file_name: file.name,
    file_path: filename,
    file_url: data.publicUrl,
    source_type: "mandated",
    source_code: sourceCode,
    status: "uploaded",
  });
      if (dbError) {
        setStatus(`❌ ${dbError.message}`);
        return;
      }

      setStatus("✅ File uploaded successfully.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
    }
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
          Ericka Philippines Mandate Upload
        </h1>

        <p style={{ opacity: 0.7 }}>
          Code: {sourceCode}
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