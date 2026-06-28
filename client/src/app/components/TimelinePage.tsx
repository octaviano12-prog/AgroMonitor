"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Move, Flag, ChevronDown, ChevronUp, Search, Calendar } from "lucide-react";
import { timelineEvents } from "../data/mock";

const statusIcons: Record<string, React.ElementType> = { working: Play, stopped: Pause, moving: Move, idle: Flag };
const statusColors: Record<string, string> = { working: "var(--color-blue)", stopped: "var(--color-amber)", moving: "var(--color-purple)", idle: "var(--color-text-dim)" };
const statusLabels: Record<string, string> = { working: "Trabalhando", stopped: "Parado", moving: "Deslocando", idle: "Inativo" };

export default function TimelinePage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [selectedFleet] = useState("3201");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-[22px] font-bold tracking-tight">Linha do Tempo</h1>
        <p className="text-[12px] text-[var(--color-text-dim)] mt-1">Histórico operacional detalhado por equipamento</p>
      </div>

      {/* Search bar */}
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)] w-44">
          <Search size={13} className="text-[var(--color-text-dim)]" />
          <input type="text" defaultValue="3201" className="bg-transparent text-[12px] outline-none text-[var(--color-text-primary)] w-full font-mono" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)]">
          <Calendar size={13} className="text-[var(--color-text-dim)]" />
          <input type="text" defaultValue="25/06/2024" className="bg-transparent text-[12px] outline-none text-[var(--color-text-primary)] w-24 font-mono" />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-[11px] text-[var(--color-text-dim)]">Frota</span>
          <span className="font-mono font-bold text-[var(--color-accent)] text-[12px]">{selectedFleet}</span>
          <span className="text-[11px] text-[var(--color-text-dim)]">· JD 8R 410</span>
          <span className="text-[11px] text-[var(--color-text-dim)]">· Op: Carlos Silva</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Primeiro Apont.", value: "06:00", color: "var(--color-accent)" },
          { label: "Último Apont.", value: "17:59", color: "var(--color-blue)" },
          { label: "Tempo Produtivo", value: "9h 15min", color: "var(--color-accent-bright)" },
          { label: "Tempo Improdutivo", value: "1h 24min", color: "var(--color-amber)" },
          { label: "Eficiência", value: "87%", color: "var(--color-accent)" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card p-3 text-center">
            <div className="text-[9px] text-[var(--color-text-dim)] uppercase tracking-wider font-semibold">{s.label}</div>
            <div className="text-[16px] font-bold font-mono mt-1 tracking-tight" style={{ color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="glass-card p-6">
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-border-bright)] via-[var(--color-border-main)] to-transparent" />
          <div className="space-y-1">
            {timelineEvents.map((event, i) => {
              const Icon = statusIcons[event.status] || Flag;
              const color = statusColors[event.status];
              const isExpanded = expandedIdx === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <div className="flex gap-4 group">
                    <div className="w-10 shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                        <Icon size={15} style={{ color }} />
                      </div>
                    </div>
                    <div className="flex-1 pb-6">
                      <button onClick={() => setExpandedIdx(isExpanded ? null : i)} className="w-full text-left">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[13px] font-bold" style={{ color }}>{event.time}</span>
                          <span className="text-[12px] text-[var(--color-text-primary)] font-medium">{event.description}</span>
                          <span className="badge text-[9px]" style={{ background: `${color}15`, color: color }}>{statusLabels[event.status]}</span>
                          {isExpanded ? <ChevronUp size={11} className="text-[var(--color-text-dim)]" /> : <ChevronDown size={11} className="text-[var(--color-text-dim)]" />}
                        </div>
                      </button>
                      {isExpanded && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-4 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(event.details).map(([key, val]) => (
                              <div key={key}>
                                <div className="text-[9px] text-[var(--color-text-dim)] uppercase tracking-wider font-semibold">{key.replace("_", " ")}</div>
                                <div className="text-[12px] font-medium mt-0.5">{val}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
