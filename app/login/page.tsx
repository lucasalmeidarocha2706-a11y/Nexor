"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.")
      return
    }

    setLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050a18] via-[#0a1628] to-[#020617]" />

      {/* Ambient glow */}
      <div className="fixed top-[-30%] left-[20%] w-[500px] h-[500px] rounded-full bg-[rgba(6,182,212,0.06)] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-30%] right-[20%] w-[500px] h-[500px] rounded-full bg-[rgba(59,130,246,0.06)] blur-[150px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] neon-glow-cyan mb-5">
            <Zap className="w-7 h-7 text-[#020617]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent text-glow-cyan">
              NEXOR
            </span>
          </h1>
          <p className="text-sm text-[#64748b] mt-2">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-8 space-y-6"
        >
          {error && (
            <div className="rounded-xl border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.08)] px-4 py-3 text-sm text-[#fca5a5]">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#94a3b8]"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] pl-11 pr-4 py-3.5 text-sm text-[#e0f0ff] placeholder:text-[#475569] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#94a3b8]"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] pl-11 pr-12 py-3.5 text-sm text-[#e0f0ff] placeholder:text-[#475569] outline-none transition-all duration-300 focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4]/30 focus:bg-[rgba(6,182,212,0.08)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors cursor-pointer"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] px-6 py-3.5 text-sm font-bold text-[#020617] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                Entrar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-[#475569]">
              Ainda nao tem conta?{" "}
              <Link
                href="/login"
                className="text-[#06b6d4] font-medium hover:underline transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </form>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors"
          >
            Voltar para o inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
