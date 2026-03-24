export default function ReportsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "40px",
          borderRadius: "16px",
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "12px" }}>Reports Locked 🔒</h1>
        <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
          Reports are temporarily restricted. Access will be restored after system update.
        </p>
      </div>
    </div>
  );
}