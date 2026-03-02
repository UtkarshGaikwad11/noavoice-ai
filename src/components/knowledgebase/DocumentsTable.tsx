"use client"

import { useState } from "react"
import { Eye, Trash2 } from "lucide-react"
import { deleteKnowledgeDocumentApi } from "@/network/Api"
import { KnowledgeDocument } from "@/app/knowledgebase/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Props {
  documents: KnowledgeDocument[]
  onDelete: (id: string) => void
}

export default function DocumentsTable({
  documents,
  onDelete,
}: Props) {
  const [selectedDoc, setSelectedDoc] =
    useState<KnowledgeDocument | null>(null)

  const [confirmDeleteId, setConfirmDeleteId] =
    useState<string | null>(null)

  const handleDelete = async () => {
    if (!confirmDeleteId) return

    try {
      await deleteKnowledgeDocumentApi(confirmDeleteId)
      onDelete(confirmDeleteId)
      setConfirmDeleteId(null)
    } catch (error) {
      alert("Failed to delete document")
    }
  }

  return (
    <>
      {/* TABLE */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-l">
          <thead className="border-b bg-muted/40 text-left">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Size (MB)</th>
              <th className="px-6 py-4">Added</th>
              <th className="px-6 py-4">Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No documents found
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="px-6 py-4"> {doc.name} </td>
                  <td className="px-6"> {doc.type}</td>
                  <td className="px-6"> {doc.size} MB </td>
                  <td className="px-6">{new Date(doc.addedAt).toLocaleDateString()} </td>
                  <td className="px-6">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {doc.status}
                    </span>
                  </td>
                  <td className="text-right pr-6 space-x-3">
                    {/* VIEW */}
                   <button onClick={() =>window.open(
               `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge/${doc.id}`,  "_blank"
    )
  }
  className="text-blue-600 hover:text-blue-800"
>
  <Eye size={18} />
</button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        setConfirmDeleteId(doc.id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-3/4 max-h-[80vh] rounded-xl p-6 overflow-auto">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">
                {selectedDoc.name}
              </h2>
              <button
                onClick={() =>
                  setSelectedDoc(null)
                }
              >
                ✕
              </button>
            </div>

            <pre className="bg-black text-white p-4 rounded-lg overflow-auto text-sm">
              Preview not implemented yet
            </pre>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {/* {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h2 className="text-red-600 font-bold text-lg">
              Are you absolutely sure?
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setConfirmDeleteId(null)
                }
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )} */}
      <Dialog
  open={!!confirmDeleteId}
  onOpenChange={(open) => {
    if (!open) setConfirmDeleteId(null);
  }}
>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This will permanently delete this document. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex gap-2 sm:justify-end">
      <button
        onClick={() => setConfirmDeleteId(null)}
        className="px-4 py-2 border rounded-md"
      >
        Cancel
      </button>

      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Continue
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </>
  )
}