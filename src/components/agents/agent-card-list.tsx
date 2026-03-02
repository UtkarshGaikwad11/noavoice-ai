"use client";

import * as React from "react";
import type { Agent } from "@/components/agents/agents-page";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Bot,
  Phone,
  Settings,
  Activity,
  Timer,
  Volume2,
} from "lucide-react";

function StatusPill({ status }: { status: Agent["status"] }) {
  const active = status === "active";
  return (
    <Badge
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-500 text-white hover:bg-emerald-500"
          : "bg-muted text-foreground"
      )}
    >
      <Activity className="mr-1 h-3.5 w-3.5" />
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}

export function AgentCardList({ agent }: { agent: Agent }) {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* left */}
        <div className="flex items-start gap-5">
          <div className="relative">
            {/* <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
              <Bot className="h-7 w-7" />
            </div> */}
            {/* <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
              <Activity className="h-3 w-3 text-white" />
            </span> */}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold leading-tight">
                {agent.name}
              </h3>
              <StatusPill status={agent.status} />
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              {agent.project}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                {agent.calls} calls
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-emerald-600" />
                {agent.avgTime} avg time
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <Volume2 className="h-4 w-4 text-violet-600" />
                <span className="truncate">{agent.voice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          <Button
            variant="outline"
            className="h-12 w-12 rounded-full border-emerald-500/60 px-0 text-emerald-600 hover:bg-emerald-50"
          >
            <Phone className="h-5 w-5" />
          </Button>

          {/* <Button
            variant="outline"
            className="h-12 rounded-full border-emerald-500/60 px-5 text-emerald-700 hover:bg-emerald-50"
          >
            <Settings className="mr-2 h-4 w-4" />
            Manage
          </Button> */}
        </div>
      </div>
    </Card>
  );
}