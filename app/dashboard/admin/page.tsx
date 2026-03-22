import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from("deposits")
    .select("*")
    .limit(5);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Dashboard</h1>

      <p>Table queried: deposits</p>

      {error ? (
        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      ) : (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}