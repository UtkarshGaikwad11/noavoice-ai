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
    <div className="w-[280px] min-h-svh border-r bg-white p-4">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">test12</h2>
        <p className="text-sm text-muted-foreground">
          Complete all steps to create your assistant
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-3">
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
                "flex items-start gap-4 rounded-2xl p-4 transition-all",
                isActive
                  ? "bg-purple-100"
                  : "hover:bg-gray-100"
              )}
            >
              {/* Icon Box */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
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