import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function SecurityPage() {
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
        background: "#03113a",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: "28px 30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            Security
          </h1>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#c7d2fe",
              fontSize: 15,
            }}
          >
            Account protection, authentication status, and security controls.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 22,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Account Status
            </div>
            <div style={{ color: "#4ade80", fontSize: 24, fontWeight: 800 }}>
              Secured
            </div>
          </div>

          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 22,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Authentication
            </div>
            <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 800 }}>
              Verified
            </div>
          </div>

          <div
            style={{
              background: "#13205a",
              borderRadius: 18,
              padding: 22,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>
              Protection Layer
            </div>
            <div style={{ color: "#facc15", fontSize: 24, fontWeight: 800 }}>
              Active
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              marginTop: 0,
              marginBottom: 18,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Security Overview
          </h2>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            {[
              ["Client Account", user.email || "—"],
              ["Session Access", "Authenticated"],
              ["Portal Encryption", "Enabled"],
              ["Transaction Protection", "Enabled"],
              ["Compliance Shield", "Active"],
              ["Fraud Monitoring", "Active"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: "#1b2a68",
                  borderRadius: 14,
                  padding: "16px 18px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ color: "#93c5fd", fontWeight: 700 }}>{label}</div>
                <div style={{ color: "#ffffff", fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}