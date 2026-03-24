"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔒 INSTALL CHECK (IMPORTANT)
  useEffect(() => {
    const installed = localStorage.getItem("cryptohost_installed");

    if (!installed) {
      window.location.href = "/setup";
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Registration successful! You can now log in.");
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "none",
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
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "6px",
              border: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              background: "#facc15",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              color: message.includes("successful") ? "#22c55e" : "red",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#facc15" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}