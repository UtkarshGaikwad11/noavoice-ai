"use client"

import { Calendar, Save, X } from "lucide-react"

export default function CreateRealtimeBooking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-start gap-4">
          <div className="bg-[#4e1c85] text-white p-4 rounded-2xl shadow-lg">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Booking Action
            </h1>
            <p className="text-gray-500 mt-1">
              Configure a new appointment booking action for your workflow
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-100 transition flex items-center gap-2">
            <X size={16} />
            Cancel
          </button>

          <button className="px-6 py-2.5 rounded-xl bg-[#4e1c85] text-white shadow-lg hover:opacity-90 transition flex items-center gap-2">
            <Save size={16} />
            Save Action
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* Basic Info */}
          <div className="bg-white rounded-xl  shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-300 bg-purple-100 rounded-t-xl">
              <h2 className="font-semibold text-gray-700">
                Basic Information
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-semibold font-medium text-gray-700 mb-2">
                  Action Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter a descriptive name for this action"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Choose a clear name that identifies this action's purpose
                </p>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-300 bg-green-100 rounded-t-xl">
              <h2 className="font-semibold text-gray-700">
                Action Messages
              </h2>
            </div>

            <div className="p-6 space-y-6">

              {/* Start */}
              <div>
                <label className="block text-semibold font-medium text-gray-700 mb-2">
                  Start Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Message when action starts..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Speaks when the booking process begins
                </p>
              </div>

              {/* Complete */}
              <div>
                <label className="block text-semibold font-medium text-gray-700 mb-2">
                  Complete Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Message when action completes..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Speaks when booking is successful
                </p>
              </div>

              {/* Failed */}
              <div>
                <label className="block text-semibold font-medium text-gray-700 mb-2">
                  Failed Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Message when action fails..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Speaks when booking fails
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Custom Variables */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-fit sticky top-8">

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-gray-800">
                Custom Variables
              </h2>
              <p className="text-xs text-gray-400">
                Choose variables to collect during the call
              </p>
            </div>

            {/* Better Positioned Folder Dropdown */}
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Default Folder</option>
            </select>
          </div>

          {/* Variables List */}
          <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto">

            {[
              "phone_number",
              "email",
              "first_name",
              "reason_for_visit",
              "last_name",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mt-2 h-4 w-4 accent-purple-600"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {item}
                    </span>

                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                      string
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Variable description
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}
    