"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

type ClientDashboardAccess = {
  id: string;
  user_id: string | null;
  email: string;
  full_name: string;
  subscription_plan: string;
  payment_status: string;
  assigned_dashboard: string;
  dashboard_label: string;
  access_enabled: boolean;
  created_at?: string;
  updated_at?: string;
};
type UploadedFileRow = {
  id: string;
  file_name: string;
  file_path: string;
  uploader_email: string | null;
  created_at?: string;
  status?: string | null;
};


export default function Dashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientDashboardAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploads, setUploads] = useState<UploadedFileRow[]>([]);

  useEffect(() => {
    const checkUserAndLoad = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userEmail = (user?.email || "").toLowerCase().trim();

      if (!userEmail) {
        router.replace("/login");
        return;
      }

      const adminEmails = ["jans103174@gmail.com"];

      if (adminEmails.includes(userEmail)) {
        setIsAdmin(true);

        const { data } = await supabase
          .from("client_dashboard_access")
          .select("*")
          .order("created_at", { ascending: false });

        setClients((data || []) as ClientDashboardAccess[]);

        const { data: uploadData } = await supabase
          .from("uploaded_files")
          .select("id, file_name, file_path, uploader_email, created_at, status")
          .order("created_at", { ascending: false });

        setUploads((uploadData || []) as UploadedFileRow[]);
        setLoading(false);
        return;
      }

      setIsAdmin(false);

      const { data: client } = await supabase
        .from("client_dashboard_access")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (client && client.access_enabled && client.payment_status === "PAID") {
        router.replace(`/dashboard/reports/${client.assigned_dashboard}`);
        return;
      }

      router.replace("/dashboard/my-files");
    };

    checkUserAndLoad();
  }, [router]);

  const quickLinkStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 16px",
    background: "#07142b",
    color: "#ffffff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  };

  const fileDashboards = [
    {
      title: "Ken — 99.5M LP",
      status: "ACTIVE",
      color: "#16a34a",
      href: "/dashboard/reports/99.5M-LP",
      note: "Liquidity dashboard",
    },
    {
      title: "Ken — 10B Restricted Review",
      status: "PAID / ACTIVE ACCESS",
      color: "#dc2626",
      href: "/dashboard/reports/ken-10b",
      note: "Ken restricted review file",
    },
    {
      title: "890M Dashboard",
      status: "ACTIVE",
      color: "#2563eb",
      href: "/dashboard/reports/890M",
      note: "890M client dashboard",
    },
    {
      title: "TJDB1.275B Dashboard",
      status: "ACTIVE",
      color: "#7c3aed",
      href: "/dashboard/reports/TJDB1.275B",
      note: "TJDB 1.275B dashboard",
    },
    {
      title: "HSBC — 5M Validation",
      status: "PENDING",
      color: "#fde68a",
      href: "/dashboard/reports/hsbclogen",
      note: "HSBC international payment file",
    },
    {
      title: "913M HSBC Validation",
      status: "ON HOLD",
      color: "#f59e0b",
      href: "/dashboard/reports/913M",
      note: "913M HSBC MT103 transmission file",
    },
    {
      title: "HSBC — TPP HOLD",
      status: "READY FOR EXECUTION",
      color: "#22c55e",
      href: "/dashboard/reports/hsbc-tpp-hold",
      note: "HSBC transaction hold validation file",
    },

    {
  title: "SWIFT NET Validation",
  status: "ADMIN REVIEW",
  color: "#facc15",
  href: "/dashboard/reports/swift-net-validation",
  note: "SWIFT NET validation report",
},
  ];


  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 600,
          color: "#07142b",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 600,
          color: "#07142b",
        }}
      >
        Redirecting...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: 24,
            background: "#ffffff",
            border: "1px solid #dbe3ef",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: "#07142b",
            }}
          >
            Admin Hub Dashboard
          </h1>

          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#5b6472",
              fontSize: 16,
            }}
          >
            Open and monitor active client dashboards from one place.
          </p>
        </div>

        <div
          style={{
            marginBottom: 24,
            background: "#ffffff",
            border: "1px solid #dbe3ef",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 18,
              fontSize: 22,
              fontWeight: 700,
              color: "#07142b",
            }}
          >
            Quick Links
          </h2>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a href="/dashboard/payment?plan=basic" style={quickLinkStyle}>
              Payment
            </a>

            <a href="/dashboard/upload" style={quickLinkStyle}>
              Upload
            </a>

            <a href="/dashboard/my-files" style={quickLinkStyle}>
              My Files
            </a>

            <a href="/dashboard/subscription" style={quickLinkStyle}>
              Subscription
            </a>

            <Link href="/dashboard/pos-validation" style={quickLinkStyle}>
              Visa Protocol 101.1
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#07142b",
              marginBottom: 14,
            }}
          >
            File Dashboards
          </h2>

          <div style={{ display: "grid", gap: 18 }}>
            {fileDashboards.map((item) => (
              <div
                key={item.href}
                style={{
                  border: "1px solid #dbe3ef",
                  borderRadius: 18,
                  padding: 24,
                  background: "#ffffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#07142b",
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      marginBottom: 12,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: `${item.color}20`,
                      color: item.color,
                      fontWeight: 700,
                      fontSize: 13,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    {item.status}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#5b6472",
                      fontSize: 15,
                    }}
                  >
                    {item.note}
                  </p>
                </div>

                <Link
                  href={item.href}
                  style={{
                    background: "#07142b",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "14px 22px",
                    borderRadius: 12,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    minWidth: 160,
                  }}
                >
                  Open Dashboard
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#07142b",
              marginBottom: 8,
            }}
          >
            Recent Uploads
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: 18,
              fontSize: 15,
            }}
          >
            Admin-only view of uploaded client files
          </p>

          {uploads.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #dbe3ef",
                borderRadius: 16,
                padding: 20,
                color: "#64748b",
              }}
            >
              No uploads found
            </div>
          ) : (
           <div style={{ display: "grid", gap: 16 }}>
  {uploads.map((file) => (
    <div
      key={file.id}
      style={{
        border: "1px solid #dbe3ef",
        borderRadius: 16,
        padding: 20,
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div style={{ flex: 1, minWidth: 280 }}>
        <h3
          style={{
            margin: 0,
            fontWeight: 700,
            color: "#07142b",
            fontSize: 18,
          }}
        >
          {file.file_name}
        </h3>

        <p style={{ margin: "6px 0", color: "#555" }}>
          {file.uploader_email || "No email"} uploaded this file
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              background: "#e0f2fe",
              color: "#0284c7",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {file.status || "uploaded"}
          </span>

          <span
            style={{
              background: "#f1f5f9",
              color: "#64748b",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {file.created_at
              ? new Date(file.created_at).toLocaleString()
              : "No date"}
          </span>
        </div>
      </div>

      <a
        href={`/api/admin/open-file?path=${encodeURIComponent(file.file_path)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#07142b",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Open File
      </a>
    </div>
  ))}
</div>
          )}
        </div>

        <div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#07142b",
              marginBottom: 8,
            }}
          >
            Auto Client Dashboards
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: 18,
              fontSize: 15,
            }}
          >
            Automatically generated from database
          </p>

          {clients.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #dbe3ef",
                borderRadius: 16,
                padding: 20,
                color: "#64748b",
              }}
            >
              No clients found
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {clients.map((client) => (
                <div
                  key={client.id}
                  style={{
                    border: "1px solid #dbe3ef",
                    borderRadius: 16,
                    padding: 20,
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 16,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        color: "#07142b",
                        fontSize: 18,
                      }}
                    >
                      {client.dashboard_label}
                    </h3>

                    <p style={{ margin: "6px 0", color: "#555" }}>
                      {client.email}
                    </p>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: "#e5f7ed",
                          color: "#16a34a",
                          padding: "4px 10px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {client.subscription_plan}
                      </span>

                      <span
                        style={{
                          background:
                            client.payment_status === "PAID"
                              ? "#e5f7ed"
                              : "#fee2e2",
                          color:
                            client.payment_status === "PAID"
                              ? "#16a34a"
                              : "#dc2626",
                          padding: "4px 10px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {client.payment_status}
                      </span>

                      <span
                        style={{
                          background: client.access_enabled
                            ? "#e0f2fe"
                            : "#f1f5f9",
                          color: client.access_enabled ? "#0284c7" : "#64748b",
                          padding: "4px 10px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {client.access_enabled ? "ACCESS ON" : "LOCKED"}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/reports/${client.assigned_dashboard}`}
                    style={{
                      background: "#07142b",
                      color: "#fff",
                      padding: "12px 18px",
                      borderRadius: 10,
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Open Dashboard
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}