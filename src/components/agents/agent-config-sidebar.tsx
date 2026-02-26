"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Settings,
  MessageSquare,
  Phone,
  Server,
  Zap,
  BookOpen,
} from "lucide-react"

const MENU = [
  {
    title: "Configure",
    description: "Basic setup & voice settings",
    href: "",
    icon: Settings,
  },
  {
    title: "Prompt",
    description: "Define behavior & responses",
    href: "prompt",
    icon: MessageSquare,
  },
  {
    title: "Phone Number",
    description: "Configure phone settings",
    href: "phone",
    icon: Phone,
  },
  {
    title: "Providers",
    description: "Select AI & voice providers",
    href: "providers",
    icon: Server,
  },
  {
    title: "Actions",
    description: "Set up automated tasks",
    href: "actions",
    icon: Zap,
  },
  {
    title: "Knowledge Base",
    description: "Configure knowledge base",
    href: "knowledge",
    icon: BookOpen,
  },
]

export default function AgentConfigSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-[280px] min-h-svh border-r bg-purple-50 ">
      
      {/* Header */}
      <div className="border-b">
      <div className="px-6 pt-6 pb-5">
        <h2 className="text-2xl font-semibold">test12</h2>
        <p className="text-sm text-muted-foreground mt-1 ">
          Complete all steps to create your assistant
        </p>
      </div>
      </div>

      {/* Menu */}
      <div className="mt-6 px-3 py-4 space-y-2">
        {MENU.map((item) => {
          const fullHref = `/agents/1/${item.href}`
          const isActive =
            pathname === fullHref ||
            pathname?.startsWith(fullHref + "/")

          const Icon = item.icon

          return (
            <Link
              key={item.title}
              href={fullHref}
              className={cn(
                "flex items-start gap-4 rounded-2xl p tx-3 py-3 ransition-all",
                isActive
                  ? "bg-purple-100"
                  : "hover:bg-gray-100"
              )}
            >
              {/* Icon Box */}
              <div
                className={cn(
                  "flex h-10 w-10 border-b items-center justify-center rounded-2xl",
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-500"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div>
                <p
                  className={cn(
                    "text-md font-medium",
                    isActive
                      ? "text-purple-700"
                      : "text-gray-900"
                  )}
                >
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}