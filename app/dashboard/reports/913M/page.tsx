"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function formatNow() {
  return new Date().toLocaleString();
}

function StatusBadge({ label, tone = "cyan" }: { label: string; tone?: "cyan" | "amber" | "emerald" | "red" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
      : tone === "amber"
      ? "border-amber-400/30 bg-amber-500/15 text-amber-200"
      : tone === "red"
      ? "border-red-400/30 bg-red-500/15 text-red-200"
      : "border-cyan-400/30 bg-cyan-500/15 text-cyan-200";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
      {label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/6 py-3 last:border-b-0">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{label}</div>
      <div className="max-w-[65%] text-right text-sm text-white/88">{value}</div>
    </div>
  );
}

function TerminalLine({ children, ok = false }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <div className={`font-mono text-[12px] leading-6 ${ok ? "text-emerald-300" : "text-cyan-100/90"}`}>
      {children}
    </div>
  );
}

export default function Report913MPage() {
  const [expanded, setExpanded] = useState(false);

  const lastUpdate = useMemo(() => formatNow(), []);

  return (
    <div className="min-h-screen bg-[#061018] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/8 bg-[#0a1821] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="mb-5 border-b border-white/8 pb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300/70">CryptoHost</p>
              <h1 className="mt-2 text-xl font-semibold text-white">Validation Portal</h1>
              <p className="mt-2 text-sm text-white/50">Secure client report dashboard</p>
            </div>

            <nav className="space-y-2">
              <Link href="/dashboard" className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                Dashboard
              </Link>
              <Link href="/dashboard/reports" className="block rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-3 text-sm font-medium text-cyan-200">
                Active Report
              </Link>
              <Link href="/dashboard/files" className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                My Files
              </Link>
              <Link href="/dashboard/security" className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                Security
              </Link>
            </nav>

            <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Reference</p>
              <p className="mt-2 break-all text-sm font-semibold text-white">913M-HBUK0W283K47PK2C</p>
              <div className="mt-3">
                <StatusBadge label="Under Review" tone="amber" />
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Active File Summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">913M Validation Report</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the uploaded HSBC-linked transmission file. This dashboard reflects only the file-level transmission and validation information currently visible from the document.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="MT103" />
                  <StatusBadge label="HSBC UK" />
                  <StatusBadge label="No Blockchain Execution" tone="amber" />
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">Validation Notice</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Current File Status</h3>
                  </div>
                  <StatusBadge label="Under Validation" tone="amber" />
                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                  This file is currently undergoing technical and compliance review. The uploaded document shows a completed transmission-level record and bank transmission metadata, but no blockchain conversion or release action has been executed within the CryptoHost environment at this stage.
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Reference" value="HBUK0W283K47PK2C" />
                  <InfoRow label="File Name" value="913M HBUK0W283K47PK2C_l.pdf" />
                  <InfoRow label="Transaction Type" value="MT103 / Financial Transmission" />
                  <InfoRow label="Bank Source" value="HSBC UK BANK (HBUKGB4BXXX)" />
                  <InfoRow label="Sender" value="MATECHPOWER LTD" />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Transmission Layer" value="SWIFT / FIN" />
                  <InfoRow label="Authentication" value="TLS / Certificate-based" />
                  <InfoRow label="Blockchain Layer" value="Not yet executed" />
                  <InfoRow label="Last Update" value={lastUpdate} />
                </div>
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">Status Matrix</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Validation Checkpoints</h3>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">File Received</p>
                      <p className="mt-1 text-sm text-emerald-100/80">Document present and readable as image-based PDF.</p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">Transmission Metadata Detected</p>
                      <p className="mt-1 text-sm text-emerald-100/80">HSBC UK, MT103/FIN, TLS/certificate and sender details are visible in the file.</p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">Compliance Review</p>
                      <p className="mt-1 text-sm text-amber-100/80">Pending final review and confirmation of all supporting details.</p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">Blockchain Execution</p>
                      <p className="mt-1 text-sm text-amber-100/80">No release, mint, conversion, or broadcast action has been initiated on-chain.</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">Notice to Client</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">System Summary</h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    The current record reflects a bank-side transmission file. Validation is limited to the document information presently visible in the uploaded file. Additional execution status should only be shown after independent technical confirmation.
                  </p>
                </section>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">Full Technical Log</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Transmission View</h3>
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
                  <TerminalLine>REFERENCE: HBUK0W283K47PK2C</TerminalLine>
                  <TerminalLine>FILE: 913M HBUK0W283K47PK2C_l.pdf</TerminalLine>
                  <TerminalLine>TYPE: MT103 / FINANCIAL TRANSMISSION</TerminalLine>
                  <TerminalLine>BANK SOURCE: HSBC UK BANK (HBUKGB4BXXX)</TerminalLine>
                  <TerminalLine>SENDER: MATECHPOWER LTD</TerminalLine>
                  <TerminalLine>CURRENCY: EUR</TerminalLine>
                  <TerminalLine>AUTH MODE: TLS / CERTIFICATE-BASED</TerminalLine>
                  <TerminalLine ok>TRANSMISSION LEVEL: COMPLETED</TerminalLine>
                  <TerminalLine>BLOCKCHAIN LAYER: NOT EXECUTED</TerminalLine>
                  <TerminalLine>COMPLIANCE REVIEW: IN PROGRESS</TerminalLine>
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
