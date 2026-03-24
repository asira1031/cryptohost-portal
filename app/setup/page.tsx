"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function SetupPage() {
  const router = useRouter();

  const [isIOS, setIsIOS] = useState(false);
  const [installStatus, setInstallStatus] = useState<
    "idle" | "installing" | "installed"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    const standaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;

    const savedInstalled =
      localStorage.getItem("cryptohost_installed") === "true";

    if (standaloneMode || savedInstalled) {
      setInstallStatus("installed");
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (installStatus !== "installing" || deferredPrompt || isIOS) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;

        if (next >= 100) {
          clearInterval(interval);
          setInstallStatus("installed");
          localStorage.setItem("cryptohost_installed", "true");
          return 100;
        }

        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [installStatus, deferredPrompt, isIOS]);

  const handleInstall = async () => {
    if (installStatus !== "idle") return;

    if (deferredPrompt) {
      setInstallStatus("installing");

      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setInstallStatus("installed");
        setProgress(100);
        localStorage.setItem("cryptohost_installed", "true");
      } else {
        setInstallStatus("idle");
        setProgress(0);
      }

      setDeferredPrompt(null);
      return;
    }

    setInstallStatus("installing");
    setProgress(0);
  };

  const handleIOSInstalled = () => {
    setInstallStatus("installed");
    setProgress(100);
    localStorage.setItem("cryptohost_installed", "true");
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
          <img
            src="/icon-192.png"
            alt="Asira CryptoHost Logo"
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "18px",
              marginBottom: "16px",
            }}
          />

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
              {isIOS ? (
                <div style={{ color: "#facc15", fontWeight: 700 }}>
                  On iPhone/iPad: Tap Share (📤) then Add to Home Screen
                </div>
              ) : (
                <>
                  <button
                    onClick={handleInstall}
                    disabled={installStatus !== "idle"}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "17px",
                      cursor: installStatus === "idle" ? "pointer" : "default",
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
                </>
              )}
            </div>

            <div>Confirm supported network (ERC20 / BEP20)</div>
            <div>Prepare your active email access</div>
          </div>

          {!isIOS && installStatus === "installing" && (
            <div style={{ marginTop: "22px" }}>
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#1e293b",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#facc15",
                    borderRadius: "999px",
                    transition: "width 0.18s linear",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "10px",
                  marginBottom: 0,
                  color: "#cbd5e1",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Installing CryptoHost App... {progress}%
              </p>
            </div>
          )}

          {isIOS && installStatus !== "installed" && (
            <div style={{ marginTop: "22px" }}>
              <div
                style={{
                  background: "#111c36",
                  borderRadius: "12px",
                  padding: "16px",
                  color: "#cbd5e1",
                  fontSize: "14px",
                  lineHeight: 1.8,
                }}
              >
                <div>1. Open this page in Safari</div>
                <div>2. Tap the Share button</div>
                <div>3. Choose Add to Home Screen</div>
                <div>4. Return here and confirm below</div>
              </div>

              <button
                onClick={handleIOSInstalled}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "14px",
                  background: "#facc15",
                  color: "#111827",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                I Installed CryptoHost App
              </button>
            </div>
          )}

          {installStatus === "installed" && (
            <p
              style={{
                marginTop: "18px",
                marginBottom: 0,
                color: "#22c55e",
                fontSize: "14px",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              CryptoHost App installation completed successfully.
            </p>
          )}
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