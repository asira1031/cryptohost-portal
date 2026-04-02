import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function UploadSSHPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const uploadPath = `/upload/${user.id}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#02134a",
        color: "white",
        padding: "28px 32px",
      }}
    >
      <div style={{ maxWidth: 1000 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>
          SSH / SFTP Upload Instructions
        </h1>

        <p style={{ marginBottom: 24, opacity: 0.9 }}>
          Use your secure SSH access to upload your transaction file.
        </p>

        <div
          style={{
            background: "#27348b",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <strong>Host:</strong> 44.197.108.28
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Port:</strong> 22
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Protocol:</strong> SFTP
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Username:</strong> (your assigned username)
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Password:</strong> (your assigned password)
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10 }}>
            📁 Upload Directory
          </div>

          <div
            style={{
              fontFamily: "monospace",
              background: "#000",
              padding: 12,
              borderRadius: 10,
              color: "#f0b90b",
            }}
          >
            {uploadPath}
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10 }}>
            📌 Instructions
          </div>

          <ul style={{ lineHeight: 1.8 }}>
            <li>Connect using MobaXterm / FileZilla / WinSCP</li>
            <li>Use SFTP protocol</li>
            <li>Navigate to your assigned folder</li>
            <li>Upload your transaction file</li>
            <li>Do not upload outside your folder</li>
            <li>After upload, open My Files to view</li>
          </ul>
        </div>
      </div>
    </div>
  );
}