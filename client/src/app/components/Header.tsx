"use client";
import { useEffect, useState } from "react";
import { Bell, CalendarDays, ChevronDown, Menu, Search, SlidersHorizontal } from "lucide-react";
import type { PageId } from "./AppShell";

export default function Header({
  onToggleSidebar,
  onNavigate,
}: {
  onToggleSidebar: () => void;
  onNavigate: (p: PageId) => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="h-[72px] shrink-0 border-b border-white/10 bg-[#07101b]/95 backdrop-blur-xl flex items-center gap-4 px-6 relative z-20">
      <button
        onClick={onToggleSidebar}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        title="Alternar menu"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:flex h-11 w-[420px] items-center gap-3 rounded-lg border border-white/10 bg-black/18 px-4">
        <Search size={18} className="text-slate-500" />
        <input
          type="text"
          placeholder="Buscar frota, operador, fazenda..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/10 bg-black/18 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono text-slate-400">{time}</span>
        </div>

        <button className="hidden md:flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-black/18 px-4 text-sm font-bold text-slate-200">
          <CalendarDays size={17} className="text-slate-500" />
          Hoje
        </button>

        <button className="hidden xl:flex h-11 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-slate-950">
          <SlidersHorizontal size={17} />
          Filtros
        </button>

        <button
          onClick={() => onNavigate("alerts")}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#07101b]" />
        </button>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/18 py-1.5 pl-2 pr-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-700 text-sm font-black text-slate-950">
            VT
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-sm font-bold text-white">Vagner</div>
            <div className="text-xs text-slate-500">Administrador</div>
          </div>
          <ChevronDown size={15} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}
