export type DocumentStatus = "processed" | "pending"

export interface KnowledgeDocument {
  id: string
  name: string
  type: string
  size: string
  addedAt: string
  status: string
  content?: string
}

export interface KnowledgeStats {
  total: number
  processed: number
  pending: number
  storageUsedMB: number
}