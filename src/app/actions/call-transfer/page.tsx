"use client"

import { PhoneCall, Plus, Pencil, Trash2, Phone } from "lucide-react"

export default function CallTransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br bg-[#4e1c85] text-white p-4 rounded-2xl shadow-lg">
            <PhoneCall size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Call Transfer
            </h1>
            <p className="text-gray-500 mt-1">
              Manage call transfer and forwarding workflows
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r bg-[#4e1c85] hover:opacity-90 text-white px-6 py-3 rounded-xl shadow-lg transition">
          <Plus size={18} />
          Create New Action
        </button>
      </div>

      {/* Card Section */}
      <div className="max-w-lg">
       

        <div className=" bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden p-6">

          {/* Top */}
          <div className="flex justify-between items-start mb-6">

            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                <PhoneCall size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Transfer To Deepak
                </h2>

                <span className="inline-flex items-center gap-2 mt-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Description
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              Use this tool to call Deepak whenever you want to transfer
              the call to support.
            </p>
          </div>

          {/* Destination */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Destination
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={14} className="text-gray-400" />
              +91 9926131505
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm">

            <span className="text-gray-400">
              Created: N/A
            </span>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition text-xs font-medium">
                <Pencil size={14} />
                Edit
              </button>

              <Trash2
                size={18}
                className="text-gray-400 hover:text-red-500 cursor-pointer transition"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}