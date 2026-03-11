"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {

    // validation
    if (!fullName || !email || !company || !password) {
      alert("Please complete all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const userRecord = {
      fullName,
      email,
      company,
      password,
      createdAt: new Date().toLocaleString(),
    };

    const existingUsers = JSON.parse(
      localStorage.getItem("cryptohost_users") || "[]"
    );

    existingUsers.push(userRecord);

    localStorage.setItem(
      "cryptohost_users",
      JSON.stringify(existingUsers)
    );

    alert("Registration successful");

    // clear form
    setFullName("");
    setEmail("");
    setCompany("");
    setPassword("");

    // redirect to login
    router.push("/login");
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
          CryptoHost Registration
        </h1>

        <p style={{ color: "#9fb0d1", marginBottom: "24px" }}>
          Create your client account to access the CryptoHost platform.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <label>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
            placeholder="Enter your full name"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Company Name</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={inputStyle}
            placeholder="Company / Organization"
          />
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Create password"
          />
        </div>

        <button onClick={handleRegister} style={buttonStyle}>
          Create Account
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