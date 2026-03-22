"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/dashboard");
    } catch {
      setMessage("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #03142f 0%, #021022 55%, #010814 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#0a1628",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "1px solid #1f314b",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "20px",
            color: "#ffffff",
          }}
        >
          Login
        </h1>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "14px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #2a3f5f",
              background: "#020c1b",
              color: "#ffffff",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #2a3f5f",
              background: "#020c1b",
              color: "#ffffff",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p style={{ color: "#ff6b6b", marginTop: "12px" }}>{message}</p>
        )}

        <p style={{ marginTop: "16px", color: "#c6d3e6" }}>
          Don’t have an account?{" "}
          <Link href="/register" style={{ color: "#f3c400" }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}