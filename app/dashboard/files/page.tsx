import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: string | null;
  created_at: string;
  payment_status: string | null;
  validation_status: string | null;
};

function formatFileSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const files: UploadedFile[] = data ?? [];
  const latestFile = files[0];

  return (
    <div
      style={{
        padding: "18px 22px 30px",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#18296f",
          borderRadius: 20,
          padding: "28px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 20,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 800,
              color: "white",
            }}
          >
            My Files
          </h1>
          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#dbe4ff",
              fontSize: 15,
            }}
          >
            View and monitor your uploaded financial files inside CryptoHost.
          </p>
        </div>

        <Link
          href="/dashboard/upload"
          style={{
            background: "#f7be00",
            color: "#000",
            textDecoration: "none",
            fontWeight: 800,
            padding: "12px 18px",
            borderRadius: 14,
            display: "inline-block",
          }}
        >
          Upload New File
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "#18296f",
            borderRadius: 18,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
            Total Files
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>{files.length}</div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 18,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
            Latest Upload
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {latestFile?.file_name ?? "No files yet"}
          </div>
        </div>

        <div
          style={{
            background: "#18296f",
            borderRadius: 18,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "#8ec5ff", fontSize: 13, marginBottom: 12 }}>
            Client Account
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#18296f",
          borderRadius: 20,
          padding: 20,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 18,
            fontSize: 24,
            fontWeight: 800,
            color: "white",
          }}
        >
          Uploaded Files
        </h2>

        {error && (
          <p style={{ color: "#ff8f8f", marginTop: 10 }}>{error.message}</p>
        )}

        {!error && files.length === 0 ? (
          <p style={{ color: "#dbe4ff" }}>No uploaded files yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 18,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      marginBottom: 14,
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {file.file_name}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: 14,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8ec5ff",
                          marginBottom: 4,
                        }}
                      >
                        Uploaded
                      </div>
                      <div style={{ fontSize: 13, color: "white" }}>
                        {new Date(file.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8ec5ff",
                          marginBottom: 4,
                        }}
                      >
                        File Size
                      </div>
                      <div style={{ fontSize: 13, color: "white" }}>
                        {formatFileSize(file.file_size)}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8ec5ff",
                          marginBottom: 4,
                        }}
                      >
                        File Type
                      </div>
                      <div style={{ fontSize: 13, color: "white" }}>
                        {file.mime_type ?? "—"}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8ec5ff",
                          marginBottom: 4,
                        }}
                      >
                        Payment
                      </div>
                      <div style={{ fontSize: 13, color: "white" }}>
                        {file.payment_status ?? "unpaid"}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8ec5ff",
                          marginBottom: 4,
                        }}
                      >
                        Validation
                      </div>
                      <div style={{ fontSize: 13, color: "white" }}>
                        {file.validation_status ?? "not_started"}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#394067",
                    color: "#f7be00",
                    border: "1px solid #8d7d2a",
                    borderRadius: 999,
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.status ?? "uploaded"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}