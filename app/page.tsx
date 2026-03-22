import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #03142f 0%, #021022 55%, #010814 100%)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "rgba(243, 196, 0, 0.12)",
              color: "#f3c400",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "18px",
              border: "1px solid rgba(243, 196, 0, 0.25)",
            }}
          >
            Secure Financial Processing Portal
          </div>

          <h1
            style={{
              fontSize: "56px",
              lineHeight: 1.05,
              margin: "0 0 18px 0",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            Asira CryptoHost
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#c6d3e6",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Secure blockchain transaction processing, financial file validation,
            and digital asset conversion in one protected portal.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "30px",
            }}
          >
            <Link
              href="/register"
              style={{
                background: "#2563eb",
                color: "#ffffff",
                textDecoration: "none",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 700,
                border: "1px solid #2563eb",
                boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
              }}
            >
              Sign Up
            </Link>

            <Link
              href="/login"
              style={{
                background: "#ffffff",
                color: "#111827",
                textDecoration: "none",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Log In
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#9fb0c7",
              marginBottom: "18px",
              fontWeight: 700,
            }}
          >
            Portal Highlights
          </div>

          <div style={{ display: "grid", gap: "14px" }}>
            {[
              "Client registration and secure login",
              "Protected upload flow for financial files",
              "Live dashboard for account funding",
              "Admin visibility for deposit activity",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "#0a1628",
                  border: "1px solid #1f314b",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  color: "#e8eef8",
                  fontSize: "15px",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "22px",
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(243,196,0,0.08)",
              border: "1px solid rgba(243,196,0,0.18)",
            }}
          >
            <div
              style={{
                color: "#f3c400",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Enterprise-ready workflow
            </div>
            <div
              style={{
                color: "#d8e2f1",
                fontSize: "14px",
                lineHeight: 1.6,
              }}
            >
              Designed for sender onboarding, document intake, deposit tracking,
              and secure administrative review.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}