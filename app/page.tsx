import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ececec",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          background: "#2d66d3",
          color: "white",
          height: "86px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>
          Asira CryptoHost
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Link
            href="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Log In
          </Link>

          <Link
            href="/register"
            style={{
              background: "#1f4fb0",
              color: "white",
              textDecoration: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* LANDING CONTENT ONLY */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            color: "#0f172a",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Asira CryptoHost Client Portal
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#475569",
            marginBottom: "40px",
          }}
        >
          Secure client access for subscription, file upload, and result tracking.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "18px" }}>
          <Link
            href="/register"
            style={{
              background: "#2d66d3",
              color: "white",
              textDecoration: "none",
              padding: "16px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            style={{
              background: "#e5e7eb",
              color: "#111827",
              textDecoration: "none",
              padding: "16px 28px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}