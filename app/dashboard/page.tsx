"use client"

import { useState, useMemo } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsBar } from "@/components/stats-bar"
import { TaskForm, type TaskData } from "@/components/task-form"
import { TaskCard } from "@/components/task-card"
import { CompletedView } from "@/components/completed-view"
import { AgendaView } from "@/components/agenda-view"
import { EmptyState } from "@/components/empty-state"
import { ListChecks, Plus } from "lucide-react"
import { isPast, isToday, parseISO } from "date-fns"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>([])
  const [completingIds, setCompletingIds] = useState<Set<string>>(new Set())

  function handleAddTask(task: TaskData) {
    setTasks((prev) => [task, ...prev])
    setShowForm(false)
  }

  function handleComplete(id: string) {
    setCompletingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setTimeout(() => {
      const task = tasks.find((t) => t.id === id)
      if (task) {
        setCompletedTasks((prev) => [task, ...prev])
      }
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setCompletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 500)
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleRestore(id: string) {
    const task = completedTasks.find((t) => t.id === id)
    if (task) {
      setTasks((prev) => [task, ...prev])
      setCompletedTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  function handleDeleteCompleted(id: string) {
    setCompletedTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const overdueCount = useMemo(() => {
    return tasks.filter((t) => {
      if (!t.date) return false
      try {
        const d = parseISO(t.date)
        return isPast(d) && !isToday(d)
      } catch {
        return false
      }
    }).length
  }, [tasks])

  const agendaTasks = useMemo(() => {
    return tasks.filter((t) => t.date)
  }, [tasks])

  const activeTasks = tasks.filter((t) => !completingIds.has(t.id))

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050a18] via-[#0a1628] to-[#020617]" />

      {/* Ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(6,182,212,0.04)] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(59,130,246,0.04)] blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeCounts={{
            active: tasks.length,
            completed: completedTasks.length,
            agenda: agendaTasks.length,
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6 pb-24 lg:pb-6 space-y-6 max-w-5xl mx-auto w-full">
            {/* Header */}
            <DashboardHeader
              activeTab={activeTab}
              onToggleSidebar={() => setSidebarOpen(true)}
              onToggleForm={() => setShowForm(!showForm)}
              showForm={showForm}
            />

            {/* Stats */}
            <StatsBar
              active={tasks.length}
              completed={completedTasks.length}
              overdue={overdueCount}
            />

            {/* Tab content */}
            {activeTab === "active" && (
              <div className="space-y-5">
                {/* Form */}
                {showForm && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <TaskForm onAddTask={handleAddTask} />
                  </div>
                )}

                {/* Task list */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5 px-1">
                    <ListChecks className="w-5 h-5 text-[#06b6d4]" />
                    <h2 className="text-base font-bold text-[#e0f0ff]">
                      Suas Tarefas
                    </h2>
                    {activeTasks.length > 0 && (
                      <span className="ml-auto text-xs font-medium text-[#475569] glass-card rounded-lg px-2.5 py-1">
                        {activeTasks.length}{" "}
                        {activeTasks.length === 1 ? "pendente" : "pendentes"}
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
                            completingIds.has(task.id)
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
            )}

            {activeTab === "completed" && (
              <CompletedView
                tasks={completedTasks}
                onRestore={handleRestore}
                onDelete={handleDeleteCompleted}
              />
            )}

            {activeTab === "agenda" && <AgendaView tasks={agendaTasks} />}
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      {activeTab === "active" && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-5 z-30 lg:hidden flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] text-[#020617] shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Adicionar tarefa"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 lg:hidden glass-card border-t border-[rgba(6,182,212,0.1)]">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { id: "active", label: "Tarefas", icon: ListChecks },
            {
              id: "completed",
              label: "Concluidas",
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
            },
            {
              id: "agenda",
              label: "Agenda",
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              ),
            },
          ].map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#06b6d4]"
                    : "text-[#475569]"
                }`}
              >
                <item.icon />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-[#06b6d4]" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
