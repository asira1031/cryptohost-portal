"use client";

import Link from "next/link";

export default function SubscriptionLimitPage() {
  return (
    <div className="min-h-screen bg-[#03111c] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center border border-amber-500/30 bg-amber-500/10 rounded-3xl p-10">
        <p className="text-xs tracking-[0.3em] text-amber-300 uppercase">
          Access Restricted
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-amber-200">
          Subscription Limit
        </h1>

        <p className="mt-4 text-white/80 leading-7">
          Please upgrade or complete payment to unlock this report.
        </p>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}