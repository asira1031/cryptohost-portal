"use client";

import { useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setMessage("Signing in...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Invalid login.");
        return;
      }

      setMessage("Login successful.");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ececec",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
          <a
            href="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Log In
          </a>

          <a
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
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1420px",
          margin: "32px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "#1697d5",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "18px 20px",
            }}
          >
            Log In
          </div>

          <div style={{ padding: "24px 20px 28px" }}>
            <p
              style={{
                color: "#334155",
                fontSize: "18px",
                marginBottom: "22px",
              }}
            >
              Sign in to access your secure Asira CryptoHost dashboard.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "14px" }}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  style={inputStyle}
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Sign In
              </button>
            </form>

            {message && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px 16px",
                  borderRadius: "6px",
                  background: "#eef7ff",
                  color: "#0f172a",
                  border: "1px solid #cfe8ff",
                }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  fontSize: "16px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  outline: "none",
  boxSizing: "border-box",
  background: "white",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#2d66d3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};