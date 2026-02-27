"use client"

import { Button } from "@/components/ui/button"
import { Phone, Save, Trash2 } from "lucide-react"
import { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  description?: string
  showActions?: boolean
  extraActions?: ReactNode
}

export function PageHeader({
  title,
  description,
  showActions = true,
  extraActions,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 p-5 ">
      
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#2b1246]">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {/* Right Actions */}
      {showActions && (
        <div className="flex items-center gap-3">
          
          <Button className="h-11 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Phone className="h-4 w-4" />
            Test Assistant
          </Button>

          <Button className="h-11 rounded-md bg-[#4e1c85] hover:bg-[#4e1c85] text-white gap-2">
            <Save className="h-4 w-4" />
            Publish
          </Button>

          <Button variant="destructive" size="icon" className="rounded-md h-11 w-11">
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Custom extra actions (optional) */}
          {extraActions}
        </div>
      )}
    </div>
  )
}