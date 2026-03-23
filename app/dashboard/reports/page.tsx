"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

type FileData = {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
};

export default function ReportsPage() {
  const supabase = createClient();

  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from("uploaded_files")
        .select("id, file_name, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Reports fetch error:", error);
        setError("Failed to load reports.");
      } else {
        setFiles(data || []);
      }

      setLoading(false);
    }

    fetchReports();
  }, [supabase]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "28px 24px",
      }}
    >
      <div style={{ maxWidth: 1100 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 34,
            fontWeight: 800,
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          📊 Reports
        </h1>

        <p
          style={{
            marginTop: 8,
            marginBottom: 24,
            color: "#4b5563",
            fontSize: 15,
          }}
        >
          View your uploaded files and current processing status.
        </p>

        {loading && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 18,
              color: "#374151",
            }}
          >
            Loading reports...
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fecaca",
              borderRadius: 14,
              padding: 18,
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && files.length === 0 && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 18,
              color: "#374151",
            }}
          >
            No reports found.
          </div>
        )}

        {!loading && !error && files.length > 0 && (
          <div style={{ display: "grid", gap: 14 }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 10,
                    wordBreak: "break-word",
                  }}
                >
                  {file.file_name}
                </div>

                <div
                  style={{
                    color: "#374151",
                    fontSize: 15,
                    marginBottom: 6,
                  }}
                >
                  <strong>Status:</strong> {file.status}
                </div>

                <div
                  style={{
                    color: "#374151",
                    fontSize: 15,
                    marginBottom: 14,
                  }}
                >
                  <strong>Date:</strong>{" "}
                  {new Date(file.created_at).toLocaleString()}
                </div>

                <Link
                  href={`/dashboard/reports/${file.id}`}
                  style={{
                    color: "#f59e0b",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  View Report →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}