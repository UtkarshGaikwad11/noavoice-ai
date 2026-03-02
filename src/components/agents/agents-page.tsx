"use client";

import * as React from "react";
import { Bot, LayoutGrid, List, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { AgentsGrid } from "@/components/agents/agents-grid";
import { AgentsList } from "@/components/agents/agents-list";
import { CreateAgentDialog } from "@/components/agents/create-agent-dialog";
import { getAgentsApi } from "@/network/Api";

// ---- Demo data (replace with API later)

export type Agent = {
  id: string;
  name: string;
  description?: string;
  project?: string;
  status?: "active" | "inactive";
  calls?: number;
  avgTime?: number;
  voice?: string;
};


export default function AgentsPage() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [query, setQuery] = React.useState("");
  const [openCreate, setOpenCreate] = React.useState(false);
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agents;

    return agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.description || "").toLowerCase().includes(q)
    );
  }, [query, agents]);

  const fetchAgents = async () => {
    try {
      setLoading(true);

      const res = await getAgentsApi();

      console.log("API RESPONSE:", res); // already array

      if (res?.data?.assistants) {
        const formatted = res.data.assistants.map((a: any) => ({
          id: a.id,
          name: a.name,
          description: a.description,
        }));

        console.log("FORMATTED:", formatted);

        setAgents(formatted);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  // if (loading) {
  //   return <div className="p-5">Loading agents...</div>;
  // }

  return (
    <div className="w-full p-5 bg-gray-100 min-h-screen">
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
          {filtered.length} of {agents.length} agents
        </span>{" "}

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

      <CreateAgentDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSuccess={fetchAgents}
      />
    </div>


  );

}






