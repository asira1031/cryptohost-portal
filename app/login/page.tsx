"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UserRecord = {
  fullName: string;
  email: string;
  company: string;
  password: string;
  createdAt: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const users: UserRecord[] = JSON.parse(
      localStorage.getItem("cryptohost_users") || "[]"
    );

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Invalid login credentials.");
      return;
    }

    localStorage.setItem(
      "cryptohost_current_user",
      JSON.stringify(foundUser)
    );

    alert("Login successful");
    router.push("/portal");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071225",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          background: "#0f1d38",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1 style={{ marginTop: 0, fontSize: "38px" }}>
          CryptoHost Login
        </h1>

        <p style={{ color: "#9fb0d1", marginBottom: "24px" }}>
          Sign in to access your CryptoHost client portal.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Enter your password"
          />
        </div>

        <button onClick={handleLogin} style={buttonStyle}>
          Sign In
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "#091325",
  color: "white",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background: "#31d67b",
  color: "#071225",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
};