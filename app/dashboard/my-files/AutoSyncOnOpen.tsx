"use client";

import { useEffect, useRef } from "react";

export default function AutoSyncOnOpen() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      try {
        await fetch("/api/sftp/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        window.location.reload();
      } catch (error) {
        console.error("Auto SFTP sync failed:", error);
      }
    };

    run();
  }, []);

  return null;
}