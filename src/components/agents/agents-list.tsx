"use client";

import * as React from "react";
import type { Agent } from "@/components/agents/agents-page";

import { AgentCardList } from "@/components/agents/agent-card-list";

export function AgentsList({ agents }: { agents: Agent[] }) {
  return (
    <div className="flex flex-col gap-6">
      {agents.map((a) => (
        <AgentCardList key={a.id} agent={a} />
      ))}
    </div>
  );
}