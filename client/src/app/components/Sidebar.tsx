"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Tractor, Users, TreePine, Upload, Clock, Map, BrainCircuit, FileText, Bell, Settings, LogOut, ChevronLeft, Sparkles } from "lucide-react";
import type { PageId } from "./AppShell";

const navItems: { id: PageId; icon: React.ElementType; label: string; badge?: number }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "equipment", icon: Tractor, label: "Equipamentos" },
  { id: "operators", icon: Users, label: "Operadores" },
  { id: "farms", icon: TreePine, label: "Fazendas" },
  { id: "csv", icon: Upload, label: "Upload CSV", badge: 3 },
  { id: "timeline", icon: Clock, label: "Linha do Tempo" },
  { id: "map", icon: Map, label: "Mapa" },
  { id: "ai", icon: BrainCircuit, label: "Agro IA" },
  { id: "reports", icon: FileText, label: "Relatórios" },
  { id: "notifications", icon: Bell, label: "Notificações", badge: 3 },
  { id: "settings", icon: Settings, label: "Configurações" },
];

export default function Sidebar({ currentPage, onNavigate, open }: { currentPage: PageId; onNavigate: (p: PageId) => void; open: boolean }) {
  if (!open) return null;

  return (
    <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="w-[280px] h-screen flex flex-col border-r border-[var(--color-border-main)] bg-[var(--color-bg-secondary)] shrink-0 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--color-accent)]/[0.02] to-transparent pointer-events-none" />
      
      {/* Logo */}
      <div className="h-[72px] flex items-center gap-3 px-5 py-5 border-b border-[var(--color-border-main)] relative z-10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-emerald-600 flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20">
          <Tractor size={18} className="text-white" />
        </div>
        <div>
          <div className="text-base font-bold leading-none tracking-tight">AgroMonitor</div>
          <span className="text-[9px] font-mono tracking-[0.2em] text-[var(--color-accent)] uppercase font-semibold">Professional</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 px-3 overflow-y-auto space-y-1 relative z-10">
        {navItems.map((item, idx) => {
          const active = currentPage === item.id;
          return (
            <motion.button key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all duration-200 group relative
                ${active ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"}`}
              style={active ? { background: 'rgba(16,185,129,0.08)' } : {}}>
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[var(--color-accent)]" />
              )}
              <item.icon size={17} className={active ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)] group-hover:text-[var(--color-text-muted)] transition-colors"} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${active ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"}`}>
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-main)] relative z-10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-blue)]/20 flex items-center justify-center text-xs font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/10">
            AP
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">Antônio Pereira</div>
            <div className="text-[10px] text-[var(--color-text-dim)]">Administrador</div>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-danger)] transition-colors">
          <LogOut size={14} /> Sair do sistema
        </button>
      </div>
    </motion.aside>
  );
}
