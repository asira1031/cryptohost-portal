"use client";

import Link from "next/link";

export default function SetupPage() {
  const handleContinue = () => {
    localStorage.setItem("cryptohost_installed", "true");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#0f172a", padding: "40px", borderRadius: "12px", width: "400px", color: "#fff" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Prepare Access
        </h2>

        <ul style={{ marginBottom: "20px", color: "#ccc" }}>
          <li>✔ Install / prepare wallet</li>
          <li>✔ Confirm network (ERC20 / BEP20)</li>
          <li>✔ Prepare email access</li>
        </ul>

        <Link href="/register">
          <button
            onClick={handleContinue}
            style={{
              width: "100%",
              padding: "12px",
              background: "#facc15",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continue to Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}