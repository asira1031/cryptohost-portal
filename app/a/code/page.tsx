"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const validAgentCodes = [
  "ERICKA108",
  "KENSG214",
  "KENTH337",
  "MKK452",
  "TJ1134",
];

export default function AgentCodePage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const code = params?.code as string | undefined;
    if (!code) {
      router.replace("/register");
      return;
    }

    const normalizedCode = code.toUpperCase();

    if (!validAgentCodes.includes(normalizedCode)) {
      localStorage.removeItem("agent_code");
      router.replace("/register");
      return;
    }

    localStorage.setItem("agent_code", normalizedCode);
    router.replace("/register");
  }, [params, router]);

  return (
    <div style={{ padding: 24 }}>
      Redirecting securely...
    </div>
  );
}