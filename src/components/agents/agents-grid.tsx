"use client";

import * as React from "react";
import type { Agent } from "@/components/agents/agents-page";

import { AgentCardGrid } from "@/components/agents/agent-card-grid";

export function AgentsGrid({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {agents.map((a) => (
        <AgentCardGrid key={a.id} agent={a} />
      ))}
    </div>
  );
}