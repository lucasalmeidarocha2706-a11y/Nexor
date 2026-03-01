"use client"

import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react"

interface StatsBarProps {
  active: number
  completed: number
  overdue: number
}

export function StatsBar({ active, completed, overdue }: StatsBarProps) {
  const total = active + completed
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      label: "Ativas",
      value: active,
      icon: Clock,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
    },
    {
      label: "Concluidas",
      value: completed,
      icon: CheckCircle2,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
    },
    {
      label: "Atrasadas",
      value: overdue,
      icon: AlertTriangle,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
    },
    {
      label: "Conclusao",
      value: `${rate}%`,
      icon: TrendingUp,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:border-[rgba(6,182,212,0.25)]"
        >
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{ backgroundColor: stat.bg }}
          >
            <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
          </div>
          <div>
            <p className="text-lg font-extrabold text-[#e0f0ff]">{stat.value}</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#475569]">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
