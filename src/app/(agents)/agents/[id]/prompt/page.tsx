"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Save, Trash2 } from "lucide-react"
import TextEditor from "@/components/text-editor"

export default function PromptPage() {
  const { id } = useParams()

  return (
    <div className="flex-1 p-8 bg-muted/30 min-h-screen">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Define Assistant Behavior
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure how your assistant should respond and behave
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Phone className="h-4 w-4" />
            Test Assistant
          </Button>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Save className="h-4 w-4" />
            Publish
          </Button>

          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-8 max-w-5xl">

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