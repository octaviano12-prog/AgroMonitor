"use client";
import { motion } from "framer-motion";
import { MapPin, Sprout, Tractor, TreePine } from "lucide-react";
import { farms } from "../data/mock";

const plots = farms.flatMap((farm) => farm.plots.map((plot) => ({ ...plot, farmName: farm.name, city: farm.city })));

export default function PlotsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Talhoes</h1>
          <p className="mt-1 text-base text-[var(--color-text-secondary)]">Visao operacional dos talhoes por fazenda, cultura e status.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><MapPin size={18} /> Novo talhao</button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Talhoes cadastrados", value: plots.length, icon: MapPin },
          { label: "Em cultivo", value: plots.filter((plot) => plot.status.includes("cultivo")).length, icon: Sprout },
          { label: "Area monitorada", value: "1.305 ha", icon: TreePine },
        ].map((item) => (
          <div key={item.label} className="glass-card dashboard-card p-6">
            <item.icon size={28} className="text-[var(--color-accent)]" />
            <div className="mt-4 text-4xl font-black">{item.value}</div>
            <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {plots.map((plot) => (
          <div key={plot.id} className="glass-card dashboard-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-black">{plot.name}</div>
                <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{plot.farmName} - {plot.city}</div>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-[var(--color-accent)]">{plot.status}</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[var(--color-bg-input)] p-3">
                <div className="text-xs text-[var(--color-text-secondary)]">Codigo</div>
                <div className="mt-1 font-mono font-bold">{plot.code}</div>
              </div>
              <div className="rounded-lg bg-[var(--color-bg-input)] p-3">
                <div className="text-xs text-[var(--color-text-secondary)]">Area</div>
                <div className="mt-1 font-mono font-bold">{plot.area} ha</div>
              </div>
              <div className="rounded-lg bg-[var(--color-bg-input)] p-3">
                <div className="text-xs text-[var(--color-text-secondary)]">Cultura</div>
                <div className="mt-1 font-bold">{plot.crop}</div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <Tractor size={16} className="text-[var(--color-accent)]" />
              Ultima atividade registrada hoje as 15:40
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
