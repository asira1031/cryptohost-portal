"use client";

import { useEffect, useState } from "react";

type UploadRow = {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [uploads, setUploads] = useState<UploadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadUploads() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/uploads", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to load uploads");
      setLoading(false);
      return;
    }

    setUploads(data.uploads || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setMessage("");

    const res = await fetch(`/api/admin/uploads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to update status");
      return;
    }

    setUploads((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: data.file.status } : item
      )
    );
  }

  function openReport(id: string) {
    window.open(`/reports/${id}`, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    loadUploads();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Upload Monitor</h1>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {loading ? (
        <p>Loading uploads...</p>
      ) : uploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: 8, textAlign: "left" }}>File</th>
              <th style={{ padding: 8, textAlign: "left" }}>User ID</th>
              <th style={{ padding: 8, textAlign: "left" }}>Status</th>
              <th style={{ padding: 8, textAlign: "left" }}>Created</th>
              <th style={{ padding: 8, textAlign: "left" }}>Report URL</th>
              <th style={{ padding: 8, textAlign: "left" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {uploads.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 8 }}>{item.file_name}</td>
                <td style={{ padding: 8 }}>{item.user_id}</td>
                <td style={{ padding: 8, textTransform: "capitalize" }}>
                  {item.status}
                </td>
                <td style={{ padding: 8 }}>
                  {new Date(item.created_at).toLocaleString()}
                </td>
                <td style={{ padding: 8, fontSize: 12, wordBreak: "break-all" }}>
                  {`/reports/${item.id}`}
                </td>
                <td style={{ padding: 8 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => updateStatus(item.id, "pending")}>
                      Pending
                    </button>
                    <button onClick={() => updateStatus(item.id, "processing")}>
                      Processing
                    </button>
                    <button onClick={() => updateStatus(item.id, "completed")}>
                      Completed
                    </button>
                    <button onClick={() => openReport(item.id)}>
                      Open Report
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}