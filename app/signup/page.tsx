"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setMessage(`Registration failed: ${error.message}`);
        setLoading(false);
        return;
      }

      const user = data.user ?? data.session?.user;

      if (!user) {
        setMessage("Registration succeeded, but no user session was returned.");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("clients").upsert({
        id: user.id,
        full_name: fullName.trim(),
        email: email.trim(),
        subscription_plan: "Starter",
        subscription_amount: 10,
      });

      if (profileError) {
        setMessage(`Profile save failed: ${profileError.message}`);
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      setMessage(`Registration failed: ${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#dfe5eb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#3568cf",
            color: "#ffffff",
            fontSize: "34px",
            fontWeight: "bold",
            padding: "24px 30px",
          }}
        >
          Asira CryptoHost
        </div>

        <div style={{ padding: "34px 30px 36px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: "30px",
              fontSize: "17px",
              color: "#6b7280",
            }}
          >
            Register to access the CryptoHost client portal.
          </p>

          <form onSubmit={handleRegister}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "17px",
                marginBottom: "8px",
                color: "#111827",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "22px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "17px",
                marginBottom: "8px",
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
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "22px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "17px",
                marginBottom: "8px",
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
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "24px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                background: "#3568cf",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "18px",
                marginBottom: "0",
                color: "red",
                fontSize: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </p>
          )}

          <p
            style={{
              marginTop: "26px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#3568cf",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}