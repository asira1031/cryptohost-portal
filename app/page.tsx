"use client";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bitcoin.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 22, 48, 0.75)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Asira CryptoHost
        </h1>

        <p
          style={{
            fontSize: "22px",
            marginBottom: "40px",
            maxWidth: "700px",
          }}
        >
          Secure blockchain transaction processing, financial file validation,
          and digital asset conversion infrastructure.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <a
            href="/signup"
            style={{
              background: "#3568cf",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Sign Up
          </a>

          <a
            href="/login"
            style={{
              background: "#ffffff",
              color: "#111827",
              padding: "16px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Log In
          </a>
        </div>
      </div>
    </main>
  );
}