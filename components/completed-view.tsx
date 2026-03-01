"use client"

import { CheckCircle2, Trash2, RotateCcw } from "lucide-react"
import type { TaskData, Priority } from "./task-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  baixa: { label: "Baixa", color: "text-[#22c55e]", bg: "bg-[rgba(34,197,94,0.15)]" },
  media: { label: "Media", color: "text-[#f59e0b]", bg: "bg-[rgba(245,158,11,0.15)]" },
  alta: { label: "Alta", color: "text-[#ef4444]", bg: "bg-[rgba(239,68,68,0.15)]" },
}

interface CompletedViewProps {
  tasks: TaskData[]
  onRestore: (id: string) => void
  onDelete: (id: string) => void
}

export function CompletedView({ tasks, onRestore, onDelete }: CompletedViewProps) {
  if (tasks.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)]">
          <CheckCircle2 className="w-7 h-7 text-[#475569]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#94a3b8]">Nenhuma tarefa concluida</h3>
          <p className="text-sm text-[#475569] max-w-xs leading-relaxed">
            Tarefas concluidas aparecerao aqui.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const priority = priorityConfig[task.priority]
        return (
          <div
            key={task.id}
            className="group glass-card rounded-2xl p-5 transition-all duration-300 hover:border-[rgba(6,182,212,0.3)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[rgba(34,197,94,0.15)] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#64748b] line-through truncate">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-xs text-[#475569] line-through mt-0.5 truncate">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${priority.color} ${priority.bg}`}>
                      {priority.label}
                    </span>
                    {task.date && (
                      <span className="text-[10px] text-[#475569]">
                        {format(new Date(task.date), "dd MMM", { locale: ptBR })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onRestore(task.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-[#475569] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-[#06b6d4] hover:bg-[rgba(6,182,212,0.1)] cursor-pointer"
                  aria-label="Restaurar tarefa"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-[#475569] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] cursor-pointer"
                  aria-label="Excluir definitivamente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
