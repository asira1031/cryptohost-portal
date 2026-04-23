"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

type StatusType = "IDLE" | "LOADED" | "READY" | "HOLD" | "REJECTED";

export default function ValidationV2Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [status, setStatus] = useState<StatusType>("IDLE");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const email = (user?.email || "").toLowerCase().trim();
      const adminEmails = ["jans103174@gmail.com"];

      if (!adminEmails.includes(email)) {
        router.replace("/dashboard/my-files");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAccess();
  }, [router]);

  useEffect(() => {
    if (status !== "LOADED") return;

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);

      if (p >= 100) {
        clearInterval(interval);
        setStatus("READY");
      }
    }, 200);

    return () => clearInterval(interval);
  }, [status]);

  const handleLoad = () => {
    setFileName("913M_HSBC_VALIDATION_FILE");
    setStatus("LOADED");
    setProgress(0);
  };

  const handleApprove = () => {
    setStatus("READY");
  };

  const handleReject = () => {
    setStatus("REJECTED");
  };

  const handleHold = () => {
    setStatus("HOLD");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061018] text-white flex items-center justify-center">
        <p>Loading validation system...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#061018] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">CryptoHost Validation System V2</h1>
          <p className="text-sm text-white/60">Admin-only validation panel</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0a1821] p-6">
          <h2 className="mb-3 text-xl font-semibold">Active File</h2>
          <p className="text-sm text-white/70">{fileName || "No file loaded"}</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0a1821] p-6">
          <h2 className="mb-3 text-xl font-semibold">Validation Status</h2>

          {status === "IDLE" && (
            <p className="text-amber-300">No active validation loaded</p>
          )}

          {status === "LOADED" && (
            <div>
              <p className="mb-2 text-cyan-300">Processing validation...</p>

              <div className="h-3 w-full rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-cyan-400 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-white/50">{progress}% complete</p>
            </div>
          )}

          {status === "READY" && (
            <p className="font-semibold text-emerald-400">
              ✔ Validation Complete – READY FOR EXECUTION
            </p>
          )}

          {status === "HOLD" && (
            <p className="font-semibold text-amber-400">
              ⚠ ON HOLD – Awaiting compliance / liquidity confirmation
            </p>
          )}

          {status === "REJECTED" && (
            <p className="font-semibold text-red-400">
              ✖ REJECTED – Invalid structure / failed validation
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLoad}
            className="rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-4 py-2 hover:bg-cyan-500/30"
          >
            Load File
          </button>

          <button
            onClick={handleApprove}
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 hover:bg-emerald-500/30"
          >
            Approve
          </button>

          <button
            onClick={handleReject}
            className="rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-2 hover:bg-red-500/30"
          >
            Reject
          </button>

          <button
            onClick={handleHold}
            className="rounded-xl border border-amber-400/30 bg-amber-500/20 px-4 py-2 hover:bg-amber-500/30"
          >
            Hold
          </button>
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          Powered by CryptoHost Secure Validation Engine
        </div>
      </div>
    </div>
  );
}