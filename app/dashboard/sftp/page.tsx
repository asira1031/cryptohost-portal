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

  const uploadBaseDir = process.env.SFTP_UPLOAD_BASE_DIR || "/upload";
  const userFolder = `${uploadBaseDir}/${user.id}`;

  return (
    <div style={{ padding: 24, color: "white" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        SFTP / Server Access
      </h1>

      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        Upload your files to your assigned secure server folder below.
      </p>

      <div
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 14,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>
          Your personal upload folder
        </div>

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1f2937",
            borderRadius: 10,
            padding: 14,
            fontFamily: "monospace",
            fontSize: 15,
            color: "#f0b90b",
            wordBreak: "break-all",
          }}
        >
          {userFolder}
        </div>
      </div>

      <div
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 14,
          padding: 20,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 12 }}>
          Important Instructions
        </div>

        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>Upload only inside your assigned folder.</li>
          <li>Files uploaded there will be synced into your My Files page.</li>
          <li>Do not rename or move other folders on the server.</li>
          <li>Supported files can be synced automatically after upload.</li>
        </ul>
      </div>
    </div>
  );
}