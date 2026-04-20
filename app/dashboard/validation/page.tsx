import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

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

const REQUIRED_FILES = [
  { label: "Financial Data", ext: ".fin" },
  { label: "Library/Link File", ext: ".dll" },
  { label: "Event Format/Log", ext: ".cef" },
  { label: "Configuration Metadata", ext: ".json" },
  { label: "Final Verification Black Slip", ext: ".pdf" },
];

function formatFileSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getStatusStyles(kind: "locked" | "incomplete" | "complete") {
  if (kind === "complete") {
    return {
      badgeBg: "rgba(32, 197, 94, 0.12)",
      badgeColor: "#7CFFB2",
      badgeBorder: "1px solid rgba(124,255,178,0.35)",
      titleColor: "#7CFFB2",
    };
  }

  if (kind === "incomplete") {
    return {
      badgeBg: "rgba(255, 120, 120, 0.12)",
      badgeColor: "#ff9d9d",
      badgeBorder: "1px solid rgba(255,157,157,0.35)",
      titleColor: "#ffb4b4",
    };
  }

  return {
    badgeBg: "rgba(247, 190, 0, 0.12)",
    badgeColor: "#f7be00",
    badgeBorder: "1px solid rgba(247,190,0,0.35)",
    titleColor: "#f7be00",
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

  const userEmail = (user.email || "").toLowerCase();

  const isAdmin = userEmail === "jans103174@gmail.com";
  const isKen = userEmail === "ken@beautuniverse.com";
  const show913MReport = isKen || isAdmin;

  const { data, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const files: UploadedFile[] = data ?? [];
  const latestFile = files[0];

  const lowerNames = files.map((file) => file.file_name.toLowerCase());

  const fileChecks = REQUIRED_FILES.map((item) => ({
    ...item,
    present: lowerNames.some((name) => name.endsWith(item.ext)),
  }));

  const missingFiles = fileChecks.filter((item) => !item.present);

  const paymentConfirmed =
    latestFile?.payment_status === "paid" || isKen;

  let resultKind: "locked" | "incomplete" | "complete" = "locked";
  let resultTitle = "Validation Locked — Payment Required";
  let resultMessage =
    "Your submission has been received. Validation results and file structure analysis are currently restricted until payment has been confirmed.";

  if (paymentConfirmed && missingFiles.length > 0) {
    resultKind = "incomplete";
    resultTitle = "Incomplete Submission";
    resultMessage =
      "Your uploaded package has been reviewed, but validation cannot proceed because one or more required files are missing from the system structure.";
  }

  if (paymentConfirmed && missingFiles.length === 0 && files.length > 0) {
    resultKind = "complete";
    resultTitle = "Validation Completed — Ready for Conversion and Broadcast";
    resultMessage =
      "All required files were detected successfully. The uploaded package is complete and authorized to proceed to conversion and broadcast preparation.";
  }

  const statusStyles = getStatusStyles(resultKind);

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
            Review required files, payment status, and current validation result.
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
            Total Uploaded Files
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
            Payment Status
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: paymentConfirmed ? "#7CFFB2" : "#f7be00",
            }}
          >
            {paymentConfirmed
              ? isKen
                ? "PAID — BASIC PLAN (99 USD)"
                : "PAID"
              : "UNPAID"}
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
            Missing Required Files
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            {missingFiles.length}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#18296f",
          borderRadius: 20,
          padding: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div>
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
                fontSize: 26,
                fontWeight: 800,
                color: statusStyles.titleColor,
                lineHeight: 1.3,
              }}
            >
              {resultTitle}
            </div>
          </div>

          <div
            style={{
              background: statusStyles.badgeBg,
              color: statusStyles.badgeColor,
              border: statusStyles.badgeBorder,
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              whiteSpace: "nowrap",
            }}
          >
            {resultKind}
          </div>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 16,
            color: "#dbe4ff",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {files.length === 0
            ? "No uploaded files were found yet. Please upload the required files to begin the validation process."
            : resultMessage}
        </div>

        {files.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 14,
                padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}>
                Processing State
              </div>
              <div style={{ fontWeight: 800 }}>
                {resultKind === "locked"
                  ? "RESTRICTED"
                  : resultKind === "incomplete"
                  ? "ON HOLD"
                  : "READY"}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 14,
                padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}>
                Conversion Status
              </div>
              <div style={{ fontWeight: 800 }}>
                {resultKind === "complete" ? "AUTHORIZED" : "LOCKED"}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 14,
                padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 6 }}>
                Broadcast Status
              </div>
              <div style={{ fontWeight: 800 }}>
                {resultKind === "complete"
                  ? "PENDING EXECUTION"
                  : "RESTRICTED"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          background: "#18296f",
          borderRadius: 20,
          padding: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
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
          Required File Check
        </h2>

        <div style={{ display: "grid", gap: 12 }}>
          {fileChecks.map((item) => (
            <div
              key={item.ext}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>{item.label}</div>
                <div style={{ color: "#8ec5ff", fontSize: 13 }}>
                  {item.ext}
                </div>
              </div>

              <div
                style={{
                  background: item.present
                    ? "rgba(32, 197, 94, 0.12)"
                    : "rgba(255, 120, 120, 0.12)",
                  color: item.present ? "#7CFFB2" : "#ff9d9d",
                  border: item.present
                    ? "1px solid rgba(124,255,178,0.35)"
                    : "1px solid rgba(255,157,157,0.35)",
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {item.present ? "Received" : "Missing"}
              </div>
            </div>
          ))}
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

        {error ? (
          <p style={{ color: "#ff8f8f" }}>{error.message}</p>
        ) : files.length === 0 && !show913MReport ? (
          <p style={{ color: "#dbe4ff" }}>
            No uploaded files yet. Please upload the required package files.
          </p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {show913MReport && (
              <Link
                href="/dashboard/reports/913M"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 16,
                  display: "grid",
                  gap: 10,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 800 }}>
                  913M HSBC Validation
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#8ec5ff",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      Status
                    </div>
                    <div style={{ fontWeight: 800, color: "#f59e0b" }}>
                      UNDER REVIEW
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        color: "#8ec5ff",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      Type
                    </div>
                    <div style={{ fontSize: 13 }}>MT103 / HSBC UK</div>
                  </div>

                  <div>
                    <div
                      style={{
                        color: "#8ec5ff",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      Reference
                    </div>
                    <div style={{ fontSize: 13 }}>HBUK0W283K47PK2C</div>
                  </div>
                </div>
              </Link>
            )}

            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 16,
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 800 }}>
                  {file.file_name}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 4 }}
                    >
                      Uploaded
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {new Date(file.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 4 }}
                    >
                      File Size
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {formatFileSize(file.file_size)}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 4 }}
                    >
                      Payment
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {isKen ? "paid" : file.payment_status ?? "unpaid"}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{ color: "#8ec5ff", fontSize: 12, marginBottom: 4 }}
                    >
                      Validation
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {file.validation_status ?? "not_started"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
