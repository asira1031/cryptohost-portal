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

      // 🔥 update client with agent_code
      await supabase
        .from("clients")
        .update({
          agent_code: agentCode,
        })
        .eq("id", user.id);

      router.push("/dashboard");
    };

    saveAgent();
  }, []);

  return <div style={{ padding: 24 }}>Saving agent...</div>;
}