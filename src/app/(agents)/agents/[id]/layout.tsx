"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import AgentConfigSidebar from "@/components/agents/agent-config-sidebar";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);

    return () => {
      setOpen(true);
    };
  }, [setOpen]);

  return (
    <div className="flex w-full">
      <AgentConfigSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}