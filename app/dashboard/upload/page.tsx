"use client";

export default function UploadPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#00090f",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#141922",
          border: "1px solid #232b39",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Upload File</h1>
        <p style={{ color: "#cbd5e1" }}>
          Upload your financial file here.
        </p>

        <input
          type="file"
          style={{
            marginTop: "16px",
            padding: "10px",
            background: "#0c1117",
            color: "#fff",
            border: "1px solid #263143",
            borderRadius: "8px",
          }}
        />
      </div>
    </main>
  );
}