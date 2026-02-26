import { KnowledgeDocument } from "../../app/knowledgebase/types"

interface Props {
  documents: KnowledgeDocument[]
}

export default function DocumentsTable({ documents }: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <table className="w-full text-md">
        <thead className="border-b bg-muted/40 text-left">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Size</th>
            <th className="px-6 py-4">Added</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-muted-foreground">
                No documents found
              </td>
            </tr>
          ) : (
            documents.map((doc) => (
              <tr key={doc.id} className="border-b last:border-0">
                <td className="px-6 py-4">{doc.name}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4">{doc.size} MB</td>
                <td className="px-6 py-4">
                  {new Date(doc.addedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 capitalize">{doc.status}</td>
                <td className="px-6 py-4 text-right">...</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}