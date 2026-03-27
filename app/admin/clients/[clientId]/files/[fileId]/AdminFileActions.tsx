"use client";

export default function AdminFileActions({ clientId, fileId }: any) {

  alert("NEW VERSION LOADED"); // 👈 VERY IMPORTANT TEST

  async function handleAction(action: string) {
    await fetch("/api/admin/update-file", {
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

    window.location.reload();
  }

  return (
    <div>
      <button onClick={() => handleAction("under_validation")}>
        Under Validation
      </button>
    </div>
  );
}