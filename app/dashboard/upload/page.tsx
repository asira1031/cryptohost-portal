"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardUploadPage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("Uploading file...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data: { error?: string; message?: string; success?: boolean } = {};

      try {
        data = await res.json();
      } catch {
        setMessage(`Upload failed. Invalid server response. Status: ${res.status}`);
        return;
      }

      if (!res.ok) {
        setMessage(data.error || data.message || `Upload failed. Status: ${res.status}`);
        return;
      }

      if (!data.success) {
        setMessage(data.error || data.message || "Upload did not complete.");
        return;
      }

      setMessage(data.message || "File uploaded successfully.");
      setSelectedFile(null);

      const input = document.getElementById(
        "dashboard-file-upload"
      ) as HTMLInputElement | null;

      if (input) input.value = "";

      router.refresh();

      setTimeout(() => {
        router.push("/dashboard/my-files");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      setMessage("Something went wrong while uploading the file.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "18px 22px" }}>
      <h1
        style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: 500,
          margin: "0 0 4px 0",
        }}
      >
        Upload Financial File
      </h1>

      <p
        style={{
          color: "#ffffff",
          margin: "0 0 14px 0",
          fontSize: "16px",
        }}
      >
        Upload your file securely to your account.
      </p>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "#1b2a73",
            borderRadius: 18,
            padding: "26px 22px",
            maxWidth: 760,
          }}
        >
          <input
            id="dashboard-file-upload"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setSelectedFile(file);
              setMessage("");
            }}
            style={{
              color: "#ffffff",
              width: "100%",
              marginBottom: 18,
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: "#f5bd00",
                color: "#000000",
                border: "2px solid #ffffff",
                padding: "12px 26px",
                borderRadius: 14,
                fontSize: "16px",
                fontWeight: 700,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.8 : 1,
              }}
            >
              {isSubmitting ? "Uploading..." : "Submit File"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard/my-files")}
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "2px solid #ffffff",
                padding: "12px 26px",
                borderRadius: 14,
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Open My Files
            </button>
          </div>

          {message && (
            <p
              style={{
                marginTop: 18,
                marginBottom: 0,
                color:
                  message.toLowerCase().includes("success") ||
                  message.toLowerCase().includes("uploaded")
                    ? "#4ade80"
                    : message.toLowerCase().includes("uploading")
                    ? "#facc15"
                    : "#ff8a8a",
                fontWeight: 600,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}