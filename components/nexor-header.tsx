"use client"

import { LogOut, Zap } from "lucide-react"

interface NexorHeaderProps {
  activeTaskCount: number
}

export function NexorHeader({ activeTaskCount }: NexorHeaderProps) {
  return (
    <header className="glass-card rounded-2xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] neon-glow-cyan">
          <Zap className="w-5 h-5 text-[#020617]" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent text-glow-cyan">
            NEXOR
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
          <span className="text-sm font-medium text-[#94a3b8]">
            {activeTaskCount} {activeTaskCount === 1 ? "tarefa ativa" : "tarefas ativas"}
          </span>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[#94a3b8] transition-all duration-300 hover:text-[#06b6d4] hover:bg-[rgba(6,182,212,0.1)] cursor-pointer"
          aria-label="Sair"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  )
}
