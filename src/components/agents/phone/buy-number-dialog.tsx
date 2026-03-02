"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Phone, X } from "lucide-react"

export function BuyNumberDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchBy, setSearchBy] = useState("area")

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
        <div className="p-6 space-y-6">

          {/* Header */}
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Purchase Phone Number
                </DialogTitle>
                <DialogDescription>
                  Search and select your preferred phone number
                </DialogDescription>
              </div>
{/* 
              <Button size="icon" variant="ghost">
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </DialogHeader>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium pb-1">Country</label>
              <Select defaultValue="canada">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search By</label>

              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setSearchBy("area")}
                  className={`flex-1 text-sm py-2 rounded-md transition ${
                    searchBy === "area"
                      ? "bg-white shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Area Code
                </button>
                <button
                  onClick={() => setSearchBy("city")}
                  className={`flex-1 text-sm py-2 rounded-md transition ${
                    searchBy === "city"
                      ? "bg-white shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  City
                </button>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Input
              placeholder={
                searchBy === "area" ? "Enter area code (e.g. 431)" : "Enter city"
              }
              className="h-11"
            />
          </div>

          {/* CTA */}
          <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white">
            Find Numbers
          </Button>

          {/* Results */}
          <div className="border rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center space-y-3">
            <Phone className="h-8 w-8 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">
                No numbers available
              </p>
              <p className="text-xs text-muted-foreground">
                Try different search criteria
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Purchase
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}