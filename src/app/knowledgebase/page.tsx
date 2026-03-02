"use client"
import { useEffect } from "react"
import { uploadKnowledgeApi } from "@/network/Api"
import { getKnowledgeListApi } from "@/network/Api"

import { useState, useRef } from "react"
import StatsCard from "@/components/knowledgebase/StatsCard"
import DocumentsTable from "../../components/knowledgebase/DocumentsTable"
import { KnowledgeDocument, KnowledgeStats } from "./types"

import {
  FileText,
  CheckCircle,
  Clock,
  Database,
  Check,
  ChevronDown,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function KnowledgeBasePage() {
  useEffect(() => {fetchKnowledge()}, [])
  const [sortBy, setSortBy] = useState("date")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)

  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [stats, setStats] = useState<KnowledgeStats>({
    total: 0,
    processed: 0,
    pending: 0,
    storageUsedMB: 0,
  })

  // Fetch knowledge documents on mount
  const fetchKnowledge = async () => {
  try {
    const res = await getKnowledgeListApi({
      sort_by: "created_at",
      order: "desc",
      limit: 10,
      offset: 0,
    });

    if (!res.status) return;

    const formattedDocs = res.data.map((item: any) => ({
      id: item.file_id,
      name: item.name,
      type: item.mimetype || "Unknown",
      size: item.file_size
        ? (item.file_size / 1024 / 1024).toFixed(2)
        : "0",
      addedAt: item.created_at,
      status: item.status,
    }));

    setDocuments(formattedDocs);

    setStats({
      total: formattedDocs.length,
      processed: formattedDocs.filter(
        (d: any) => d.status === "ready"
      ).length,
      pending: formattedDocs.filter(
        (d: any) => d.status !== "ready"
      ).length,
      storageUsedMB: formattedDocs.reduce(
        (acc: number, doc: any) =>
          acc + Number(doc.size),
        0
      ),
    });

  } catch (error) {
    console.error("Failed to fetch knowledge list", error);
  }
};

  //  Upload Handler
  const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    setUploading(true)

    const res = await uploadKnowledgeApi(file)

    const data = res.data

    const fileSizeMB = Number(
      (file.size / 1024 / 1024).toFixed(2)
    )

    try {
  setUploading(true)

  await uploadKnowledgeApi(file)

  await fetchKnowledge()

} catch (error) {
  console.error(error)
}
  } catch (error: any) {
  console.log("FULL ERROR:", error)
  console.log("ERROR RESPONSE:", error?.response)
  console.log("ERROR DATA:", error?.response?.data)
  console.log("STATUS:", error?.response?.status)
} finally {
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
}
  //  Sorting Logic
  const sortedDocuments = [...documents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }

    if (sortBy === "size") {
      return Number(b.size) - Number(a.size)
    }

    return (
      new Date(b.addedAt).getTime() -
      new Date(a.addedAt).getTime()
    )
  })

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Knowledge Base
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your documents for AI processing
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700 transition"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />
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
          value={`${stats.storageUsedMB.toFixed(2)} MB`}
          subtitle="of 5GB used"
          icon={Database}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Table Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Recent Documents
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-md text-muted-foreground">
              Sort by:
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
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
                    {sortBy === "date" && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  <div className="flex w-full items-center justify-between">
                    <span>Name</span>
                    {sortBy === "name" && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setSortBy("size")}>
                  <div className="flex w-full items-center justify-between">
                    <span>Size</span>
                    {sortBy === "size" && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

 <DocumentsTable
  documents={sortedDocuments}
  onDelete={async () => {
    await fetchKnowledge()
  }}
/>
      </div>
    </div>
  )
} 