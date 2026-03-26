"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Upload failed.");
        return;
      }

      setMessage("File uploaded successfully.");
      setSelectedFile(null);

      const input = document.getElementById("file-upload") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error) {
      setMessage("Something went wrong while uploading the file.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#13205a",
          borderRadius: 18,
          padding: 30,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Upload Financial File
        </h1>

        <p
          style={{
            color: "#d7defa",
            marginBottom: 30,
            fontSize: 16,
          }}
        >
          Securely upload your financial file for processing.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: "#24357a",
              border: "1px solid #3951a4",
              borderRadius: 12,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedFile(file);
                setMessage("");
              }}
              style={{
                color: "#ffffff",
                width: "100%",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#f5bd00",
              color: "#000000",
              border: "none",
              padding: "14px 28px",
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Submit File
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 20,
              color: message.toLowerCase().includes("success") ? "#4ade80" : "#ff8a8a",
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}