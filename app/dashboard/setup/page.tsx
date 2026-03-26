// TEST DEPLOY BFF
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("clients")
    .select("profile_completed")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.profile_completed) {
    redirect("/dashboard/setup");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Welcome to Your Dashboard</h1>
      <p style={{ color: "#475569" }}>
        Upload your financial files and monitor your transaction processing.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, color: "#0f172a" }}>
            File Upload
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            Upload financial or transaction files securely into the system.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, color: "#0f172a" }}>
            Transaction Monitor
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            Once processed, transaction activity and updates will appear here.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, color: "#0f172a" }}>
            Account Status
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            Your secure portal access is active and profile setup is complete.
          </p>
        </div>
      </div>
    </div>
  );
}