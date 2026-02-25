"use client";

import * as React from "react";
import { Bot, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { createAgentApi } from "@/network/Api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function CreateAgentDialog({ open, onOpenChange, onSuccess }: Props) {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function close() {
    onSuccess?.();   
    onOpenChange(false);
  }

  async function onCreate() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const response = await createAgentApi({
        name: name.trim(),
        description: role.trim(), // role goes as description
      });

      console.log("CREATED AGENT:", response);

      // Reset fields
      setName("");
      setRole("");

      // Close dialog
      close();

    

    } catch (error: any) {
      console.error("CREATE ERROR:", error);
      alert(error.message || "Failed to create agent");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-2xl p-0 sm:max-w-[620px]"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#2b1246] to-[#4b2a7a] px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Bot className="h-6 w-6" />
              </div>

              <div>
                <DialogHeader className="space-y-1">
                  <DialogTitle className="text-xl font-bold">
                    Create New Agent
                  </DialogTitle>
                  <DialogDescription className="text-white/80">
                    Give your AI assistant a name and define its role
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={close}
              className="h-10 w-10 rounded-full px-0 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="space-y-5">
            {/* Agent Name */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Agent Name
              </Label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Customer Support Bot"
                className="h-12 rounded-2xl bg-muted/20 focus-visible:ring-[#2b1246]"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Agent Role & Description
              </Label>

              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Handles customer inquiries and bookings"
                className="h-12 rounded-2xl bg-muted/20 focus-visible:ring-[#2b1246]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-300 bg-white px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Ready to create your AI assistant
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              className="h-11 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={onCreate}
              className="h-11 rounded-xl bg-[#4e1c85] hover:bg-[#3b215e] text-white"
              disabled={!name.trim() || loading}
            >
              {loading ? "Creating..." : "Create Agent"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}