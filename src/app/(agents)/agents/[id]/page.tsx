"use client";

import { use } from "react"; // 👈 IMPORTANT
import { useState } from "react";

import AgentConfigSidebar from "@/components/agents/agent-config-sidebar";
import ConfigureTab from "@/components/agents/tabs/configure-tab";
import PromptTab from "@/components/agents/tabs/PromptTab";
import PhoneTab from "@/components/agents/tabs/PhoneTab";
import KnowledgeTab from "@/components/agents/tabs/KnowledgeTab";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params
  const { id } = use(params);

  const [activeTab, setActiveTab] = useState("configure");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* SIDEBAR */}
      <AgentConfigSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {activeTab === "configure" && <ConfigureTab id={id} />}
        {activeTab === "prompt" && <PromptTab />}
        {activeTab === "phone" && <PhoneTab />}
         {activeTab === "knowledge" && <KnowledgeTab />}
      </div>
    </div>
  );
}