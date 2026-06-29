"use client";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  Clock,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  MapPin,
  Settings,
  ShieldCheck,
  Tractor,
  TreePine,
  Upload,
  Users,
  Wrench,
} from "lucide-react";
import type { PageId } from "./AppShell";

const navItems: { id: PageId; icon: React.ElementType; label: string; badge?: number }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "equipment", icon: Tractor, label: "Equipamentos" },
  { id: "operators", icon: Users, label: "Operadores" },
  { id: "farms", icon: TreePine, label: "Fazendas" },
  { id: "csv", icon: Upload, label: "CSV / SGPA" },
  { id: "timeline", icon: Clock, label: "Monitoramento" },
  { id: "map", icon: Map, label: "Mapa" },
  { id: "ai", icon: BrainCircuit, label: "Agro IA" },
  { id: "reports", icon: FileText, label: "Relatorios" },
  { id: "notifications", icon: Bell, label: "Ocorrencias", badge: 5 },
  { id: "settings", icon: Settings, label: "Configuracoes" },
];

const secondaryItems: { id: PageId; icon: React.ElementType; label: string; badge?: number }[] = [
  { id: "dashboard", icon: BarChart3, label: "Indicadores" },
  { id: "farms", icon: MapPin, label: "Talhoes" },
  { id: "notifications", icon: Bell, label: "Alertas", badge: 8 },
  { id: "equipment", icon: Wrench, label: "Manutencoes" },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  open,
}: {
  currentPage: PageId;
  onNavigate: (p: PageId) => void;
  open: boolean;
}) {
  if (!open) return null;

  return (
    <motion.aside
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="w-[320px] h-screen shrink-0 overflow-hidden border-r border-[var(--color-border-main)] bg-[#050b14] relative flex flex-col"
    >
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 h-[92px] px-7 flex items-center gap-4 border-b border-[var(--color-border-main)]">
        <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Tractor size={25} className="text-white" />
        </div>
        <div>
          <div className="text-2xl font-black leading-none tracking-tight">
            AGRO<span className="text-white/80">MONITOR</span>
          </div>
          <div className="mt-1 text-[11px] font-black tracking-[0.28em] text-[var(--color-accent)]">PRO</div>
        </div>
      </div>

      <nav className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
        {navItems.map((item, index) => {
          const active = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.025 }}
              onClick={() => onNavigate(item.id)}
              className={`relative w-full flex items-center gap-4 rounded-lg px-5 py-4 text-[15px] transition-colors ${
                active ? "text-white font-bold" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white"
              }`}
              style={active ? { background: "linear-gradient(90deg, rgba(34,197,94,0.24), rgba(34,197,94,0.06))" } : undefined}
            >
              {active ? <span className="absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-full bg-[var(--color-accent)]" /> : null}
              <item.icon size={22} className={active ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-black text-white">{item.badge}</span>
              ) : null}
            </motion.button>
          );
        })}

        <div className="mt-3 border-t border-[var(--color-border-main)] pt-3 space-y-1.5">
          {secondaryItems.map((item) => {
            const active = currentPage === item.id;
            return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.id)}
              className={`relative w-full flex items-center gap-4 rounded-lg px-5 py-4 text-[15px] transition-colors ${
                active ? "text-white font-bold" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white"
              }`}
              style={active ? { background: "linear-gradient(90deg, rgba(34,197,94,0.18), rgba(34,197,94,0.05))" } : undefined}
            >
              {active ? <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[var(--color-accent)]" /> : null}
              <item.icon size={22} className={active ? "text-[var(--color-accent)]" : undefined} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-yellow-400 px-2 py-0.5 text-xs font-black text-black">{item.badge}</span>
              ) : null}
            </button>
            );
          })}
        </div>
      </nav>

      <div className="relative z-10 border-t border-[var(--color-border-main)] p-5">
        <div className="glass-card p-4 mb-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-bold">Status do Sistema</div>
            <ShieldCheck size={17} className="text-[var(--color-accent)]" />
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <span className="pulse-dot green" />
            Todos os sistemas operacionais
          </div>
        </div>

        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-sm font-bold text-[var(--color-accent)] border border-emerald-500/10">
            AP
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">Antonio Pereira</div>
            <div className="text-xs text-[var(--color-text-dim)]">Administrador</div>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.reload();
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-[var(--color-text-dim)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-danger)]"
        >
          <LogOut size={14} /> Sair do sistema
        </button>
      </div>
    </motion.aside>
  );
}
