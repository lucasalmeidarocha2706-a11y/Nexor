"use client"

import { useState } from "react"
import { Plus, CalendarDays, Flag } from "lucide-react"

export type Priority = "baixa" | "media" | "alta"

export interface TaskData {
  id: string
  title: string
  description: string
  date: string
  priority: Priority
}

interface TaskFormProps {
  onAddTask: (task: TaskData) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState<Priority>("media")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      date,
      priority,
    })

    setTitle("")
    setDescription("")
    setDate("")
    setPriority("media")
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 lg:p-8 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#3b82f6]">
          <Plus className="w-4 h-4 text-[#020617]" />
        </div>
        <h2 className="text-lg font-bold text-[#e0f0ff]">Nova Tarefa</h2>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="title" className="text-sm font-medium text-[#94a3b8]">
          Titulo
        </label>
        <input
          id="title"
          type="text"
          required
          placeholder="O que precisa ser feito?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-3 text-sm text-[#e0f0ff] placeholder:text-[#475569] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)]"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium text-[#94a3b8]">
          Descricao
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Adicione mais detalhes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-3 text-sm text-[#e0f0ff] placeholder:text-[#475569] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="date" className="flex items-center gap-1.5 text-sm font-medium text-[#94a3b8]">
            <CalendarDays className="w-3.5 h-3.5" />
            Data e Hora
          </label>
          <input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-3 text-sm text-[#e0f0ff] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)] [color-scheme:dark]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="priority" className="flex items-center gap-1.5 text-sm font-medium text-[#94a3b8]">
            <Flag className="w-3.5 h-3.5" />
            Prioridade
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-3 text-sm text-[#e0f0ff] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)] appearance-none cursor-pointer"
          >
            <option value="baixa" className="bg-[#0a1432] text-[#e0f0ff]">
              Baixa
            </option>
            <option value="media" className="bg-[#0a1432] text-[#e0f0ff]">
              Media
            </option>
            <option value="alta" className="bg-[#0a1432] text-[#e0f0ff]">
              Alta
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] px-6 py-3.5 text-sm font-bold text-[#020617] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        Adicionar Tarefa
      </button>
    </form>
  )
}
