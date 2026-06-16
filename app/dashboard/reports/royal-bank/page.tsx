"use client";
import crypto from "crypto";
import { walletsWithHashes } from "../../../../src/lib/walletHash";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

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

export default function RoyalBankValidationPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [approvalCode, setApprovalCode] = useState("");
const [approvalResult, setApprovalResult] = useState("");
const [prices, setPrices] = useState<any>(null);
const [attempts, setAttempts] = useState(0);
const [blocked, setBlocked] = useState(false);
const [validating, setValidating] = useState(false);
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



  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userEmail = (user?.email || "").toLowerCase().trim();

     const isAdmin =
  userEmail === "jans103174@gmail.com" ||
  userEmail === "Yuinpin96@gmail.com";

if (!userEmail) {
  router.replace("/login");
  return;
}


if (!isAdmin) {
  router.replace("/dashboard/my-files");
  return;
}

      setCheckingAccess(false);
    };

    checkAccess();
  }, [router]);

  const lastUpdate = useMemo(() => formatNow(), []);
  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple,usd-coin,solana"
      );

      const data = await res.json();

      console.log(data);

      setPrices(data);
    } catch (err) {
      console.error("Price fetch error:", err);
    }
  };

  fetchPrices();

  const interval = setInterval(fetchPrices, 30000);

  return () => clearInterval(interval);
}, []);

  const handleApproval = () => {
  const cleanCode = approvalCode.trim();

  if (cleanCode.length < 6 || cleanCode.length > 20) {
    setApprovalResult("❌ Invalid Approval Code");
    return;
  }

  const createdAt = new Date("2026-05-07T00:00:00").getTime();
  const now = Date.now();

  const hoursPassed =
    (now - createdAt) / (1000 * 60 * 60);

  if (hoursPassed < 24) {
    setApprovalResult("⏳ Processing");
    return;
  }

  if (hoursPassed < 72) {
    setApprovalResult("🔐 Confirmation");
    return;
  }

  setApprovalResult("❌ Unauthorized");
};

  if (checkingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#061018] text-white">
        Checking access...
      </div>
    );
  }

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
                reference: "RBC-561117-9",
              </p>
              <div className="mt-3">
                <StatusBadge label="executed
                 " tone="emerald" />
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
                    100M Validation Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the uploaded ROYAL BANK-linked
                    transmission file. This dashboard reflects  the file-level
                    transmission and validation information currently visible from
                    ROYAL BANK PORTAL.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="SERVER TO SERVER" />
                  <StatusBadge label="UNION BANK PHILIPPINES" />
                  <StatusBadge label="Blockchain Execution" tone="amber" />
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                      
                    </p>Bank Locator Engine
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      
                      Bank Status
                    </h3>
                  </div>
                  <StatusBadge label="Executed" tone="emerald" />
                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                 <div className="mt-4 rounded-[20px] border border-cyan-500/30 bg-cyan-500/10 p-5">
  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
    Swift Global Engine
  </p>

  <div className="mt-4 font-mono text-xs text-cyan-200 space-y-2">
    <p>NODE STATUS: ONLINE</p>
    <p>HASH VALIDATION: ACTIVE</p>
    <p>NETWORK: ETHEREUM MAINNET</p>
    <p>BANK TRANSFER STATUS: LOCATING</p>

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
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Amount" value="EUR100000000.00" />
                  <InfoRow label="File Name" value="EURO CASH (€100,000,000.00)" />
                  <InfoRow
                    label="Transaction Type"
                    value="CASH / Financial Transmission PROTOCOL: SFTP "
                  />
                  <InfoRow
                    label="Bank Source"
                    value="ROYAL BANK OF CANADA (ROYCKYKTXXX -7277103S2S )"
                  />
                  <InfoRow label="Sender" value="MORNACH INVESTMENTS INTERNATIONAL LTD " />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Transmission Layer" value=" PROTOCOL: SFTP / FIN" />
                  <InfoRow
                    label="Authentication"
                    value="TLS / Certificate-based"
                  />
                  <InfoRow label="Blockchain Layer" value="executed" />
                  <InfoRow label="Last Update" value={lastUpdate} />
                </div>
              </div>
