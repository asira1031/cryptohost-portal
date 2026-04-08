import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import AutoSyncOnOpen from "./AutoSyncOnOpen";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: string | null;
  created_at: string;
};

function formatBytes(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function formatDate(dateString?: string) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div style={{ padding: 24, color: "white" }}>
        Failed to load files.
      </div>
    );
  }

  const uploadedFiles = (files || []) as UploadedFile[];

  return (
    <div style={{ padding: 24, color: "white" }}>
      <AutoSyncOnOpen />

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          My Files
        </h1>
        <p style={{ opacity: 0.8, margin: 0 }}>
          Files synced from your uploads.
        </p>
      </div>

      {uploadedFiles.length === 0 ? (
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 14,
            padding: 20,
          }}
        >
          No files found yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 14,
                padding: 18,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#f9fafb",
                }}
              >
                {file.file_name}
              </div>

              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                <strong>Path:</strong> {file.file_path}
              </div>

              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                <strong>Status:</strong> {file.status || "uploaded"}
              </div>

              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                <strong>Type:</strong> {file.mime_type || "unknown"}
              </div>

              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                <strong>Size:</strong> {formatBytes(file.file_size)}
              </div>

              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>
                <strong>Created:</strong> {formatDate(file.created_at)}
              </div>

              <form action="/api/files/delete" method="POST">
                <input type="hidden" name="fileId" value={file.id} />
                <button
                  type="submit"
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Delete File
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}