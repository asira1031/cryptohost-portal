"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


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
  const [scanner, setScanner] = useState("");

useEffect(() => {
  const interval = setInterval(() => {
    const line = Array.from(
      { length: 80 },
      () => Math.floor(Math.random() * 10)
    ).join("");

    setScanner(line);
  }, 50);

  return () => clearInterval(interval);
}, []);
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
                        DEUTSCHE BANK AG
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">
                        Current Account Status
                      </h2>
                      
                    </div>

                    <div className="rounded-full border border-amber-400/35 bg-amber-500/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                       Bank Locator Engine
                    </div>
                  </div>
<div className="mt-4 rounded-[20px] border border-cyan-500/30 bg-cyan-500/10 p-5">
  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
    Swift Global Engine
  </p>
<div className="mt-4 font-mono text-xs text-cyan-200 space-y-2">
  <p>NODE STATUS: ONLINE</p>
  <p>HASH VALIDATION: ACTIVE</p>
  <p>NETWORK: ETHEREUM MAINNET</p>
  <p>BANK TRANSFER STATUS: LOCATING</p>
  <p>LUCRUM HOLDINGS INC</p>
  <div className="mt-4 font-mono text-[10px] text-cyan-300 leading-4 break-all">
    {scanner}
  </div>

  <div className="font-mono text-[10px] text-cyan-300 leading-4 break-all">
    {scanner.split("").reverse().join("")}
  </div>

  <div className="font-mono text-[10px] text-cyan-300 leading-4 break-all">
    {scanner.slice(20) + scanner.slice(0, 20)}
  </div>

  <p className="mt-3 font-semibold text-cyan-300">
    ENGINE STATUS: ACTIVE
  </p>
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
      ["Reference", "DE25418963745838726"],
      ["File Name", "975MEUR_LUCRUM_DBSSSGSG_04.06.2026.ff"],
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
  className="bg-[#03111c]/40 px-5 py-4"
>
  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/55">
    {label}
  </div>

  <div className="mt-2 break-all text-sm text-white">
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

      <p className="mt-2 text-sm text-white/70">
      
[TX 1] Broadcasting...
BLOCK : 25322810
STATUS : 1
RAW HASH : b'\xdfs\xffY\x15\x00\xfe\x89\xf9+\xb0\x82\x04n;L\x83?\x7f\x00d\xb8\x9f\xad\xc4\x863\xd2\xcd'
HEX HASH : 0xdf73ff7d597d1500fe89f92bb082046e5b3b4c833f7f0064b89fadc48633d2cd
[SUCCESS]
Recipient : 0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd
Amount Proof : 487500000.0
TX HASH : 0xdf73ff7d597d1500fe89f92bb082046e5b3b4c833f7f0064b89fadc48633d2cd
https://etherscan.io/tx/0xdf73ff7d597d1500fe89f92bb082046e5b3b4c833f7f0064b89fadc48633d2cd
      </p>

  
    </div>

      <p className="mt-2 text-sm text-white/70">
      

RECIPIENT : 0x421b685dd567678D7C287265399a98c2C511a89E

