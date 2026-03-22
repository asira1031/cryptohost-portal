import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminPage() {
  const urlLoaded = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceLoaded = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  const { data, error } = await supabaseAdmin
    .from("deposits")
    .select("*")
    .limit(5);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Debug Page</h1>
      <p>URL loaded: {urlLoaded ? "YES" : "NO"}</p>
      <p>Service key loaded: {serviceLoaded ? "YES" : "NO"}</p>
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