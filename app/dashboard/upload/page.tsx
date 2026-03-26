export default function UploadPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        padding: "40px",
        color: "#ffffff",
      }}
    >
      <h1>Upload Financial File</h1>
      <p>This is the upload-only page.</p>

      <div
        style={{
          marginTop: 24,
          background: "#13205a",
          padding: 24,
          borderRadius: 16,
          maxWidth: 800,
        }}
      >
        <input type="file" />
        <br />
        <br />
        <button
          style={{
            background: "#f5bd00",
            color: "#000",
            border: "none",
            padding: "12px 24px",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Submit File
        </button>
      </div>
    </div>
  );
}