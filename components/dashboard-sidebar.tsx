"use client"

import Link from "next/link"
import {
  Zap,
  LayoutDashboard,
  CheckCircle2,
  Calendar,
  Settings,
  LogOut,
  X,
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  activeCounts: { active: number; completed: number; agenda: number }
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { id: "active", label: "Tarefas Ativas", icon: LayoutDashboard },
  { id: "completed", label: "Concluidas", icon: CheckCircle2 },
  { id: "agenda", label: "Agenda", icon: Calendar },
]

export function DashboardSidebar({
  activeTab,
  onTabChange,
  activeCounts,
  isOpen,
  onClose,
}: SidebarProps) {
  const countMap: Record<string, number> = {
    active: activeCounts.active,
    completed: activeCounts.completed,
    agenda: activeCounts.agenda,
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 glass-card border-r border-[rgba(6,182,212,0.1)] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(6,182,212,0.08)]">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] neon-glow-cyan">
              <Zap className="w-4.5 h-4.5 text-[#020617]" />
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
              NEXOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-[#64748b] hover:text-[#e0f0ff] hover:bg-[rgba(6,182,212,0.1)] transition-all cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-3">
            Navegacao
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[rgba(6,182,212,0.15)] to-[rgba(59,130,246,0.1)] text-[#06b6d4] border border-[rgba(6,182,212,0.2)] shadow-[0_0_15px_rgba(6,182,212,0.08)]"
                    : "text-[#64748b] hover:text-[#94a3b8] hover:bg-[rgba(6,182,212,0.05)]"
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
                <span className="flex-1 text-left">{item.label}</span>
                {countMap[item.id] > 0 && (
                  <span
                    className={`text-xs font-bold rounded-md px-2 py-0.5 ${
                      isActive
                        ? "bg-[rgba(6,182,212,0.2)] text-[#06b6d4]"
                        : "bg-[rgba(100,116,139,0.15)] text-[#64748b]"
                    }`}
                  >
                    {countMap[item.id]}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 py-4 border-t border-[rgba(6,182,212,0.08)] space-y-1.5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#64748b] hover:text-[#94a3b8] hover:bg-[rgba(6,182,212,0.05)] transition-all cursor-pointer">
            <Settings className="w-4.5 h-4.5" />
            Configuracoes
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#64748b] hover:text-[#ef4444] hover:bg-[rgba(239,68,68,0.05)] transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sair
          </Link>
        </div>
      </aside>
    </>
  )
}
