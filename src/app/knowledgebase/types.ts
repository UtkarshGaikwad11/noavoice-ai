export type DocumentStatus = "processed" | "pending"

export interface KnowledgeDocument {
  id: string
  name: string
  type: string
  size: number
  addedAt: string
  status: DocumentStatus
}

export interface KnowledgeStats {
  total: number
  processed: number
  pending: number
  storageUsedMB: number
}