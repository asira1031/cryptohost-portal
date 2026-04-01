"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#07152c] text-white p-6 border-r border-white/10">
      <h1 className="text-3xl font-bold mb-1">CryptoHost</h1>
      <p className="text-white/60 mb-8">Secure Client Portal</p>

      <nav className="flex flex-col gap-4 text-lg">
        <Link href="/dashboard" className="hover:text-yellow-400">
          Dashboard
        </Link>
        <Link href="/upload" className="hover:text-yellow-400">
          SFTP / Server Access
        </Link>
        <Link href="/reports/CH-2026-LIVE" className="hover:text-yellow-400">
          View Result
        </Link>
      </nav>
    </div>
  );
}