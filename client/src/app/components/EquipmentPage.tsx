"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Eye, Edit, Wrench } from "lucide-react";
import { equipment } from "../data/mock";

const typeFilters = ["Todos", "Trator", "Colheitadeira", "Pulverizador", "Plantadeira", "Drone"];
const statusFilters = ["Todos", "Trabalhando", "Online", "Offline", "Manutenção"];

export default function EquipmentPage() {
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filtered = equipment.filter(eq => {
    if (typeFilter !== "Todos" && eq.type !== typeFilter) return false;
    if (statusFilter !== "Todos" && eq.status !== statusFilter.toLowerCase() && !(statusFilter === "Trabalhando" && eq.status === "working") && !(statusFilter === "Online" && eq.status === "online") && !(statusFilter === "Offline" && eq.status === "offline") && !(statusFilter === "Manutenção" && eq.status === "maintenance")) return false;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Equipamentos</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">{equipment.length} equipamentos cadastrados</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Novo Equipamento
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--color-border-main)] bg-[var(--color-bg-input)]">
          <Search size={14} className="text-[var(--color-text-dim)]" />
          <input type="text" placeholder="Buscar por frota, modelo, operador..." className="bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] w-full" />
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
          {typeFilters.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${typeFilter === t ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"}`}>{t}</button>
          ))}
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
          {statusFilters.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${statusFilter === s ? "bg-[var(--color-blue)]/15 text-[var(--color-blue)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Frota</th><th>Tipo</th><th>Modelo</th><th>Operador</th><th>Frente</th>
                <th>Status</th><th>Horímetro</th><th>Velocidade</th><th>Disponibilidade</th><th>Eficiência</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((eq) => (
                <tr key={eq.id} className="group cursor-pointer">
                  <td><span className="font-mono font-bold text-[var(--color-accent)]">{eq.fleet}</span></td>
                  <td><span className="badge bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]">{eq.type}</span></td>
                  <td>
                    <span className="text-[var(--color-text-primary)] font-medium">{eq.brand} {eq.model}</span>
                    <div className="text-[10px] text-[var(--color-text-dim)] mt-0.5">{eq.year} · {eq.plate}</div>
                  </td>
                  <td>{eq.operator}</td>
                  <td className="text-[12px]">{eq.front}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-lg
                      ${eq.status === "working" ? "bg-[var(--color-blue)]/10 text-[var(--color-blue)]" :
                        eq.status === "online" ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" :
                        eq.status === "maintenance" ? "bg-[var(--color-amber)]/10 text-[var(--color-amber)]" :
                        "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"}`}>
                      <span className={`pulse-dot ${eq.status === "working" ? "blue" : eq.status === "online" ? "green" : eq.status === "maintenance" ? "amber" : "red"}`} style={{ width: 5, height: 5 }} />
                      {eq.status === "working" ? "Trabalhando" : eq.status === "online" ? "Online" : eq.status === "maintenance" ? "Manutenção" : "Offline"}
                    </span>
                  </td>
                  <td className="font-mono text-[11px]">{eq.hourMeter.toLocaleString()} h</td>
                  <td className="font-mono text-[11px]">{eq.speed > 0 ? `${eq.speed} km/h` : "—"}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-12"><div className="progress-bar-fill" style={{ width: `${eq.availability}%`, background: eq.availability > 90 ? "var(--color-accent)" : eq.availability > 70 ? "var(--color-amber)" : "var(--color-danger)" }} /></div>
                      <span className="text-[11px] font-mono font-medium">{eq.availability}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-12"><div className="progress-bar-fill" style={{ width: `${eq.efficiency}%`, background: eq.efficiency > 85 ? "var(--color-accent)" : eq.efficiency > 50 ? "var(--color-amber)" : "var(--color-danger)" }} /></div>
                      <span className="text-[11px] font-mono font-medium">{eq.efficiency > 0 ? `${eq.efficiency}%` : "—"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Eye size={13} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Edit size={13} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Wrench size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-[var(--color-border-main)]">
          <span className="text-[11px] text-[var(--color-text-dim)]">Mostrando {filtered.length} de {equipment.length} equipamentos</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg text-[11px] font-medium transition-colors ${p === 1 ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
