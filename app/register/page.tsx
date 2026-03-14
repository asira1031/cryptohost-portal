"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1. Create real auth user in Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setMessage(`Registration failed: ${authError.message}`);
        setLoading(false);
        return;
      }

      // 2. Save extra profile info into clients table
      const userId = authData.user?.id ?? null;

      const { error: insertError } = await supabase.from("clients").insert([
        {
          id: userId,
          name,
          email,
          password,
        },
      ]);

      if (insertError) {
        setMessage(`Profile save failed: ${insertError.message}`);
        setLoading(false);
        return;
      }

      setMessage("Registration successful! You can now log in.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setMessage("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#2f66d0",
            color: "#ffffff",
            padding: "18px 24px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Asira CryptoHost
        </div>

        <div style={{ padding: "28px 24px" }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: "8px",
              fontSize: "30px",
              color: "#111827",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              marginTop: 0,
              marginBottom: "22px",
              color: "#6b7280",
            }}
          >
            Register to access the CryptoHost client portal.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#2f66d0",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "13px 16px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "16px",
                color: message.toLowerCase().includes("failed") ? "#dc2626" : "#16a34a",
              }}
            >
              {message}
            </p>
          )}

          <p style={{ marginTop: "20px", color: "#6b7280" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#2f66d0",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}