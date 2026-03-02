"use client";

import { useEffect, useState } from "react";
import { Phone, Bot, Globe } from "lucide-react";
import StatsCard from "@/components/phone-numbers/stats-cards";
import PhoneNumberCard from "@/components/phone-numbers/phone-number-card";
import { getPhoneNumbersApi } from "@/network/Api";

export default function PhoneNumbersPage() {
  const [numbers, setNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const res = await getPhoneNumbersApi();
      setNumbers(res.data || []);
    } catch (err) {
      console.error("Error fetching numbers", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Phone Numbers</h1>
          <p className="text-muted-foreground text-sm">
            Manage your virtual phone numbers and AI assistants
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            + Buy New Number
          </button>
          <button className="px-4 py-2 border rounded-lg">
            + Import Number
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<Phone size={20} />}
          title="Total Numbers"
          value={numbers.length}
        />
        <StatsCard
          icon={<Bot size={20} />}
          title="Connected Assistants"
          value={numbers.filter(n => n.assistant).length}
        />
        <StatsCard
          icon={<Globe size={20} />}
          title="Countries"
          value={
            new Set(numbers.map(n => n.country)).size
          }
        />
      </div>

      {/* Numbers List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {numbers.map((num) => (
            <PhoneNumberCard key={num.id} data={num} />
          ))}
        </div>
      )}
    </div>
  );
}