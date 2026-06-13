"use client";

import Link from "next/link";

const checkpoints = [
  {
    title: "Transmission File Complete",
    description:
      "Transmission metadata, routing references, SWIFT identifiers, and upload records are present.",
    tone: "green",
  },
  {
    title: "Deutsche Bank Validation Complete",
    description:
      "Sender banking information, account references, and transmission identifiers have been recorded.",
    tone: "green",
  },
  {
    title: "DBS Receiving Information Present",
    description:
      "Receiver banking information, SWIFT code, account references, and destination details are available.",
    tone: "green",
  },
  {
    title: "Network Routing Verified",
    description:
      "Global IP routing, ACK references, transmission codes, and server identifiers are present.",
    tone: "green",
  },
  {
    title: "Transmission Status Confirmed",
    description:
      "The report indicates a transmitted status and contains all declared transmission details.",
    tone: "green",
  },

];

function toneClasses(tone: "green" | "amber") {
  if (tone === "green") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";
  }

  return "border-amber-500/30 bg-amber-500/10 text-amber-100";
}

export default function LucrumHoldingsIncPage() {
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
               href="/dashboard/reports/lucrum-holdings-inc"
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
                DE25418963745838726
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
                    LUCRUM HOLDINGS INC Validation Report
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
                    DEUTSCHE BANK AG
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
<div className="mt-4 rounded-[20px] border border-red-500/30 bg-red-500/10 p-5">
  <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-300">
    System Notice
  </p>

  <p className="mt-3 text-white">
    System Notice

The Ethereum smart contract currently blocks all conversion and internal transfer operations associated with this transmission.

Conversion services through the primary contract are temporarily unavailable.

Users may proceed using an independent smart contract, subject to their own verification, authorization, and compliance procedures.

Status: PRIMARY CONTRACT CONVERSION DISABLED
Network: Ethereum
Transfer Mode: Independent Smart Contract Required
  </p>

  <p className="mt-3 text-red-300 font-semibold">
    Status: SUSPENDED 
  </p>
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
      ["Reference", "DE25418963745838726"],
      ["File Name", "975MEUR_LUCRUM_DBSSSGSG_04.06.2026.pdf"],
      ["Funds Type", "EURO FUNDS"],
      ["Upload Format", "SERVER TO SERVER"],
      ["File Format", "ISO 20022"],
      ["File Extension", "SWIFT"],
      ["Encoding", "UTF-8"],
      ["Currency", "EURO"],
      ["Amount", "975,000,000.00"],
      ["Date", "2026-06-04 17:39:31 CEST"],
      ["Transaction Code", "74863NCM27649"],
      ["Access Code", "DE982510328"],
      ["Release Code", "DE254837216"],
      ["Transfer Code", "MT58936742567"],
      ["Download Code", "AG00021537924"],
      ["Client Name", "LUCRUM HOLDINGS INC"],
      ["Sender Bank", "DEUTSCHE BANK AG"],
      ["Sender SWIFT", "DEUTDEFFXXX"],
      ["Receiver Bank", "DBS BANK"],
      ["Receiver SWIFT", "DBSSSGSG"],
      ["Account Number", "0925 9938 12"],
      ["IBAN", "DE91 5007 0010 0925 9938 12"],
      ["Receiver Account", "0721 0465 39"],
      ["Network Status", "TRANSMITTED"],
      ["Operation", "SERVER TO SERVER FUNDS TRANSFER SYSTEM THROUGH GLOBAL IP"],
      ["ACK Reference", "DE855540032759"],
      ["Message Output Ref", "040626DEUTDEFFXXXD173931DBSSSGSGS180722/101957"],
      ["Common Server", "160.83.8.175"],
      ["Receiving Server", "172.67.157.88"],
      ["Common Server IP", "45.223.66.109"],
      ["CHK", "1JK25794\\210039"],
      ["MAC", "7486327649"],
      ["PKI Signature", "MAC Equivalent"],
      ["Application", "NETWORK REPORT"],
      ["Category", "SYSTEM"],
      ["Status", "MESSAGE TRANSMITTED SUCCESSFULLY"],
    ].map(([label, value], index) => (
      <div
        key={index}
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
                        <p><span className="text-white/55">Account Name:</span> LUCRUM HOLDINGS INC</p>
<p><span className="text-white/55">Account Number:</span> 0925 9938 12</p>
<p><span className="text-white/55">Bank:</span> DEUTSCHE BANK AG</p>
<p><span className="text-white/55">SWIFT Code:</span> DEUTDEFFXXX</p>
<p><span className="text-white/55">IBAN:</span> DE91 5007 0010 0925 9938 12</p>
<p><span className="text-white/55">Address:</span> Frankfurt, Germany</p>
<p><span className="text-white/55">City:</span> Frankfurt</p>
<p><span className="text-white/55">Postal Code:</span> 60314</p>
<p><span className="text-white/55">Country:</span> Germany</p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-cyan-500/15 bg-[#03111c]/50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                        Receiver
                      </p>
                     
                       <div className="mt-4 space-y-3 text-white/90">
  <p><span className="text-white/55">Bank:</span> DBS BANK</p>
  <p><span className="text-white/55">SWIFT Code:</span> DBSSSGSG</p>
  <p><span className="text-white/55">Account Name:</span> ADF ASIAN PACIFIC HOLDING SINGAPORE PTE LTD</p>
  <p><span className="text-white/55">Account Number:</span> 0721 0465 39</p>
  <p><span className="text-white/55">Address:</span> Singapore</p>
  <p><span className="text-white/55">City:</span> Singapore</p>
  <p><span className="text-white/55">Country:</span> Singapore</p>
  <p><span className="text-white/55">Status:</span> TRANSMITTED</p>
 </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            

{/* RIGHT COLUMN */}
<div className="rounded-[30px] border border-cyan-500/15 bg-[#041826] p-6 shadow-[0_0_50px_rgba(0,180,255,0.05)]">
  <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
    Status TRANSMITTED
  </p>

  <h2 className="mt-3 text-3xl font-semibold text-white">
    Validation Checkpoints
  </h2>

  <div className="mt-6 space-y-4">
    {checkpoints.map((item) => (
      <div
        key={item.title}
        className={`rounded-[22px] border p-5 ${toneClasses(
          item.tone as "green" | "amber"
        )}`}
      >
        <h3 className="text-xl font-semibold">{item.title}</h3>

        <p className="mt-2 text-[15px] leading-7 text-inherit/90">
          {item.description}
        </p>
      </div>
    ))}
  </div>

 {/* WALLET DISTRIBUTION */}
<div className="mt-6 rounded-[24px] border border-cyan-500/15 bg-[#03111c]/50 p-5">
  <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
    Wallet Distribution
  </p>

  <div className="mt-4 space-y-4">

    {/* MAIN WALLET */}
    <div className="rounded-[20px] border border-emerald-500/20 bg-[#041826] p-4">
      <p className="font-semibold text-emerald-300">
        Main Wallet — 50%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €487,500,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 1 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 1 — 22.5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €219,375,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0xB8A780F16894019Fe9B05557246F4Cf44394F68F
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 2 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 2 — 7.5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €73,125,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0xc57415b5a1728dC30537788395C29df7eDc097A9
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 3 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 3 — 2.5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €24,375,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0x421b685dd567678D7C287265399a98c2C511a89E
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 4 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 4 — 5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €48,750,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0x49489c55431fAc64A46106214454Fb9A934B047A
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 5 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 5 — 7.5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €73,125,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0x708DdCb0E920f072081c8438Ca198f74158738ec
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

    {/* WALLET 6 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
        Wallet 6 — 5%
      </p>

      <p className="mt-2 text-sm text-white/70">
        Amount: €48,750,000.00
      </p>

      <p className="mt-2 break-all text-xs text-cyan-300">
        Wallet: 0x12CA2B89429218Eb08f893C63e83263Cbc1296e7
      </p>

      <p className="mt-1 break-all text-xs text-amber-300">
        Hash: __________________________
      </p>
    </div>

  </div>
</div>
</div>

</section>
</main>
</div>
</div>
</div>
);
}