"use client";

type AdminFileActionsProps = {
  clientId: string;
  fileId: string;
};

export default function AdminFileActions({
  clientId,
  fileId,
}: AdminFileActionsProps) {
  async function handleAction(action: string) {
    try {
      const res = await fetch("/api/admin/update-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId,
          clientId,
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update file.");
        return;
      }

      window.location.reload();
    } catch (error) {
      alert("Something went wrong while updating the file.");
    }
  }

  return (
    <div>
      <button
        onClick={() => handleAction("under_validation")}
        style={actionButtonStyle("#f5bd00", "#000000")}
      >
        Mark as Under Validation
      </button>

      <button
        onClick={() => handleAction("validated")}
        style={actionButtonStyle("#ffffff", "#111827")}
      >
        Mark as Validated
      </button>

      <button
        onClick={() => handleAction("hold")}
        style={actionButtonStyle("#ff8a8a", "#1a0000")}
      >
        Set On Hold
      </button>

      <button
        onClick={() => handleAction("push")}
        style={actionButtonStyle("#8ec5ff", "#001a3d")}
      >
        Push Result to Dashboard
      </button>
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
    marginRight: 10,
    display: "inline-block",
  };
}