

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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAgentByIdApi, deleteAgentApi } from "@/network/Api";
import { updateAgentApi } from "@/network/Api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DeleteConfirmDialog from "@/components/common/delete-confirm-dialog";

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

        {/* <Button
          className="h-11 rounded-xl"
          style={{ background: THEME.primary }}
        >
          <Save className="mr-2 h-4 w-4" />
          Publish
        </Button> */}

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

  const handleDelete = async () => {
    if (!id) return;

    try {
      setDeleting(true);

      await deleteAgentApi(id);

      router.push("/agents");
    } catch (err) {
      console.error(err);
      alert("Failed to delete agent");
    } finally {
      setDeleting(false);
      setDeleteOpen(false); // close dialog
    }
  };

  const handleUpdate = async () => {
    if (!id) return;

    try {
      setUpdating(true);

      console.log("UPDATING:", { name, description });

      await updateAgentApi(id, {
        name,
        description,
      });

      router.push("/agents");

    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update agent");
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

    } catch (err) {
      console.error("DETAIL ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    console.log("ID RECEIVED:", id);


    fetchAgent();
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Agent Role / Nickname</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-11 rounded-xl"
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
                <div className="flex flex-col gap-3 rounded-2xl border bg-muted/10 p-4">
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
                    <Select defaultValue={VOICES[0]}>
                      <SelectTrigger className="h-11 w-full rounded-sm ">
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
                      className="h-11 w-11 rounded-xl px-0 bg-purple-100 hover:bg-purple-200 text-purple-600"
                      title="Preview"
                    >
                      <Play className="h-5 w-5" />
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
