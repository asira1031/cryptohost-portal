import { notFound } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

type PageProps = {
  params: Promise<{
    clientId: string;
    fileId: string;
  }>;
};

export default async function AdminClientFilePage({ params }: PageProps) {
  const { clientId, fileId } = await params;
  const supabase = await createClient();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, email, subscription_plan, subscription_status, validation_limit, validations_used")
    .eq("id", clientId)
    .single();

  if (clientError || !client) {
    notFound();
  }

  const { data: file, error: fileError } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("id", fileId)
    .eq("user_id", clientId)
    .single();

  if (fileError || !file) {
    notFound();
  }

  const validationLimit = client.validation_limit ?? 6;
  const validationsUsed = client.validations_used ?? 0;
  const remainingValidations = Math.max(validationLimit - validationsUsed, 0);

  const fileStatus = file.status || "uploaded";
  const validationResult = file.validation_result || "Pending manual validation.";
  const transactionStatus = file.transaction_status || "Awaiting validation";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#04164a",
        padding: "32px 24px",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: 24,
        }}
      >
        <div
          style={{
            background: "#1b2a73",
            borderRadius: 20,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#b8c7ff",
              marginBottom: 10,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            ADMIN FILE VALIDATION VIEW
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            File Validation Details
          </h1>

          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              color: "#d9e3ff",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            This page is for one client and one file only. Manual validation,
            transaction review, and client result posting can be handled here.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#1b2a73",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div style={{ color: "#9fb6ff", fontSize: 14, marginBottom: 8 }}>
              Client Email
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, wordBreak: "break-word" }}>
              {client.email || "No email found"}
            </div>
          </div>

          <div
            style={{
              background: "#1b2a73",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div style={{ color: "#9fb6ff", fontSize: 14, marginBottom: 8 }}>
              Subscription
            </div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              {client.subscription_plan || "Not set"}
            </div>
            <div style={{ color: "#d9e3ff", marginTop: 8 }}>
              Status: {client.subscription_status || "inactive"}
            </div>
          </div>

          <div
            style={{
              background: "#1b2a73",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div style={{ color: "#9fb6ff", fontSize: 14, marginBottom: 8 }}>
              Remaining Validations
            </div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              {remainingValidations} of {validationLimit}
            </div>
            <div style={{ color: "#d9e3ff", marginTop: 8 }}>
              Used: {validationsUsed}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#1b2a73",
            borderRadius: 20,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 22,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            File Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            <InfoCard label="File Name" value={file.file_name || "Unnamed file"} />
            <InfoCard label="File Status" value={fileStatus} />
            <InfoCard label="Transaction Status" value={transactionStatus} />
            <InfoCard
              label="Uploaded At"
              value={
                file.created_at
                  ? new Date(file.created_at).toLocaleString()
                  : "No upload date"
              }
            />
            <InfoCard label="File Size" value={formatFileSize(file.file_size)} />
            <InfoCard label="File Type" value={file.mime_type || "Unknown"} />
          </div>
        </div>

        <div
          style={{
            background: "#1b2a73",
            borderRadius: 20,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            Validation Result
          </h2>

          <div
            style={{
              background: "#223384",
              borderRadius: 16,
              padding: 22,
              color: "#ffffff",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}
          >
            {validationResult}
          </div>

          <div
            style={{
              marginTop: 18,
              color: "#d9e3ff",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            The result will show how many validations are remaining.
          </div>
        </div>

        <div
          style={{
            background: "#1b2a73",
            borderRadius: 20,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            Manual Admin Actions
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <button style={actionButtonStyle("#f5bd00", "#000000")}>
              Mark as Under Validation
            </button>
            <button style={actionButtonStyle("#ffffff", "#111827")}>
              Mark as Validated
            </button>
            <button style={actionButtonStyle("#ff8a8a", "#1a0000")}>
              Set On Hold
            </button>
            <button style={actionButtonStyle("#8ec5ff", "#001a3d")}>
              Push Result to Dashboard
            </button>
          </div>

          <div
            style={{
              marginTop: 18,
              color: "#cbd6ff",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            These buttons are currently display-only for the admin layout. Next,
            we can connect them to real Supabase update actions.
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#223384",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#9fb6ff",
          fontSize: 13,
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function formatFileSize(size?: number | null) {
  if (!size || Number.isNaN(size)) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function actionButtonStyle(background: string, color: string) {
  return {
    background,
    color,
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  } as const;
}