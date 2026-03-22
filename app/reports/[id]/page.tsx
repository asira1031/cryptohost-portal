import { notFound } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: file, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !file) {
    notFound();
  }

  const createdAt = new Date(file.created_at).toLocaleString();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 14,
              color: "#facc15",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            CryptoHost Report
          </div>

          <h1 style={{ fontSize: 36, margin: "10px 0 8px" }}>
            File Processing Report
          </h1>

          <p style={{ color: "#9ca3af", margin: 0 }}>
            Secure upload tracking and status report
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 13 }}>Report ID</div>
            <div
              style={{
                marginTop: 8,
                fontWeight: 700,
                wordBreak: "break-word",
              }}
            >
              {file.id}
            </div>
          </div>

          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 13 }}>Current Status</div>
            <div
              style={{
                marginTop: 8,
                fontWeight: 700,
                textTransform: "capitalize",
                color:
                  file.status === "completed"
                    ? "#4ade80"
                    : file.status === "processing"
                    ? "#facc15"
                    : "#60a5fa",
              }}
            >
              {file.status}
            </div>
          </div>

          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 13 }}>Created At</div>
            <div style={{ marginTop: 8, fontWeight: 700 }}>{createdAt}</div>
          </div>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1f2937",
            borderRadius: 14,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>File Details</h2>

          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>File Name</div>
              <div style={{ marginTop: 6 }}>{file.file_name}</div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>User ID</div>
              <div style={{ marginTop: 6, wordBreak: "break-word" }}>
                {file.user_id}
              </div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>Storage Path</div>
              <div style={{ marginTop: 6, wordBreak: "break-word" }}>
                {file.file_path}
              </div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>File Size</div>
              <div style={{ marginTop: 6 }}>{file.file_size ?? "-"}</div>
            </div>

            <div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>Mime Type</div>
              <div style={{ marginTop: 6 }}>{file.mime_type ?? "-"}</div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1f2937",
            borderRadius: 14,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Processing Timeline</h2>

          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <strong>1. File Uploaded</strong>
              <div style={{ color: "#9ca3af", marginTop: 4 }}>
                The file has been securely received and logged in the CryptoHost
                system.
              </div>
            </div>

            <div>
              <strong>2. Admin Review</strong>
              <div style={{ color: "#9ca3af", marginTop: 4 }}>
                The file is available for operational review and status handling.
              </div>
            </div>

            <div>
              <strong>3. Current Status</strong>
              <div
                style={{
                  color: "#9ca3af",
                  marginTop: 4,
                  textTransform: "capitalize",
                }}
              >
                Current workflow state: {file.status}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background:
              file.status === "completed"
                ? "rgba(34,197,94,0.12)"
                : file.status === "processing"
                ? "rgba(250,204,21,0.12)"
                : "rgba(59,130,246,0.12)",
            border: "1px solid #1f2937",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Notice</h3>
          <p style={{ marginBottom: 0, color: "#d1d5db" }}>
            This report reflects the current processing state stored in the
            CryptoHost portal. Status changes made by the admin monitor will
            appear here as the workflow progresses.
          </p>
        </div>
      </div>
    </div>
  );
}