// FILE: components/agents/create-agent-dialog.tsx

"use client";

import * as React from "react";
import { Bot, Sparkles, Users, Waves, X } from "lucide-react";

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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FeatureCard({
  icon,
  title,
  desc,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  variant: "blue" | "purple";
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4",
        variant === "blue"
          ? "bg-blue-50/70 border-blue-100"
          : "bg-violet-50/70 border-violet-100"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl text-white",
          variant === "blue" ? "bg-blue-600" : "bg-violet-600"
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div
          className={cn(
            "text-sm font-semibold",
            variant === "blue" ? "text-blue-700" : "text-violet-700"
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "mt-0.5 text-xs",
            variant === "blue" ? "text-blue-700/80" : "text-violet-700/80"
          )}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

export function CreateAgentDialog({ open, onOpenChange }: Props) {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");

  function close() {
    onOpenChange(false);
  }

  function onCreate() {
    // TODO: plug your API here
    // console.log({ name, role });
    close();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-2xl p-0 sm:max-w-[620px]"
        showCloseButton={false}
      >
        {/* Top header (gradient) */}
        <div className="relative bg-gradient-to-r from-[#2b1246] to-[#4b2a7a] px-6 py-5 text-white">
          {/* subtle bubble */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-14 top-6 h-24 w-24 rounded-full bg-white/10" />

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
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <Label className="text-sm font-semibold">Agent Name</Label>
              </div>

              <div className="relative">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Customer Support Bot, Sales Assistant"
                  className="h-12 rounded-2xl bg-muted/20 pr-12 focus-visible:ring-[#2b1246]"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                <Label className="text-sm font-semibold">
                  Agent Role & Description
                </Label>
              </div>

              <div className="relative">
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Handles customer inquiries, books appointments, provides support"
                  className="h-12 rounded-2xl bg-muted/20 pr-12 focus-visible:ring-[#2b1246]"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Feature cards */}
            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FeatureCard
                variant="blue"
                icon={<Users className="h-5 w-5" />}
                title="Customer Interaction"
                desc="Your agent will handle customer conversations naturally"
              />
              <FeatureCard
                variant="purple"
                icon={<Waves className="h-5 w-5" />}
                title="Smart Responses"
                desc="AI-powered responses based on your business needs"
              />
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-gray-300 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Ready to create your AI assistant
          </div>

          <div className="flex items-center justify-end gap-3">
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
              className="h-11 rounded-xl bg-[#4e1c85] hover:bg-[#3b215e] text-gray-300"
              disabled={!name.trim()}
            >
              <Sparkles className="mr-2 h-4 w-4 text-gray-300" />
              Create Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

