"use client"

import { Check, CalendarDays, Trash2 } from "lucide-react"
import type { TaskData, Priority } from "./task-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const priorityConfig: Record<Priority, { label: string; color: string; bg: string; glow: string }> = {
  baixa: {
    label: "Baixa",
    color: "text-[#22c55e]",
    bg: "bg-[rgba(34,197,94,0.15)]",
    glow: "shadow-[0_0_8px_rgba(34,197,94,0.2)]",
  },
  media: {
    label: "Media",
    color: "text-[#f59e0b]",
    bg: "bg-[rgba(245,158,11,0.15)]",
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.2)]",
  },
  alta: {
    label: "Alta",
    color: "text-[#ef4444]",
    bg: "bg-[rgba(239,68,68,0.15)]",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.2)]",
  },
}

interface TaskCardProps {
  task: TaskData
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const priority = priorityConfig[task.priority]

  function formatDate(dateStr: string) {
    if (!dateStr) return null
    try {
      const date = new Date(dateStr)
      return format(date, "dd MMM yyyy, HH:mm", { locale: ptBR })
    } catch {
      return dateStr
    }
  }

  const formattedDate = formatDate(task.date)

  return (
    <div className="group glass-card rounded-2xl p-5 transition-all duration-300 hover:border-[rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-bold text-[#e0f0ff] truncate">
              {task.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold ${priority.color} ${priority.bg} ${priority.glow}`}
            >
              {priority.label}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-[#64748b] leading-relaxed line-clamp-2">
              {task.description}
            </p>
          )}

          {formattedDate && (
            <div className="flex items-center gap-1.5 text-xs text-[#475569]">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onComplete(task.id)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] text-[#020617] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
            aria-label="Concluir tarefa"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-[rgba(239,68,68,0.2)] text-[#64748b] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-[#ef4444] hover:border-[rgba(239,68,68,0.4)] hover:bg-[rgba(239,68,68,0.1)] hover:scale-110 cursor-pointer"
            aria-label="Excluir tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
