"use client";

export default function ValidateButton({ fileId }: { fileId: string }) {
  async function handleValidate() {
    await fetch("/api/validate-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId }),
    });

    window.location.reload();
  }

  return (
    <button
      onClick={handleValidate}
      style={{
        marginTop: 12,
        background: "#f7be00",
        color: "#000",
        border: "none",
        padding: "10px 16px",
        borderRadius: 10,
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      Validate File
    </button>
  );
}