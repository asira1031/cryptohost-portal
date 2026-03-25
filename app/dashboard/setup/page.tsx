export default function DashboardSetupPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: 32,
          borderRadius: 12,
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: 16,
            fontSize: "28px",
            fontWeight: 700,
            color: "#f8fafc",
          }}
        >
          Complete Your Profile
        </h1>

        <p
          style={{
            margin: 0,
            marginBottom: 12,
            color: "#cbd5e1",
            lineHeight: 1.6,
            fontSize: "15px",
          }}
        >
          Your email has been confirmed successfully.
        </p>

        <p
          style={{
            margin: 0,
            marginBottom: 24,
            color: "#94a3b8",
            lineHeight: 1.6,
            fontSize: "14px",
          }}
        >
          The personal information form will be added here next. You may now
          continue with the next onboarding step.
        </p>

        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 10,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#facc15",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Status: Email Confirmed
          </p>
        </div>

        <a
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#facc15",
            color: "#020617",
            padding: "12px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Continue to Dashboard
        </a>
      </div>
    </div>
  );
}