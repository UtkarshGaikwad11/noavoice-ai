"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/App-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!isLoginPage) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // force 2 sec

      return () => clearTimeout(timer);
    }
  }, [pathname]);

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

                <SidebarInset className="flex-1 relative">
                  {loading ? (
                    <div className="absolute inset-0 z-50  flex items-center justify-center">
                      <Loader />
                    </div>
                  )
                :
                <>
                  {children}
                </>}


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