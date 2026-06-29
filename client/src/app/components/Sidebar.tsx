"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
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

const mainItems: { id: PageId; icon: React.ElementType; label: string; badge?: number }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "equipment", icon: Tractor, label: "Equipamentos" },
  { id: "operators", icon: Users, label: "Operadores" },
  { id: "farms", icon: TreePine, label: "Fazendas" },
  { id: "plots", icon: MapPin, label: "Talhoes" },
  { id: "map", icon: Map, label: "Mapa" },
  { id: "alerts", icon: AlertTriangle, label: "Alertas", badge: 8 },
  { id: "maintenance", icon: Wrench, label: "Manutencoes" },
  { id: "indicators", icon: BarChart3, label: "Indicadores" },
  { id: "reports", icon: FileText, label: "Relatorios" },
  { id: "settings", icon: Settings, label: "Configuracoes" },
];

const toolItems: { id: PageId; icon: React.ElementType; label: string }[] = [
  { id: "csv", icon: Upload, label: "Importar CSV" },
  { id: "ai", icon: BrainCircuit, label: "Agro IA" },
];

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { icon: React.ElementType; label: string; badge?: number };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-sm transition-colors ${
        active ? "bg-emerald-500/12 text-white" : "text-slate-400 hover:bg-white/[0.045] hover:text-white"
      }`}
    >
      {active ? <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" /> : null}
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? "bg-emerald-500/18 text-emerald-300" : "bg-white/[0.035] text-slate-500 group-hover:text-white"}`}>
        <item.icon size={19} />
      </span>
      <span className="flex-1 text-left font-semibold">{item.label}</span>
      {item.badge ? <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-black text-white">{item.badge}</span> : null}
    </button>
  );
}

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
      initial={{ x: -292 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="relative flex h-screen w-[292px] shrink-0 flex-col overflow-hidden border-r border-white/10 bg-[#07101b]"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-500/12 to-transparent" />

      <div className="relative z-10 flex h-[86px] items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20">
          <Tractor size={25} />
        </div>
        <div>
          <div className="text-xl font-black tracking-tight">AgroMonitor</div>
          <div className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-300">Operacional</div>
        </div>
      </div>

      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600">Operacao</div>
        <div className="space-y-1">
          {mainItems.map((item) => (
            <NavButton key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
          ))}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600">Ferramentas</div>
          <div className="space-y-1">
            {toolItems.map((item) => (
              <NavButton key={item.id} item={item} active={currentPage === item.id} onClick={() => onNavigate(item.id)} />
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 border-t border-white/10 p-4">
        <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/8 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold">
            <ShieldCheck size={17} className="text-emerald-300" />
            Sistema online
          </div>
          <div className="text-xs leading-5 text-slate-400">API, banco e painel monitorados para operacao diaria.</div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("demoMode");
            window.location.reload();
          }}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={16} /> Sair
        </button>
      </div>
    </motion.aside>
  );
}
