"use client";

import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem("cryptohost_installed", "true");
    router.push("/register");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #04102a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "620px", // 👈 MEDIUM SIZE
          background: "#0b1730",
          borderRadius: "18px",
          padding: "48px 40px", // 👈 MORE SPACING
          color: "#ffffff",
          boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "40px", // 👈 BIGGER TITLE
              fontWeight: 700,
            }}
          >
            Asira CryptoHost
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#cbd5e1",
              fontSize: "16px",
            }}
          >
            Secure Client Access Setup
          </p>
        </div>

        {/* CONTENT BOX */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "26px",
            marginBottom: "28px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "18px",
              textAlign: "center",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            Prepare Access
          </h2>

          <ul
            style={{
              margin: 0,
              paddingLeft: "22px",
              color: "#e2e8f0",
              lineHeight: 2,
              fontSize: "17px",
            }}
          >
            <li>Install or prepare your wallet</li>
            <li>Confirm supported network (ERC20 / BEP20)</li>
            <li>Prepare your active email access</li>
          </ul>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleContinue}
          style={{
            width: "100%",
            padding: "16px", // 👈 BIGGER BUTTON
            background: "#facc15",
            color: "#111827",
            border: "none",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Continue to Sign Up
        </button>

        {/* FOOTER */}
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          You will be redirected to secure account registration.
        </p>
      </div>
    </div>
  );
}