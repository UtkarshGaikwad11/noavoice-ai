"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
   {/* TOP WHITE HEADER (like screenshot) */}
   <SidebarHeader className="bg-white px-4 py-4">
    <div className="flex items-center gap-3">
     {/* Hamburger / collapse */}
     <SidebarTrigger className="h-9 w-9 rounded-xl hover:bg-muted" />

     {/* Brand (NoaVoice) */}
     <Link href="/dashboard" className="flex items-center gap-3">
      {/* Logo */}
      <div className="relative">
       <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4e1c85] text-white font-semibold shadow-sm">
        AI
       </div>
       {/* small green dot */}
       <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
      </div>

      {/* Brand text hides when collapsed */}
      <div
       className={
        "min-w-0 transition-all " +
        (state === "collapsed" ? "w-0 opacity-0" : "w-auto opacity-100")
       }
      >
       <div className="truncate text-base font-semibold text-[#2b1246]">
        NoaVoice AI
       </div>
       <div className="truncate text-xs text-muted-foreground">
        AI-Powered Platform
       </div>
      </div>
     </Link>
    </div>
   </SidebarHeader>

   {/* DARK PURPLE ROUNDED BODY */}
   <div className="px-3 pb-3">
    <div className="h-full min-h-[calc(100vh-92px)] rounded-[22px] bg-[#1b0b2e] px-3 py-4 shadow-sm">
     <SidebarContent className="bg-transparent">
      <SidebarGroup>
       <SidebarGroupContent>
        <SidebarMenu className="gap-2">
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

     <SidebarFooter className="bg-transparent p-0">
      <Button
       variant="ghost"
       className="h-12 w-full justify-start gap-3 rounded-2xl px-4 text-white/90 hover:text-white hover:bg-white/10"
      >
       <LogOut className="h-5 w-5" />
       <span className="font-medium">Logout</span>
      </Button>
     </SidebarFooter>
    </div>
   </div>

   {/* Rail */}
   {/* <SidebarRail className="bg-transparent" /> */}
  </Sidebar>
 );
}
