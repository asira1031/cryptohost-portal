"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  status: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to view your dashboard.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("uploaded_files")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(`Error loading files: ${error.message}`);
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
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
              Transaction Monitor
            </h1>
            <p style={{ color: "#b8c1ec" }}>
              View your uploaded files and processing status.
            </p>
          </div>

          <Link
            href="/upload"
            style={{
              background: "#f4b400",
              color: "#111",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Upload New File
          </Link>
        </div>

        {loading ? (
          <p>Loading dashboard...</p>
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
            <p>No files uploaded yet.</p>
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
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
                padding: "16px",
                background: "#182142",
                fontWeight: "bold",
                color: "#f4b400",
              }}
            >
              <div>File Name</div>
              <div>Type</div>
              <div>Size</div>
              <div>Status</div>
              <div>Date Uploaded</div>
            </div>

            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
                  padding: "16px",
                  borderTop: "1px solid #243055",
                  alignItems: "center",
                }}
              >
                <div>{file.file_name}</div>
                <div>{file.file_type || "Unknown"}</div>
                <div>{formatFileSize(file.file_size)}</div>
                <div>
                  <span
                    style={{
                      background:
                        file.status === "Uploaded" ? "#1f7a4f" : "#444",
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