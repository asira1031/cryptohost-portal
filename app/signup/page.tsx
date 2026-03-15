"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Plan = {
  name: string;
  price: number;
};

export default function SignupPage() {
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, []);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    // simulate account creation
    console.log("User created:", fullName, email);

    // go to payment
    router.push("/payment");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e9eef6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#3b67c6",
            color: "white",
            padding: "20px",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          Asira CryptoHost
        </div>

        <div style={{ padding: "30px" }}>
          <h2>Create Account</h2>
          <p style={{ color: "#555" }}>
            Register to access the CryptoHost client portal.
          </p>

          {/* SELECTED PLAN */}
          <div
            style={{
              background: "#f3f6ff",
              border: "2px solid #3b67c6",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "25px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#3b67c6",
                marginBottom: "5px",
              }}
            >
              SELECTED PLAN
            </p>

            <h3 style={{ margin: "0" }}>{selectedPlan?.name}</h3>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#3b67c6",
              }}
            >
              ${selectedPlan?.price}
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "6px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "6px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "6px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                background: "#3b67c6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}