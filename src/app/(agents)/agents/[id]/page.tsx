// FILE: app/agents/[id]/page.tsx

import AgentDetailPage from "@/components/agents/detail/agent-detail-page";

export default function Page({ params }: { params: { id: string } }) {
  return <AgentDetailPage id={params.id} />;
}

/* ------------------------------------------------------------------
   FILE: components/agents/detail/agent-detail-page.tsx
-------------------------------------------------------------------*/

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Bot,
  Phone,
  Save,
  Upload,
  ArrowLeft,
  Globe,
  Mic,
  Play,
  Volume2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

// ------------------------------------------------------
// NOTE:
// This is a UI-first page. Plug your GET/PUT API later.
// ------------------------------------------------------

type AgentDetail = {
  id: string;
  name: string;
  roleNickname: string;
  detectCallerNumber: boolean;
  timezone: string;
  language: string;
  voiceMode: "preset" | "custom";
  voicePreset: string;
  elevenlabsVoiceId: string;
  multiLingualSupport: boolean;
  voiceRecording: boolean;
};

const TIMEZONES = [
  "(GMT-5:00) Eastern Time",
  "(GMT+0:00) UTC",
  "(GMT+5:30) India Standard Time",
  "(GMT+1:00) Central European Time",
];

const LANGUAGES = ["English", "Hindi", "Spanish", "French"];

const VOICES = [
  "Josh",
  "Alice - Clear, Engaging Educator",
  "Noa - Friendly Receptionist",
  "David - Calm Support",
];

function TopBar({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 w-11 rounded-xl px-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#2b1246]">
            Configure Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Set up the basic details and voice settings
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700">
          <Phone className="mr-2 h-4 w-4" />
          {name || "Test Assistant"}
        </Button>

        <Button className="h-11 rounded-xl bg-[#2b1246] hover:bg-[#3b215e]">
          <Save className="mr-2 h-4 w-4" />
          Publish
        </Button>

        <Button
          variant="destructive"
          className="h-11 rounded-xl"
          title="Delete"
        >
          <Upload className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-[#2b1246]">{title}</div>
      {subtitle ? (
        <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
      ) : null}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  description,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border bg-muted/15 px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2b1246] text-white">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold">{label}</div>
          {description ? (
            <div className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </div>
          ) : null}
        </div>
      </div>
      <div className="pt-1">{right}</div>
    </div>
  );
}

export default function AgentDetailPage({ id }: { id: string }) {
  const router = useRouter();

  // Demo state (replace with API data)
  const [data, setData] = React.useState<AgentDetail>({
    id,
    name: "abc",
    roleNickname: "test1111",
    detectCallerNumber: false,
    timezone: "(GMT-5:00) Eastern Time",
    language: "English",
    voiceMode: "preset",
    voicePreset: "Josh",
    elevenlabsVoiceId: "",
    multiLingualSupport: false,
    voiceRecording: false,
  });

  const [saving, setSaving] = React.useState(false);

  function update<K extends keyof AgentDetail>(key: K, value: AgentDetail[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function onPublish() {
    setSaving(true);
    try {
      // TODO: PUT /agents/:id
      await new Promise((r) => setTimeout(r, 800));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full space-y-6">
      <TopBar name={data.name} onBack={() => router.push("/agents")} />

      <Card className="rounded-2xl border bg-white shadow-sm">
        {/* Agent header inside card */}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-bold">{data.name}</div>
              <div className="text-sm text-muted-foreground">
                Give your assistant a unique name
              </div>
            </div>
          </div>

          <Badge className="w-fit rounded-full bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-500">
            Active
          </Badge>
        </div>

        <Separator />

        {/* FORM */}
        <div className="space-y-8 p-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <SectionTitle title="Basic Configuration" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm">Agent Name</Label>
                <Input
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Agent Role / Nickname</Label>
                <Input
                  value={data.roleNickname}
                  onChange={(e) => update("roleNickname", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              label="Detect Caller Number"
              description="Enable detection and identification of caller phone numbers"
              right={
                <Switch
                  checked={data.detectCallerNumber}
                  onCheckedChange={(v :any) => update("detectCallerNumber", v)}
                />
              }
            />

            <div className="space-y-2">
              <Label className="text-sm">Timezone</Label>
              <Select
                value={data.timezone}
                onValueChange={(v) => update("timezone", v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground">
                Select the timezone for your assistant
              </div>
            </div>
          </div>

          {/* Voice Configuration */}
          <div className="space-y-4">
            <SectionTitle title="Voice Configuration" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm">Language</Label>
                <Select
                  value={data.language}
                  onValueChange={(v) => update("language", v)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Voice Selection</Label>

                {/* mode switch */}
                <div className="flex flex-col gap-3 rounded-2xl border bg-muted/10 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="voiceMode"
                        checked={data.voiceMode === "preset"}
                        onChange={() => update("voiceMode", "preset")}
                      />
                      Choose from voices
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="voiceMode"
                        checked={data.voiceMode === "custom"}
                        onChange={() => update("voiceMode", "custom")}
                      />
                      Custom ElevenLabs Voice ID
                    </label>
                  </div>

                  {data.voiceMode === "preset" ? (
                    <div className="flex items-center gap-3">
                      <Select
                        value={data.voicePreset}
                        onValueChange={(v) => update("voicePreset", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {VOICES.map((v) => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-11 rounded-xl px-0"
                        title="Preview"
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      value={data.elevenlabsVoiceId}
                      onChange={(e) => update("elevenlabsVoiceId", e.target.value)}
                      placeholder="Enter ElevenLabs Voice ID"
                      className="h-11 rounded-xl"
                    />
                  )}
                </div>
              </div>
            </div>

            <InfoRow
              icon={<Globe className="h-5 w-5" />}
              label="Multi-lingual Support"
              description="Enable automatic language detection and multi-language conversation support"
              right={
                <Switch
                  checked={data.multiLingualSupport}
                  onCheckedChange={(v) => update("multiLingualSupport", v)}
                />
              }
            />
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <SectionTitle title="Additional Settings" />
              <Badge variant="outline" className="rounded-full">
                optional
              </Badge>
            </div>

            <InfoRow
              icon={<Mic className="h-5 w-5" />}
              label="Voice Recording"
              description="Record and save voice interactions"
              right={
                <Switch
                  checked={data.voiceRecording}
                  onCheckedChange={(v) => update("voiceRecording", v)}
                />
              }
            />
          </div>
        </div>
      </Card>

      {/* Sticky bottom bar (optional) */}
      <div className="sticky bottom-4 flex justify-end">
        <Button
          onClick={onPublish}
          disabled={saving}
          className="h-12 rounded-xl bg-[#2b1246] px-6 hover:bg-[#3b215e]"
        >
          <Save className="mr-2 h-5 w-5" />
          {saving ? "Publishing..." : "Publish Changes"}
        </Button>
      </div>
    </div>
  );
}

