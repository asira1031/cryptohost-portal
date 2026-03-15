"use client";

export default function SubscriptionPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bitcoin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <a
        href="/signup"
        style={{
          background: "#3568cf",
          color: "#fff",
          padding: "16px 28px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Continue
      </a>
    </main>
  );
}