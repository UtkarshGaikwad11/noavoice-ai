"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your system prompt here...</p>",
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <div className="border rounded-xl bg-white flex flex-col">

      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 bg-muted/30">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

       {/*Editor Area*/}
      <EditorContent
        editor={editor}
        className="tiptap-editor p-4 min-h-[350px] flex-1 focus:outline-none"
      />
    </div> 
  )
}