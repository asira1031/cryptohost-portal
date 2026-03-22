import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

type UploadedFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: string;
  created_at: string;
};

export default async function FilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .order("created_at", { ascending: false });

  const files: UploadedFile[] = data ?? [];

  return (
    <div style={{ padding: 24 }}>
      <h1>My Uploaded Files</h1>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          {error.message}
        </p>
      )}

      {!error && files.length === 0 ? (
        <p style={{ marginTop: 12 }}>No uploaded files yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>File</th>
              <th style={{ textAlign: "left", padding: 8 }}>Status</th>
              <th style={{ textAlign: "left", padding: 8 }}>Size</th>
              <th style={{ textAlign: "left", padding: 8 }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td style={{ padding: 8 }}>{file.file_name}</td>
                <td style={{ padding: 8 }}>{file.status}</td>
                <td style={{ padding: 8 }}>{file.file_size ?? "-"}</td>
                <td style={{ padding: 8 }}>
                  {new Date(file.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}