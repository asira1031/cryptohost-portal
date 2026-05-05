"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

const ADMIN_EMAILS = [
  "jans103174@gmail.com",
  "robertryanp1407@gmail.com",
].map((e) => e.trim().toLowerCase());

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const loadDeposits = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setAuthorized(false);
        setError("Please log in first.");
        setDeposits([]);
        return;
      }

      const email = (user.email || "").trim().toLowerCase();
      setUserEmail(user.email || "");

      console.log("USER EMAIL:", email);
      console.log("ADMIN_EMAILS:", ADMIN_EMAILS);

      if (!ADMIN_EMAILS.includes(email)) {
        setAuthorized(false);
        setError("This account is not authorized to access the admin panel.");
        setDeposits([]);
        return;
      }

      setAuthorized(true);

      const res = await fetch("/api/admin/deposits", {
        method: "GET",
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to load deposits.");
      }

      const rows: Deposit[] = json.deposits || [];
      setDeposits(rows);

      const noteMap: Record<string, string> = {};
      rows.forEach((row) => {
        noteMap[row.id] = row.note || "";
      });
      setNotes(noteMap);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load admin deposits.");
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeposits();
  }, []);

  const updateStatus = async (id: string, status: "Pending" | "Credited" | "Rejected") => {
    try {
      setSavingId(id);
      setError("");
      setSuccess("");

      const res = await fetch("/api/admin/deposits", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          note: notes[id] || "",
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to update deposit.");
      }

      setSuccess(`Deposit updated to ${status}.`);
      await loadDeposits();
    } catch (err: any) {
      setError(err.message || "Failed to update deposit.");
    } finally {
      setSavingId("");
    }
  };

  const summary = useMemo(() => {
    const total = deposits.reduce((sum, d) => sum + Number(d.gross_amount || d.amount || 0), 0);
    const fees = deposits.reduce((sum, d) => sum + Number(d.fee_amount || 0), 0);
    const credited = deposits.filter((d) => d.status === "Credited").length;
    const pending = deposits.filter((d) => d.status === "Pending").length;
    const rejected = deposits.filter((d) => d.status === "Rejected").length;

    return { total, fees, credited, pending, rejected };
  }, [deposits]);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0e11", color: "#eaecef", padding: 24 }}>
      <div style={{ maxWidth: 1350, margin: "0 auto" }}>
        <h1>Admin Credit Panel</h1>
        <p>Logged in as: {userEmail || "Loading..."}</p>

        {!authorized && !loading && (
          <div style={{ color: "#ff4d4f", marginBottom: 20 }}>
            ❌ You are not authorized to access this admin panel.
          </div>
        )}

        {error && <div style={{ color: "#ff4d4f" }}>{error}</div>}
        {success && <div style={{ color: "#0ecb81" }}>{success}</div>}

        {authorized && (
          <>
            <button onClick={loadDeposits}>Refresh</button>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <tbody>
                  {deposits.map((d) => (
                    <tr key={d.id}>
                      <td>{d.user_id}</td>
                      <td>{d.status}</td>
                      <td>
                        <button onClick={() => updateStatus(d.id, "Credited")}>Credit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}