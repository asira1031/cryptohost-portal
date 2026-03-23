"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful. You can now log in.");
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b2d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          background: "#101a49",
          padding: 30,
          borderRadius: 16,
          width: 320,
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Create Account
        </button>

        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#f4b400",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
};