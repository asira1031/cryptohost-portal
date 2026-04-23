"use client";

import Link from "next/link";

const checkpoints = [
  {
    title: "File Structure Complete",
    description:
      "Payment confirmation sections, transmission metadata, authorization entries, and encrypted FIN upload references are present in the report.",
    tone: "green",
  },
  {
    title: "Transaction Data Present",
    description:
      "Reference number, transaction code, clearing code, client number, upload code, and transfer identifiers are included in the document structure.",
    tone: "green",
  },
  {
    title: "Sender & Receiver Banking Present",
    description:
      "Sender account, originating bank, receiver bank, SWIFT code, IBAN, and location details are declared in the validation file.",
    tone: "green",
  },
  {
    title: "Permit / Release Fields Empty",
    description:
      "Permit code, final release code, access code, and final blocking code are still blank and require separate release-side completion before execution.",
    tone: "amber",
  },
  {
    title: "Execution Verification Pending",
    description:
      "This file reflects a structured transaction upload and internal validation record, but external settlement and final executable release are not independently confirmed here.",
    tone: "amber",
  },
];

function toneClasses(tone: "green" | "amber") {
  if (tone === "green") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";
  }

  return "border-amber-500/30 bg-amber-500/10 text-amber-100";
}

export default function Kinpro250ValidationPage() {
  return (
    <div className="min-h-screen bg-[#03111c] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-5">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* LEFT PANEL */}
          <aside className="rounded-[28px] border border-cyan-500/15 bg-[#041826] p-4 shadow-[0_0_40px_rgba(0,180,255,0.06)]">
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
                CryptoHost
              </p>
              <h2 className="mt-2 text-[36px] font-semibold leading-none">
                Validation Portal
              </h2>
              <p className="mt-2 text-sm text-white/65">
                Admin-only validation dashboard
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-white/[0.08]"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/reports/kinpro-250-validation"
                className="block rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/15"
              >
                Active Report
              </Link>

              <Link
                href="/dashboard/my-files"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-white/[0.08]"
              >
                My Files
              </Link>

              <Link
                href="/dashboard/security"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-white/[0.08]"
              >
                Security
              </Link>
            </div>

            <div className="mt-6 rounded-[24px] border border-cyan-400/20 bg-cyan-500/8 p-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
                Reference
              </p>
              <p className="mt-3 break-all text-base font-semibold text-white">
                4395877600986456
              </p>

              <div className="mt-4 inline-flex rounded-full border border-amber-400/35 bg-amber-500/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                Validation Required
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="space-y-6">
            {/* TOP SUMMARY */}
            <section className="rounded-[30px] border border-cyan-500/15 bg-[#041826] p-6 shadow-[0_0_50px_rgba(0,180,255,0.05)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
                    Active File Summary
                  </p>
                  <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white">
                    KINPRO 250M Validation Report
                  </h1>
                  <p className="mt-4 max-w-4xl text-base leading-7 text-white/72">
                    Technical review page for the uploaded encrypted FIN transmission
                    file. This dashboard reflects the declared upload structure,
                    banking identifiers, transaction records, server routing, and
                    internal release-stage fields for admin validation review.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-cyan-400/35 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    FIN Upload
                  </span>
                  <span className="rounded-full border border-cyan-400/35 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    Barclays
                  </span>
                  <span className="rounded-full border border-amber-400/35 bg-amber-500/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                    Validation Required
                  </span>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <div className="rounded-[30px] border border-cyan-500/15 bg-[#041826] p-6 shadow-[0_0_50px_rgba(0,180,255,0.05)]">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
                        Validation Notice
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">
                        Current File Status
                      </h2>
                    </div>

                    <div className="rounded-full border border-amber-400/35 bg-amber-500/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                      Admin Review Required
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-amber-500/30 bg-amber-500/10 p-5 text-[17px] leading-8 text-amber-100">
                    This file contains a structured M1 funds transmission record with
                    S2S upload metadata, AES/FIN formatting declarations, sender and
                    receiver banking details, transaction references, server routing
                    identifiers, and internal transfer validation fields. The record
                    appears internally organized for review, but permit, release, and
                    final executable authorization values are still unfilled and must
                    be completed separately before operational release.
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[26px] border border-cyan-500/15">
                    <div className="grid grid-cols-1 divide-y divide-cyan-500/10">
                      {[
                        ["Reference", "4395877600986456"],
                        ["File Name", "kinpro-250.cef"],
                        ["Funds Type", "M1 FUNDS"],
                        ["Upload Format", "S2S UPLOAD FORMAT"],
                        ["File Format", "FIN"],
                        ["File Extension", "AES"],
                        ["Encoding", "UTF-8"],
                        ["Currency", "EURO"],
                        ["Amount", "250,000,000.00"],
                        ["Date", "2025-02-12 11:46:26"],
                        ["Transaction Code", "8799088GB5677888543"],
                        ["Clearing Code", "BARCGBB2ZXXX-439193013"],
                        ["Upload Code", "901831993918381"],
                        ["Identity Code", "42Q GB DD GB 42FOP 36F"],
                        ["Server Global ID Origin", "AS44022"],
                        ["Server Global IP", "198.241.206.207/198.241.206.0/24"],
                        ["Transaction ID", "827188399193BARCGBB2ZXXX1838919939"],
                        ["Unique Transaction Number", "BARCGBB2ZXXX910381993919301034"],
                        ["IMAD Number", "000000000SRT-NR-38"],
                        ["Reference Note", "INVOCE 202503"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="grid gap-3 bg-[#03111c]/40 px-5 py-4 md:grid-cols-[240px_1fr]"
                        >
                          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300/55">
                            {label}
                          </div>
                          <div className="break-all text-base text-white">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BANK / PARTY DETAILS */}
                <div className="rounded-[30px] border border-cyan-500/15 bg-[#041826] p-6 shadow-[0_0_50px_rgba(0,180,255,0.05)]">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
                    Banking Parties
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Sender & Receiver Details
                  </h2>

                  <div className="mt-6 grid gap-6 xl:grid-cols-2">
                    <div className="rounded-[24px] border border-cyan-500/15 bg-[#03111c]/50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                        Sender
                      </p>
                      <div className="mt-4 space-y-3 text-white/90">
                        <p><span className="text-white/55">Account Name:</span> KINPRO HOLDING GMBH</p>
                        <p><span className="text-white/55">Account Number:</span> DE58200700000582505400</p>
                        <p><span className="text-white/55">Bank:</span> BARCLAYS BANK PLC</p>
                        <p><span className="text-white/55">Address:</span> 1, CHURCHILL PLACE, CANARY WHARF</p>
                        <p><span className="text-white/55">City:</span> LONDON</p>
                        <p><span className="text-white/55">Postal Code:</span> E13 5HP</p>
                        <p><span className="text-white/55">Country:</span> UK</p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-cyan-500/15 bg-[#03111c]/50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                        Receiver
                      </p>
                      <div className="mt-4 space-y-3 text-white/90">
                        <p><span className="text-white/55">Bank:</span> BARCLAYS BANK</p>
                        <p><span className="text-white/55">SWIFT Code:</span> BARCGBB2ZXXX</p>
                        <p><span className="text-white/55">Account Name:</span> KINPRO HOLDING GMBH</p>
                        <p><span className="text-white/55">IBAN:</span> GB45HBUK40271513690601</p>
                        <p><span className="text-white/55">Address:</span> 2 CHURCHILL PLACE, CANARY WHARF</p>
                        <p><span className="text-white/55">City:</span> LONDON</p>
                        <p><span className="text-white/55">Postal Code:</span> E14 5RB</p>
                        <p><span className="text-white/55">Country:</span> UK</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="rounded-[30px] border border-cyan-500/15 bg-[#041826] p-6 shadow-[0_0_50px_rgba(0,180,255,0.05)]">
                <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
                  Status Matrix
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Validation Checkpoints
                </h2>

                <div className="mt-6 space-y-4">
                  {checkpoints.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-[22px] border p-5 ${toneClasses(item.tone as "green" | "amber")}`}
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-inherit/90">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}