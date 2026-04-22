"use client";

import { useState, useEffect } from "react";

export default function POSValidationPage() {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [protocol, setProtocol] = useState("");

  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!code) {
      setStatus("");
      setLogs([]);
    }
  }, [code]);

  const runValidation = async () => {
    setRunning(true);
    setLogs([]);
    setStatus("");

    const steps = [
      "Connecting to VISA Validation Gateway...",
      "Loading Protocol 101.1...",
      "Reading Track Data...",
      "Verifying Authorization Code...",
      "Checking Reference Integrity...",
      "Syncing with HSBC Node...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setLogs((prev) => [...prev, steps[i]]);
    }

    await new Promise((r) => setTimeout(r, 1000));

    if (code === "7001") {
      setStatus("ON HOLD");
      setLogs((prev) => [...prev, "STATUS: ON HOLD"]);
    } else {
      setStatus("INVALID");
      setLogs((prev) => [...prev, "STATUS: INVALID"]);
    }

    setRunning(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-4 text-2xl font-bold">
        CryptoHost POS Validation Terminal
      </h1>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <input
          placeholder="Card Number"
          className="input"
          onChange={(e) => setCard(e.target.value)}
        />
        <input
          placeholder="Card Holder Name"
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Expiry (MM/YY)"
          className="input"
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          placeholder="CVV"
          className="input"
          onChange={(e) => setCvv(e.target.value)}
        />
        <input
          placeholder="Amount"
          className="input"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Validation Code (7001)"
          className="input"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          placeholder="Protocol (101.1)"
          className="input col-span-2"
          onChange={(e) => setProtocol(e.target.value)}
        />
      </div>

      <button
        onClick={runValidation}
        className="mb-6 rounded-xl bg-green-500 px-6 py-2"
        disabled={running}
      >
        {running ? "Processing..." : "RUN VALIDATION"}
      </button>

      <div className="mb-6 h-60 overflow-y-auto rounded-xl bg-black p-4">
        {logs.map((log, i) => (
          <p key={i} className="text-sm text-green-400">
            {"> " + log}
          </p>
        ))}
      </div>

      {status && (
        <div className="rounded-xl bg-gray-900 p-4">
          <h2 className="mb-2 text-xl font-bold">RESULT</h2>
          <p>Status: {status}</p>
          <p>Code: {code}</p>
          <p>Protocol: {protocol}</p>
          <p>Amount: {amount}</p>
          <p>Card: **** **** **** {card.slice(-4)}</p>
          <p className="mt-2">Card Holder: {name || "N/A"}</p>
          <p>Expiry: {expiry || "N/A"}</p>
          <p>CVV: {cvv ? "***" : "N/A"}</p>
        </div>
      )}
    </div>
  );
}