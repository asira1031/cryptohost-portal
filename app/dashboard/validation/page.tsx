import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import ValidateButton from "./ValidateButton";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string | null;
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

function getValidationLabel(status: string | null) {
  switch (status) {
    case "ready":
      return "Ready for Validation";
    case "in_progress":
      return "Validation in Progress";
    case "validated":
      return "Validated";
    case "on_hold":
      return "On Hold";
    default:
      return "Not Started";
  }
}

function getResultMessage(
  paymentStatus: string | null,
  validationStatus: string | null
) {
  if (paymentStatus !== "paid") {
    return {
      title: "Awaiting Payment Confirmation",
      message:
        "Your file has been uploaded successfully. Validation will become available once payment has been confirmed.",
    };
  }

  switch (validationStatus) {
    case "ready":
      return {
        title: "Ready for Validation",
        message:
          "Your payment has been confirmed. This file is now ready for validation.",
      };
    case "in_progress":
      return {
        title: "Validation in Progress",
        message:
          "Your file is currently undergoing review and system validation inside CryptoHost.",
      };
    case "validated":
      return {
        title: "Successfully Validated",
        message:
          "This file has been reviewed and validated successfully for the next processing stage.",
      };
    case "on_hold":
      return {
        title: "Validation On Hold",
        message:
          "This file requires further review before validation can be completed.",
      };
    default:
      return {
        title: "Awaiting Validation",
        message:
          "Your file is in the system and waiting for the next validation action.",
      };
  }
}

function getBadgeStyle(status: string | null) {
  if (status === "validated") {
    return {
      background: "rgba(32, 197, 94, 0.12)",
      color: "#7CFFB2",
      border: "1px solid rgba(124,255,178,0.35)",
    };
  }

  if (status === "in_progress") {
    return {
      background: "rgba(247, 190, 0, 0.12)",
      color: "#f7be00",
      border: "1px solid rgba(247,190,0,0.35)",
    };
  }

  if (status === "on_hold") {
    return {
      background: "rgba(255, 120, 120, 0.12)",
      color: "#ff9d9d",
      border: "1px solid rgba(255,157,157,0.35)",
    };
  }

  return {
    background: "rgba(142, 197, 255, 0.12)",
    color: "#8ec5ff",
    border: "1px solid rgba(142,197,255,0.35)",
  };
}

export default async function ValidationPage() {
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
        width: "100%",
        maxWidth: "100%",
        padding: "18px 22px 30px",
        color: "white",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
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
          boxSizing: "border-box",
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
            Validation
          </h1>
          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#dbe4ff",
              fontSize: 15,
            }}
          >
            Review the validation result and current processing status of your
            uploaded files.
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
          width: "100%",
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 20,
          boxSizing: "border-box",
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
            Latest Validation
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
          width: "100%",
          maxWidth: "100%",
          background: "#18296f",
          borderRadius: 20,
          padding: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          boxSizing: "border-box",
          overflowX: "hidden",
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
          File Validation Results
        </h2>

        {error && (
          <p style={{ color: "#ff8f8f", marginTop: 10 }}>{error.message}</p>
        )}

        {!error && files.length === 0 ? (
          <p style={{ color: "#dbe4ff" }}>No uploaded files yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {files.map((file) => {
              const result = getResultMessage(
                file.payment_status,
                file.validation_status
              );
              const badgeStyle = getBadgeStyle(file.validation_status);

              return (
                <div
                  key={file.id}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 18,
                    display: "grid",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                          marginBottom: 10,
                        }}
                      >
                        {file.file_name}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(160px, 1fr))",
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
                          <div style={{ fontSize: 13 }}>
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
                          <div style={{ fontSize: 13 }}>
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
                            Payment
                          </div>
                          <div style={{ fontSize: 13 }}>
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
                          <div style={{ fontSize: 13 }}>
                            {getValidationLabel(file.validation_status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        ...badgeStyle,
                        borderRadius: 999,
                        padding: "8px 14px",
                        fontSize: 12,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.validation_status ?? "not_started"}
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: "#8ec5ff",
                        marginBottom: 8,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Validation Result
                    </div>

                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        marginBottom: 8,
                        color: "white",
                      }}
                    >
                      {result.title}
                    </div>

                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#dbe4ff",
                      }}
                    >
                      {result.message}
                    </div>

                    {file.payment_status === "paid" &&
                      file.validation_status === "ready" && (
                        <ValidateButton fileId={file.id} />
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}