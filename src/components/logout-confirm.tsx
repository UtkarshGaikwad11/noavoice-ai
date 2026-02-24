"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutConfirm({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
   
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <>
      {/* Logout Button */}
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className={`h-12 w-full rounded-2xl text-white/90 hover:text-white hover:bg-white/10 ${
          collapsed
            ? "justify-center px-0"
            : "justify-start gap-4 px-4"
        }`}
      >
        <LogOut className="h-5 w-5" />
        {!collapsed && (
          <span className="font-medium">Logout</span>
        )}
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You will be logged out of your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}