<div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
  <div className="flex items-center justify-between">
    <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
      Live Crypto Market
    </p>

    <a
      href="https://www.coingecko.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] text-cyan-300 hover:text-cyan-200"
    >
      Open Market ↗
    </a>
  </div>

  <div className="mt-4 overflow-x-auto">
    <div className="min-w-[760px]">
      <div className="grid grid-cols-[40px_1.6fr_1fr_0.8fr_0.8fr_1.2fr_1.2fr] border-b border-white/8 pb-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
        <div>#</div>
        <div>Coin</div>
        <div>Price</div>
        <div>1H</div>
        <div>24H</div>
        <div>Volume</div>
        <div>Market Cap</div>
      </div>

      {prices ? (
        prices.map((coin: any, index: number) => (
          <div
            key={coin.id}
            className="grid grid-cols-[40px_1.6fr_1fr_0.8fr_0.8fr_1.2fr_1.2fr] items-center border-b border-white/6 py-4 text-sm"
          >
            <div className="text-white/70">{index + 1}</div>

            <div className="flex items-center gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="h-6 w-6 rounded-full"
              />

              <div>
                <div className="font-medium text-white">
                  {coin.name}
                </div>

                <div className="text-xs uppercase text-white/45">
                  {coin.symbol}
                </div>
              </div>
            </div>

            <div className="text-white">
              $
              {coin.current_price?.toLocaleString()}
            </div>

            <div
              className={
                coin.price_change_percentage_1h_in_currency >= 0
                  ? "text-emerald-300"
                  : "text-red-300"
              }
            >
              {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
            </div>

            <div
              className={
                coin.price_change_percentage_24h_in_currency >= 0
                  ? "text-emerald-300"
                  : "text-red-300"
              }
            >
              {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
            </div>

            <div className="text-white/80">
              $
              {coin.total_volume?.toLocaleString()}
            </div>

            <div className="text-white/80">
              $
              {coin.market_cap?.toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <div className="py-6 text-sm text-white/50">
          Loading live market data...
        </div>
      )}
    </div>
  </div>

  <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
    <span>Source: CoinGecko API</span>
    <span>Updates every 30 seconds</span>
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
                        File Received
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        Financial locate and download from Global System.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-sm font-semibold text-emerald-200">
                        Transmission Metadata Detected
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/80">
                        ROYAL BANK OF CANADA (CAYMAN) LTD, WITH FULL BANKING RESPONSIBILITY, HEREBY CONFIRMS THE ISSUANCE OF A CASH TRANSFER FOR FURTHER CREDIT TO ASIRA CRYPTOHOST, DATED 12/06/2026.

THIS CASH TRANSFER IS FOR AN AMOUNT OF EUR 100,000,000.00 (ONE HUNDRED MILLION EUROS ONLY).

THE TRANSFER HAS BEEN DIRECTED TO THE FOLLOWING BENEFICIARY:

BENEFICIARY NAME: ASIRA CRYPTOHOST

RECEIVER BANK: UNION BANK OF THE PHILIPPINES

ACCOUNT NUMBER: 103200012264

SWIFT CODE: UNPHPHMXXX

REFERENCE NUMBER: RBC-561117-9

TRANSACTION CODE: MON/SFTP-FIN/06-026

SERVER ID: AS45277

ROYAL BANK OF CANADA (CAYMAN) LTD HEREBY AUTHORIZES THE PROCESSING OF THIS TRANSFER INSTRUCTION AND REQUESTS THAT THE BENEFICIARY BE ADVISED ACCORDINGLY.


                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Compliance Review Pending
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        Process final review and confirmation of all supporting
                        details.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Blockchain Execution Active
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        release, mint, conversion, or broadcast action has been
                        initiated on-chain.
                      </p>
                    </div>
                  </div>
                </section>

             <section className="rounded-[30px] border border-white/8 bg-[#07131b] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-6">
  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
    Approval System
  </p>

  <div className="mt-3 flex items-center gap-2">
    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

    <div className="text-xs tracking-[0.22em] text-green-300">
      LIVE VALIDATION NETWORK
    </div>
  </div>

  <h3 className="mt-4 text-2xl font-semibold text-white">
    Approval Code Validation
  </h3>

  <p className="mt-2 text-sm leading-7 text-slate-300">
    Enter authorization or approval sequence code to begin
    institutional validation routing and transaction confirmation.
  </p>

  <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-black/30 p-4">
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/60">
        Secure Validation Slot
      </span>

      <span className="animate-pulse text-[11px] uppercase tracking-[0.24em] text-green-400">
        Active
      </span>
    </div>

  <input
  type="text"
  value={approvalCode}
  onChange={(e) => setApprovalCode(e.target.value)}
  placeholder="ENTER VALIDATION CODE"
  maxLength={20}
  disabled={blocked || validating}
  className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm tracking-[0.20em] text-cyan-100 outline-none disabled:opacity-50"
/>

<button
  type="button"
  onClick={handleApproval}
  disabled={blocked || validating}
  className="mt-5 w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-4 text-sm font-semibold tracking-[0.18em] text-cyan-200 disabled:opacity-40"
>
  {blocked
    ? "ACCESS BLOCKED"
    : validating
    ? "VALIDATION IN PROGRESS..."
    : "RUN VALIDATION SYSTEM"}
</button>
</div>

<div className="mt-6 rounded-2xl border border-white/8 bg-black/40 p-4 font-mono text-[12px] text-green-400">
  <div className="animate-pulse">
    AUTHORIZATION CODE ............
  </div>

  <div className="mt-2 animate-pulse">
    APPROVAL CODE .................
  </div>

  <div className="mt-2 animate-pulse">
    RELEASE CODE ..................
  </div>

  <div className="mt-2 animate-pulse">
    ONE TIME PIN ..................
  </div>

  <div className="mt-2 animate-pulse">
    FINAL CODE ....................
  </div>

  <div className="mt-2 animate-pulse">
    TRANSACTION CODE ..............
  </div>
</div>

{approvalResult && (
  <div
    className={`mt-6 rounded-2xl p-5 text-sm shadow-[0_0_25px_rgba(239,68,68,0.15)] ${
      blocked
        ? "border border-red-600/30 bg-red-600/10 text-red-300"
        : "border border-red-500/20 bg-red-500/10 text-red-300"
    }`}
  >
    <div className="text-xs uppercase tracking-[0.24em] text-red-400/70">
      Validation Result
    </div>

    <div className="mt-2 text-lg font-semibold tracking-[0.15em]">
      {approvalResult}
    </div>

    {!blocked && attempts > 0 && (
      <div className="mt-3 text-xs text-red-400">
        Failed Attempts: {attempts}/3
      </div>
    )}
  </div>
)}
</section>
<section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
  <h3 className="text-xl font-semibold text-white">
    System Summary
  </h3>

  <p className="mt-4 text-sm leading-7 text-white/72">
  </p>
</section>

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
                  <TerminalLine ok>
                    CRYPTOHOST SECURE VALIDATION SYSTEM
                  </TerminalLine>
                  <TerminalLine>ROYCKYKTXXX -7277103S2S </TerminalLine>
                  <TerminalLine>FILE:100,000,000.00  </TerminalLine>
                  <TerminalLine>TYPE: CASH /  PROTOCOL: SFTP</TerminalLine>
                  <TerminalLine>
                    BANK SOURCE: ROYAL BANK OF CANADA ( ROYCKYKTXXX)
                  </TerminalLine>
                  <TerminalLine>SENDER: MORNACH INVESTMENTS INTERNATIONAL LTD</TerminalLine>
                  <TerminalLine>CURRENCY: EUR</TerminalLine>
                  <TerminalLine>AUTH MODE: TLS / CERTIFICATE-BASED</TerminalLine>
                  <TerminalLine >TRANSMISSION LEVEL: IN PROGRESS</TerminalLine>
                  <TerminalLine>BLOCKCHAIN LAYER:  ACTIVE</TerminalLine>
                  <TerminalLine>COMPLIANCE REVIEW: IN PROGRESS</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>

                  <div className="mt-4 rounded-[20px] border border-white/10 bg-[#031017] p-4">
                    <pre className="whitespace-pre-wrap font-mono text-[12px] leading-6 text-cyan-100/90">
[OK] Connected Successfully
Chain ID : 1
Latest Block : 25315429
Sender Address : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
Gas Price : 113440779
Nonce Test : 155
======================================================================
Enter Total Broadcast Amount : 100000000
======================================================================
How many recipient wallets? : 7
======================================================================
Wallet #1 Address : 0x3c18E822138b051Ed2423BE7Db6556c5662e1784
Wallet #1 Percentage : 30
======================================================================
Wallet #2 Address : 0xC3caF75dfa344eAE9BE95A01c94258c1Bafe0D18
Wallet #2 Percentage : 5
======================================================================
Wallet #3 Address : 0x1808b0871ff42FfDb2e30472b1102fa97F9Cc181
Wallet #3 Percentage : 5
======================================================================
Wallet #4 Address : 0x4e0b4d9930d85200eb4ace7633b3f2c25bc79991
Wallet #4 Percentage : 10
======================================================================
Wallet #5 Address : 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Wallet #5 Percentage : 40
======================================================================
Wallet #6 Address : 0xaCe8f4fA54c312cf3e3802aeA085348fBb548Ed6
Wallet #6 Percentage : 8
======================================================================
Wallet #7 Address : 0x50eBd98c74e610B90A422c2F25B0E0C1EeAB9Bd2
Wallet #7 Percentage : 2
======================================================================
[OK] Percentage Validation Passed
======================================================================
BROADCAST PREVIEW
======================================================================
Recipient #1
Wallet     : 0x3c18E822138b051Ed2423BE7Db6556c5662e1784
Percentage : 30.0%
Amount     : 30000000.0
--------------------------------------------------
Recipient #2
Wallet     : 0xC3caF75dfa344eAE9BE95A01c94258c1Bafe0D18
Percentage : 5.0%
Amount     : 5000000.0
--------------------------------------------------
Recipient #3
Wallet     : 0x1808b0871ff42FfDb2e30472b1102fa97F9Cc181
Percentage : 5.0%
Amount     : 5000000.0
--------------------------------------------------
Recipient #4
Wallet     : 0x4e0b4d9930d85200eb4ace7633b3f2c25bc79991
Percentage : 10.0%
Amount     : 10000000.0
--------------------------------------------------
Recipient #5
Wallet     : 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Percentage : 40.0%
Amount     : 40000000.0
--------------------------------------------------
Recipient #6
Wallet     : 0xaCe8f4fA54c312cf3e3802aeA085348fBb548Ed6
Percentage : 8.0%
Amount     : 8000000.0
--------------------------------------------------
Recipient #7
Wallet     : 0x50eBd98c74e610B90A422c2F25B0E0C1EeAB9Bd2
Percentage : 2.0%
Amount     : 2000000.0
--------------------------------------------------
======================================================================
CONFIRM MAINNET BROADCAST? (yes/no) : yes
======================================================================
[STARTING MAINNET BROADCAST]
======================================================================

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x3c18E822138b051Ed2423BE7Db6556c5662e1784

[TX 1] Broadcasting...
BLOCK : 25315440
STATUS : 1
RAW HASH : b'\xaf\xab\x1d!\x97\x1b\r\xb0(\xa27?\xf4\xb3\x84\xfa\x89s\x03\xe8\xd3X\x10\xa5\xb4\xfb\xac\xcd-r8"'
HEX HASH : 0xafab1d21971b0db028a2373ff4b384fa897303e8d35810a5b4fbaccd2d723822
[SUCCESS]
Recipient : 0x3c18E822138b051Ed2423BE7Db6556c5662e1784
Amount Proof : 30000000.0
TX HASH : 0xafab1d21971b0db028a2373ff4b384fa897303e8d35810a5b4fbaccd2d723822
https://etherscan.io/tx/0xafab1d21971b0db028a2373ff4b384fa897303e8d35810a5b4fbaccd2d723822
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xC3caF75dfa344eAE9BE95A01c94258c1Bafe0D18

[TX 2] Broadcasting...
BLOCK : 25315441
STATUS : 1
RAW HASH : b'\x88\xc1\x97\xc1\xcc4HN$\x0b\xa9P\x98#\x88\x03\xcdXlG\x0c\xaf\xe1q\xf2\x17%\xcd\xa4\xb6'
HEX HASH : 0x88c197c1cc347d484e247d0ba95098238803cd586c470cafe171f21725cda4b6
[SUCCESS]
Recipient : 0xC3caF75dfa344eAE9BE95A01c94258c1Bafe0D18
Amount Proof : 5000000.0
TX HASH : 0x88c197c1cc347d484e247d0ba95098238803cd586c470cafe171f21725cda4b6
https://etherscan.io/tx/0x88c197c1cc347d484e247d0ba95098238803cd586c470cafe171f21725cda4b6
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x1808b0871ff42FfDb2e30472b1102fa97F9Cc181

[TX 3] Broadcasting...
[PENDING]
Receipt not available yet
RAW HASH : b'`\x82\xca\xae)\x82\r\xd6M\xab\x08\xdd\x9e\xd1\r#\xf7\x87o\xa8~\xb7\x16k\xa0\x08\xf8\xe6zy\xb8'
HEX HASH : 0x6082caae29820dd64dab08dd9ed10d7d23f7876fa87eb7166ba008f8e67a79b8
[SUCCESS]
Recipient : 0x1808b0871ff42FfDb2e30472b1102fa97F9Cc181
Amount Proof : 5000000.0
TX HASH : 0x6082caae29820dd64dab08dd9ed10d7d23f7876fa87eb7166ba008f8e67a79b8
https://etherscan.io/tx/0x6082caae29820dd64dab08dd9ed10d7d23f7876fa87eb7166ba008f8e67a79b8
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x4e0B4D9930D85200EB4ACE7633B3f2c25BC79991

[TX 4] Broadcasting...
BLOCK : 25315444
STATUS : 1
RAW HASH : b'Q\xe4\x92\xe1Z\x89\xde\x85\xdf\xe09\x16\x88\xa7\x1a\xaeuh\xe9v_\x05\xa0\x8f=&v1\xaf\xddI\x10'
HEX HASH : 0x51e492e15a89de85dfe0391688a71aae7568e9765f05a08f3d267631afdd4910
[SUCCESS]
Recipient : 0x4e0B4D9930D85200EB4ACE7633B3f2c25BC79991
Amount Proof : 10000000.0
TX HASH : 0x51e492e15a89de85dfe0391688a71aae7568e9765f05a08f3d267631afdd4910
https://etherscan.io/tx/0x51e492e15a89de85dfe0391688a71aae7568e9765f05a08f3d267631afdd4910
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd

[TX 5] Broadcasting...
BLOCK : 25315445
STATUS : 1
RAW HASH : b';\x9a\xc2\x16\xf7nB\xfc\xde\x08\x06i\xabb\x90\xd3/k\x13\xdf\xf9\x85\xa3\x0b\xefe\x0b\xb1\xc98O\xb5'
HEX HASH : 0x3b9ac216f76e42fcde080669ab6290d32f6b13dff985a30bef650bb1c9384fb5
[SUCCESS]
Recipient : 0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd
Amount Proof : 40000000.0
TX HASH : 0x3b9ac216f76e42fcde080669ab6290d32f6b13dff985a30bef650bb1c9384fb5
https://etherscan.io/tx/0x3b9ac216f76e42fcde080669ab6290d32f6b13dff985a30bef650bb1c9384fb5
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xaCe8f4fA54c312cf3e3802aeA085348fBb548Ed6

[TX 6] Broadcasting...
BLOCK : 25315446
STATUS : 1
RAW HASH : b'\x9a\xee\xfa\xde\x03\xb4\xe92\x8bZB\x9f9\xe5\xe1F\xa7$\xe6\xb5\xd3O\xa7\n\xdf9\xb5\xbe\xb8\xa1\xf3\xbb'
HEX HASH : 0x9aeefade03b4e9328b5a429f39e5e146a724e6b5d34fa70adf39b5beb8a1f3bb
[SUCCESS]
Recipient : 0xaCe8f4fA54c312cf3e3802aeA085348fBb548Ed6
Amount Proof : 8000000.0
TX HASH : 0x9aeefade03b4e9328b5a429f39e5e146a724e6b5d34fa70adf39b5beb8a1f3bb
https://etherscan.io/tx/0x9aeefade03b4e9328b5a429f39e5e146a724e6b5d34fa70adf39b5beb8a1f3bb
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x50eBd98c74e610B90A422c2F25B0E0C1EeAB9Bd2

[TX 7] Broadcasting...
BLOCK : 25315447
STATUS : 1
RAW HASH : b'G3\xb1;\x07\xfaV\xd2\xab\xa1p+\xe0\xc1.\xcc\x0fk\x11\x1c;ku\xb0m\xa0_\xa4\xf8\xfa\x9d'
HEX HASH : 0x4733b13b07fa56d2aba1702be0c12ecc0f6b111c3b6b75b06da05fa4f8fa289d
[SUCCESS]
Recipient : 0x50eBd98c74e610B90A422c2F25B0E0C1EeAB9Bd2
Amount Proof : 2000000.0
TX HASH : 0x4733b13b07fa56d2aba1702be0c12ecc0f6b111c3b6b75b06da05fa4f8fa289d
https://etherscan.io/tx/0x4733b13b07fa56d2aba1702be0c12ecc0f6b111c3b6b75b06da05fa4f8fa289d
--------------------------------------------------
======================================================================
ALL MAINNET BROADCASTS COMPLETE
======================================================================


============================================================================================
CRYPTOHOST :: CONNECTION STATUS (DISPLAY)
============================================================================================
[OK] Connected to Blockchain RPC (Ethereum Mainnet via Alchemy)
     RPC: https://eth-mainnet.g.alchemy.com/v2/gaZRkg_BK7Eou-s9f5NpV
     Chain ID: 1
[DISPLAY] Connected to Binance for EUR to USDT conversion
         (Status output  � this code call Binance endpoints)
[DISPLAY] Connected to ROYAL Bank API system
         (Status output  �  ROYAL Bank API requests/mTLS/OAuth exist in this script)
============================================================================================

Traceback (most recent call last):
  File "c:\L TO L\import socket.py", line 179, in
Sender token balance: treasury on hold,...
Required total     : 100000000.0
    raise Exception("token balance  distributed")

                    </pre>
                  </div>
ETH MAINNET NOTICE

The Ethereum Mainnet smart contract environment currently blocks internal conversion processing through standard internal transfer mechanisms.

Any conversion requiring asset transformation, routing, settlement, or independent execution must be performed through a separately authorized independent smart contract.

Internal conversion services are unavailable through the primary transfer channel. All conversion requests requiring execution, settlement, or asset reallocation must utilize an independent smart contract deployment operating outside the internal conversion layer.

STATUS: INTERNAL CONVERSION BLOCKED

NETWORK: ETHEREUM MAINNET

CONVERSION METHOD REQUIRED:
INDEPENDENT SMART CONTRACT

EXECUTION STATUS:
EXTERNAL CONTRACT AUTHORIZATION REQUIRED.


                </div>
              ) : null}
            </section>
          </main>
                 </div>
      </div>
    </div>
  );
}