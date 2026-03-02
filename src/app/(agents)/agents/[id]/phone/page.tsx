"use client"

import { PageHeader } from "@/components/agents/header"
import { BuyNumberDialog } from "@/components/agents/phone/buy-number-dialog"
import { Button } from "@/components/ui/button"
import { Phone, Plus, Save, Trash2 } from "lucide-react"

export default function PhoneNumberPage() {
 return (
  <div className="flex-1 bg-muted/30 min-h-screen">

   {/* Header */}
   <PageHeader
    title="Configure Phone Number"
    description="Configure the phone number for your assistant"
   />

   {/* Main Content */}
   <div className="space-y-6 max-w-5xl mx-auto p-5">

    {/* Phone Numbers Card */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

     <div>
      <h2 className="text-base font-semibold">
       Phone Numbers
      </h2>
      <p className="text-sm text-muted-foreground">
       Select an existing phone number or purchase a new one for your assistant
      </p>
     </div>

     {/* Header Row */}
     <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium">
       Available Phone Numbers
      </h3>

      <BuyNumberDialog>
       <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-lg h-11">
        <Plus className="h-4 w-4" />
        Buy New Number
       </Button>
      </BuyNumberDialog>
     </div>

     {/* Phone List Box */}
     <div className="border rounded-xl p-4 min-h-[220px] flex flex-col gap-3">

      {/* Phone Item */}
      <div className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-muted/50 cursor-pointer transition">
       <div className="flex items-center gap-3">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
         +19207106092
        </span>
       </div>

       <span className="text-xs text-muted-foreground">
        Click to select
       </span>
      </div>

      {/* Empty space (future list) */}
      <div className="flex-1" />
     </div>
    </div>

    {/* Phone Settings Card */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">

     <div>
      <h2 className="text-base font-semibold">
       Phone Settings
      </h2>
      <p className="text-sm text-muted-foreground">
       Configure call options
      </p>
     </div>

     {/* Info Box */}
     <div className="border rounded-lg px-4 py-3 text-sm text-muted-foreground bg-muted/40">
      Coming Soon: Voicemail and Call Forwarding features will be available in phase 2
     </div>
    </div>

   </div>
  </div>
 )
}