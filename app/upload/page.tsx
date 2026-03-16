"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    try {
      setMessage("");

      if (!selectedFile) {
        setMessage("Please choose a file first.");
        return;
      }

      setUploading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to upload a file.");
        setUploading(false);
        return;
      }

      const fileExt = selectedFile.name.split(".").pop();
      const cleanName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${user.id}/${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from("client-files")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setMessage(`Upload failed: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      const { error: dbError } = await supabase.from("uploaded_files").insert({
        user_id: user.id,
        file_name: selectedFile.name,
        file_path: filePath,
        file_size: selectedFile.size,
        file_type: selectedFile.type || fileExt || "unknown",
        status: "Uploaded",
      });

      if (dbError) {
        setMessage(`File uploaded but database save failed: ${dbError.message}`);
        setUploading(false);
        return;
      }

      setMessage("File uploaded successfully.");
      setSelectedFile(null);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      setMessage("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1020",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#121933",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
          Upload Financial File
        </h1>
        <p style={{ color: "#b8c1ec", marginBottom: "25px" }}>
          Upload your transaction file securely to CryptoHost.
        </p>

        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "20px",
            padding: "12px",
            background: "#1e2747",
            border: "1px solid #2d3b6b",
            borderRadius: "8px",
            color: "white",
          }}
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            background: uploading ? "#666" : "#f4b400",
            color: "#111",
            border: "none",
            padding: "14px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Submit File"}
        </button>

        {message && (
          <p style={{ marginTop: "20px", color: "#8ef0a7" }}>{message}</p>
        )}
      </div>
    </div>
  );
}