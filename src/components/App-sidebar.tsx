"use client";

import { useRouter } from "next/navigation"
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutConfirm } from "@/components/logout-confirm"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Home,
  PhoneCall,
  Bot,
  Megaphone,
  Phone,
  Server,
  Wrench,
  BookOpen,
  Plug,
  Zap,
  LogOut,
} from "lucide-react";

// ------------------------------------------------------
// Menu config (DO NOT change names)
// ------------------------------------------------------

const MENU_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Call Logs", href: "/call-logs", icon: PhoneCall },
  { title: "Agents", href: "/agents", icon: Bot },
  { title: "Campaign", href: "/campaign", icon: Megaphone },
  { title: "Phone Numbers", href: "/phone-numbers", icon: Phone },
  { title: "Providers", href: "/providers", icon: Server },
  { title: "Services", href: "/services", icon: Wrench },
  { title: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { title: "Integrations", href: "/integrations", icon: Plug },
  { title: "Actions", href: "/actions", icon: Zap },
] as const;

// ------------------------------------------------------
// Sidebar (EXACT like your Plannr SS)
// - White top header
// - Left hamburger trigger
// - Dark purple body
// - Rounded big container
// - Active pill highlight
// - Collapsible icon mode
// ------------------------------------------------------

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar(); // "expanded" | "collapsed"



  return (
    <Sidebar
      collapsible="icon"
      className=" bg-transparent"
      style={
        {
          "--sidebar-width": "280px",
          "--sidebar-width-icon": "80px",
        } as React.CSSProperties
      }
    >
      {/* TOP WHITE HEADER */}
      <SidebarHeader
        className={`py-4 ${state === "collapsed"
          ? "px-0 flex items-center justify-center"
          : "px-4"
          }`}
      >
        <div
          className={`flex ${state === "collapsed"
            ? "flex-col items-center gap-3"
            : "items-center justify-between gap-4"
            }`}
        >
          {/* TOP trigger in collapsed */}
          {state === "collapsed" && (
            <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-muted" />
          )}

          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4e1c85] text-white font-semibold shadow-sm">
                AI
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>

            <div
              className={
                "min-w-0 transition-all " +
                (state === "collapsed" ? "w-0 opacity-0" : "w-auto opacity-100")
              }
            >
              <div className="truncate text-base font-bold text-[#2b1246]">
                NoaVoice AI
              </div>
              <div className="truncate text-xs text-muted-foreground">
                AI-Powered Platform
              </div>
            </div>
          </Link>

          {/* Right-side trigger in expanded */}
          {state !== "collapsed" && (
            <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-muted justify-center items-center" />
          )}
        </div>
      </SidebarHeader>

      {/* DARK PURPLE ROUNDED BODY */}
      <div className="px-3 pb-3 h-full flex flex-col">
        <div className="flex flex-col h-full rounded-[22px] bg-[#1b0b2e] px-3 py-4 shadow-sm">          <SidebarContent className="bg-transparent flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={
                          "h-12 rounded-2xl px-4 text-white/90 hover:text-white hover:bg-white/10 " +
                          "data-[active=true]:bg-[#3b215e] data-[active=true]:text-white"
                        }
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3"
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-[15px] font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

          <Separator className="my-4 bg-white/10" />

          <SidebarFooter className="bg-transparent p-0 mt-auto">
  <LogoutConfirm collapsed={state === "collapsed"} />
</SidebarFooter>
        </div>
      </div>

      {/* Rail */}
      {/* <SidebarRail className="bg-transparent" /> */}
    </Sidebar>
    
  );
}
