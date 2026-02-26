"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TextEditor from "@/components/text-editor"
import { PageHeader } from "@/components/agents/header"

export default function PromptPage() {
  const { id } = useParams()

  return (
    <div className="flex-1 bg-muted/30 min-h-screen">

      <PageHeader
        title="Define Assistant Behavior"
        description="Configure how your assistant should respond and behave"
      />

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-8 max-w-5xl mx-auto">

        {/* First Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            First Message
          </label>
          <Input
            placeholder="Hello, this is Maya from NoaVoice Health Centre. How may I assist you today?"
          />
        </div>

        {/* System Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            System Prompt
          </label>

          <TextEditor />

          <p className="text-xs text-muted-foreground">
            This is the main instruction set that guides how your assistant behaves and responds.
          </p>
        </div>

        {/* End Call Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            End Call Message
          </label>
          <Input
            placeholder="Thank you for contacting us. If you need anything else, feel free to reach out anytime. Have a great day!"
          />
        </div>
      </div>
    </div>
  )
}