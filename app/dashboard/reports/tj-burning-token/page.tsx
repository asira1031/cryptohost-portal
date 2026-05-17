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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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

export default function TJBurningPortalPage() {
  const lastUpdate = useMemo(() => formatNow(), []);

  return (
    <div className="min-h-screen bg-[#061018] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <aside className="rounded-[28px] border border-white/8 bg-[#0a1821] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">

            <div className="mb-5 border-b border-white/8 pb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300/70">
                CryptoHost
              </p>

              <h1 className="mt-2 text-xl font-semibold text-white">
                Institutional Redemption Portal
              </h1>

              <p className="mt-2 text-sm text-white/50">
                Burn-required settlement validation dashboard
              </p>
            </div>

            <nav className="space-y-2">

              <Link
                href="/dashboard"
                className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/reports"
                className="block rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-4 py-3 text-sm font-medium text-cyan-200"
              >
                Active Redemption
              </Link>

            </nav>

            <div className="mt-6 rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-4">

              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                Reference
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-white">
                REF-PROMURA-2_5B-USD-ALCHEMY-20260416
              </p>

              <div className="mt-3">
                <StatusBadge
                  label="Burn Required"
                  tone="amber"
                />
              </div>

            </div>

          </aside>

          {/* MAIN */}
          <main className="space-y-6">

            {/* HEADER */}
            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
                    Redemption Validation
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    TJBURNING TOKEN
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Institutional redemption and burn-verification dashboard
                    for the tokenized settlement workflow and oracle-backed
                    booking infrastructure.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="ERC-20" />
                  <StatusBadge label="Ethereum Mainnet" />
                  <StatusBadge
                    label="Compliance Review"
                    tone="amber"
                  />
                </div>

              </div>

            </section>

            {/* SUMMARY */}
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

              <div className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">

                <div className="mb-4 flex items-center justify-between gap-3">

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                      Current Status
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-white">
                      Redemption Workflow
                    </h3>
                  </div>

                  <StatusBadge
                    label="Pending Burn"
                    tone="amber"
                  />

                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">

                  Redemption processing requires a successful token burn
                  before settlement review can proceed. Burn proof,
                  transaction hash verification, and oracle-linked
                  booking confirmation are mandatory prerequisites.

                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">

                  <InfoRow
                    label="Reference"
                    value="REF-PROMURA-2_5B-USD-ALCHEMY-20260416"
                  />

                  <InfoRow
                    label="Booking JSON"
                    value="BOOKING-LEDGER-ENTRY-2_5B-USD-TKM2-PROMURA-M0.json"
                  />

                  <InfoRow
                    label="Endpoint Alias"
                    value="CitiXfin"
                  />

                  <InfoRow
                    label="Blockchain"
                    value="Ethereum Mainnet"
                  />

                  <InfoRow
                    label="Token Standard"
                    value="ERC-20"
                  />

                  <InfoRow
                    label="Oracle Contract"
                    value="0x351bC59b3D21CfDb49E5ea6E6868a7ce66473d7C"
                  />

                  <InfoRow
                    label="Settlement State"
                    value="Awaiting Burn Verification"
                  />

                  <InfoRow
                    label="Last Update"
                    value={lastUpdate}
                  />

                </div>

              </div>

              {/* CHECKPOINTS */}
              <div className="space-y-6">

                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">

                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Validation Matrix
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Required Sequence
                  </h3>

                  <div className="mt-5 space-y-3">

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Holdings Verification
                      </p>

                      <p className="mt-1 text-sm text-emerald-100/80">
                        Wallet and token balance verified on-chain.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Burn Transaction Required
                      </p>

                      <p className="mt-1 text-sm text-amber-100/80">
                        ERC-20 token burn must be completed before redemption.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                      <p className="text-sm font-semibold text-cyan-200">
                        Proof Submission
                      </p>

                      <p className="mt-1 text-sm text-cyan-100/80">
                        Burn transaction hash and booking JSON required.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                      <p className="text-sm font-semibold text-red-200">
                        Compliance Review
                      </p>

                      <p className="mt-1 text-sm text-red-100/80">
                        Final AML/KYC review pending.
                      </p>
                    </div>

                  </div>

                </section>

              </div>

            </section>

            {/* TECHNICAL LOG */}
            <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                Technical Transmission Log
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Oracle & Redemption Verification
              </h3>

              <div className="mt-5 rounded-[24px] border border-cyan-400/15 bg-[#06131b] p-4 font-mono text-[12px] leading-7 text-cyan-100/90">

                <div>REFERENCE: REF-PROMURA-2_5B-USD-ALCHEMY-20260416</div>
                <div>NETWORK: Ethereum Mainnet</div>
                <div>STANDARD: ERC-20</div>
                <div>STATUS: Awaiting Burn Confirmation</div>
                <div>BOOKING JSON: VERIFIED</div>
                <div>ORACLE LINK: ACTIVE</div>
                <div>ENDPOINT: CitiXfin</div>
                <div>TOKEN CONTRACT: 0x719dC6d08C8612c15b61b1Ef349f11e9956bA8C8</div>
                <div>ORACLE CONTRACT: 0x351bC59b3D21CfDb49E5ea6E6868a7ce66473d7C</div>
                <div>COMPLIANCE STATE: REVIEW REQUIRED</div>
                <div>LAST UPDATE: {lastUpdate}</div>

              </div>

            </section>

          </main>

        </div>

      </div>
    </div>
  );
}