"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Tractor, Shield, ArrowRight } from "lucide-react";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="h-screen w-screen flex bg-[var(--color-bg-primary)] relative overflow-hidden noise-overlay">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/[0.03] blur-[120px]" style={{ animation: 'float 20s ease-in-out infinite' }} />
        <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-blue)]/[0.04] blur-[100px]" style={{ animation: 'float 25s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--color-purple)]/[0.03] blur-[80px]" style={{ animation: 'float 18s ease-in-out infinite 2s' }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-14 z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-600 flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/25">
            <Tractor size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">AgroMonitor</h1>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--color-accent)] uppercase font-semibold">Pro</span>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-tight text-[var(--color-text-primary)]">
              Monitoramento<br />
              <span className="gradient-text">operacional agrícola</span><br />
              de alto nível
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-[15px] text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
            Plataforma completa para gestão de frotas, operadores, frentes de trabalho e análise inteligente de dados agrícolas em tempo real.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex gap-10 pt-2">
            {[
              { n: "1.250+", l: "Fazendas monitoradas" },
              { n: "8.400+", l: "Equipamentos ativos" },
              { n: "99.8%", l: "Uptime garantido" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold gradient-text font-mono tracking-tight">{s.n}</div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-medium">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-[11px] text-[var(--color-text-dim)]">
          &copy; 2024 AgroMonitor Pro. Todos os direitos reservados.
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full max-w-[380px] space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-600 flex items-center justify-center">
              <Tractor size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold">AgroMonitor <span className="gradient-text">Pro</span></span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h2>
            <p className="text-[var(--color-text-muted)] mt-2 text-sm">Entre com suas credenciais para acessar o painel</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div>
              <label className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all placeholder:text-[var(--color-text-dim)]" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Senha</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all placeholder:text-[var(--color-text-dim)]" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded-md border-[var(--color-border-bright)] accent-[var(--color-accent)] transition-colors" />
                <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">Lembrar-me</span>
              </label>
              <button type="button" className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-bright)] transition-colors font-medium">Esqueceu a senha?</button>
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 group">
              <span>Entrar no Painel</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border-bright)] to-transparent" />
            <span className="text-[11px] text-[var(--color-text-dim)] font-medium">ou entre com</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border-bright)] to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[var(--color-border-main)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-bright)] transition-all duration-200">
              <Shield size={16} className="text-[var(--color-text-muted)]" /> <span className="font-medium text-xs">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[var(--color-border-main)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-bright)] transition-all duration-200">
              <Shield size={16} className="text-[var(--color-text-muted)]" /> <span className="font-medium text-xs">Microsoft</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
