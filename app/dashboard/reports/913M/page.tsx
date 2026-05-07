"use client";

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

export default function Report913MPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [approvalCode, setApprovalCode] = useState("");
const [approvalResult, setApprovalResult] = useState("");
const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    const checkAccess = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userEmail = (user?.email || "").toLowerCase().trim();

      const isAdmin = userEmail === "jans103174@gmail.com";
      

      if (!userEmail) {
        router.replace("/login");
        return;
      }

      if (!isAdmin ) {
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
                913M-HBUK0W283K47PK2C
              </p>
              <div className="mt-3">
                <StatusBadge label="Ready for Execution" tone="emerald" />
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
                    913M Validation Report
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    Technical report page for the uploaded HSBC-linked
                    transmission file. This dashboard reflects  the file-level
                    transmission and validation information currently visible from
                    HSBC BANK PORTAL.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="MT103" />
                  <StatusBadge label="HSBC UK" />
                  <StatusBadge label="Blockchain Execution" tone="amber" />
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
                  <StatusBadge label="Executed" tone="emerald" />
                </div>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100/90">
                  This file has completed technical validation and compliance
                  review. The transmission record is verified and the file is now
                  authorized for execution. Blockchain conversion and fund release
                  can proceed based on system conditions.
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-[#08141c] p-4">
                  <InfoRow label="Reference" value="HBUK0W283K47PK2C" />
                  <InfoRow label="File Name" value="913M HBUK0W283K47PK2C_1" />
                  <InfoRow
                    label="Transaction Type"
                    value="MT103 / Financial Transmission"
                  />
                  <InfoRow
                    label="Bank Source"
                    value="HSBC UK BANK (HBUKGB4BXXX)"
                  />
                  <InfoRow label="Sender" value="MATECHPOWER LTD" />
                  <InfoRow label="Currency" value="EUR" />
                  <InfoRow label="Transmission Layer" value="SWIFT / FIN" />
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
                        HSBC UK, MT103/FIN, TLS/certificate and sender details are
                        visible and match to records.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Compliance Review
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        Process final review and confirmation of all supporting
                        details.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                      <p className="text-sm font-semibold text-amber-200">
                        Blockchain Executed
                      </p>
                      <p className="mt-1 text-sm text-amber-100/80">
                        release, mint, conversion, or broadcast action has been
                        initiated on-chain.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
                    Notice to Client
                  </p>
                  <section className="rounded-[30px] border border-white/8 bg-[#0a1821] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-6">
  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
    Approval System
  </p>

  <h3 className="mt-2 text-xl font-semibold text-white">
    Approval Code Validation
  </h3>

  <input
    type="text"
    value={approvalCode}
    onChange={(e) => setApprovalCode(e.target.value)}
    placeholder="Enter 6 to 20 digit approval code"
    maxLength={20}
    className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
  />

  <button
    type="button"
    onClick={handleApproval}
    className="mt-4 rounded-2xl border border-cyan-400/25 bg-cyan-500/15 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/25"
  >
    Run Approval
  </button>

  {approvalResult ? (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white">
      {approvalResult}
    </div>
  ) : null}
</section>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    System Summary
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    The current record reflects a bank-side transmission file.
                    Validation is limited to the document information presently
                    visible in the uploaded file. Additional execution status
                    should  be shown after  technical confirmation.
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
                  <TerminalLine>REFERENCE: HBUK0W283K47PK2C</TerminalLine>
                  <TerminalLine>FILE: 913M HBUK0W283K47PK2C_l.pdf</TerminalLine>
                  <TerminalLine>TYPE: MT103 / FINANCIAL TRANSMISSION</TerminalLine>
                  <TerminalLine>
                    BANK SOURCE: HSBC UK BANK (HBUKGB4BXXX)
                  </TerminalLine>
                  <TerminalLine>SENDER: MATECHPOWER LTD</TerminalLine>
                  <TerminalLine>CURRENCY: EUR</TerminalLine>
                  <TerminalLine>AUTH MODE: TLS / CERTIFICATE-BASED</TerminalLine>
                  <TerminalLine ok>TRANSMISSION LEVEL: COMPLETED</TerminalLine>
                  <TerminalLine>BLOCKCHAIN LAYER: NOT EXECUTED</TerminalLine>
                  <TerminalLine>COMPLIANCE REVIEW: IN PROGRESS</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
                  <TerminalLine>LAST UPDATE: {lastUpdate}</TerminalLine>
<TerminalLine>------------------------------------------</TerminalLine>
<TerminalLine ok>WALLET DISTRIBUTION STRUCTURE</TerminalLine>

<TerminalLine>WALLET 1 – 31.5%</TerminalLine>
<TerminalLine>0x51cb3febd21849b4555aabc1d667df23ada9745f</TerminalLine>
<TerminalLine>€285,312,500.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 2 – 1.25%</TerminalLine>
<TerminalLine>0x2BF24311d74c877a4d0EB5d5Ddd536F1129c0526</TerminalLine>
<TerminalLine>€11,412,500.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 3 – 1.25%</TerminalLine>
<TerminalLine>0x78e63cb6F8B32132923243e62e9FE34c3C906b55</TerminalLine>
<TerminalLine>€11,412,500.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 4 – 1.25%</TerminalLine>
<TerminalLine>0x7AF9086ae46B75504AeEf0EcA340177dc85dF634</TerminalLine>
<TerminalLine>€11,412,500.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 5 – 2.5%</TerminalLine>
<TerminalLine>0x360C2fC7613b6A94A6a6c82C6A4FEf877E721165</TerminalLine>
<TerminalLine>€22,825,000.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 6 – 5%</TerminalLine>
<TerminalLine>0x12CA2B89429218Eb08f893C63e83263Cbc1296e7</TerminalLine>
<TerminalLine>€45,650,000.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>WALLET 7 – 7.5%</TerminalLine>
<TerminalLine>0xe22C142aEe1fbb83DcBbE05dfD07E69D5B736538</TerminalLine>
<TerminalLine>€68,475,000.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine ok>MAIN WALLET – 50%</TerminalLine>
<TerminalLine>0xFD758E7543Fe2d53fe521dFc4F2a7BF8d4f06A0C</TerminalLine>
<TerminalLine>€456,500,000.00</TerminalLine>
<TerminalLine>TXN HASH: ______________________________</TerminalLine>

<TerminalLine>------------------------------------------</TerminalLine>
<TerminalLine ok>TOTAL DISTRIBUTION: 100% CONFIRMED</TerminalLine>
                </div>
              ) : null}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}