"use client"


import { PageHeader } from "@/components/agents/header"

export default function ActionPage() {
  return (
    <div className="flex-1 bg-muted/30 min-h-screen">

      {/* Header */}
      <PageHeader
        title="Set Up Actions"
        description="Set up automated tasks and workflows"
      />
    </div>
  )
}