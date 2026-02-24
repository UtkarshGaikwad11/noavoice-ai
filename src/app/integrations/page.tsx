"use client"

import Image from "next/image"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br  p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Integrations
        </h1>
        <p className="text-gray-500 mt-2">
          Connect third-party tools, manage API keys, and secure your webhooks.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-10">
        <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium">
          Third Parties
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">
          API Keys
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">
          Webhook Security
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Google Calendar */}
        <IntegrationCard
          name="Google Calendar"
          description="Sync your events with Google"
          logo="/integration/google.png"
        />

        {/* Outlook Calendar */}
        <IntegrationCard
          name="Outlook Calendar"
          description="Sync your events with Microsoft"
          logo="/integration/outlook.png"
        />

        {/* Cal.com */}
        <IntegrationCard
          name="Cal.com"
          description="Connect to Cal.com"
          logo="/integration/calcom.svg"
        />

        {/* Coming Soon Cards */}

        <IntegrationCard
          name="Zoho"
          description="Connect to Zoho CRM"
          logo="/integration/zoho.png"
          comingSoon
        />

        <IntegrationCard
          name="Twilio"
          description="Connect to Twilio"
          logo="/integration/twilio.svg"
          comingSoon
        />

        <IntegrationCard
          name="Slack"
          description="Connect to Slack"
          logo="/integration/slack.svg"
          comingSoon
        />

      </div>
    </div>
  )
}

/* ----------------- Reusable Card ----------------- */

function IntegrationCard({
  name,
  description,
  logo,
  comingSoon = false,
}: {
  name: string
  description: string
  logo: string
  comingSoon?: boolean
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition p-6 relative">

      {comingSoon && (
        <span className="absolute top-4 right-4 text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          Coming Soon
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={logo}
            alt={name}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </div>

    </div>
  )
}
