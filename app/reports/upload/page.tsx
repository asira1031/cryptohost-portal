export default function UploadPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1>Upload / Create Report</h1>
      <p>Paste your terminal-style output and save it to the database.</p>

      <form action="/api/reports" method="post">
        <label style={{ display: "block", marginTop: 12 }}>Reference (unique)</label>
        <input name="reference" required style={{ width: "100%", padding: 10 }} placeholder="CH-2026-LIVE" />

        <label style={{ display: "block", marginTop: 12 }}>Status</label>
        <select name="status" style={{ width: "100%", padding: 10 }}>
          <option value="ON_HOLD">ON_HOLD</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="REJECTED">REJECTED</option>
        </select>

        <label style={{ display: "block", marginTop: 12 }}>Raw Report (terminal output)</label>
        <textarea
          name="rawReport"
          rows={18}
          style={{ width: "100%", padding: 10, fontFamily: "monospace" }}
          placeholder="Paste the full CRYPTOHOST :: SECURE VALIDATION RESULT output here…"
        />

        <button style={{ marginTop: 12, padding: "10px 14px" }} type="submit">
          Save Report
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        After saving, open: <code>/reports/&lt;REFERENCE&gt;</code>
      </p>
    </div>
  );
}
