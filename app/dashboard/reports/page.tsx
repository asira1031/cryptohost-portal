import Link from "next/link";
import { createClient } from "../../lib/supabase/server";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: string;
  created_at: string;
};

function getStatusColor(status: string) {
  const s = status.toLowerCase();

  if (s === "completed") return "#22c55e";
  if (s === "processing") return "#facc15";
  if (s === "failed") return "#ef4444";
  return "#60a5fa";
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString();
}

export default async function ReportsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div style={{ padding: 20 }}>Not logged in</div>;
  }

  const { data, error } = await supabase
    .from("uploaded_files")
    .select("id, file_name, file_path, file_size, mime_type, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const files: UploadedFile[] = data ?? [];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            marginBottom: 10,
            fontWeight: 800,
          }}
        >
          📊 Reports
        </h1>

        <p
          style={{
            color: "#555",
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          View your uploaded files and current processing status.
        </p>

        {error ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ margin: 0, color: "#dc2626" }}>
              Failed to load reports.
            </p>
          </div>
        ) : files.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ margin: 0 }}>No reports yet.</p>
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 18px",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    File
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 18px",
                      fontSize: 14,
                      fontWeight: 700,
                      width: 140,
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 18px",
                      fontSize: 14,
                      fontWeight: 700,
                      width: 220,
                    }}
                  >
                    Created
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 18px",
                      fontSize: 14,
                      fontWeight: 700,
                      width: 140,
                    }}
                  >
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {files.map((file, index) => (
                  <tr
                    key={file.id}
                    style={{
                      borderBottom:
                        index === files.length - 1
                          ? "none"
                          : "1px solid #f1f5f9",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px 18px",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#111827",
                          wordBreak: "break-word",
                        }}
                      >
                        {file.file_name}
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 700,
                          textTransform: "capitalize",
                          background: `${getStatusColor(file.status)}20`,
                          color: getStatusColor(file.status),
                        }}
                      >
                        {file.status}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        color: "#374151",
                        fontSize: 14,
                        verticalAlign: "middle",
                      }}
                    >
                      {formatDate(file.created_at)}
                    </td>

                    <td
                      style={{
                        padding: "16px 18px",
                        verticalAlign: "middle",
                      }}
                    >
                      <Link
                        href={`/reports/${file.id}`}
                        style={{
                          display: "inline-block",
                          padding: "8px 14px",
                          borderRadius: 8,
                          background: "#facc15",
                          color: "#111827",
                          textDecoration: "none",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}