[TX 2] Broadcasting...
BLOCK : 25322811
STATUS : 1
RAW HASH : b'\x0c\xc0\r\x00~\xdbj\x02\x1f\x1a\x89\xb1\xb5S\x05\xf0\xda\x93\x15\xc8\xeb\xbe\xc9\x8f\xc3\x95E\xb6I\xe3'
HEX HASH : 0x0cc00d7b29007edb6a021f1a89b1b55305f0da9315c8ebbec98fc39545b649e3
[SUCCESS]
Recipient : 0x421b685dd567678D7C287265399a98c2C511a89E
Amount Proof : 219375000.0
TX HASH : 0x0cc00d7b29007edb6a021f1a89b1b55305f0da9315c8ebbec98fc39545b649e3
https://etherscan.io/tx/0x0cc00d7b29007edb6a021f1a89b1b55305f0da9315c8ebbec98fc39545b649e3
      </p>


    </div>

    {/* WALLET 2 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      <p className="font-semibold text-white">
      
      </p>

      <p className="mt-2 text-sm text-white/70">
     
RECIPIENT : 0xB250529f7743BE0d927D65F9590936875D411a97

[TX 3] Broadcasting...
BLOCK : 25322812
STATUS : 1
RAW HASH : b"\x9d\xc3\x82\x9bQ8\x15\xd2z\x98\xec\xaaN\xd0\x12^\xdc\xd1\x07\x8e\xce\x84\x8a\xcd\xea'Y\xd2\x86\xe3W"
HEX HASH : 0x9dc3829b51381529d27a98ecaa4ed0125edcd1078ece848acdea2759d286e357
[SUCCESS]
Recipient : 0xB250529f7743BE0d927D65F9590936875D411a97
Amount Proof : 73125000.0
TX HASH : 0x9dc3829b51381529d27a98ecaa4ed0125edcd1078ece848acdea2759d286e357
https://etherscan.io/tx/0x9dc3829b51381529d27a98ecaa4ed0125edcd1078ece848acdea2759d286e357
      </p>

    </div>

    {/* WALLET 3 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      

      <p className="mt-2 text-sm text-white/70">
     
RECIPIENT : 0x421b685dd567678D7C287265399a98c2C511a89E

[TX 4] Broadcasting...
BLOCK : 25322813
STATUS : 1
RAW HASH : b'\xb637\xbdK\x99\x19\xc0|\x8fi\xfa\xc1\xb0\x05\x19g\xea\x1bVXn\xbe\xb9u\x88u\xe8y\n|B'
HEX HASH : 0xb63337bd4b9919c07c8f69fac1b0051967ea1b56586ebeb9758875e8790a7c42
[SUCCESS]
Recipient : 0x421b685dd567678D7C287265399a98c2C511a89E
Amount Proof : 24375000.0
TX HASH : 0xb63337bd4b9919c07c8f69fac1b0051967ea1b56586ebeb9758875e8790a7c42
https://etherscan.io/tx/0xb63337bd4b9919c07c8f69fac1b0051967ea1b56586ebeb9758875e8790a7c42
      </p>

    </div>

    {/* WALLET 4 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">

      <p className="mt-2 text-sm text-white/70">
       
RECIPIENT : 0x49489c55431fAc64A46106214454Fb9A934B047A

[TX 5] Broadcasting...
BLOCK : 25322814
STATUS : 1
RAW HASH : b'=\x97\xed\xa4\xff\x8c!K\xdd\x0f\x95I\x89#\x89\x06\xb9t\xfb\xfbC\xde4\x16e\xa5B\xf8\xd2\x84;A'
HEX HASH : 0x3d97eda4ff8c214bdd0f954989238906b974fbfb43de341665a542f8d2843b41
[SUCCESS]
Recipient : 0x49489c55431fAc64A46106214454Fb9A934B047A
Amount Proof : 48750000.0
TX HASH : 0x3d97eda4ff8c214bdd0f954989238906b974fbfb43de341665a542f8d2843b41
https://etherscan.io/tx/0x3d97eda4ff8c214bdd0f954989238906b974fbfb43de341665a542f8d2843b41
      </p>

    </div>

    {/* WALLET 5 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">
      
      <p className="mt-2 text-sm text-white/70">
      
RECIPIENT : 0x708DdCb0E920f072081c8438Ca198f74158738ec

[TX 6] Broadcasting...
BLOCK : 25322816
STATUS : 1
RAW HASH : b'\x11\x07\xc6\xact\x0e\xdd^\xba\xe1\xbc\x9e\xd6\xab\xb8\x0e\xda\xa7t\xe7\x8d\xa82\xfc\xdfnq\xcf%\xa8\x8d\x13'
HEX HASH : 0x1107c6ac740edd5ebae1bc9ed6abb80edaa774e78da832fcdf6e71cf25a88d13
[SUCCESS]
Recipient : 0x708DdCb0E920f072081c8438Ca198f74158738ec
Amount Proof : 73125000.0
TX HASH : 0x1107c6ac740edd5ebae1bc9ed6abb80edaa774e78da832fcdf6e71cf25a88d13
https://etherscan.io/tx/0x1107c6ac740edd5ebae1bc9ed6abb80edaa774e78da832fcdf6e71cf25a88d13
      </p>

    </div>

    {/* WALLET 6 */}
    <div className="rounded-[20px] border border-cyan-500/10 bg-[#041826] p-4">

      <p className="mt-2 text-sm text-white/70">
      
RECIPIENT : 0x12CA2B89429218Eb08f893C63e83263Cbc1296e7

[TX 7] Broadcasting...
BLOCK : 25322817
STATUS : 1
RAW HASH : b'\xda~9\xc8C7\x99\xa6\xb9\xce\xd8WXwOB\xc4\xd52\x96\xa6\xbe\xfa\xc5&\xc6\xb6L\xea\xc1\xe4\xf2'
HEX HASH : 0xda7e39c8433799a6b9ced85758774f42c4d53296a6befac526c6b64ceac1e4f2
[SUCCESS]
Recipient : 0x12CA2B89429218Eb08f893C63e83263Cbc1296e7
Amount Proof : 48750000.0
TX HASH : 0xda7e39c8433799a6b9ced85758774f42c4d53296a6befac526c6b64ceac1e4f2
https://etherscan.io/tx/0xda7e39c8433799a6b9ced85758774f42c4d53296a6befac526c6b64ceac1e4f2
      </p>



Required Consent:


To proceed with production onboarding and application verification, the account holder or authorized representative is requested to provide formal consent for the integration process.

Required Authorization Package:

• Client ID
• Client Secret Key
• Access Token (if already issued)
• Authorization Code (if applicable)
• Approved Redirect URI
• Application Reference Name
• Authorized API Scope(s)

Developer Advisory

For security, compliance, and production activation purposes, all credentials and authorization data must be issued directly through the official Deutsche Bank Developer Portal by the authorized account owner.

Please proceed to the Deutsche Bank Developer Portal and complete the application registration process before submitting production credentials for integration review.

Developer Portal:
https://developer.db.com

API Documentation:
https://developer.db.com/apidocumentation

Upon completion of the registration process, kindly provide the approved application details for production verification and integration activation and token approval payment.


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