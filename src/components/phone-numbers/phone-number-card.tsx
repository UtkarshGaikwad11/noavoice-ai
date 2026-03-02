import { Phone, Calendar, Bot } from "lucide-react";

export default function PhoneNumberCard({ data }: any) {
  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">

      <div>
        <p className="text-sm text-muted-foreground">
          {data.country}
        </p>

        <h2 className="text-lg font-semibold">
          {data.phone_number}
        </h2>

        {data.assistant ? (
          <p className="text-green-600 text-sm flex items-center gap-1">
            <Bot size={14} />
            Assistant Connected
          </p>
        ) : (
          <p className="text-red-500 text-sm">
            No Assistant Connected
          </p>
        )}
      </div>

      <div className="border-t pt-3 flex justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Phone size={14} />
          {data.id.slice(0, 8)}...
        </span>

        <span className="flex items-center gap-1">
          <Calendar size={14} />
          Since {data.created_at?.slice(0, 7)}
        </span>
      </div>
    </div>
  );
}