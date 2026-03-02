"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import TextEditor from "@/components/text-editor";
import { PageHeader } from "@/components/agents/header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  getPromptByIdApi,
  updatePromptApi,
  deletePromptApi,
} from "@/network/Api";
import DeleteConfirmDialog from "@/components/common/delete-confirm-dialog";

export default function PromptPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [firstMessage, setFirstMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [endCallMessage, setEndCallMessage] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);


  const fetchPrompt = async () => {
    try {
      setLoading(true);

      const res: any = await getPromptByIdApi(id as string);

      const data = res?.data ?? res;

      setFirstMessage(data?.first_message || "");
      setSystemPrompt(data?.system_prompt || "");
      setEndCallMessage(data?.end_call_message || "");
    } catch (err) {
      console.error("PROMPT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPrompt();
  }, [id]);

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      setUpdating(true);

      await updatePromptApi(id as string, {
        first_message: firstMessage,
        system_prompt: systemPrompt,
        end_call_message: endCallMessage,
      });

      toast.success("Prompt updated successfully ✅");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      toast.error("Failed to update ❌");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deletePromptApi(id as string);

      toast.success("Prompt deleted 🗑️");

      // redirect after delete
      router.push("/agents");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      toast.error("Failed to delete ❌");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return <div className="p-5">Loading prompt...</div>;
  }

  return (
    <div className="flex-1 bg-muted/30 min-h-screen">
      <PageHeader
        title="Define Assistant Behavior"
        description="Configure how your assistant should respond and behave"
        onPublish={handleUpdate}
        onDelete={() => setDeleteOpen(true)}
        publishing={updating}
        deleting={deleting}
      />

      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-8 max-w-5xl mx-auto">

        {/* First Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium ">First Message</label>
          <Input
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
          />
        </div>

        {/* System Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium">System Prompt</label>

          <TextEditor
            value={systemPrompt}
            onChange={setSystemPrompt}
          />

          <p className="text-xs text-muted-foreground">
            This is the main instruction set that guides how your assistant behaves and responds.
          </p>
        </div>

        {/* End Call Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium">End Call Message</label>
          <Input
            value={endCallMessage}
            onChange={(e) => setEndCallMessage(e.target.value)}
          />
        </div>

      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        loading={deleting}
        description="This will permanently delete this prompt."
      />
    </div>
  );
}