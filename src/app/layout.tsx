"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/App-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <TooltipProvider delayDuration={0}>
          {isLoginPage ? (
            children
          ) : (
            <SidebarProvider defaultOpen={true}>
              <div className="flex w-full">
                <AppSidebar />
                <SidebarInset className="flex-1">
                  {children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          )}
        </TooltipProvider>
      </body>
    </html>
  );
}