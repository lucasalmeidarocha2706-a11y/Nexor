import { Inbox } from "lucide-react"

export function EmptyState() {
  return (
    <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)]">
        <Inbox className="w-7 h-7 text-[#475569]" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-[#94a3b8]">Nenhuma tarefa ainda</h3>
        <p className="text-sm text-[#475569] max-w-xs leading-relaxed">
          Comece adicionando sua primeira tarefa e organize seu dia com eficiencia.
        </p>
      </div>
    </div>
  )
}
