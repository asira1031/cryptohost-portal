import { notFound, redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: report, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("id", ref)
    .eq("user_id", user.id)
    .single();

  if (error || !report) {
    notFound();
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{report.file_name}</h1>
      <p>Status: {report.status}</p>
      <p>Date: {new Date(report.created_at).toLocaleString()}</p>
      <p>Path: {report.file_path}</p>
    </div>
  );
}