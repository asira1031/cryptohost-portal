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
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: "#020617",
        color: "#e2e8f0",
      }}
    >
      <h1 style={{ marginBottom: 12, color: "#f8fafc" }}>Admin Upload Monitor</h1>

      <div
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          color: "#cbd5e1",
          lineHeight: 1.7,
          fontSize: 14,
        }}
      >
        All validations are conducted under structured internal review protocols.
        Approval is based on file integrity, compliance readiness, and processing
        eligibility.
      </div>

      {message && <p style={{ color: "#f87171" }}>{message}</p>}

      {loading ? (
        <p>Loading uploads...</p>
      ) : uploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#111827" }}>
                <th style={thStyle}>File</th>
                <th style={thStyle}>User ID</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Created</th>
                <th style={thStyle}>Report URL</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {uploads.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderTop: "1px solid #1e293b",
                  }}
                >
                  <td style={tdStyle}>{item.file_name}</td>
                  <td style={tdStyle}>{item.user_id}</td>
                  <td style={{ ...tdStyle, textTransform: "capitalize", color: "#facc15" }}>
                    {item.status}
                  </td>
                  <td style={tdStyle}>
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      fontSize: 12,
                      wordBreak: "break-all",
                      color: "#93c5fd",
                    }}
                  >
                    {`/reports/${item.id}`}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button style={smallButton} onClick={() => updateStatus(item.id, "pending")}>
                        Pending
                      </button>
                      <button
                        style={smallButton}
                        onClick={() => updateStatus(item.id, "processing")}
                      >
                        Processing
                      </button>
                      <button
                        style={smallButton}
                        onClick={() => updateStatus(item.id, "completed")}
                      >
                        Completed
                      </button>
                      <button style={openButton} onClick={() => openReport(item.id)}>
                        Open Report
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: 12,
  textAlign: "left",
  color: "#f8fafc",
  fontSize: 14,
};

const tdStyle: React.CSSProperties = {
  padding: 12,
  color: "#cbd5e1",
  verticalAlign: "top",
};

const smallButton: React.CSSProperties = {
  background: "#1e293b",
  color: "#e2e8f0",
  border: "1px solid #334155",
  borderRadius: 8,
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: 600,
};

const openButton: React.CSSProperties = {
  background: "#facc15",
  color: "#020617",
  border: "none",
  borderRadius: 8,
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: 700,
};