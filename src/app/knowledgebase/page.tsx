"use client"

import { useEffect, useState } from "react"
import StatsCard from "@/components/knowledgebase/StatsCard"
import {
  FileText,
  CheckCircle,
  Clock,
  Database,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Check, ChevronDown } from "lucide-react"
import DocumentsTable from "../../components/knowledgebase/DocumentsTable"
import { KnowledgeDocument, KnowledgeStats } from "./types"

export default function KnowledgeBasePage() {
    const [sortBy, setSortBy] = useState("date")
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [stats, setStats] = useState<KnowledgeStats>({
    total: 0,
    processed: 0,
    pending: 0,
    storageUsedMB: 0,
  })

  //  Future API Integration
  useEffect(() => {
    async function fetchData() {
      // const res = await fetch("/api/knowledgebase")
      // const data = await res.json()
      // setDocuments(data.documents)
      // setStats(data.stats)

      setDocuments([]) // dummy
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your documents for AI processing
          </p>
        </div>

        <button className="rounded-lg bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700 transition">
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="Documents"
          value={stats.total}
          subtitle="Total documents"
          icon={FileText}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Processed"
          value={stats.processed}
          subtitle="AI processed"
          icon={CheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          subtitle="Awaiting processing"
          icon={Clock}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Storage"
          value={`${stats.storageUsedMB} MB`}
          subtitle="of 5GB used"
          icon={Database}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold">Recent Documents</h2>

  <div className="flex items-center gap-3">
    <span className="text-md text-muted-foreground">Sort by:</span>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold tracking-tight shadow-sm hover:bg-gray-50">
          {sortBy === "date" && "Date Added"}
          {sortBy === "name" && "Name"}
          {sortBy === "size" && "Size"}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => setSortBy("date")}>
          <div className="flex w-full items-center justify-between">
            <span>Date Added</span>
            {sortBy === "date" && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setSortBy("name")}>
          <div className="flex w-full items-center justify-between">
            <span>Name</span>
            {sortBy === "name" && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setSortBy("size")}>
          <div className="flex w-full items-center justify-between">
            <span>Size</span>
            {sortBy === "size" && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
        <DocumentsTable documents={documents} />
      </div>
    </div>
  )
}