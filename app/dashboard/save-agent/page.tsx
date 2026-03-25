"use client";

import { useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SaveAgentPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const saveAgent = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const agentCode = localStorage.getItem("agent_code");

      if (!agentCode) {
        router.push("/dashboard");
        return;
      }

      // 🔥 FIX: match by email instead of id
      await supabase
        .from("clients")
        .update({
          agent_code: agentCode,
        })
        .eq("email", user.email); // ✅ THIS IS THE FIX

      router.push("/dashboard");
    };

    saveAgent();
  }, []);

  return <div style={{ padding: 24 }}>Saving agent...</div>;
}