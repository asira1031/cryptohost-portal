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

export default function Validation926BarclaysPage() {
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
  userEmail === "tjaslan09@gmail.com";

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
                Reference: GB98765854358048
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-white">
                Transaction Code: "5341001092919:4301002919GB36171",
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
                    926M Validation Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the uploaded BARCLAYS BANK-linked
                    transmission file. This dashboard reflects  the file-level
                    transmission and validation information currently visible from
                    BARCLAYS BANK PORTAL.
                    CLEARING HOUSE NUMBER     : BARCGB22XXX-MAD8381930100391901
                    TRANSACTION ID            : 4310019291903BARCGB22XXX439919200192
                    FINAL BLOCKING CODE       : GB9201738813991993881
                    TRANSFER CODE             : 5341001092919:4301002919GB36171
                    UNIQUE TRANSACTION NUMBER : BARCGB22XXX43001039139918377183
                    IMAD NUMBER               : 00000000SRT-NR-38

                    SENDER/ORDERING CUSTOMER  :
                    SENDER BANK NAME          : BARCLAYS BANK PLC
                    SENDER BANK ADDRESS       : 1 CHURCHILL PLACE, LONDON, E14 5H
                    SENDER BANK ACCOUNT NAME  : SOFTVERK LIMITED
                    SENDER BANK ACCOUNT NUMBER: GB13BARC20325360681156
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="S2S" />
                  <StatusBadge label="BARCLAYS BANK" />
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

  <div className="mt-4 p-3 border border-green-500/40 rounded bg-green-950/20">
    <p className="text-green-400 font-semibold">
      FUND STATUS: ACTIVE
    </p>

    <p className="text-cyan-300 mt-2">
      VALIDATION COMPLETE
    </p>

    <p className="text-yellow-300 mt-2 font-semibold">
      PLEASE ENTER 12-DIGIT APPROVAL CODE
    </p>
  </div>

  <p className="mt-3 font-semibold text-cyan-300">
    APPROVAL ENGINE: READY
  </p>
</div>
</div>
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Amount" value="€926,000,000.00" />
                  <InfoRow label="File Name" value="EURO CASH (€926,000,000.00)" />
                  <InfoRow
                    label="Transaction Type"
                    value="CASH / Financial Transmission SERVER TO SERVER: UPLOAD "
                  />
                  <InfoRow
                    label="Bank Source"
                    value="BARCLAYS BANK PLC (UNIQUE TRANSACTION NUMBER : BARCGB22XXX43001039139918377183)" 
                  />
                  <InfoRow label="Sender" value=" BARCLAYS BANK PLC " />
                  <InfoRow label="Currency" value="EURO" />
                  <InfoRow label="Transmission Layer" value=" S2S: CASH / TERMINAL" />
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
                        BARCLAYS BANK PLC, WITH FULL BANKING RESPONSIBILITY, HEREBY CONFIRMS THE ISSUANCE OF A CASH TRANSFER FOR FURTHER CREDIT TO ASIRA CRYPTOHOST, DATED 12/06/2026.

THIS CASH TRANSFER IS FOR AN AMOUNT OF USD 926,000,000.00 (NINE HUNDRED TWENTY-SIX MILLION EUROS ONLY).

THE TRANSFER HAS BEEN DIRECTED TO THE FOLLOWING BENEFICIARY:

Recipient #1
Wallet     : 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Percentage : 55.0%
EUR Amount : 272,250,000.00
USDT Amount: 318,532,500.00
--------------------------------------------------
Recipient #2
Wallet     : 0x09E26d256F2D5Ca339F5019250Ec2B18c2c14737
Percentage : 17.5%
EUR Amount : 86,625,000.00
USDT Amount: 101,351,250.00
--------------------------------------------------
Recipient #3
Wallet     : 0xA3fdAE01E9eaDd0a86403830824fEf489240486f
Percentage : 15.0%
EUR Amount : 74,250,000.00
USDT Amount: 86,872,500.00
--------------------------------------------------
Recipient #4
Wallet     : 0x1a5D5001ACb0B3440388c5493fe9F220a070E537
Percentage : 5.0%
EUR Amount : 24,750,000.00
USDT Amount: 28,957,500.00
--------------------------------------------------
Recipient #5
Wallet     : 0xe0d459c56B6317630f453A4DCAa60f6bd87189be
Percentage : 5.0%
EUR Amount : 24,750,000.00
USDT Amount: 28,957,500.00
--------------------------------------------------
Recipient #6
Wallet     : 0xe746990a32aAb619f512845B2D1657baB3D1e58B
Percentage : 2.5%
EUR Amount : 12,375,000.00
USDT Amount: 14,478,750.00
--------------------------------------------------
======================================================================
CONFIRM MAINNET BROADCAST? (yes/no) : yes
======================================================================
[STARTING MAINNET BROADCAST]

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
                  <TerminalLine>REVOLUT </TerminalLine>
                  <TerminalLine>FILE:926,000,000.00  </TerminalLine>
                  <TerminalLine>TYPE: CASH /  PROTOCOL: S2S</TerminalLine>
                  <TerminalLine>
                    BANK SOURCE: BARCLAYS BANK PLC( S2S)
                  </TerminalLine>
                  <TerminalLine>SENDER: BARCLAYS BANK PLC S2S SYSTEM</TerminalLine>
                  <TerminalLine>CURRENCY: EURO</TerminalLine>
                  <TerminalLine>AUTH MODE: TLS / CERTIFICATE-BASED</TerminalLine>
                  <TerminalLine >TRANSMISSION LEVEL: IN PROGRESS</TerminalLine>
                  <TerminalLine>BLOCKCHAIN LAYER:  ACTIVE</TerminalLine>
                  <TerminalLine>COMPLIANCE REVIEW: IN PROGRESS</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>

                  <div className="mt-4 rounded-[20px] border border-white/10 bg-[#031017] p-4">
                    <pre className="whitespace-pre-wrap font-mono text-[12px] leading-6 text-cyan-100/90">
======================================================================
MAINNET BLOCKCHAIN PROOF BROADCASTER
======================================================================
[OK] Connected Successfully
Chain ID : 1
Latest Block : 25344528
Sender Address : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
Gas Price : 164878881
Nonce Test : 190
======================================================================
Enter Total Broadcast Amount : 926000000
======================================================================
How many recipient wallets? : 6
======================================================================
Wallet #1 Address : 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Wallet #1 Percentage : 55
======================================================================
Wallet #2 Address : 0x2DA440de83AaDC095ceFE48Ed7EE578CCe4f3627
Wallet #2 Percentage : 8
======================================================================
Wallet #3 Address : 0x1887AdC36eaC34860addE1d05ad58C3449b8075F
Wallet #3 Percentage : 12
======================================================================
Wallet #4 Address : 0xB5164B8d48d00525215230d138d7257964666f60
Wallet #4 Percentage : 7.5
======================================================================
Wallet #5 Address : 0xe0d459c56B6317630f453A4DCAa60f6bd87189be
Wallet #5 Percentage : 12.5
======================================================================
Wallet #6 Address : 0x670aC86Bd522fB0A6477051be895FAcBaCb1A94f
Wallet #6 Percentage : 5
======================================================================
[OK] Percentage Validation Passed
======================================================================
BROADCAST PREVIEW
======================================================================
Recipient #1
Wallet     : 0xc47133a6bd653793562a1ea25cb1d3161fbd99cd
Percentage : 55.0%
EUR Amount : 509,300,000.00
USDT Amount: 595,881,000.00
--------------------------------------------------
Recipient #2
Wallet     : 0x2DA440de83AaDC095ceFE48Ed7EE578CCe4f3627
Percentage : 8.0%
EUR Amount : 74,080,000.00
USDT Amount: 86,673,600.00
--------------------------------------------------
Recipient #3
Wallet     : 0x1887AdC36eaC34860addE1d05ad58C3449b8075F
Percentage : 12.0%
EUR Amount : 111,120,000.00
USDT Amount: 130,010,400.00
--------------------------------------------------
Recipient #4
Wallet     : 0xB5164B8d48d00525215230d138d7257964666f60
Percentage : 7.5%
EUR Amount : 69,450,000.00
USDT Amount: 81,256,500.00
--------------------------------------------------
Recipient #5
Wallet     : 0xe0d459c56B6317630f453A4DCAa60f6bd87189be
Percentage : 12.5%
EUR Amount : 115,750,000.00
USDT Amount: 135,427,500.00
--------------------------------------------------
Recipient #6
Wallet     : 0x670aC86Bd522fB0A6477051be895FAcBaCb1A94f
Percentage : 5.0%
EUR Amount : 46,300,000.00
USDT Amount: 54,171,000.00
--------------------------------------------------
======================================================================
CONFIRM MAINNET BROADCAST? (yes/no) : yes
======================================================================
[STARTING MAINNET BROADCAST]
======================================================================

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd

[TX 1] Broadcasting...
BLOCK : 25344548
STATUS : 1
RAW HASH : b"\x00h|\xe9\xc7\xa4\x9e5Yq\xf5\x07\xe7\xaa\x9f\xf0__\xfa!'t\xcd\xd0m\xee\xd2\xbb\x1d\x05\xb9"
HEX HASH : 0x00687ce9c7a49e355971f507e7aa9ff05f5ffa212774cd7bd06deed2bb1d05b9
[SUCCESS]
Recipient : 0xc47133a6bD653793562A1Ea25Cb1D3161fBD99cd
Amount Proof : 509300000.0
TX HASH : 0x00687ce9c7a49e355971f507e7aa9ff05f5ffa212774cd7bd06deed2bb1d05b9
https://etherscan.io/tx/0x00687ce9c7a49e355971f507e7aa9ff05f5ffa212774cd7bd06deed2bb1d05b9
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x2DA440de83AaDC095ceFE48Ed7EE578CCe4f3627

[TX 2] Broadcasting...
BLOCK : 25344549
STATUS : 1
RAW HASH : b'\xe4\xe9T\x15,\xcf\xfa\xeb\xec\x9e\xca\xd0k@\xdc\xf0\xb4=\xb6\xfa\x94\x04\x87\xf3\xf2\xae\x89^D\x05 D'
HEX HASH : 0xe4e954152ccffaebec9ecad06b40dcf0b43db6fa940487f3f2ae895e44052044
[SUCCESS]
Recipient : 0x2DA440de83AaDC095ceFE48Ed7EE578CCe4f3627
Amount Proof : 74080000.0
TX HASH : 0xe4e954152ccffaebec9ecad06b40dcf0b43db6fa940487f3f2ae895e44052044
https://etherscan.io/tx/0xe4e954152ccffaebec9ecad06b40dcf0b43db6fa940487f3f2ae895e44052044
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x1887AdC36eaC34860addE1d05ad58C3449b8075F

[TX 3] Broadcasting...
BLOCK : 25344550
STATUS : 1
RAW HASH : b'\xc8\x1dF\x05\xc5h\x1d_\x12\x96\x9f\x1c8\xdf\xf2\xe2\xfekR\x16.f*\xdc\xfe\xfc\xe6\x8b\xa5xKH'
HEX HASH : 0xc81d4605c5681d5f12969f1c38dff2e2fe6b52162e662adcfefce68ba5784b48
[SUCCESS]
Recipient : 0x1887AdC36eaC34860addE1d05ad58C3449b8075F
Amount Proof : 111120000.0
TX HASH : 0xc81d4605c5681d5f12969f1c38dff2e2fe6b52162e662adcfefce68ba5784b48
https://etherscan.io/tx/0xc81d4605c5681d5f12969f1c38dff2e2fe6b52162e662adcfefce68ba5784b48
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xB5164B8d48d00525215230d138d7257964666f60

[TX 4] Broadcasting...
BLOCK : 25344551
STATUS : 1
RAW HASH : b'Kl\xc5\xa3$\xb7\xe6\xb4\x15\xadS\x90T\xbf\xf45r\x0f\xefL\xa8\x81\x00\xffV\x97\\l\xaf"\x95\xe4'
HEX HASH : 0x4b6cc5a324b7e6b415ad539054bff435720fef4ca88100ff56975c6caf2295e4
[SUCCESS]
Recipient : 0xB5164B8d48d00525215230d138d7257964666f60
Amount Proof : 69450000.0
TX HASH : 0x4b6cc5a324b7e6b415ad539054bff435720fef4ca88100ff56975c6caf2295e4
https://etherscan.io/tx/0x4b6cc5a324b7e6b415ad539054bff435720fef4ca88100ff56975c6caf2295e4
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0xe0d459c56B6317630f453A4DCAa60f6bd87189be

[TX 5] Broadcasting...
BLOCK : 25344552
STATUS : 1
RAW HASH : b'5\xfb?6 9\x07\x00\x8d\xb9\xdd\xc0\xd4\xf3\xaa\xad\xfeS\xa5\x96\xd3E\xfe\x97h\x0b\x007\xbc\r5'
HEX HASH : 0x35fb3f3620397d07008db9ddc0d4f3aaadfe53a596d345fe97680b0037bc0d35
[SUCCESS]
Recipient : 0xe0d459c56B6317630f453A4DCAa60f6bd87189be
Amount Proof : 115750000.0
TX HASH : 0x35fb3f3620397d07008db9ddc0d4f3aaadfe53a596d345fe97680b0037bc0d35
https://etherscan.io/tx/0x35fb3f3620397d07008db9ddc0d4f3aaadfe53a596d345fe97680b0037bc0d35
--------------------------------------------------

DEBUG
SENDER : 0xdAb702225FD964eD8C1FAd309ba375569A89F6cc
RECIPIENT : 0x670aC86Bd522fB0A6477051be895FAcBaCb1A94f

[TX 6] Broadcasting...
BLOCK : 25344553
STATUS : 1
RAW HASH : b'\x1e\x88\xaf\x89\xf2\xfe\x91.\x1dc\xa5\xaf\x11!\x03\x90\xe4\xe6NgT\x04@G\xec\x84j\x08\x9cFh'
HEX HASH : 0x1e88af89f2fe912e1d63a5af11210390e4e64e6754044047ec84296a089c4668
[SUCCESS]
Recipient : 0x670aC86Bd522fB0A6477051be895FAcBaCb1A94f
Amount Proof : 46300000.0
TX HASH : 0x1e88af89f2fe912e1d63a5af11210390e4e64e6754044047ec84296a089c4668
https://etherscan.io/tx/0x1e88af89f2fe912e1d63a5af11210390e4e64e6754044047ec84296a089c4668
--------------------------------------------------
======================================================================
ALL MAINNET BROADCASTS COMPLETE

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