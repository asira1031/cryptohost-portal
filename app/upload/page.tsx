"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Please log in first before uploading.");
        setLoading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

      const { error: uploadError } = await supabase.storage
        .from("client-files")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        setMessage(`File upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("client-files")
        .getPublicUrl(filePath);

      const fileUrl = publicData.publicUrl;

      const { error: insertError } = await supabase.from("uploaded_files").insert({
        user_id: user.id,
        file_name: file.name,
        file_url: fileUrl,
        file_type: fileExt || "unknown",
        status: "pending",
      });

      if (insertError) {
        setMessage(`Saving uploaded file failed: ${insertError.message}`);
        setLoading(false);
        return;
      }

      setMessage("File uploaded successfully. Your file is now pending review.");
      setFile(null);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Unknown error occurred.";
      setMessage(`Upload failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#3568cf",
            color: "#ffffff",
            padding: "24px 30px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          CryptoHost File Upload
        </div>

        <div style={{ padding: "32px 30px 36px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Upload Your File
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: "24px",
              fontSize: "17px",
              color: "#6b7280",
            }}
          >
            Upload your financial, transaction, or supporting file for CryptoHost review and processing.
          </p>

          <form onSubmit={handleUpload}>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#111827",
                }}
              >
                Choose File
              </label>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              {file && (
                <p
                  style={{
                    marginTop: "12px",
                    color: "#3568cf",
                    fontWeight: "bold",
                  }}
                >
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                background: "#3568cf",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Uploading..." : "Submit File"}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "16px",
                color: "#3568cf",
                fontWeight: "bold",
                textAlign: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}