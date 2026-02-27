"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    return () => setOpen(true);
  }, [setOpen]);

  return (
    <div className="h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}