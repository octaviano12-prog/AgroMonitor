"use client";
import { useEffect, useState } from "react";
import { Bell, CalendarDays, ChevronDown, Menu, Search, SlidersHorizontal, Sun } from "lucide-react";
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
    <header className="h-[76px] shrink-0 border-b border-[var(--color-border-main)] bg-[#050b14]/92 backdrop-blur-xl flex items-center gap-5 px-7 relative z-20">
      <button
        onClick={onToggleSidebar}
        className="h-11 w-11 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white transition-colors"
        title="Alternar menu"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 flex items-center justify-end gap-4">
        <div className="hidden lg:flex w-[430px] h-12 items-center gap-3 rounded-lg border border-[var(--color-border-bright)] bg-[var(--color-bg-input)] px-4">
          <Search size={18} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Buscar equipamentos, operadores..."
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        <button className="hidden md:flex h-12 items-center gap-3 rounded-lg border border-[var(--color-border-bright)] bg-[var(--color-bg-input)] px-4 text-sm font-bold">
          24/05/2024
          <CalendarDays size={17} className="text-[var(--color-text-secondary)]" />
        </button>

        <button className="hidden xl:flex h-12 items-center gap-3 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white">
          <SlidersHorizontal size={17} />
          Filtros
          <ChevronDown size={15} />
        </button>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">{time}</span>
        </div>

        <button className="h-11 w-11 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white transition-colors">
          <Sun size={20} />
        </button>

        <button
          onClick={() => onNavigate("notifications")}
          className="relative h-11 w-11 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white transition-colors"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-1.5 text-[10px] font-black text-white">12</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[var(--color-border-main)]">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-amber-200 to-orange-600 flex items-center justify-center text-sm font-black text-slate-950">
            VT
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-sm font-bold">Vagner Tavares</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Administrador</div>
          </div>
          <ChevronDown size={16} className="text-[var(--color-text-secondary)]" />
        </div>
      </div>
    </header>
  );
}
