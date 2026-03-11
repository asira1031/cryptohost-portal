"use client";

import { useState } from "react";

export default function UploadReportPage() {
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const res = await fetch("/api/reports/upload", { method: "POST", body: fd });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setMsg(`❌ ${data?.error || "Upload failed"}`);
      return;
    }

    setMsg(`✅ Saved report: ${data.report.reference}`);
    form.reset();
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Upload Sender Report</h1>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        Upload PDF and store it under a reference (ex: <b>CH-2026-LIVE</b>)
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input name="reference" placeholder="Reference (required)" required />
        <input name="senderName" placeholder="Sender name (optional)" />
        <input name="senderEmail" placeholder="Sender email (optional)" />
        <input name="declaredAmt" placeholder="Declared amount (optional)" />
        <input name="currency" placeholder="Currency (optional) ex: USD" />
        <input name="network" placeholder="Network (optional) ex: ETH" />
        <input name="token" placeholder="Token (optional) ex: USDT" />
        <input name="txHash" placeholder="Tx hash (optional)" />
        <select name="status" defaultValue="ON_HOLD">
          <option value="ON_HOLD">ON_HOLD</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PENDING">PENDING</option>
        </select>

        <input name="file" type="file" accept="application/pdf" required />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Uploading..." : "Upload + Save"}
        </button>

        {msg && <div style={{ marginTop: 6, fontWeight: 600 }}>{msg}</div>}
      </form>

      <p style={{ marginTop: 18, opacity: 0.7 }}>
        After upload, open: <code>/reports/REF</code> (example: <code>/reports/CH-2026-LIVE</code>)
      </p>
    </div>
  );
}
