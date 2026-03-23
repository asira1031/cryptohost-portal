"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

type FileData = {
  id: string;
  file_name: string;
  file_path: string;
  status: string;
  created_at: string;
};

export default function ReportDetailPage({
  params,
}: {
  params: { ref: string };
}) {
  const supabase = createClient();

  const [file, setFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      const { data, error } = await supabase
        .from("uploaded_files")
        .select("id, file_name, file_path, status, created_at")
        .eq("id", params.ref)
        .single();

      if (error) {
        console.error("Report detail fetch error:", error);
        setError("Failed to load report.");
      } else {
        setFile(data);
      }

      setLoading(false);
    }

    if (params?.ref) {
      fetchReport();
    }
  }, [params.ref, supabase]);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading report...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 24, color: "red" }}>
        {error}
      </div>
    );
  }

  if (!file) {
    return <div style={{ padding: 24 }}>Report not found.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>📄 Report Details</h1>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          background: "#fff",
        }}
      >
        <p><strong>Reference ID:</strong> {file.id}</p>
        <p><strong>File Name:</strong> {file.file_name}</p>
        <p><strong>Status:</strong> {file.status}</p>
        <p><strong>File Path:</strong> {file.file_path}</p>
        <p><strong>Date:</strong> {new Date(file.created_at).toLocaleString()}</p>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          background: "#fff",
        }}
      >
        <h2>Notice</h2>
        <p>
          This file has been uploaded into the CryptoHost system and recorded
          for processing and monitoring.
        </p>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          background: "#fff",
        }}
      >
        <h2>Technical Log</h2>
        <pre
          style={{
            background: "#111827",
            color: "#e5e7eb",
            padding: 16,
            borderRadius: 10,
            overflowX: "auto",
          }}
        >
{`STATUS     : ${file.status}
FILE       : ${file.file_name}
PATH       : ${file.file_path}
REFERENCE  : ${file.id}
CREATED AT : ${file.created_at}`}
        </pre>
      </div>
    </div>
  );
}