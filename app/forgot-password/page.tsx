"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password reset email sent. Please check your inbox.");
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#13205a",
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          Forgot Password
        </h1>

        <p
          style={{
            marginTop: 12,
            color: "#c7d2fe",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Enter your email address and we will send you a password reset link.
        </p>

        <form onSubmit={handleReset} style={{ marginTop: 24 }}>
          <label
            style={{
              display: "block",
              color: "#ffffff",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#1b2a68",
              color: "#ffffff",
              outline: "none",
              fontSize: 15,
              marginBottom: 18,
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#f5bd00",
              color: "#000000",
              border: "none",
              padding: "14px 18px",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 18,
              color: "#4ade80",
              fontWeight: 700,
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              marginTop: 18,
              color: "#f87171",
              fontWeight: 700,
            }}
          >
            {error}
          </p>
        )}

        <div style={{ marginTop: 24 }}>
          <Link
            href="/login"
            style={{
              color: "#93c5fd",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}