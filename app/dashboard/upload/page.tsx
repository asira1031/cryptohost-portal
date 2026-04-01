"use client";

import { useRouter } from "next/navigation";

export default function ServerUploadPage() {
  const router = useRouter();

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
        Secure Server Upload Access
      </h1>

      <p
        style={{
          color: "#ffffff",
          margin: "0 0 14px 0",
          fontSize: "16px",
        }}
      >
        Upload your transaction file using secure server access.
      </p>

      <div
        style={{
          background: "#1b2a73",
          borderRadius: 18,
          padding: "26px 22px",
          maxWidth: 760,
          color: "#ffffff",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <strong>Host / Server:</strong> 44.197.108.28 <br />
          <strong>Port:</strong> 22 <br />
          <strong>Protocol:</strong> SFTP
        </div>

        <p style={{ marginBottom: 20, color: "#cbd5f5" }}>
          Use your assigned secure access method to upload transaction files.
          Once uploaded and recorded, your files will appear in the My Files
          section for monitoring and validation.
        </p>

        <button
          onClick={() => router.push("/dashboard/my-files")}
          style={{
            background: "#f5bd00",
            color: "#000000",
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
    </div>
  );
}