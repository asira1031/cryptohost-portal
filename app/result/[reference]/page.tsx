import Link from "next/link";

type PageProps = {
  params: {
    reference: string;
  };
};

export default function ResultPage({ params }: PageProps) {
  const reference = params.reference;
  const isAuthorized = false;

  if (!isAuthorized) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "20px",
              color: "#0b1b3f",
            }}
          >
            Confidential File Result
          </h1>

          <div
            style={{
              border: "1px solid #dbe4f0",
              borderRadius: "12px",
              padding: "24px",
              background: "#f9fbff",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "16px", color: "#0f172a" }}>
              <strong>Reference:</strong> {reference}
            </p>

            <p style={{ fontSize: "18px", marginBottom: "16px", color: "#0f172a" }}>
              <strong>Status:</strong> Restricted
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.7",
                color: "#334155",
                margin: 0,
              }}
            >
              This result contains confidential client information and is only
              available to the authorized client account.
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <Link
              href="/dashboard"
              style={{
                display: "inline-block",
                background: "#1d4ed8",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#081226",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          Authorized File Result
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "24px" }}>
          <strong>Reference:</strong> {reference}
        </p>

        <div
          style={{
            background: "#111b34",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "16px" }}>Validation Notice</h2>
          <p style={{ margin: 0, lineHeight: "1.7", color: "#cbd5e1" }}>
            Confidential client result appears here only for the authorized
            account.
          </p>
        </div>

        <div style={{ marginTop: "24px" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}