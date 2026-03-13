export default function DashboardPage() {
  const subscriptionActive = false; // change to true after payment confirmation
  const processingFeePaid = false; // change to true after 1.455 ETH is confirmed
  const selectedPlan = "Professional";
  const selectedAmount = "$499";
  const paymentMethod = "PayPal";

  let fileStatus = "Waiting for Subscription";

  if (subscriptionActive && !processingFeePaid) {
    fileStatus = "Waiting for Processing Fee";
  } else if (subscriptionActive && processingFeePaid) {
    fileStatus = "Running";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#2d66d3",
          color: "white",
          padding: "18px 32px",
          fontSize: "34px",
          fontWeight: "bold",
        }}
      >
        Asira CryptoHost
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            background: "#0ea5e9",
            color: "white",
            padding: "18px 22px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Client Dashboard
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #d1d5db",
            borderTop: "none",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "28px",
          }}
        >
          <p style={{ fontSize: "20px", marginBottom: "30px", color: "#334155" }}>
            Manage your subscription, upload access, processing fee, and file
            status from one place.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <div style={labelStyle}>Subscription Status</div>
              <div style={valueStyle}>
                {subscriptionActive ? "Active" : "Not Active"}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>Processing Fee</div>
              <div style={valueStyle}>
                {processingFeePaid ? "Submitted" : "Pending"}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>Processing Status</div>
              <div style={valueStyle}>{fileStatus}</div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Subscription</h2>
            <p style={sectionTextStyle}>
              Select your subscription plan before file upload is enabled.
            </p>

            <div style={infoBoxStyle}>
              <p>
                <strong>Selected Plan:</strong> {selectedPlan}
              </p>
              <p>
                <strong>Amount:</strong> {selectedAmount}
              </p>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>

            <a href="/subscribe" style={primaryButtonStyle}>
              Choose Subscription
            </a>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Upload File</h2>

            {!subscriptionActive ? (
              <>
                <p style={sectionTextStyle}>
                  File upload is locked until subscription payment is confirmed.
                </p>
                <a href="/subscribe" style={primaryButtonStyle}>
                  Go to Subscription
                </a>
              </>
            ) : (
              <>
                <p style={sectionTextStyle}>
                  Your subscription is active. You can now upload your file.
                </p>
                <a href="/upload" style={primaryButtonStyle}>
                  Upload File
                </a>
              </>
            )}
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Processing Fee</h2>
            <p style={sectionTextStyle}>
              Processing fee required before active file execution.
            </p>

            <div style={infoBoxStyle}>
              <p>
                <strong>Amount:</strong> 1.455 ETH
              </p>
              <p>
                <strong>Network:</strong> Ethereum Mainnet
              </p>
              <p>
                <strong>Wallet:</strong> 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
              </p>
              <p>
                <strong>Status:</strong> {processingFeePaid ? "Confirmed" : "Awaiting Payment"}
              </p>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>File Status</h2>
            <div style={infoBoxStyle}>
              <p>
                <strong>Current Status:</strong> {fileStatus}
              </p>
              <p>
                <strong>Reference:</strong> CH-2026-LIVE
              </p>
              <p>
                <strong>Result Page:</strong> Available after processing
              </p>
            </div>

            <a href="/reports/CH-2026-LIVE" style={secondaryButtonStyle}>
              View File Result
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#eef6ff",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  padding: "20px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "#475569",
  marginBottom: "8px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#0f172a",
};

const sectionStyle: React.CSSProperties = {
  marginTop: "28px",
  padding: "24px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  background: "#ffffff",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "26px",
  marginBottom: "10px",
  color: "#0f172a",
};

const sectionTextStyle: React.CSSProperties = {
  fontSize: "17px",
  color: "#475569",
  marginBottom: "18px",
};

const infoBoxStyle: React.CSSProperties = {
  background: "#f8fafc",
  border: "1px solid #dbeafe",
  borderRadius: "10px",
  padding: "18px",
  marginBottom: "18px",
  lineHeight: "1.8",
};

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#2d66d3",
  color: "white",
  padding: "14px 22px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};

const secondaryButtonStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#e5e7eb",
  color: "#111827",
  padding: "14px 22px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};