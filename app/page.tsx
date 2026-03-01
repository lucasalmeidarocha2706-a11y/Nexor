"use client"

import Link from "next/link"
import {
  Zap,
  CheckCircle2,
  Calendar,
  Bell,
  Shield,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Sparkles,
} from "lucide-react"

const benefits = [
  {
    icon: CheckCircle2,
    title: "Tarefas Inteligentes",
    description:
      "Organize com prioridades, datas e categorias. Visualize o que importa primeiro.",
  },
  {
    icon: Calendar,
    title: "Agenda Integrada",
    description:
      "Veja seus compromissos no calendario e nunca perca um prazo importante.",
  },
  {
    icon: Bell,
    title: "Notificacoes",
    description:
      "Receba alertas no momento certo para manter o foco e a produtividade.",
  },
  {
    icon: BarChart3,
    title: "Metricas de Progresso",
    description:
      "Acompanhe sua evolucao com graficos e insights sobre sua produtividade.",
  },
]

const stats = [
  { value: "10k+", label: "Usuarios ativos" },
  { value: "1M+", label: "Tarefas concluidas" },
  { value: "99.9%", label: "Uptime" },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050a18] via-[#0a1628] to-[#020617]" />

      {/* Ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[rgba(6,182,212,0.05)] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[rgba(59,130,246,0.05)] blur-[150px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 lg:px-16 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] neon-glow-cyan">
              <Zap className="w-4.5 h-4.5 text-[#020617]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
              NEXOR
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-medium text-[#94a3b8] rounded-xl transition-all duration-300 hover:text-[#06b6d4] hover:bg-[rgba(6,182,212,0.08)]"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#020617] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Comecar Agora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-20 lg:pt-28 lg:pb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.05)] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span className="text-xs font-medium text-[#06b6d4]">
              Produtividade redefinida
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance max-w-4xl leading-[1.1]">
            <span className="text-[#e0f0ff]">Organize. Priorize.</span>
            <br />
            <span className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent text-glow-cyan">
              Conquiste.
            </span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-[#64748b] max-w-2xl text-pretty leading-relaxed">
            O NEXOR transforma a maneira como voce gerencia tarefas e
            compromissos. Inteligencia e simplicidade em uma interface premium.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#020617] transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Comecar Gratuitamente
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-[#94a3b8] rounded-2xl border border-[rgba(6,182,212,0.15)] transition-all duration-300 hover:text-[#06b6d4] hover:border-[rgba(6,182,212,0.4)] hover:bg-[rgba(6,182,212,0.05)]"
            >
              Ver Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-[#475569] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#e0f0ff] text-balance">
              Tudo que voce precisa para ser{" "}
              <span className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                mais produtivo
              </span>
            </h2>
            <p className="mt-4 text-[#64748b] max-w-xl mx-auto leading-relaxed">
              Ferramentas poderosas em uma interface intuitiva e elegante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(6,182,212,0.15)] to-[rgba(59,130,246,0.15)] border border-[rgba(6,182,212,0.1)] mb-5 transition-all duration-300 group-hover:from-[rgba(6,182,212,0.25)] group-hover:to-[rgba(59,130,246,0.25)]">
                  <benefit.icon className="w-5 h-5 text-[#06b6d4]" />
                </div>
                <h3 className="text-base font-bold text-[#e0f0ff] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interface Preview */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#e0f0ff] text-balance">
                Uma interface que voce vai{" "}
                <span className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                  amar usar
                </span>
              </h2>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="glass-card rounded-3xl p-1.5 neon-glow-cyan">
              <div className="rounded-2xl bg-[rgba(5,10,24,0.9)] p-6 lg:p-8">
                {/* Mock header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#020617]" />
                    </div>
                    <span className="text-sm font-bold text-[#e0f0ff]">NEXOR Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
                    <span className="text-xs text-[#475569]">3 tarefas ativas</span>
                  </div>
                </div>
                {/* Mock task items */}
                <div className="space-y-3">
                  {[
                    { title: "Revisar proposta comercial", priority: "Alta", color: "#ef4444" },
                    { title: "Reuniao com equipe de design", priority: "Media", color: "#f59e0b" },
                    { title: "Atualizar documentacao do projeto", priority: "Baixa", color: "#22c55e" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl border border-[rgba(6,182,212,0.1)] bg-[rgba(10,20,50,0.5)] px-5 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md border border-[rgba(6,182,212,0.3)]" />
                        <span className="text-sm text-[#e0f0ff]">{item.title}</span>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}20`,
                        }}
                      >
                        {item.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-10 lg:p-14 neon-glow-cyan">
              <Shield className="w-10 h-10 text-[#06b6d4] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#e0f0ff] text-balance mb-4">
                Pronto para transformar sua produtividade?
              </h2>
              <p className="text-[#64748b] max-w-lg mx-auto leading-relaxed mb-8">
                Junte-se a milhares de profissionais que ja usam o NEXOR para
                organizar suas rotinas e alcancar resultados.
              </p>
              <Link
                href="/login"
                className="group inline-flex items-center gap-2.5 px-10 py-4 text-base font-bold rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#020617] transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Comecar Agora
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 lg:px-16 py-8 border-t border-[rgba(6,182,212,0.08)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#06b6d4]" />
              <span className="text-sm font-bold bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                NEXOR
              </span>
            </div>
            <p className="text-xs text-[#475569]">
              &copy; 2026 NEXOR. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
