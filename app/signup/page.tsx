"use client";

import { useEffect, useState } from "react";
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
      try {
        setSelectedPlan(JSON.parse(storedPlan));
      } catch (error) {
        console.error("Invalid selectedPlan in localStorage:", error);
        setSelectedPlan(null);
      }
    }
  }, []);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/payment");
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
              marginBottom: "24px",
              fontSize: "17px",
              color: "#6b7280",
            }}
          >
            Register to access the CryptoHost client portal.
          </p>

          <div
            style={{
              background: "linear-gradient(135deg,#e8f0ff,#f5f8ff)",
              border: "2px solid #3568cf",
              padding: "24px",
              borderRadius: "14px",
              marginBottom: "25px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#3568cf",
                marginBottom: "6px",
              }}
            >
              SELECTED SUBSCRIPTION
            </p>

            <h2
              style={{
                fontSize: "24px",
                margin: "0",
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              {selectedPlan?.name || "No plan selected"}
            </h2>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#3568cf",
                marginTop: "5px",
              }}
            >
              ${selectedPlan?.price ?? 0}
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#555",
                marginTop: "6px",
              }}
            >
              Secure CryptoHost client portal access
            </p>
          </div>

          <form onSubmit={handleSignup}>
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
              style={{
                width: "100%",
                padding: "16px",
                background: "#3568cf",
                color: "#ffffff",
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

          <p
            style={{
              marginTop: "26px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#3568cf",
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