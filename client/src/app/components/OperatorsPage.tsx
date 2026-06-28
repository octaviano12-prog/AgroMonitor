"use client";
import { motion } from "framer-motion";
import { Search, Plus, Star, Clock, ChevronRight } from "lucide-react";
import { operators } from "../data/mock";

export default function OperatorsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Operadores</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">{operators.length} operadores cadastrados</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Novo Operador
        </button>
      </div>

      <div className="glass-card p-4 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-input)]">
          <Search size={14} className="text-[var(--color-text-dim)]" />
          <input type="text" placeholder="Buscar por nome, matrícula, cargo..." className="bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] w-full" />
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
          {["Todos", "Sênior", "Pleno", "Júnior"].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 rounded-md text-[11px] font-medium ${i === 0 ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {operators.map((op, i) => (
          <motion.div key={op.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card glass-card-hover p-5 cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-blue)]/15 flex items-center justify-center text-[13px] font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/10">
                {op.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold truncate group-hover:text-[var(--color-accent)] transition-colors">{op.name}</h3>
                  <div className="flex items-center gap-0.5 text-[var(--color-amber)]">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-semibold">{op.rating}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5 font-medium">{op.role} · {op.shift}</p>
              </div>
              <ChevronRight size={13} className="text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--color-border-main)]">
              <div>
                <div className="text-[10px] text-[var(--color-text-dim)] font-medium">Matrícula</div>
                <div className="text-[11px] font-mono font-semibold mt-0.5">{op.registration}</div>
              </div>
              <div>
                <div className="text-[10px] text-[var(--color-text-dim)] font-medium">Supervisor</div>
                <div className="text-[11px] font-medium mt-0.5 truncate">{op.supervisor.split(" ")[0]}</div>
              </div>
              <div>
                <div className="text-[10px] text-[var(--color-text-dim)] font-medium flex items-center gap-1"><Clock size={9} /> Horas</div>
                <div className="text-[11px] font-mono font-semibold mt-0.5">{op.hoursWorked}h</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
