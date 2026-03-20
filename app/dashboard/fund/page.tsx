"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";

type Deposit = {
  id: string;
  amount: number;
  currency: string;
  network: string;
  tx_hash: string | null;
  status: string;
  wallet_address: string | null;
  created_at: string;
};

export default function FundPage() {
  const supabase = createClient();

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDeposits() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (!session?.user) {
          setError("No logged in user");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("deposits")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setDeposits(data || []);
        }
      } catch (err) {
        setError("Failed to load deposits");
      } finally {
        setLoading(false);
      }
    }

    loadDeposits();
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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
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