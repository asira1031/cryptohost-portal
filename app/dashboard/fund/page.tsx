"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

type Deposit = {
  id: string;
  user_id: string;
  wallet_address: string | null;
  tx_hash: string | null;
  network: string | null;
  asset: string | null;
  gross_amount: number | null;
  fee_percent: number | null;
  fee_amount: number | null;
  net_amount: number | null;
  status: string;
  note: string | null;
  created_at: string;
  amount?: number | null;
};

export default function FundPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [walletAddress] = useState("0xc47133a6bd653793562a1ea25cb1d3161fbd99cd");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [manualAmount, setManualAmount] = useState("1000");

  const loadDeposits = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("You must be logged in to view deposits.");
      setDeposits([]);
      setLoading(false);
      return;
    }

    setUserId(user.id);
    setUserEmail(user.email || "");

    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setDeposits([]);
    } else {
      setDeposits((data || []) as Deposit[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDeposits();
  }, []);

  const handleCopyWallet = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleManualDeposit = async () => {
    setError("");
    setSuccess("");

    const amount = Number(manualAmount);
    if (!userId || amount <= 0) return;

    setSubmitting(true);

    const fee = Number((amount * 0.03).toFixed(2));
    const net = Number((amount - fee).toFixed(2));

    await supabase.from("deposits").insert([
      {
        user_id: userId,
        amount,
        wallet_address: walletAddress,
        tx_hash: `MANUAL-${Date.now()}`,
        network: "BEP20",
        asset: "USDT",
        gross_amount: amount,
        fee_percent: 3,
        fee_amount: fee,
        net_amount: net,
        status: "Pending",
        note: "Manual deposit",
      },
    ]);

    setSuccess("Deposit added!");
    await loadDeposits();
    setSubmitting(false);
  };

  const totals = useMemo(() => {
    const gross = deposits.reduce((s, d) => s + Number(d.gross_amount || 0), 0);
    const fees = deposits.reduce((s, d) => s + Number(d.fee_amount || 0), 0);
    const net = deposits.reduce((s, d) => s + Number(d.net_amount || 0), 0);
    return { gross, fees, net };
  }, [deposits]);

  return (
    <div style={{ padding: 24, background: "#0b0e11", color: "white" }}>
      
      {/* ✅ VERSION MARKER */}
      <div style={{ color: "red", fontWeight: 800 }}>
        NEW VERSION TEST
      </div>

      <h1>Deposit USDT</h1>
      <p>Logged in as: {userEmail || "Loading..."}</p>

      <button onClick={handleManualDeposit}>
        Add Test Deposit
      </button>

      <p>Total: {totals.gross} USDT</p>
    </div>
  );
}