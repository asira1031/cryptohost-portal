"use client";

import Link from "next/link";
import { useMemo } from "react";

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
  warn = false,
}: {
  children: React.ReactNode;
  ok?: boolean;
  warn?: boolean;
}) {
  const color = ok
    ? "text-emerald-300"
    : warn
    ? "text-amber-200"
    : "text-cyan-100/90";

  return (
    <div className={`font-mono text-[12px] leading-6 ${color}`}>
      {children}
    </div>
  );
}

export default function SwiftNetValidationPage() {
  const lastUpdate = useMemo(() => formatNow(), []);

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
                Admin-only validation dashboard
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
                href="/dashboard/my-files"
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
                S66GP7045684HE92
              </p>
              <div className="mt-3">
                <StatusBadge label="Admin Review Required" tone="amber" />
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
                    SWIFT NET Validation Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical review page for the uploaded SWIFT NET payment
                    confirmation report. This dashboard reflects the document's
                    internal transmission, authorization, compliance, and
                    declared blockchain details for admin review.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="SWIFT NET" />
                  <StatusBadge label="Deutsche Bank" />
                  <StatusBadge label="Admin Review" tone="amber" />
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
                  <StatusBadge label="Admin Review Required" tone="amber" />
                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                  This file contains a complete SWIFT NET payment confirmation
                  structure with sender and receiver banking details,
                  authorization records, compliance entries, and a declared
                  blockchain conversion record. The document is internally
                  consistent and workable for admin review, but external bank
                  settlement and blockchain execution are not independently
                  confirmed by this file alone.
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Reference" value="S66GP7045684HE92" />
                  <InfoRow label="File Name" value="SWIFT_NET_REPORT_27022026.pdf" />
                  <InfoRow
                    label="Transaction Type"
                    value="SWIFT NET Financial Transmission"
                  />
                  <InfoRow label="Bank Source" value="Deutsche Bank AG" />
                  <InfoRow label="Sender" value="HDH-NORD-BAU GMBH" />
                  <InfoRow label="Receiver" value="Prologis CA LLC" />
                  <InfoRow label="Receiver Bank" value="Bank of America" />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Amount" value="€ 7,700,424,865.51" />
                  <InfoRow label="Network" value="SWIFT / FIN" />
                  <InfoRow label="Authentication" value="TLS / Certificate-based" />
                  <InfoRow
                    label="Blockchain Layer"
                    value="Declared / Not Independently Verified"
                  />
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
                        File Structure Complete
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Payment confirmation sections, transmission metadata,
                        authorization entries, and confirmation fields are all
                        present in the report.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Transaction Data Present
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Transfer code, amount, sender bank, receiver bank, and
                        account-level details are included in the document.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Authorization & Compliance Present
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Named authorizers, approval entries, and compliance
                        statements are present in the report.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        External Verification Pending
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        The file alone does not independently verify bank
                        settlement, transmission authenticity, or final release.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Blockchain Verification Pending
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        A wallet, network, converted amount, and transaction hash
                        are stated in the report, but on-chain confirmation is
                        not independently validated here.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Notice to Admin
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    System Summary
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    This record is reviewable and well-structured, but it should
                    remain under admin control until separate technical,
                    banking, or blockchain validation confirms the claims made in
                    the uploaded document.
                  </p>
                </section>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Blockchain Declaration
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Declared Conversion Layer
                  </h3>
                </div>
                <StatusBadge label="Not Independently Verified" tone="amber" />
              </div>

              <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                <InfoRow label="Converted Amount" value="8,314,000,000.00 USDT" />
                <InfoRow label="Conversion Rate" value="1.0796 EUR to USDT" />
                <InfoRow label="Wallet" value="0x4848ef5f823bc66bedd77a3b5d353ef0f37ca3aa" />
                <InfoRow label="Network" value="Ethereum Mainnet" />
                <InfoRow
                  label="Transaction Hash"
                  value="0x7d4f8e2a9c1b5d3f6e8a2c4d9f1b7e3a5c8d2f6e9b4a1c7d3e5f8a2b6c4d9e1f7a3"
                />
              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                  Full Technical Log
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Transmission View
                </h3>
              </div>

              <div className="rounded-[24px] border border-cyan-400/15 bg-[#06131b] p-4">
                <TerminalLine ok>CRYPTOHOST SECURE VALIDATION SYSTEM</TerminalLine>
                <TerminalLine>FILE: SWIFT NET PAYMENT CONFIRMATION REPORT</TerminalLine>
                <TerminalLine>REFERENCE: S66GP7045684HE92</TerminalLine>
                <TerminalLine>SENDER BANK: Deutsche Bank AG</TerminalLine>
                <TerminalLine>RECEIVER BANK: Bank of America</TerminalLine>
                <TerminalLine>AMOUNT: EUR 7,700,424,865.51</TerminalLine>
                <TerminalLine ok>DOCUMENT STATUS: STRUCTURALLY COMPLETE</TerminalLine>
                <TerminalLine ok>AUTHORIZATION RECORDS: PRESENT</TerminalLine>
                <TerminalLine ok>COMPLIANCE ENTRIES: PRESENT</TerminalLine>
                <TerminalLine warn>EXTERNAL BANK VERIFICATION: PENDING</TerminalLine>
                <TerminalLine warn>BLOCKCHAIN VERIFICATION: PENDING</TerminalLine>
                <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}