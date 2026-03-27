import { createClient } from "@/app/lib/supabase/server";

export default async function AdminFilePage({
  params,
}: {
  params: { clientId: string; fileId: string };
}) {
  const supabase = await createClient();
  const { clientId, fileId } = params;

  // ✅ fetch client
  const { data: client } = await supabase
    .from("clients")
    .select("id, email")
    .eq("id", clientId)
    .single();

  // ✅ fetch file
  const { data: file } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("id", fileId)
    .single();

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
      .eq("id", fileId);

    const { data: clientData } = await supabase
      .from("clients")
      .select("validations_used")
      .eq("id", clientId)
      .single();

    await supabase
      .from("clients")
      .update({
        validations_used: (clientData?.validations_used ?? 0) + 1,
      })
      .eq("id", clientId);
  }

  async function pushResultToDashboard() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("uploaded_files")
      .update({
        transaction_status: "Result Available",
      })
      .eq("id", fileId);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin File Validation</h1>

      <p>
        <strong>Client:</strong>{" "}
        {client?.email || "No client found"}
      </p>

      <p>
        <strong>File:</strong>{" "}
        {file?.file_name || "No file found"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {file?.status || "uploaded"}
      </p>

      <p>
        <strong>Transaction:</strong>{" "}
        {file?.transaction_status || "Awaiting validation"}
      </p>

      <h2>Actions</h2>

      <button style={actionButtonStyle("#f5bd00", "#000000")}>
        Mark as Under Validation
      </button>

      <form action={markAsValidated}>
        <button style={actionButtonStyle("#ffffff", "#111827")}>
          Mark as Validated
        </button>
      </form>

      <button style={actionButtonStyle("#ff8a8a", "#1a0000")}>
        Set On Hold
      </button>

      <form action={pushResultToDashboard}>
        <button style={actionButtonStyle("#8ec5ff", "#001a3d")}>
          Push Result to Dashboard
        </button>
      </form>

      <h2 style={{ marginTop: 20 }}>Validation Result</h2>

      {/* ✅ FIXED COLOR */}
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
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: 10,
    marginTop: 10,
  };
}