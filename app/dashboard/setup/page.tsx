"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function DashboardSetupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [preferredNetwork, setPreferredNetwork] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setFullName(data.full_name || "");
        setCompanyName(data.company_name || "");
        setPhone(data.phone || "");
        setCountry(data.country || "");
        setAddress(data.address || "");
        setWalletAddress(data.wallet_address || "");
        setIdNumber(data.id_number || "");
        setPreferredNetwork(data.preferred_network || "");
        setNotes(data.notes || "");

        if (data.profile_completed) {
          router.push("/dashboard");
          return;
        }
      }

      setLoading(false);
    };

    loadProfile();
  }, [router, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("User session not found. Please log in again.");
      setSaving(false);
      return;
    }

    const payload = {
      id: user.id,
      full_name: fullName,
      company_name: companyName,
      phone,
      country,
      address,
      wallet_address: walletAddress,
      id_number: idNumber,
      preferred_network: preferredNetwork,
      notes,
      profile_completed: true,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("clients").upsert(payload);

    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    setMessage("Profile completed successfully.");
    setSaving(false);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading setup...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: 32,
          borderRadius: 12,
          width: "100%",
          maxWidth: 760,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Complete Your Profile</h1>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Please complete your personal information before accessing the dashboard.
        </p>

        <form onSubmit={handleSave}>
          <div style={{ display: "grid", gap: 14 }}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Residential / Business Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="ID / Passport Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              style={inputStyle}
            />

            <select
              value={preferredNetwork}
              onChange={(e) => setPreferredNetwork(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Select Preferred Network</option>
              <option value="ERC20">ERC20</option>
              <option value="BEP20">BEP20</option>
              <option value="TRC20">TRC20</option>
              <option value="BTC">BTC</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              placeholder="Notes / Purpose of Transaction"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: 20,
              width: "100%",
              padding: "12px",
              background: "#facc15",
              color: "#020617",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {saving ? "Saving..." : "Save and Continue"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 14,
              color: message.toLowerCase().includes("success") ? "#22c55e" : "#ef4444",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "1px solid #334155",
  background: "#111827",
  color: "#fff",
};