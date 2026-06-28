"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TreePine, ChevronDown, ChevronRight, Ruler, Plus } from "lucide-react";
import { farms } from "../data/mock";

export default function FarmsPage() {
  const [expanded, setExpanded] = useState<string | null>(farms[0]?.id ?? null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Fazendas & Talhões</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">{farms.length} fazendas · {farms.reduce((a, f) => a + f.plots.length, 0)} talhões</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Nova Fazenda
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Área Total", value: `${farms.reduce((a, f) => a + f.area, 0).toLocaleString()} ha`, icon: Ruler, color: "var(--color-accent)" },
          { label: "Fazendas Ativas", value: farms.length.toString(), icon: TreePine, color: "var(--color-blue)" },
          { label: "Talhões em Operação", value: farms.reduce((a, f) => a + f.plots.filter(p => p.status !== "Pousio").length, 0).toString(), icon: MapPin, color: "var(--color-amber)" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card glass-card-hover p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <s.icon size={19} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-[20px] font-bold font-mono tracking-tight">{s.value}</div>
                <div className="text-[11px] text-[var(--color-text-dim)] font-medium">{s.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Farm list */}
      <div className="space-y-3">
        {farms.map((farm) => {
          const isOpen = expanded === farm.id;
          return (
            <motion.div key={farm.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
              <button onClick={() => setExpanded(isOpen ? null : farm.id)} className="w-full p-5 flex items-center gap-4 hover:bg-[var(--color-bg-hover)] transition-colors text-left group">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/10">
                  <TreePine size={17} className="text-[var(--color-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-semibold group-hover:text-[var(--color-accent)] transition-colors">{farm.name}</h3>
                  <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5 font-medium">{farm.city}, {farm.state} · {farm.area.toLocaleString()} ha · Resp: {farm.responsible}</p>
                </div>
                <span className="badge bg-[var(--color-accent)]/10 text-[var(--color-accent)]">{farm.plots.length} talhões</span>
                {isOpen ? <ChevronDown size={14} className="text-[var(--color-text-dim)]" /> : <ChevronRight size={14} className="text-[var(--color-text-dim)]" />}
              </button>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-[var(--color-border-main)]">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Talhão</th><th>Código</th><th>Área</th><th>Cultura</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farm.plots.map((plot) => (
                        <tr key={plot.id}>
                          <td className="font-medium text-[var(--color-text-primary)]">{plot.name}</td>
                          <td className="font-mono text-[11px]">{plot.code}</td>
                          <td className="font-mono text-[11px]">{plot.area} ha</td>
                          <td className="text-[12px]">{plot.crop}</td>
                          <td>
                            <span className={`badge
                              ${plot.status === "Em cultivo" ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" :
                                plot.status === "Colheita" ? "bg-[var(--color-amber)]/10 text-[var(--color-amber)]" :
                                plot.status === "Em preparo" ? "bg-[var(--color-blue)]/10 text-[var(--color-blue)]" :
                                "bg-[var(--color-bg-hover)] text-[var(--color-text-dim)]"}`}>
                              {plot.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
