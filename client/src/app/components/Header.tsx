"use client";
import { useState, useEffect } from "react";
import { Menu, Search, Bell, Moon, Sun, ChevronDown, Command } from "lucide-react";
import type { PageId } from "./AppShell";

export default function Header({ onToggleSidebar, onNavigate }: { onToggleSidebar: () => void; onNavigate: (p: PageId) => void }) {
  const [dark, setDark] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <header className="h-14 border-b border-[var(--color-border-main)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-xl flex items-center px-5 gap-4 shrink-0 relative z-20">
      <button onClick={onToggleSidebar} className="text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] transition-colors p-1">
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 flex items-center gap-4">
        <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 ${searchOpen ? "border-[var(--color-accent)]/40 bg-[var(--color-bg-card)] shadow-lg shadow-[var(--color-accent)]/5 w-80" : "border-[var(--color-border-main)] bg-[var(--color-bg-input)] w-64"}`}>
          <Search size={14} className="text-[var(--color-text-dim)]" />
          <input type="text" placeholder="Buscar..." onFocus={() => setSearchOpen(true)} onBlur={() => setSearchOpen(false)}
            className="bg-transparent text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] outline-none w-full" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--color-bg-hover)] border border-[var(--color-border-main)]">
            <Command size={9} className="text-[var(--color-text-dim)]" />
            <span className="text-[9px] text-[var(--color-text-dim)] font-mono font-semibold">K</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Live clock */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[11px] font-mono font-medium text-[var(--color-text-muted)]">{time}</span>
        </div>

        <button onClick={() => setDark(!dark)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-muted)] transition-colors">
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button onClick={() => onNavigate("notifications")} className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-muted)] transition-colors">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--color-bg-secondary)]" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-[var(--color-border-main)] cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-blue)]/20 flex items-center justify-center text-[11px] font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/10">
            AP
          </div>
          <div className="hidden md:block">
            <div className="text-[12px] font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">Antônio</div>
          </div>
          <ChevronDown size={11} className="text-[var(--color-text-dim)]" />
        </div>
      </div>
    </header>
  );
}
