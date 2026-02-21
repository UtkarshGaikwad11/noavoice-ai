"use client";

import * as React from "react";
import type { Agent } from "@/components/agents/agents-page";

import { cn } from "@/lib/utils";
import { Phone, Settings } from "lucide-react";

function StatusPill({ status }: { status: Agent["status"] }) {
  const active = status === "active";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
        active
          ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
          : "bg-gray-100 text-gray-400 ring-1 ring-gray-200"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-emerald-500" : "bg-gray-300"
        )}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function AgentCardGrid({ agent }: { agent: Agent }) {
  return (
    <div className="transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-[15px] font-bold leading-tight text-gray-900">
                {agent.name}
              </h3>
              <StatusPill status={agent.status} />
            </div>
            <p className="mt-1 truncate text-[12px] text-gray-400">
              {agent.project}
            </p>
          </div>

          {/* Call button */}
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 transition-colors duration-150 hover:bg-emerald-100"
            aria-label="Call agent"
          >
            <Phone className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gray-100" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 px-3 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              Calls
            </p>
            <p className="mt-1 text-lg font-bold leading-none text-gray-800">
              {agent.calls}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              Avg Time
            </p>
            <p className="mt-1 text-lg font-bold leading-none text-gray-800">
              {agent.avgTime}
            </p>
          </div>
        </div>

        {/* Voice + Manage */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              Voice
            </p>
            <p className="mt-0.5 truncate text-[13px] font-semibold text-gray-700">
              {agent.voice}
            </p>
          </div>

          {/* <button className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#4e1c85]/30 bg-[#4e1c85]/5 px-4 text-[12px] font-semibold text-[#4e1c85] transition-all duration-150 hover:bg-[#4e1c85]/10 hover:border-[#4e1c85]/50">
            <Settings className="h-3.5 w-3.5" />
            Manage
          </button> */}
        </div>
      </div>
    </div>
  );
}