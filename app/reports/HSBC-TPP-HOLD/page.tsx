export default function HSBCTPPHoldPage() {
  const progress = 100;

  return (
    <div
      style={{
        padding: 30,
        color: "white",
        background: "#020617",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>
        HSBC Transaction Status
      </h1>

      <p style={{ fontSize: 18 }}>
        Status:{" "}
        <strong style={{ color: "#22c55e" }}>
          READY FOR EXECUTION (100%)
        </strong>
      </p>

      {/* PROGRESS BAR */}
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
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            borderRadius: 10,
          }}
        />
      </div>

      {/* MESSAGE */}
      <p>
        System validation has been successfully completed.
      </p>

      <p>
        All required checks including infrastructure validation, routing
        alignment, and allocation sequencing have been verified and cleared.
      </p>

      <p>
        The transaction is now fully prepared and positioned for execution
        under secure system conditions.
      </p>

      <p>
        The system is currently in a stable and ready state.
      </p>

      {/* TIMESTAMP */}
      <p style={{ marginTop: 20, color: "#94a3b8" }}>
        Timestamp: April 21, 2026 • 18:40 (UTC+8)
      </p>

      {/* FOOTER */}
      <p style={{ marginTop: 30, color: "#64748b" }}>
        Powered by CryptoHost Secure Automation
      </p>
    </div>
  );
}