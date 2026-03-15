"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(`Registration failed: ${error.message}`);
      return;
    }

    const user = data.user ?? data.session?.user;

    if (!user) {
      setMessage("Registration succeeded, but no user session was returned.");
      return;
    }

    const { error: profileError } = await supabase.from("clients").upsert({
      id: user.id,
      full_name: fullName,
      email: email,
      subscription_plan: "Starter",
      subscription_amount: 10,
    });

    if (profileError) {
      setMessage(`Profile save failed: ${profileError.message}`);
      return;
    }

    router.push("/login");
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
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#3366cc",
            color: "white",
            fontSize: "34px",
            fontWeight: "bold",
            padding: "26px 30px",
          }}
        >
          Asira CryptoHost
        </div>

        <div style={{ padding: "34px 30px" }}>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              marginBottom: "28px",
            }}
          >
            Register to access the CryptoHost client portal.
          </p>

          <form onSubmit={handleRegister}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "22px",
                fontSize: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "8px",
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
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "22px",
                fontSize: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "8px",
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
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                marginBottom: "24px",
                fontSize: "16px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                background: "#3366cc",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          {message && (
            <p
              style={{
                color: "red",
                marginTop: "20px",
                fontSize: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </p>
          )}

          <p
            style={{
              marginTop: "24px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#3366cc",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}