"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bitcoin-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
  style={{
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.08)",
  }}
/>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white",
          maxWidth: "900px",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "0 3px 10px rgba(0,0,0,0.45)",
          }}
        >
          Asira CryptoHost
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.5",
            marginBottom: "35px",
            maxWidth: "850px",
            marginInline: "auto",
            textShadow: "0 2px 8px rgba(0,0,0,0.45)",
          }}
        >
          Secure blockchain transaction processing, financial file validation,
          and digital asset conversion infrastructure.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/register">
            <button
              style={{
                background: "#3b6edc",
                color: "white",
                border: "none",
                padding: "16px 34px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            >
              Sign Up
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                background: "white",
                color: "#111",
                border: "none",
                padding: "16px 34px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            >
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}