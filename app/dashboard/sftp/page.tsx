import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function SftpPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#02134a",
        color: "white",
        padding: "28px 32px",
      }}
    >
      <div style={{ maxWidth: 980 }}>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Secure Server Upload Access
        </h1>

        <p
          style={{
            fontSize: 16,
            opacity: 0.95,
            marginBottom: 24,
          }}
        >
          Upload your transaction file using the secure portal upload system.
        </p>

        <div
          style={{
            background: "#27348b",
            borderRadius: 24,
            padding: "28px 22px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{ lineHeight: 1.9, fontSize: 16, marginBottom: 22 }}>
            <div>
              <strong>Host / Server:</strong> 44.197.108.28
            </div>
            <div>
              <strong>Port:</strong> 22
            </div>
            <div>
              <strong>Protocol:</strong> SFTP / Secure Portal Upload
            </div>
          </div>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 760,
            }}
          >
            Use the secure upload page below to submit your transaction file.
            After a successful upload, your file will appear in the My Files
            section for monitoring and validation.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/dashboard/upload-to-server"
              style={{
                display: "inline-block",
                background: "#f0b90b",
                color: "#000",
                fontWeight: 800,
                textDecoration: "none",
                padding: "14px 26px",
                borderRadius: 14,
                border: "2px solid white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              Upload to Server
            </Link>

            <Link
              href="/dashboard/my-files"
              style={{
                display: "inline-block",
                background: "#111827",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
                padding: "14px 26px",
                borderRadius: 14,
                border: "1px solid #374151",
              }}
            >
              Open My Files
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}