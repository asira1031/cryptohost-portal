"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type UploadedFile = {
  id: string;
  client_name: string | null;
  client_email: string | null;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  status: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("uploaded_files")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(`Error loading admin monitor: ${error.message}`);
        setLoading(false);
        return;
      }

      setFiles(data || []);
      setLoading(false);
    };

    loadFiles();
  }, []);

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          CryptoHost Admin Transaction Monitor
        </h1>
        <p style={{ color: "#b8c1ec", marginBottom: "24px" }}>
          View all uploaded client files and transaction status.
        </p>

        {loading ? (
          <p>Loading admin monitor...</p>
        ) : message ? (
          <p style={{ color: "#ff9b9b" }}>{message}</p>
        ) : files.length === 0 ? (
          <div
            style={{
              background: "#121933",
              borderRadius: "16px",
              padding: "30px",
            }}
          >
            <p>No uploaded files found.</p>
          </div>
        ) : (
          <div
            style={{
              background: "#121933",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #243055",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.4fr 2fr 1fr 1fr 1.2fr",
                padding: "16px",
                background: "#182142",
                fontWeight: "bold",
                color: "#f4b400",
              }}
            >
              <div>Client Name</div>
              <div>Email</div>
              <div>File Name</div>
              <div>Type</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.4fr 2fr 1fr 1fr 1.2fr",
                  padding: "16px",
                  borderTop: "1px solid #243055",
                  alignItems: "center",
                }}
              >
                <div>{file.client_name || "N/A"}</div>
                <div>{file.client_email || "N/A"}</div>
                <div>{file.file_name}</div>
                <div>{file.file_type || "Unknown"}</div>
                <div>
                  <span
                    style={{
                      background:
                        file.status === "Uploaded"
                          ? "#1f7a4f"
                          : file.status === "Processing"
                          ? "#8a6700"
                          : "#444",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "13px",
                    }}
                  >
                    {file.status || "Pending"}
                  </span>
                </div>
                <div>{new Date(file.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}