import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  value: number;
}

export default function StatsCard({ icon, title, value }: Props) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border flex items-center gap-4">
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}