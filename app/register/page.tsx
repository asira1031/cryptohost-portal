"use client";

export default function RegisterPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ececec",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#2d66d3",
          color: "white",
          height: "86px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>
          Asira CryptoHost
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <a
            href="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Log In
          </a>

          <a
            href="/register"
            style={{
              background: "#1f4fb0",
              color: "white",
              textDecoration: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Sign Up
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1420px",
          margin: "32px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "#1697d5",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "18px 20px",
            }}
          >
            Sign Up
          </div>

          <div style={{ padding: "24px 20px 28px" }}>
            <p
              style={{
                color: "#334155",
                fontSize: "18px",
                marginBottom: "22px",
              }}
            >
              Create your secure Asira CryptoHost client account.
            </p>

            <form>
              <div style={{ display: "grid", gap: "14px" }}>
                <input type="text" placeholder="Full Name" style={inputStyle} />
                <input type="email" placeholder="Email Address" style={inputStyle} />
                <input type="password" placeholder="Password" style={inputStyle} />
                <input type="text" placeholder="Company Name" style={inputStyle} />
                <input type="text" placeholder="Wallet Address" style={inputStyle} />
              </div>

              <button type="submit" style={buttonStyle}>
                Create Client Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 16px",
  fontSize: "16px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  outline: "none",
  boxSizing: "border-box",
  background: "white",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "18px",
  width: "100%",
  padding: "14px",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#2d66d3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};