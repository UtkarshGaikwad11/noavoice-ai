"use client";

import * as React from "react";
import { Bot, LayoutGrid, List, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { AgentsGrid } from "@/components/agents/agents-grid";
import { AgentsList } from "@/components/agents/agents-list";
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog";

// ---- Demo data (replace with API later)

export type Agent = {
 id: string;
 name: string;
 project: string;
 status: "active" | "inactive";
 calls: number;
 avgTime: number;
 voice: string;
};

const AGENTS: Agent[] = [
 {
  id: "1",
  name: "Test Agent 2026",
  project: "Dental_clinic",
  status: "active",
  calls: 0,
  avgTime: 0,
  voice: "Alice - Clear, Engaging Educator",
 },
 {
  id: "2",
  name: "Test-Agent",
  project: "Voice_agent",
  status: "active",
  calls: 1,
  avgTime: 0,
  voice: "Alice - Clear, Engaging Educator",
 },
 {
  id: "3",
  name: "Noa Test Agent",
  project: "Noavoice Information",
  status: "active",
  calls: 1,
  avgTime: 0,
  voice: "Alice - Clear, Engaging Educator",
 },
//  {
//   id: "4",
//   name: "Noa Test Agent",
//   project: "Noavoice Information",
//   status: "active",
//   calls: 0,
//   avgTime: 0,
//   voice: "Alice - Clear, Engaging Educator",
//  },
//  {
//   id: "5",
//   name: "Healthcare",
//   project: "Clinic",
//   status: "active",
//   calls: 0,
//   avgTime: 0,
//   voice: "Alice - Clear, Engaging Educator",
//  },
//  {
//   id: "6",
//   name: "Dyme Assistant",
//   project: "Dyme",
//   status: "active",
//   calls: 0,
//   avgTime: 0,
//   voice: "Alice - Clear, Engaging Educator",
//  },
//  {
//   id: "7",
//   name: "Noa Voice",
//   project: "Noavoice",
//   status: "active",
//   calls: 0,
//   avgTime: 0,
//   voice: "Alice - Clear, Engaging Educator",
//  },
];

export default function AgentsPage() {
 const [view, setView] = React.useState<"grid" | "list">("grid");
 const [query, setQuery] = React.useState("");
 const [openCreate, setOpenCreate] = React.useState(false);

 const filtered = React.useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return AGENTS;
  return AGENTS.filter(
   (a) =>
    a.name.toLowerCase().includes(q) ||
    a.project.toLowerCase().includes(q) ||
    a.voice.toLowerCase().includes(q)
  );
 }, [query]);

 return (
  <div className="w-full p-5">
   {/* Page header */}
   <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="flex items-start gap-4">
     <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4e1c85] text-white shadow-sm">
      <Bot className="h-7 w-7" />
     </div>

     <div>
      <h1 className="text-3xl font-bold tracking-tight text-[#4e1c85]">
       AI Agents
      </h1>
      <p className="text-muted-foreground">
       Manage and monitor your AI assistants
      </p>
     </div>
    </div>

    <Button
     className="h-11 rounded-xl text-white bg-[#4e1c85] px-5 hover:bg-[#3b215e]"
     onClick={() => setOpenCreate(true)}
    >
     <Plus className="mr-2 h-5 w-5" />
     Create Agent
    </Button>

   </div>

   {/* Search + view toggle */}
   <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="w-full sm:max-w-xl">
     <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search agents..."
      className="h-12 rounded-2xl bg-muted/40"
     />
    </div>

    <div className="flex items-center gap-2">
     <Button
      type="button"
      variant={view === "grid" ? "default" : "outline"}
      className={
       "h-11 w-12 rounded-xl px-0 " +
       (view === "grid"
        ? "bg-[#4e1c85] hover:bg-[#3b215e] text-gray-300"
        : "border-gray-400")
      }
      onClick={() => setView("grid")}
     >
      <LayoutGrid className="h-5 w-5" />
     </Button>

     <Button
      type="button"
      variant={view === "list" ? "default" : "outline"}
      className={
       "h-11 w-12 rounded-xl px-0 " +
       (view === "list"
        ? "bg-[#4e1c85] hover:bg-[#3b215e] text-gray-300"
        : "border-gray-400 ")
      }
      onClick={() => setView("list")}
     >
      <List className="h-5 w-5" />
     </Button>
    </div>
   </div>

   {/* Count */}
   <div className="mt-6 text-sm text-muted-foreground">
    <span className="font-medium text-foreground">
     {filtered.length}
    </span>{" "}
    of {AGENTS.length} agents
   </div>

   {/* Content */}
   <div className="mt-6">
    {view === "grid" ? (
     <AgentsGrid agents={filtered} />
    ) : (
     <AgentsList agents={filtered} />
    )}
   </div>

   {/* small theme hint */}
   <div className="mt-10 hidden">
    <Badge className="bg-[#4e1c85]">theme</Badge>
   </div>

   <CreateAgentDialog open={openCreate} onOpenChange={setOpenCreate} />

  </div>


 );

}






