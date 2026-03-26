"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      setReady(true);
      return;
    }
    setReady(true);
  }, []);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully. You can now log in.");
    setLoading(false);
    setPassword("");
    setConfirmPassword("");
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
          Reset Password
        </h1>

        <p
          style={{
            marginTop: 12,
            color: "#c7d2fe",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Enter your new password below.
        </p>

        {ready && (
          <form onSubmit={handleUpdate} style={{ marginTop: 24 }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
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

            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
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
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

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