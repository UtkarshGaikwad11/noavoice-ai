

"use client";

import * as React from "react";
import Link from "next/link";

import {
  Bot,
  Phone,
  Save,
  Trash2,
  ArrowLeft,
  Globe,
  Mic,
  Play,
  Sparkles,
  Pause,
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

import { getAgentByIdApi, deleteAgentApi, getVoicesApi, updateAgentApi, updateVoiceApi } from "@/network/Api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DeleteConfirmDialog from "@/components/common/delete-confirm-dialog";
import { toast } from "sonner";

const THEME = {
  primary: "#4e1c85",
  primaryHover: "#3b215e",
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

function PageHeader({
  agentName,
  onDelete,
}: {
  agentName: string;
  onDelete: () => void;
  onPublish?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <Link
          href="/agents"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-white hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

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
        <Button className="h-11 rounded-md bg-emerald-600 hover:bg-emerald-700">
          <Phone className="mr-1 h-4 w-4" />
          {agentName}
        </Button>

        <Button
          variant="destructive"
          onClick={onDelete}
          className="h-11 rounded-md"
        >
          <Trash2 className="mr-2 h-4 w-4" />
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
        <div
          className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl text-white"
          style={{ background: THEME.primary }}
        >
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
  // UI-only demo values
  const [agent, setAgent] = React.useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [updating, setUpdating] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [voices, setVoices] = React.useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState("");
  const getGender = (voice: any) => voice?.labels?.gender || "unknown";
  const getLanguage = (voice: any) => voice?.labels?.language || "en";
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setDeleting(true);

      await deleteAgentApi(id);

      router.push("/agents");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete agent");
    } finally {
      setDeleting(false);
      setDeleteOpen(false); // close dialog
    }
  };

  const handleUpdate = async () => {
    if (!id) return;

    try {
      setUpdating(true);

      // 1️⃣ Update agent basic info
      await updateAgentApi(id, {
        name,
        description,
      });

      // 2️⃣ Update voice (IMPORTANT)
      if (selectedVoice) {
        const selectedVoiceObj = voices.find(
          (v) => v.voice_id === selectedVoice
        );

        if (!selectedVoiceObj) return;

        await updateVoiceApi(id, {
          provider: "elevenlabs",
          voice_id: selectedVoiceObj.voice_id,
          voice_name: selectedVoiceObj.name,
          language: selectedVoiceObj.labels?.language || "en",
          multi_lingual: false, // or derive later
        });
      }

      // Optional: success UI
      console.log("Agent + Voice updated");

    } catch (err) {
      console.error("UPDATE ERROR:", err);
      toast.error("Failed to update agent");
    } finally {
      setUpdating(false);
    }
  };

  const fetchAgent = async () => {
    try {
      setLoading(true);

      console.log("CALLING API WITH ID:", id);

      const res: any = await getAgentByIdApi(id);

      console.log("DETAIL API:", res.data);

      const assistant = res?.data?.assistant;

      setAgent(assistant);
      setName(assistant?.name || "");
      setDescription(assistant?.description || "");
      setSelectedVoice(assistant?.voice_id || "");

    } catch (err) {
      console.error("DETAIL ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVoices = async () => {
    try {
      const res: any = await getVoicesApi(id);

      const voiceList = res?.data?.voices || res?.voices || [];

      setVoices(voiceList);
    } catch (err) {
      console.error("VOICE ERROR:", err);
    }
  };

  const handlePlayVoice = (voice: any) => {
    if (!voice?.preview_url) return;

    // stop previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // if clicking same voice → stop
    if (playingId === voice.voice_id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(voice.preview_url);
    audioRef.current = audio;

    setPlayingId(voice.voice_id);

    audio.play();

    audio.onended = () => {
      setPlayingId(null);
    };
  };

  useEffect(() => {
    if (!id) return;
    console.log("ID RECEIVED:", id);

    fetchAgent();
    fetchVoices();
  }, [id]);

  if (loading) {
    return <div className="p-5">Loading agent...</div>;
  }

  if (!agent) {
    return <div className="p-5">Agent not found</div>;
  }

  return (
    <div className="w-full space-y-6 p-5">
      <PageHeader
        agentName={agent.name}
        onDelete={() => setDeleteOpen(true)}
        onPublish={handleUpdate}   // ✅ ADD THIS
      />

      <Card className="rounded-2xl border bg-white shadow-sm">
        {/* Agent header inside card */}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br bg-purple-900 text-white shadow-sm">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-bold">{agent.name}</div>
              <div className="text-sm text-muted-foreground">
                Give your assistant a unique name
              </div>
            </div>
          </div>

          <Badge className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 leading-none">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="flex items-center">Active</span>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Agent Role / Nickname</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-11 rounded-sm"
                />              </div>
            </div>

            <InfoRow
              icon={<Phone className="h-5 w-5" />}
              label="Detect Caller Number"
              description="Enable detection and identification of caller phone numbers"
              right={<Switch defaultChecked={false} />}
            />

            <div className="space-y-2">
              <Label className="text-sm">Timezone</Label>
              <Select defaultValue={TIMEZONES[0]}>
                <SelectTrigger className="h-11 rounded-sm w-full">
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
                <Select defaultValue={LANGUAGES[0]}>
                  <SelectTrigger className="h-11 w-[300px] rounded-sm">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="mt-1">
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

                {/* UI only: preset mode shown */}
                <div className="flex flex-col gap-3 rounded-sm border bg-muted/10 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="voiceMode" defaultChecked />
                      Choose from voices
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="voiceMode" />
                      Custom ElevenLabs Voice ID
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger className="h-11 w-full rounded-sm">
                        <SelectValue>
                          {voices.find(v => v.voice_id === selectedVoice)?.name || "Select voice"}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent className="w-[var(--radix-select-trigger-width)] max-h-[360px] overflow-y-auto p-2">
                        {voices.map((voice) => {
                          const gender = voice?.labels?.gender;
                          const language = voice?.labels?.accent || voice?.labels?.language;
                          const style = voice?.labels?.descriptive;

                          return (
                            <SelectItem
                              key={voice.voice_id}
                              value={voice.voice_id}
                              className="p-0 focus:bg-transparent"
                            >
                              <div className="w-full rounded-sm px-4 py-3 hover:bg-gray-50 transition cursor-pointer space-y-1">

                                {/* Voice Name */}
                                <div className="text-md font-semibold text-gray-800 pb-2">
                                  {voice.name}
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 pb-1">
                                  {gender && (
                                    <span className="text-[11px] px-2 py-[4px] rounded-sm bg-purple-100 text-purple-700">
                                      {gender}
                                    </span>
                                  )}
                                  {language && (
                                    <span className="text-[11px] px-2 py-[2px] rounded-md bg-blue-100 text-blue-700">
                                      {language}
                                    </span>
                                  )}
                                  {style && (
                                    <span className="text-[11px] px-2 py-[2px] rounded-md bg-pink-100 text-pink-700">
                                      {style}
                                    </span>
                                  )}
                                </div>

                                {/* Description */}
                                {voice.description && (
                                  <p className="text-xs text-gray-500 leading-snug">
                                    {voice.description}
                                  </p>
                                )}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const voice = voices.find(v => v.voice_id === selectedVoice);
                        if (voice) handlePlayVoice(voice);
                      }}
                      className="h-11 w-11 rounded-xl px-0 bg-purple-100 hover:bg-purple-200 text-purple-600 hover:text-purple-700"
                    >
                      {playingId === selectedVoice ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {/* hidden custom field for UI only */}
                  <div className="hidden">
                    <Input
                      defaultValue=""
                      placeholder="Enter ElevenLabs Voice ID"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <InfoRow
              icon={<Globe className="h-5 w-5" />}
              label="Multi-lingual Support"
              description="Enable automatic language detection and multi-language conversation support"
              right={<Switch defaultChecked={false} />}
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
              right={<Switch defaultChecked={false} />}
            />
          </div>
        </div>
      </Card>

      {/* Bottom bar (UI only) */}
      <div className="sticky bottom-4 flex justify-end">
        <Button
          onClick={handleUpdate}
          disabled={updating}
          className="h-12 rounded-md px-6"
          style={{ background: THEME.primary }}
        >
          <Save className="mr-2 h-5 w-5" />
          {updating ? "Saving..." : "Publish Changes"}
        </Button>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        loading={deleting}
        description={`This will permanently delete ${agent.name}. This action cannot be undone.`}
      />
    </div>
  );
}
