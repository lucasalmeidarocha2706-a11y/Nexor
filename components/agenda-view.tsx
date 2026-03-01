"use client"

import { CalendarDays, Clock } from "lucide-react"
import type { TaskData } from "./task-form"
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AgendaViewProps {
  tasks: TaskData[]
}

function groupByDate(tasks: TaskData[]) {
  const groups: Record<string, TaskData[]> = {}

  const dated = tasks
    .filter((t) => t.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  for (const task of dated) {
    const dateKey = format(parseISO(task.date), "yyyy-MM-dd")
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(task)
  }

  return groups
}

function getDateLabel(dateStr: string) {
  const date = parseISO(dateStr)
  if (isToday(date)) return "Hoje"
  if (isTomorrow(date)) return "Amanha"
  return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })
}

const priorityColors: Record<string, string> = {
  alta: "#ef4444",
  media: "#f59e0b",
  baixa: "#22c55e",
}

export function AgendaView({ tasks }: AgendaViewProps) {
  const groups = groupByDate(tasks)
  const dateKeys = Object.keys(groups)

  if (dateKeys.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)]">
          <CalendarDays className="w-7 h-7 text-[#475569]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#94a3b8]">Agenda vazia</h3>
          <p className="text-sm text-[#475569] max-w-xs leading-relaxed">
            Adicione tarefas com data para visualizar sua agenda.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {dateKeys.map((dateKey) => {
        const dayTasks = groups[dateKey]
        const dateObj = parseISO(dateKey)
        const isOverdue = isPast(dateObj) && !isToday(dateObj)

        return (
          <div key={dateKey}>
            <div className="flex items-center gap-3 mb-3 px-1">
              <CalendarDays
                className={`w-4 h-4 ${
                  isOverdue ? "text-[#ef4444]" : isToday(dateObj) ? "text-[#06b6d4]" : "text-[#475569]"
                }`}
              />
              <h3
                className={`text-sm font-bold capitalize ${
                  isOverdue ? "text-[#ef4444]" : isToday(dateObj) ? "text-[#06b6d4]" : "text-[#94a3b8]"
                }`}
              >
                {getDateLabel(dateKey)}
                {isOverdue && (
                  <span className="ml-2 text-xs font-medium text-[#ef4444]/70">
                    Atrasado
                  </span>
                )}
              </h3>
            </div>

            <div className="space-y-2">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-[rgba(6,182,212,0.3)]"
                >
                  {/* Time indicator */}
                  <div className="flex flex-col items-center gap-0.5 min-w-[52px]">
                    <Clock className="w-3.5 h-3.5 text-[#475569]" />
                    <span className="text-xs font-mono font-medium text-[#64748b]">
                      {format(parseISO(task.date), "HH:mm")}
                    </span>
                  </div>

                  {/* Priority bar */}
                  <div
                    className="w-1 h-10 rounded-full"
                    style={{ backgroundColor: priorityColors[task.priority] || "#64748b" }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#e0f0ff] truncate">
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-[#475569] truncate mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
