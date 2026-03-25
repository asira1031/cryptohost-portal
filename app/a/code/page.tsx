"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AgentCodePage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const code = params?.code as string | undefined;
    if (!code) return;

    localStorage.setItem("agent_code", code);
    router.replace("/register");
  }, [params, router]);

  return <div style={{ padding: 24 }}>Redirecting...</div>;
}