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
          background: "#f1f5f9",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "22px",
            padding: "40px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#0b2454",
              marginBottom: "28px",
            }}
          >
            Confidential File Result
          </h1>

          <div
            style={{
              border: "1px solid #d7e3f4",
              borderRadius: "18px",
              background: "#f8fbff",
              padding: "30px",
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "#0f172a",
                marginBottom: "18px",
              }}
            >
              <strong>Reference:</strong> {reference}
            </p>

            <p
              style={{
                fontSize: "18px",
                color: "#0f172a",
                marginBottom: "22px",
              }}
            >
              <strong>Status:</strong> Restricted
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#223a5e",
                margin: 0,
              }}
            >
              This result is protected and will only become visible once access
              has been granted by CryptoHost.
              <br />
              Please use your assigned file reference and authorized access code
              to view your transaction result.
            </p>
          </div>

          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              background: "#2957d8",
              color: "#ffffff",
              padding: "14px 26px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Back to Dashboard
          </Link>
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
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#101a34",
          borderRadius: "20px",
          padding: "36px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "18px",
          }}
        >
          Authorized File Result
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "14px" }}>
          <strong>Reference:</strong> {reference}
        </p>

        <p style={{ fontSize: "18px", marginBottom: "14px" }}>
          <strong>Status:</strong> Access Granted
        </p>

        <p style={{ fontSize: "18px", marginBottom: "14px" }}>
          <strong>Transaction Hash:</strong> 0x0000000000000000000000000000000000000000
        </p>

        <p style={{ fontSize: "18px", marginBottom: "24px" }}>
          <strong>Result:</strong> Transaction result visible to authorized client
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#ffffff",
            padding: "14px 26px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}