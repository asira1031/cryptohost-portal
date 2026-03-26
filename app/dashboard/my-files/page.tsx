import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

type UploadedFile = {
  id: string;
  file_name: string | null;
  status: string | null;
  created_at: string | null;
  file_path?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function formatFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function getStatusStyle(status?: string | null) {
  const value = (status || "pending").toLowerCase();

  if (value === "approved" || value === "completed" || value === "confirmed") {
    return {
      background: "rgba(34, 197, 94, 0.15)",
      color: "#4ade80",
      border: "1px solid rgba(74, 222, 128, 0.35)",
    };
  }

  if (value === "rejected" || value === "failed" || value === "suspended") {
    return {
      background: "rgba(239, 68, 68, 0.15)",
      color: "#f87171",
      border: "1px solid rgba(248, 113, 113, 0.35)",
    };
  }

  return {
    background: "rgba(245, 189, 0, 0.14)",
    color: "#facc15",
    border: "1px solid rgba(250, 204, 21, 0.35)",
  };
}

export default async function MyFilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: files, error } = await supabase
    .from("uploaded_files")
    .select("id, file_name, status, created_at, file_path, mime_type, file_size")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#03113a",
          padding: "32px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "#13205a",
            borderRadius: 18,
            padding: 24,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>My Files</h1>
          <p style={{ color: "#fca5a5", marginTop: 16 }}>
            Failed to load your uploaded files.
          </p>
        </div>
      </div>
    );
  }

  const uploadedFiles = (files || []) as UploadedFile[];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: "28px 30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: 38,
                  fontWeight: 800,
                }}
              >
                My Files
              </h1>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#c7d2fe",
                  fontSize: 15,
                }}
              >
                View and monitor your uploaded financial files inside CryptoHost.
              </p>
            </div>

            <Link
              href="/dashboard/upload"
              style={{
                background: "#f5bd00",
                color: "#000000",
                textDecoration: "none",
                padding: "13px 18px",
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              Upload New File
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Total Files
            </div>
            <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 800 }}>
              {uploadedFiles.length}
            </div>
          </div>

          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Latest Upload
            </div>
            <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 700 }}>
              {uploadedFiles[0]?.file_name || "No files yet"}
            </div>
          </div>

          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Client Account
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 700,
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: 22,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              marginTop: 0,
              marginBottom: 18,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Uploaded Files
          </h2>

          {uploadedFiles.length === 0 ? (
            <div
              style={{
                background: "#1b2a68",
                borderRadius: 16,
                padding: 24,
                color: "#c7d2fe",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              No uploaded files found yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {uploadedFiles.map((file) => {
                const statusStyle = getStatusStyle(file.status);

                return (
                  <div
                    key={file.id}
                    style={{
                      background: "#1b2a68",
                      borderRadius: 16,
                      padding: 18,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 260 }}>
                        <div
                          style={{
                            color: "#ffffff",
                            fontSize: 20,
                            fontWeight: 800,
                            marginBottom: 10,
                            wordBreak: "break-word",
                          }}
                        >
                          {file.file_name || "Unnamed File"}
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: 12,
                          }}
                        >
                          <div>
                            <div style={{ color: "#93c5fd", fontSize: 12 }}>Uploaded</div>
                            <div style={{ color: "#dbeafe", marginTop: 4 }}>
                              {formatDate(file.created_at)}
                            </div>
                          </div>

                          <div>
                            <div style={{ color: "#93c5fd", fontSize: 12 }}>File Size</div>
                            <div style={{ color: "#dbeafe", marginTop: 4 }}>
                              {formatFileSize(file.file_size)}
                            </div>
                          </div>

                          <div>
                            <div style={{ color: "#93c5fd", fontSize: 12 }}>File Type</div>
                            <div style={{ color: "#dbeafe", marginTop: 4 }}>
                              {file.mime_type || "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            ...statusStyle,
                            padding: "8px 12px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: 0.4,
                          }}
                        >
                          {file.status || "pending"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}