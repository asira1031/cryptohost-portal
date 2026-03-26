"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
        color: "#fff",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#111827",
          padding: 30,
          borderRadius: 12,
          width: 340,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: 20, fontWeight: 800 }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: 12,
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#1f2937",
            color: "#fff",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: 10,
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#1f2937",
            color: "#fff",
          }}
        />

        {/* 🔥 Forgot Password Link */}
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <Link
            href="/forgot-password"
            style={{
              color: "#93c5fd",
              fontSize: 13,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "#facc15",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
            color: "#000",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p style={{ color: "#f87171", marginTop: 12, fontSize: 14 }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}