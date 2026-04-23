"use client";

import { useMemo, useState } from "react";

type ValidationStatus = "IDLE" | "PROCESSING" | "ON HOLD" | "INVALID" | "VERIFIED";

type WalletRow = {
  wallet: string;
  percentage: string;
  amount: string;
};

type LogLine = {
  id: number;
  text: string;
};

const INITIAL_WALLETS: WalletRow[] = [
  { wallet: "", percentage: "", amount: "" },
  { wallet: "", percentage: "", amount: "" },
  { wallet: "", percentage: "", amount: "" },
  { wallet: "", percentage: "", amount: "" },
  { wallet: "", percentage: "", amount: "" },
];

export default function PosValidationPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [protocol, setProtocol] = useState("101.1");
  const [conversionRate, setConversionRate] = useState("1.08");

  const [wallets, setWallets] = useState<WalletRow[]>(INITIAL_WALLETS);

  const [status, setStatus] = useState<ValidationStatus>("IDLE");
  const [workflowStep, setWorkflowStep] = useState("IDLE");
  const [convertedUsdt, setConvertedUsdt] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState("Not started");

  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, text: "POS terminal ready." },
    { id: 2, text: "Awaiting card entry and wallet allocation..." },
  ]);

  const [reportTitle, setReportTitle] = useState("POS VALIDATION REPORT");
  const [reportBody, setReportBody] = useState(
    "Enter the card data and run the POS terminal to initiate validation and USDT conversion workflow."
  );
  const [notification, setNotification] = useState("No active notification.");
  const [isRunning, setIsRunning] = useState(false);

  const statusClasses: Record<ValidationStatus, string> = {
    IDLE: "border-white/10 bg-white/5 text-white",
    PROCESSING: "border-sky-400/30 bg-sky-500/10 text-sky-200",
    "ON HOLD": "border-amber-400/30 bg-amber-500/10 text-amber-200",
    INVALID: "border-red-400/30 bg-red-500/10 text-red-200",
    VERIFIED: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  };

  const statusLabel = useMemo(() => status, [status]);

  function addLog(text: string) {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), text }]);
  }

  function updateWallet(index: number, field: keyof WalletRow, value: string) {
    setWallets((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  }

  function maskCard(value: string) {
    const digits = value.replace(/\s+/g, "");
    if (!digits) return "-";
    if (digits.length <= 4) return digits;
    return `************${digits.slice(-4)}`;
  }

  async function runValidation() {
    if (isRunning) return;

    setIsRunning(true);
    setStatus("PROCESSING");
    setWorkflowStep("VALIDATION");
    setLogs([{ id: Date.now(), text: "Initializing POS validation terminal..." }]);
    setReportTitle("POS VALIDATION REPORT");
    setReportBody(
      "Validation in progress. Please wait while the POS terminal processes the supplied data."
    );
    setNotification("Processing card entry and wallet allocation structure...");
    setConvertedUsdt("");
    setBroadcastStatus("Not started");

    const steps = [
      "Opening POS secure entry channel...",
      "Reading card payload...",
      `Checking validation code ${validationCode || "----"}...`,
      `Loading protocol ${protocol || "101.1"}...`,
      "Reviewing wallet allocation structure...",
      "Generating POS validation report...",
      "Posting notification to dashboard...",
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 550));
      addLog(step);
    }

    await new Promise((resolve) => setTimeout(resolve, 900));

    const filledWallets = wallets.filter(
      (w) => w.wallet.trim() || w.percentage.trim() || w.amount.trim()
    );

    if (!cardNumber.trim() || !cardHolder.trim() || !amount.trim()) {
      setStatus("INVALID");
      setWorkflowStep("INVALID");
      addLog("Validation failed: required fields are incomplete.");
      setReportTitle("POS VALIDATION REPORT – INVALID");
      setReportBody(
        "The POS submission is incomplete. Required fields such as card number, card holder name, and amount must be supplied before validation can proceed."
      );
      setNotification("Incomplete submission detected. Please complete all required fields.");
      setIsRunning(false);
      return;
    }

    if (!validationCode.trim() || !protocol.trim()) {
      setStatus("INVALID");
      setWorkflowStep("INVALID");
      addLog("Validation failed: missing validation code or protocol.");
      setReportTitle("POS VALIDATION REPORT – INVALID");
      setReportBody(
        "The submitted entry does not contain a complete validation code or protocol reference. Please review the terminal input and resubmit."
      );
      setNotification("Missing protocol or validation code.");
      setIsRunning(false);
      return;
    }

    if (filledWallets.length === 0) {
      setStatus("ON HOLD");
      setWorkflowStep("ON HOLD");
      addLog("No wallet allocation rows were supplied.");
      addLog("Terminal moved request to hold state.");
      setReportTitle("POS VALIDATION REPORT – ON HOLD");
      setReportBody(
        "Card entry details were accepted by the POS terminal, however no wallet allocation structure was supplied. The request remains on hold pending wallet distribution details."
      );
      setNotification("Wallet allocation details are required before final review.");
      setIsRunning(false);
      return;
    }

    addLog("Validation phase complete.");
    await new Promise((resolve) => setTimeout(resolve, 700));

    setWorkflowStep("EXTRACTION");
    addLog("Starting extraction phase...");
    setNotification("Extraction phase started...");
    await new Promise((resolve) => setTimeout(resolve, 900));
    addLog("Amount extracted from validated terminal record.");

    setWorkflowStep("CONVERSION");
    addLog("Starting conversion to USDT display...");
    setNotification("Converting validated amount to USDT...");
    await new Promise((resolve) => setTimeout(resolve, 900));

    const numericAmount = Number(String(amount).replace(/[^0-9.]/g, "")) || 0;
    const numericRate = Number(conversionRate) || 1;
    const usdtValue = numericAmount * numericRate;
    const formattedUsdt = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdtValue);

    setConvertedUsdt(formattedUsdt);
    addLog(`Conversion completed at demo rate ${numericRate}.`);

    setWorkflowStep("BROADCAST");
    setBroadcastStatus("Prepared for broadcast");
    addLog("Preparing broadcast workflow...");
    setNotification("Broadcast preparation completed.");
    await new Promise((resolve) => setTimeout(resolve, 900));
    addLog("Broadcast stage ready.");

    if (validationCode.trim() === "7001" && protocol.trim() === "101.1") {
      setStatus("ON HOLD");
      addLog("Validation code structure accepted.");
      addLog("Protocol structure accepted.");
      addLog("Wallet allocation table detected.");
      addLog("Final terminal state: ON HOLD.");
      setReportTitle("POS VALIDATION REPORT – EXTRACTION / CONVERSION READY");
      setReportBody(
        `The POS terminal accepted the submitted card-entry structure, completed demo extraction flow, converted the stated amount for USDT display, and prepared the request for broadcast staging. Converted USDT amount: ${formattedUsdt}. Final status remains ON HOLD pending internal review.`
      );
      setNotification(
        "Validation complete. Extraction, conversion, and broadcast staging are ready for internal review."
      );
      setIsRunning(false);
      return;
    }

    setStatus("VERIFIED");
    addLog("Submitted data passed format review.");
    addLog("Final terminal state: VERIFIED.");
    setReportTitle("POS VALIDATION REPORT – VERIFIED");
    setReportBody(
      `The submitted entry passed POS dashboard format review. Card-entry values, protocol, wallet allocation data, demo extraction flow, conversion display, and broadcast preparation were successfully completed. Converted USDT amount: ${formattedUsdt}.`
    );
    setNotification("Submission verified, converted, and prepared for broadcast workflow.");
    setIsRunning(false);
  }

  function clearAll() {
    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
    setAmount("");
    setReference("");
    setValidationCode("");
    setProtocol("101.1");
    setConversionRate("1.08");
    setWallets(INITIAL_WALLETS);
    setStatus("IDLE");
    setWorkflowStep("IDLE");
    setConvertedUsdt("");
    setBroadcastStatus("Not started");
    setLogs([
      { id: 1, text: "POS terminal ready." },
      { id: 2, text: "Awaiting card entry and wallet allocation..." },
    ]);
    setReportTitle("POS VALIDATION REPORT");
    setReportBody(
      "Enter the card data and run the POS terminal to initiate validation and USDT conversion workflow."
    );
    setNotification("No active notification.");
    setIsRunning(false);
  }

  return (
    <div className="min-h-screen bg-[#04164a] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-6">
        <div className="mb-6 rounded-[24px] border border-white/10 bg-[#071c5c] px-6 py-5 shadow-2xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">
                CryptoHost POS Desk
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                CryptoHost POS Terminal
              </h1>
              <p className="mt-2 max-w-4xl text-sm text-slate-200/80">
                POS card entry, wallet allocation, terminal validation report, and notification dashboard.
              </p>
            </div>

            <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusClasses[status]}`}>
              STATUS: {statusLabel}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-[26px] border border-white/10 bg-[#06205f] p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">POS Card Entry</h2>
                  <p className="mt-1 text-sm text-slate-200/75">
                    Enter the source card information and validation values.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Card Number
                  </label>
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4029 8511 0358 6660"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Card Holder Name
                  </label>
                  <input
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Card holder name"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Expiry (MM/YY)
                  </label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="09/26"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    CVV
                  </label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="***"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Amount
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="$9,000,000,000.00"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Reference Number
                  </label>
                  <input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="SPR9937185-1"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Validation Code
                  </label>
                  <input
                    value={validationCode}
                    onChange={(e) => setValidationCode(e.target.value)}
                    placeholder="7001"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Protocol
                  </label>
                  <input
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                    placeholder="101.1"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Demo Conversion Rate
                  </label>
                  <input
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    placeholder="1.08"
                    className="w-full rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[26px] border border-white/10 bg-[#06205f] p-6 shadow-2xl">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold">POS Wallet Allocation</h2>
                <p className="mt-1 text-sm text-slate-200/75">
                  Enter up to 5 wallet slots with address, percentage, and amount.
                </p>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[920px]">
                  <div className="mb-3 grid grid-cols-[110px_1.7fr_0.7fr_0.8fr] gap-3 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/75">
                    <div>Slot</div>
                    <div>Wallet Address</div>
                    <div>Percentage</div>
                    <div>Amount</div>
                  </div>

                  <div className="space-y-3">
                    {wallets.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[110px_1.7fr_0.7fr_0.8fr] gap-3"
                      >
                        <div className="flex items-center rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm font-semibold text-white">
                          Wallet {index + 1}
                        </div>

                        <input
                          value={row.wallet}
                          onChange={(e) => updateWallet(index, "wallet", e.target.value)}
                          placeholder="0x..."
                          className="rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                        />

                        <input
                          value={row.percentage}
                          onChange={(e) => updateWallet(index, "percentage", e.target.value)}
                          placeholder="22.5%"
                          className="rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                        />

                        <input
                          value={row.amount}
                          onChange={(e) => updateWallet(index, "amount", e.target.value)}
                          placeholder="$0.00"
                          className="rounded-2xl border border-white/15 bg-[#03133d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300/45"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runValidation}
                  disabled={isRunning}
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isRunning ? "PROCESSING..." : "RUN VALIDATION"}
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-2xl border border-white/15 bg-[#03133d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a245f]"
                >
                  CLEAR
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[26px] border border-white/10 bg-[#06205f] p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">POS Validation Summary</h2>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}>
                  {status}
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-white/10 bg-[#03133d] p-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Masked Card</span>
                  <span className="font-semibold">{maskCard(cardNumber)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Card Holder</span>
                  <span className="font-semibold">{cardHolder || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Amount</span>
                  <span className="font-semibold">{amount || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Reference</span>
                  <span className="font-semibold">{reference || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Validation Code</span>
                  <span className="font-semibold">{validationCode || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Protocol</span>
                  <span className="font-semibold">{protocol || "-"}</span>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-[#03133d] p-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">Workflow Step</span>
                  <span className="font-semibold">{workflowStep}</span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-300">Conversion Rate</span>
                  <span className="font-semibold">{conversionRate || "-"}</span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-300">Converted USDT</span>
                  <span className="font-semibold">{convertedUsdt || "-"}</span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-300">Broadcast Status</span>
                  <span className="font-semibold">{broadcastStatus}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[26px] border border-white/10 bg-[#06205f] p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold">POS Validation Report</h2>
              <div className="mt-4 rounded-3xl border border-white/10 bg-[#03133d] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-200/75">
                  {reportTitle}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-100/90">
                  {reportBody}
                </p>
              </div>
            </section>

            <section className="rounded-[26px] border border-white/10 bg-[#06205f] p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold">POS Notification</h2>
              <div className="mt-4 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
                <p className="text-sm leading-7 text-amber-100">
                  {notification}
                </p>
              </div>
            </section>

            <section className="rounded-[26px] border border-white/10 bg-black p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-green-400">POS Terminal Activity</h2>
                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                  LIVE
                </span>
              </div>

              <div className="h-[320px] overflow-y-auto rounded-3xl border border-white/10 bg-[#02070a] p-4 font-mono text-xs text-green-400">
                {logs.map((log) => (
                  <div key={log.id} className="mb-2">
                    {">"} {log.text}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}