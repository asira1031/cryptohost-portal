"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupPage() {
  const router = useRouter();

  const [installStatus, setInstallStatus] = useState<
    "idle" | "installing" | "installed"
  >("idle");

  const handleInstall = () => {
    if (installStatus !== "idle") return;

    setInstallStatus("installing");

    // simulate install process
    setTimeout(() => {
      setInstallStatus("installed");
      localStorage.setItem("cryptohost_installed", "true");
    }, 2000);
  };

  const handleContinue = () => {
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
          maxWidth: "620px",
          background: "#0b1730",
          borderRadius: "18px",
          padding: "48px 40px",
          color: "#ffffff",
          boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ margin: 0, fontSize: "40px", fontWeight: 700 }}>
            Asira CryptoHost
          </h1>

          <p style={{ marginTop: "12px", color: "#cbd5e1", fontSize: "16px" }}>
            Secure Client Access Setup
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "26px 30px",
            marginBottom: "28px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "22px",
              textAlign: "center",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            Prepare Access
          </h2>

          <div style={{ fontSize: "17px", lineHeight: 2 }}>
            <div>
              <button
                onClick={handleInstall}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  fontWeight: 700,
                  cursor:
                    installStatus === "installed"
                      ? "default"
                      : "pointer",
                  fontSize: "17px",
                  color:
                    installStatus === "installed"
                      ? "#22c55e"
                      : "#facc15",
                }}
              >
                {installStatus === "idle" && "Install"}
                {installStatus === "installing" && "Installing..."}
                {installStatus === "installed" && "Installed ✅"}
              </button>{" "}
              CryptoHost App
            </div>

            <div>Confirm supported network (ERC20 / BEP20)</div>
            <div>Prepare your active email access</div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={installStatus !== "installed"}
          style={{
            width: "100%",
            padding: "16px",
            background:
              installStatus === "installed" ? "#facc15" : "#475569",
            color: "#111827",
            border: "none",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "17px",
            cursor:
              installStatus === "installed" ? "pointer" : "not-allowed",
          }}
        >
          Continue to Sign Up
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Complete installation before proceeding.
        </p>
      </div>
    </div>
  );
}