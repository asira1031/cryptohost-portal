import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

type PageProps = {
  params: Promise<{
    clientId: string;
    fileId: string;
  }>;
};

export default async function AdminFilePage({ params }: PageProps) {
  const { clientId, fileId } = await params;
  const supabase = await createClient();

  const { data: file } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("id", fileId)
    .eq("user_id", clientId)
    .maybeSingle();

  async function markUnderValidation() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("uploaded_files")
      .update({
        status: "under_validation",
        transaction_status: "Under Validation",
        validation_result: "File is currently under validation.",
      })
      .eq("id", fileId)
      .eq("user_id", clientId);

    revalidatePath(`/admin/clients/${clientId}/files/${fileId}`);
    revalidatePath("/dashboard/my-files");
  }

  async function markAsValidated() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("uploaded_files")
      .update({
        status: "validated",
        transaction_status: "Validated",
        validation_result: "File successfully validated.",
      })
      .eq("id", fileId)
      .eq("user_id", clientId);

    revalidatePath(`/admin/clients/${clientId}/files/${fileId}`);
    revalidatePath("/dashboard/my-files");
  }

  async function setOnHold() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("uploaded_files")
      .update({
        status: "on_hold",
        transaction_status: "On Hold",
        validation_result: "This file has been placed on hold for further review.",
      })
      .eq("id", fileId)
      .eq("user_id", clientId);

    revalidatePath(`/admin/clients/${clientId}/files/${fileId}`);
    revalidatePath("/dashboard/my-files");
  }

  async function pushResultToDashboard() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("uploaded_files")
      .update({
        transaction_status: "Result Available",
      })
      .eq("id", fileId)
      .eq("user_id", clientId);

    revalidatePath(`/admin/clients/${clientId}/files/${fileId}`);
    revalidatePath("/dashboard/my-files");
  }

  return (
    <div
      style={{
        padding: 24,
        background: "#001845",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <h1>Admin File Validation</h1>

      <p>
        <strong>Client ID:</strong> {clientId}
      </p>

      <p>
        <strong>File ID:</strong> {fileId}
      </p>

      <p>
        <strong>File:</strong> {file?.file_name || "No file found"}
      </p>

      <p>
        <strong>Status:</strong> {file?.status || "uploaded"}
      </p>

      <p>
        <strong>Transaction:</strong>{" "}
        {file?.transaction_status || "Awaiting validation"}
      </p>

      <h2>Actions</h2>

      <form action={markUnderValidation}>
        <button type="submit" style={actionButtonStyle("#f5bd00", "#000000")}>
          Mark as Under Validation
        </button>
      </form>

      <form action={markAsValidated}>
        <button type="submit" style={actionButtonStyle("#ffffff", "#111827")}>
          Mark as Validated
        </button>
      </form>

      <form action={setOnHold}>
        <button type="submit" style={actionButtonStyle("#ff8a8a", "#1a0000")}>
          Set On Hold
        </button>
      </form>

      <form action={pushResultToDashboard}>
        <button type="submit" style={actionButtonStyle("#8ec5ff", "#001a3d")}>
          Push Result to Dashboard
        </button>
      </form>

      <h2 style={{ marginTop: 20 }}>Validation Result</h2>
      <div
        style={{
          background: "#f3f4f6",
          color: "#111827",
          padding: 12,
          borderRadius: 8,
          minHeight: 50,
        }}
      >
        {file?.validation_result || "Pending validation"}
      </div>
    </div>
  );
}

function actionButtonStyle(background: string, color: string) {
  return {
    background,
    color,
    border: "none",
    padding: "12px 18px",
    borderRadius: 10,
    fontWeight: "bold" as const,
    cursor: "pointer",
    marginTop: 10,
    marginBottom: 6,
    display: "inline-block",
  };
}