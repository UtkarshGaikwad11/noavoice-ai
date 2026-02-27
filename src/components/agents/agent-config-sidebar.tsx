"use client";

import { cn } from "@/lib/utils";
import {
  Settings,
  MessageSquare,
  Phone,
  Server,
  Zap,
  BookOpen,
} from "lucide-react";

const MENU = [
  { key: "configure", title: "Configure", icon: Settings },
  { key: "prompt", title: "Prompt", icon: MessageSquare },
  { key: "phone", title: "Phone Number", icon: Phone },
  { key: "providers", title: "Providers", icon: Server },
  { key: "actions", title: "Actions", icon: Zap },
  { key: "knowledge", title: "Knowledge Base", icon: BookOpen },
];

export default function AgentConfigSidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (val: string) => void;
}) {
  return (
    <div className="w-[280px] h-screen py-3 bg-gray-100">
      <div className="h-full rounded-[22px] border bg-white shadow-sm flex flex-col">
        
        <div className="px-5 pt-5 border-b pb-4" >
          <h2 className="text-xl font-semibold text-gray-900">
            Test12
          </h2>
          <p className="text-sm text-gray-500">
            Complete all steps to create your assistant
          </p>
        </div>

        <div className="flex-1 px-2 py-4 space-y-2">
          {MENU.map((item) => {
            const isActive = activeTab === item.key;
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-2xl px-3 py-3",
                  isActive ? "bg-purple-100" : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    isActive
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="text-sm font-medium ">{item.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}