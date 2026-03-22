"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    alert("Upload successful!");
    setFile(null);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Upload File</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div style={{ marginTop: 16 }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}