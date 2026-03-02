"use client"


import { PageHeader } from "@/components/agents/header"
import { FileText } from "lucide-react"

export default function KnowledgeBasePage() {
  return (
    <div className="flex-1 bg-muted/30 min-h-screen">

      {/* Header */}
      <PageHeader
        title="Configure Knowledge Base"
        description="Configure the knowledge base for your assistant"
      />

      {/* Content */}
      <div className="p-5">
        <div className="max-w-5xl mx-auto">

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">

            {/* Icon */}
            <FileText className="h-10 w-10 text-muted-foreground" />

            {/* Text */}
            <div>
              <p className="text-base font-medium">
                No documents found
              </p>
              <p className="text-sm text-muted-foreground">
                Upload some documents to get started with your knowledge base.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}