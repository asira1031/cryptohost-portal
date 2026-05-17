import { redirect } from "next/navigation";
import Link from "next/link";
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
    return (
      <div
        style={{
          padding: 24,
          minHeight: "100vh",
          background: "#020617",
          color: "#e2e8f0",
        }}
      >
        Failed to load reports.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: "#020617",
        color: "#e2e8f0",
      }}
    >
      <h1
        style={{
          marginBottom: 10,
          fontSize: 32,
          color: "#f8fafc",
        }}
      >
        Reports
      </h1>

      <p style={{ marginBottom: 24, color: "#94a3b8" }}>
        View your uploaded financial files and validation status.
      </p>

      {!reports || reports.length === 0 ? (
        <div
          style={{
            background: "#0f172a",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #1e293b",
            color: "#cbd5e1",
          }}
        >
          No reports found.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          <Link
  href="/dashboard/reports/6B"
  style={{
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 20,
    textDecoration: "none",
    color: "#e2e8f0",
    display: "block",
  }}
>
  <h2
    style={{
      marginBottom: 10,
      color: "#f8fafc",
      fontSize: 20,
    }}
  >
    6B Deutsche Bank AG Validation
  </h2>

  <p style={{ margin: "0 0 6px 0", color: "#cbd5e1" }}>
    <strong>Status:</strong>{" "}
    <span style={{ color: "#facc15" }}>
      UNDER REVIEW
    </span>
  </p>

  <p style={{ margin: "0 0 12px 0", color: "#94a3b8" }}>
    <strong>Reference:</strong> DEUTDEDBSTG
  </p>

  <div
    style={{
      color: "#facc15",
      fontWeight: "bold",
    }}
  >
    View Report →
  </div>
</Link>
          {reports.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <h2
                style={{
                  marginBottom: 10,
                  color: "#f8fafc",
                  fontSize: 20,
                }}
              >
                {item.file_name}
              </h2>

              <p style={{ margin: "0 0 6px 0", color: "#cbd5e1" }}>
                <strong>Status:</strong>{" "}
                <span style={{ color: "#facc15" }}>
                  {item.status || "uploaded"}
                </span>
              </p>

              <p style={{ margin: "0 0 12px 0", color: "#94a3b8" }}>
                <strong>Date:</strong>{" "}
                {item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : "N/A"}
              </p>

              <Link
                href={`/dashboard/reports/${item.id}`}
                style={{
                  color: "#facc15",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                View Report →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}