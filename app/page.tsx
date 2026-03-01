"use client"

import { useState } from "react"
import { NexorHeader } from "@/components/nexor-header"
import { TaskForm, type TaskData } from "@/components/task-form"
import { TaskCard } from "@/components/task-card"
import { EmptyState } from "@/components/empty-state"
import { ListChecks } from "lucide-react"

export default function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  function handleAddTask(task: TaskData) {
    setTasks((prev) => [task, ...prev])
  }

  function handleComplete(id: string) {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setCompletedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 500)
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const activeTasks = tasks.filter((t) => !completedIds.has(t.id))

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050a18] via-[#0a1628] to-[#020617]" />

      {/* Ambient glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(6,182,212,0.04)] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(59,130,246,0.04)] blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-3xl px-4 py-8 space-y-6">
        <NexorHeader activeTaskCount={activeTasks.length} />

        <div className="grid grid-cols-1 gap-6">
          <TaskForm onAddTask={handleAddTask} />

          <section className="space-y-4">
            <div className="flex items-center gap-2.5 px-1">
              <ListChecks className="w-5 h-5 text-[#06b6d4]" />
              <h2 className="text-lg font-bold text-[#e0f0ff]">Suas Tarefas</h2>
              {activeTasks.length > 0 && (
                <span className="ml-auto text-xs font-medium text-[#475569] glass-card rounded-lg px-2.5 py-1">
                  {activeTasks.length} {activeTasks.length === 1 ? "pendente" : "pendentes"}
                </span>
              )}
            </div>

            {activeTasks.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {activeTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`transition-all duration-500 ${
                      completedIds.has(task.id)
                        ? "opacity-0 scale-95 translate-x-4"
                        : "opacity-100 scale-100 translate-x-0"
                    }`}
                  >
                    <TaskCard
                      task={task}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
