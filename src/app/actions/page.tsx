"use client"

import { Calendar, X, RotateCcw, Pencil, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ActionsPage() {
  return (
    <div className="p-10 text-white  min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br bg-[#4e1c85] text-white p-4 rounded-2xl shadow-lg">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Realtime Booking
            </h1>
            <p className="text-gray-500 mt-1">
              Schedule appointments and manage booking workflows
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-[#4e1c85] hover:opacity-90 text-white px-6 py-3 rounded-xl shadow-lg transition">
          <Plus size={18} />
          Create New Action
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx">

        {/* Cancel Card */}
        <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">

          {/* Top Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>

          <div className="p-8">

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                  <X size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cancel Appointment
                  </h2>
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mt-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Parameters */}
            <div className="mb-8">
              <p className="text-xs text-gray-400 tracking-wider uppercase mb-4">
                Required Parameters
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl">
                <Badge>booking id</Badge>
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100 text-sm">
              <span className="text-gray-400">
                Created Feb 17, 2026
              </span>

              <div className="flex items-center gap-5">
                <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition">
                  <Pencil size={16} />
                  Edit
                </button>
                <Trash2 size={18} className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Card */}
        <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">

          <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500"></div>

          <div className="p-8">

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
                  <RotateCcw size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Reschedule Appointment
                  </h2>
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mt-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                    Active
                  </span>
                  
                </div>
              </div>
            </div>

            {/* Parameters */}
            <div className="mb-8">
              <p className="text-xs text-gray-400 tracking-wider uppercase mb-4">
                Required Parameters
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-100 hov text-gray-700 text-sm px-4 py-2 rounded-xl">
                  start time
                </span>
                <span className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl">
                  booking id
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100 text-sm">
              <span className="text-gray-400">
                Created Feb 17, 2026
              </span>

              <div className="flex items-center gap-5">
                <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition">
                  <Pencil size={16} />
                  Edit
                </button>
                <Trash2 size={18} className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
