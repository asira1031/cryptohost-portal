import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: reports, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return <div style={{ padding: 24 }}>Failed to load reports.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      {/* KEEP YOUR CURRENT UI HERE */}
      <pre>{JSON.stringify(reports, null, 2)}</pre>
    </div>
  );
}