"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Save, Trash2 } from "lucide-react"
import TextEditor from "@/components/text-editor"

export default function PromptPage() {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)

  const [firstMessage, setFirstMessage] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [endCallMessage, setEndCallMessage] = useState("")

  // GET PROMPT API
  useEffect(() => {
    if (!id) return

    const fetchPrompt = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/agents/${id}/prompt`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        // if (!res.ok) throw new Error("Failed to fetch prompt")
        if (!res.ok) {
  console.log("Status:", res.status)
  const errorBody = await res.text()
  console.log("Error body:", errorBody)
  throw new Error("Failed to fetch prompt")
}

        const data = await res.json()

        setFirstMessage(data.first_message || "")
        setSystemPrompt(data.system_prompt || "")
        setEndCallMessage(data.end_call_message || "")
      } catch (error) {
        console.error("Error fetching prompt:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrompt()
  }, [id])

  // ✅ UPDATE PROMPT API
  const handlePublish = async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/agents/${id}/prompt`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            first_message: firstMessage,
            system_prompt: systemPrompt,
            end_call_message: endCallMessage,
          }),
        }
      )

      if (!res.ok) {
  const errorText = await res.text()
  console.log("Status:", res.status)
  console.log("Error body:", errorText)
  throw new Error("Failed to fetch prompt")
}

      alert("Prompt updated successfully 🚀")
    } catch (error) {
      console.error("Error updating prompt:", error)
      alert("Error updating prompt")
    } finally {
      setLoading(false)
    }
  }

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

        <div className="flex items-center gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Phone className="h-4 w-4" />
            Test Assistant
          </Button>

          <Button
            onClick={handlePublish}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Publish"}
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
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            placeholder="Hello, this is Maya..."
          />
        </div>

        {/* System Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            System Prompt
          </label>

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
          <label className="text-sm font-medium">
            End Call Message
          </label>
          <Input
            value={endCallMessage}
            onChange={(e) => setEndCallMessage(e.target.value)}
            placeholder="Thank you for contacting us..."
          />
        </div>
      </div>
    </div>
  )
}