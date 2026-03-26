"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export default function ClientInformationPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletNetwork, setWalletNetwork] = useState("ERC20");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError("");
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("clients")
        .select(
          "full_name, address, phone, wallet_address, wallet_network, profile_image"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        setFullName(data.full_name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
        setWalletAddress(data.wallet_address || "");
        setWalletNetwork(data.wallet_network || "ERC20");
        setProfileImage(data.profile_image || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);

  async function handleImageUpload(file: File) {
    setError("");
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You are not logged in.");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/profile-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("client-files")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("client-files").getPublicUrl(filePath);

    setProfileImage(data.publicUrl);
    setMessage("Profile picture uploaded.");
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You are not logged in.");
      setSaving(false);
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      full_name: fullName,
      address,
      phone,
      wallet_address: walletAddress,
      wallet_network: walletNetwork,
      profile_image: profileImage,
    };

    const { error } = await supabase.from("clients").upsert(payload);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Client information saved successfully.");
    setSaving(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03113a",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: "28px 30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            Client Information
          </h1>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#c7d2fe",
              fontSize: 15,
            }}
          >
            Update your personal details, wallet address, preferred network, and
            profile picture.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          style={{
            background: "#13205a",
            borderRadius: 20,
            padding: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
          }}
        >
          {loading ? (
            <p style={{ color: "#ffffff" }}>Loading client information...</p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 18,
                }}
              >
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={email} disabled style={inputStyleDisabled} />
                </div>

                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Wallet Network</label>
                  <select
                    value={walletNetwork}
                    onChange={(e) => setWalletNetwork(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="ERC20">ERC20</option>
                    <option value="BEP20">BEP20</option>
                    <option value="TRC20">TRC20</option>
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Address</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter address"
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Wallet Address</label>
                  <input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    style={inputStyle}
                    placeholder="Enter wallet address"
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    style={inputStyle}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await handleImageUpload(file);
                      }
                    }}
                  />
                </div>
              </div>

              {profileImage && (
                <div style={{ marginTop: 20 }}>
                  <div style={labelStyle}>Preview</div>
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: 110,
                      height: 110,
                      objectFit: "cover",
                      borderRadius: 16,
                      border: "2px solid rgba(255,255,255,0.12)",
                      marginTop: 8,
                    }}
                  />
                </div>
              )}

              {message && (
                <p
                  style={{
                    color: "#4ade80",
                    fontWeight: 700,
                    marginTop: 18,
                  }}
                >
                  {message}
                </p>
              )}

              {error && (
                <p
                  style={{
                    color: "#f87171",
                    fontWeight: 700,
                    marginTop: 18,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                style={{
                  marginTop: 22,
                  background: "#f5bd00",
                  color: "#000000",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                {saving ? "Saving..." : "Save Client Information"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#ffffff",
  fontWeight: 700,
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#1b2a68",
  color: "#ffffff",
  outline: "none",
  fontSize: 15,
};

const inputStyleDisabled: React.CSSProperties = {
  ...inputStyle,
  opacity: 0.8,
  cursor: "not-allowed",
};