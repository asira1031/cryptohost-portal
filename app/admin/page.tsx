import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminEmails = [
    "asiracryptohost@adminjanspay.com",
    "your@email.com",
  ];

  if (!adminEmails.includes(user.email || "")) {
    redirect("/dashboard");
  }

  const { data: deposits } = await supabase
    .from("deposits")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: 30,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1>Admin Dashboard</h1>
        <p>Monitor all client deposits here.</p>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            marginTop: 20,
          }}
        >
          <h2>All Deposits</h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16,
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                  <th style={{ padding: 12 }}>User ID</th>
                  <th style={{ padding: 12 }}>Amount</th>
                  <th style={{ padding: 12 }}>Currency</th>
                  <th style={{ padding: 12 }}>Network</th>
                  <th style={{ padding: 12 }}>Status</th>
                  <th style={{ padding: 12 }}>TX Hash</th>
                  <th style={{ padding: 12 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {(deposits || []).map((deposit: any) => (
                  <tr key={deposit.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                    <td style={{ padding: 12 }}>{deposit.user_id}</td>
                    <td style={{ padding: 12 }}>{deposit.amount}</td>
                    <td style={{ padding: 12 }}>{deposit.currency}</td>
                    <td style={{ padding: 12 }}>{deposit.network}</td>
                    <td style={{ padding: 12 }}>{deposit.status}</td>
                    <td style={{ padding: 12 }}>
                      {deposit.tx_hash
                        ? `${deposit.tx_hash.slice(0, 12)}...${deposit.tx_hash.slice(-8)}`
                        : "-"}
                    </td>
                    <td style={{ padding: 12 }}>
                      {new Date(deposit.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}