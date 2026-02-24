"use client"

import { Bell, Plus, Pencil, Trash2 } from "lucide-react"

export default function SendNotificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br p-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br bg-[#4e1c85] text-white p-4 rounded-2xl shadow-lg">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Send Notification
            </h1>
            <p className="text-gray-500 mt-1">
              Configure email, SMS, and notification workflows
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r bg-[#4e1c85] hover:opacity-90 text-white px-6 py-3 rounded-xl shadow-lg transition">
          <Plus size={18} />
          Create New Action
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">

        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition">

          <div className="p-6">

            {/* Top Row */}
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                <Bell size={20} />
              </div>

              <div className="flex gap-4">
                <Pencil className="text-gray-500 hover:text-purple-600 cursor-pointer transition" size={18} />
                <Trash2 className="text-gray-400 hover:text-red-500 cursor-pointer transition" size={18} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Lead Notification
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              This action will be called when there is some lead
            </p>

            {/* Parameters */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Parameters:
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-semibold bg-gray-100 rounded-lg border border-gray-200">
                  phone number
                </span>
                <span className="px-3 py-1 text-semibold bg-gray-100 rounded-lg border border-gray-200">
                  email address
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">
              <span className="text-gray-400">
                Created: Feb 17, 2026
              </span>

              <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                notification
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition">

          <div className="p-6">

            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                <Bell size={20} />
              </div>

              <div className="flex gap-4">
                <Pencil className="text-gray-500 hover:text-purple-600 cursor-pointer transition" size={18} />
                <Trash2 className="text-gray-400 hover:text-red-500 cursor-pointer transition" size={18} />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Notification To Deepak
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              When booking is done use this
            </p>

            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Parameters: 
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm bg-gray-100 rounded-lg border border-gray-200">
                  email address
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">
              <span className="text-gray-400">
                Created: N/A
              </span>

              <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                notification
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
