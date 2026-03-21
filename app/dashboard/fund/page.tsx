"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Deposit = {
  id: string;
  amount: string | number;
  currency: string;
  network: string;
  status: string;
  tx_hash?: string | null;
  created_at: string;
};

export default function FundPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(url, key);
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadDeposits() {
      try {
        setLoading(true);
        setError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          if (mounted) {
            setDeposits([]);
            setError("Please log in to view your deposits.");
          }
          return;
        }

        const { data, error: depositsError } = await supabase
          .from("deposits")
          .select("id, amount, currency, network, status, tx_hash, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (depositsError) {
          throw depositsError;
        }

        if (mounted) {
          setDeposits((data as Deposit[]) ?? []);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.message || "Failed to load deposits.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDeposits();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Deposit USDT</h1>

      {loading && <p>Loading deposits...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && deposits.length === 0 && (
        <p>No deposits found yet.</p>
      )}

      {!loading && !error && deposits.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 10 }}>Amount</th>
                <th style={{ textAlign: "left", padding: 10 }}>Currency</th>
                <th style={{ textAlign: "left", padding: 10 }}>Network</th>
                <th style={{ textAlign: "left", padding: 10 }}>Status</th>
                <th style={{ textAlign: "left", padding: 10 }}>TX Hash</th>
                <th style={{ textAlign: "left", padding: 10 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td style={{ padding: 10 }}>{deposit.amount}</td>
                  <td style={{ padding: 10 }}>{deposit.currency}</td>
                  <td style={{ padding: 10 }}>{deposit.network}</td>
                  <td style={{ padding: 10 }}>{deposit.status}</td>
                  <td style={{ padding: 10 }}>{deposit.tx_hash || "-"}</td>
                  <td style={{ padding: 10 }}>
                    {new Date(deposit.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}