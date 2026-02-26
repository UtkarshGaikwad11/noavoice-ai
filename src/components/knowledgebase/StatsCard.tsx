import { LucideIcon } from "lucide-react"

interface Props {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}