"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/App-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

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
              <div className="flex w-full bg-gray-100">
                <AppSidebar />
                <SidebarInset className="flex-1">
                  {children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          )}
        </TooltipProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}