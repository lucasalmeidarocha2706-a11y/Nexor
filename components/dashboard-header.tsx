"use client"

import { Menu, Plus, Search } from "lucide-react"

interface DashboardHeaderProps {
  activeTab: string
  onToggleSidebar: () => void
  onToggleForm: () => void
  showForm: boolean
}

const tabLabels: Record<string, string> = {
  active: "Tarefas Ativas",
  completed: "Concluidas",
  agenda: "Agenda",
}

export function DashboardHeader({
  activeTab,
  onToggleSidebar,
  onToggleForm,
  showForm,
}: DashboardHeaderProps) {
  const now = new Date()
  const greeting = now.getHours() < 12 ? "Bom dia" : now.getHours() < 18 ? "Boa tarde" : "Boa noite"

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl glass-card text-[#94a3b8] hover:text-[#06b6d4] transition-colors cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <p className="text-sm text-[#475569]">{greeting}</p>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#e0f0ff]">
            {tabLabels[activeTab] || "Dashboard"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            className="w-full sm:w-64 rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] pl-10 pr-4 py-2.5 text-sm text-[#e0f0ff] placeholder:text-[#475569] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30"
          />
        </div>
        {activeTab === "active" && (
          <button
            onClick={onToggleForm}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
              showForm
                ? "glass-card text-[#06b6d4] border-[rgba(6,182,212,0.3)]"
                : "bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#020617] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <Plus className={`w-4 h-4 transition-transform duration-300 ${showForm ? "rotate-45" : ""}`} />
            <span className="hidden sm:inline">
              {showForm ? "Fechar" : "Nova Tarefa"}
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
