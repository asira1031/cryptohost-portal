export default function HSBCTPPHoldPage() {
  const progress = 93;

  return (
    <div style={{ padding: 30, color: "white", background: "#020617", minHeight: "100vh" }}>
      
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>
        Transaction In Progress
      </h1>

      <p style={{ fontSize: 18 }}>
        Status: <strong>PROCESSING ({progress}%)</strong>
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: 12,
          background: "#1e293b",
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f0b90b, #22c55e)",
            borderRadius: 10,
          }}
        />
      </div>

      <p>
        This transaction is currently in its final processing stage.
      </p>

      <p>
        System validation has reached approximately 93% completion.
        Core infrastructure checks, routing validation, and allocation sequencing
        have been successfully executed.
      </p>

      <p>
        The remaining step involves final compliance confirmation and
        authorization alignment.
      </p>

      <p>
        Processing is ongoing under secure system control.
        No manual action is required at this stage.
      </p>

      <p style={{ marginTop: 20, color: "#94a3b8" }}>
        Timestamp: March 23, 2026 • 18:40 (UTC+8)
      </p>

      <p style={{ marginTop: 30, color: "#64748b" }}>
        Powered by CryptoHost Secure Automation
      </p>

    </div>
  );
}