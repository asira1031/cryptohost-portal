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
        console.error(error);
        setError("Failed to load reports.");
      } else {
        setFiles(data || []);
      }

      setLoading(false);
    }

    fetchReports();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>📊 Reports</h1>
      <p>View your uploaded files and current processing status.</p>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && files.length === 0 && <p>No reports found.</p>}

      {!loading && !error && files.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {files.map((file) => (
            <div
              key={file.id}
              style={{
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 10,
                marginBottom: 12,
                background: "#fff",
              }}
            >
              <h3>{file.file_name}</h3>
              <p>Status: {file.status}</p>
              <p>Date: {new Date(file.created_at).toLocaleString()}</p>

              <Link href={`/dashboard/reports/${file.id}`}>
                View Report →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}