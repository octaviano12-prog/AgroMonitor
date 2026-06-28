"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Tractor } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/api/auth/login", { email, password: pass });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.removeItem("demoMode");
      onLogin();
    } catch {
      localStorage.setItem("demoMode", "true");
      setError("Banco/API ainda nao configurados. Abrindo modo demonstracao com salvamento local.");
      onLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(16,185,129,0.14),transparent_32%),radial-gradient(circle_at_72%_70%,rgba(59,130,246,0.13),transparent_34%)]" />

      <main className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex flex-col justify-between px-8 py-8 lg:px-16 lg:py-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-700 flex items-center justify-center shadow-xl shadow-emerald-950/40">
              <Tractor size={28} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight">AgroMonitor</div>
              <div className="text-xs font-mono tracking-[0.38em] text-[var(--color-accent)] font-bold">PRO</div>
            </div>
          </div>

          <div className="max-w-4xl py-12">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-accent)] mb-7">
                <ShieldCheck size={17} /> Gestao operacional agricola
              </p>
              <h1 className="text-[52px] leading-[1.02] lg:text-[78px] font-black tracking-tight max-w-5xl">
                Monitoramento agricola com escala de operacao real.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--color-text-secondary)]">
                Controle frota, operadores, fazendas, apontamentos e indicadores em um painel grande, legivel e pronto para o campo.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                ["1.250+", "Fazendas monitoradas"],
                ["8.400+", "Equipamentos ativos"],
                ["99.8%", "Disponibilidade"],
              ].map(([value, label]) => (
                <div key={label} className="border border-[var(--color-border-main)] bg-[var(--color-bg-card)]/70 rounded-lg p-5">
                  <div className="text-4xl font-black font-mono gradient-text">{value}</div>
                  <div className="text-sm text-[var(--color-text-secondary)] mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-[var(--color-text-dim)]">AgroMonitor Pro - pronto para MySQL e Hostinger Node.js</div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 lg:px-14">
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            onSubmit={(event) => { event.preventDefault(); handleLogin(); }}
            className="w-full max-w-[520px] rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-bg-card)]/92 p-8 shadow-2xl shadow-black/30"
          >
            <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)]/12 text-[var(--color-accent)] flex items-center justify-center mb-7">
              <LockKeyhole size={26} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Acessar painel</h2>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              Entre com seu usuario. Sem banco configurado, o sistema abre em modo demonstracao.
            </p>

            <div className="space-y-5 mt-8">
              <label className="block">
                <span className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@agromonitor.pro"
                  className="w-full h-14 px-4 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-base outline-none focus:border-[var(--color-accent)]"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Senha</span>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(event) => setPass(event.target.value)}
                    placeholder="admin123"
                    className="w-full h-14 px-4 pr-12 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-base outline-none focus:border-[var(--color-accent)]"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>
            </div>

            {error && <p className="mt-5 rounded-lg bg-[var(--color-amber)]/10 border border-[var(--color-amber)]/20 px-4 py-3 text-sm text-[var(--color-amber)]">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full h-14 mt-7 flex items-center justify-center gap-3 disabled:opacity-60">
              {loading ? "Entrando..." : "Entrar no painel"}
              <ArrowRight size={20} />
            </button>

            <div className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
              Use MySQL na Hostinger para salvar dados reais entre usuarios.
            </div>
          </motion.form>
        </section>
      </main>
    </div>
  );
}
