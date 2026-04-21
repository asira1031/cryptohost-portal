"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function formatNow() {
  return new Date().toLocaleString();
}

function StatusBadge({
  label,
  tone = "cyan",
}: {
  label: string;
  tone?: "cyan" | "amber" | "emerald" | "red";
}) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
      : tone === "amber"
      ? "border-amber-400/30 bg-amber-500/15 text-amber-200"
      : tone === "red"
      ? "border-red-400/30 bg-red-500/15 text-red-200"
      : "border-cyan-400/30 bg-cyan-500/15 text-cyan-200";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}
    >
      {label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/6 py-3 last:border-b-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
      <div className="max-w-[65%] text-right text-sm text-white/88">
        {value}
      </div>
    </div>
  );
}

function TerminalLine({
  children,
  ok = false,
}: {
  children: React.ReactNode;
  ok?: boolean;
}) {
  return (
    <div
      className={`font-mono text-[12px] leading-6 ${
        ok ? "text-emerald-300" : "text-cyan-100/90"
      }`}
    >
      {children}
    </div>
  );
}

export default function HSBCTPPHoldPage() {
  const [expanded, setExpanded] = useState(false);
  const lastUpdate = useMemo(() => formatNow(), []);

  const walletSlots = [
    { wallet: "WALLET_1_HERE", percentage: "00.00%" },
    { wallet: "WALLET_2_HERE", percentage: "00.00%" },
    { wallet: "WALLET_3_HERE", percentage: "00.00%" },
    { wallet: "WALLET_4_HERE", percentage: "00.00%" },
    { wallet: "WALLET_5_HERE", percentage: "00.00%" },
    { wallet: "WALLET_6_HERE", percentage: "00.00%" },
  ];

  return (
    <div className="min-h-screen bg-[#061018] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/8 bg-[#0a1821] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="mb-5 border-b border-white/8 pb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300/70">
                CryptoHost
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white">
                Validation Portal
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Secure client report dashboard
              </p>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/reports"
                className="block rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-3 text-sm font-medium text-cyan-200"
              >
                Active Report
              </Link>
              <Link
                href="/dashboard/files"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                My Files
              </Link>
              <Link
                href="/dashboard/security"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                Security
              </Link>
            </nav>

            <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                Reference
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-white">
                HSBC-TPP-HOLD-HBUKG85H5CMAF590
              </p>
              <div className="mt-3">
                <StatusBadge
                  label="Ready for Execution"
                  tone="emerald"
                />
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
                    Active File Summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    HSBC TPP HOLD Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the validated HSBC transmission
                    hold file. This dashboard reflects the current file-level
                    status, transaction details, execution readiness, and wallet
                    allocation placeholders prepared for operational review.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="HSBC FILE" />
                  <StatusBadge label="EXECUTION READY" tone="emerald" />
                  <StatusBadge label="NO ON-CHAIN BROADCAST YET" tone="amber" />
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                      Validation Notice
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      Current File Status
                    </h3>
                  </div>
                  <StatusBadge label="Ready for Execution" tone="emerald" />
                </div>

                <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm leading-7 text-emerald-100/90">
                  This file has completed validation review and transaction
                  preparation checks. The file record is confirmed and currently
                  positioned for execution under secure system conditions.
                  Wallet allocation data can be inserted below for final routing
                  visibility.
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Reference" value="HBUKG85H5CMAF590" />
                  <InfoRow label="File Name" value="hsbc-tpp-hold.pdf" />
                  <InfoRow label="Transaction Type" value="Bank Transmission Hold Record" />
                  <InfoRow label="Bank Source" value="HSBC" />
                  <InfoRow label="Sender" value="MATECHPOWER LTD" />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Amount" value="€ 1,001,020,109.00" />
                  <InfoRow label="Value Date" value="12 August 2025" />
                  <InfoRow label="Execution Layer" value="Prepared / Not yet broadcast" />
                  <InfoRow label="Last Update" value={lastUpdate} />
                </div>
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Status Matrix
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Validation Checkpoints
                  </h3>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        File Confirmed
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Transmission record is present and reviewable in system.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Transaction Data Verified
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Reference, amount, sender, and account details are aligned.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Wallet Allocation Pending Entry
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        Placeholder slots are active and awaiting final wallet inputs.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Execution Status
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        File is ready for execution based on current validation state.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Notice to Client
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    System Summary
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    This dashboard reflects an execution-ready validation state.
                    The file data is visible, organized, and prepared for the next
                    internal operational step. Wallet routing percentages may be
                    filled in once final allocation instruction is confirmed.
                  </p>
                </section>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Wallet Allocation
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Wallet Slots and Percentages
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {walletSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-white/8 bg-[#08141c] p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.20em] text-cyan-300/70">
                          Wallet {index + 1}
                        </p>
                        <p className="mt-2 break-all text-sm font-semibold text-white/90">
                          {slot.wallet}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.20em] text-cyan-300/70">
                          Percentage
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white/90">
                          {slot.percentage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Full Technical Log
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Transmission View
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/25"
                >
                  {expanded ? "Hide Technical Log" : "Show Technical Log"}
                </button>
              </div>

              {expanded ? (
                <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-[#06131b] p-4">
                  <TerminalLine ok>CRYPTOHOST SECURE VALIDATION SYSTEM</TerminalLine>
                  <TerminalLine>REFERENCE: HBUKG85H5CMAF590</TerminalLine>
                  <TerminalLine>FILE: HSBC TPP HOLD</TerminalLine>
                  <TerminalLine>TYPE: TRANSACTION HOLD REPORT</TerminalLine>
                  <TerminalLine>SOURCE: HSBC</TerminalLine>
                  <TerminalLine>SENDER: MATECHPOWER LTD</TerminalLine>
                  <TerminalLine>AMOUNT: € 1,001,020,109.00</TerminalLine>
                  <TerminalLine>CURRENCY: EUR</TerminalLine>
                  <TerminalLine ok>VALIDATION STATUS: COMPLETED</TerminalLine>
                  <TerminalLine ok>EXECUTION STATUS: READY</TerminalLine>
                  <TerminalLine>WALLET SLOTS: PLACEHOLDERS ACTIVE</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
                </div>
              ) : null}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}