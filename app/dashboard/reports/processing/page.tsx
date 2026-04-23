"use client";

export default function ProcessingPage() {
  return (
    <div className="min-h-screen bg-[#03111c] text-white flex items-center justify-center">
      <div className="text-center border border-cyan-500/20 bg-[#041826] p-10 rounded-3xl">
        <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase">
          Validation System
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-white">
          Processing
        </h1>

        <p className="mt-4 text-white/70">
          Your file is currently being processed.
        </p>

        <p className="mt-2 text-white/50 text-sm">
          Please wait while validation is completed and report is prepared.
        </p>

        <div className="mt-6 animate-pulse text-cyan-400">
          ● ● ●
        </div>
      </div>
    </div>
  );
}