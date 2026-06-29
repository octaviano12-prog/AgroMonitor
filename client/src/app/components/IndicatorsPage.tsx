"use client";
import { motion } from "framer-motion";
import { BarChart3, Gauge, Target, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartData } from "../data/mock";

const cards = [
  { label: "Eficiencia media", value: "91,4%", delta: "+4,2%", icon: Gauge, color: "#22c55e" },
  { label: "Meta diaria", value: "84%", delta: "420 ha", icon: Target, color: "#38bdf8" },
  { label: "Horas produtivas", value: "1.248h", delta: "+12,5%", icon: TrendingUp, color: "#a78bfa" },
  { label: "Frentes ativas", value: "12", delta: "100%", icon: BarChart3, color: "#facc15" },
];

export default function IndicatorsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Indicadores</h1>
        <p className="mt-1 text-base text-[var(--color-text-secondary)]">Acompanhe metas, eficiencia e produtividade da operacao.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card dashboard-card p-6">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ background: `${card.color}22`, color: card.color }}>
                <card.icon size={24} />
              </div>
              <span className="text-sm font-bold text-[var(--color-accent)]">{card.delta}</span>
            </div>
            <div className="mt-5 text-4xl font-black">{card.value}</div>
            <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{card.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-4">
        <div className="glass-card dashboard-card p-6">
          <h2 className="text-xl font-bold">Producao semanal por frente</h2>
          <div className="mt-6 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.dailyProduction}>
                <CartesianGrid stroke="var(--color-border-main)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--color-text-secondary)", fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 13 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 8 }} />
                <Bar dataKey="frente1" fill="#22c55e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="frente2" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="frente3" fill="#facc15" radius={[8, 8, 0, 0]} />
                <Bar dataKey="frente4" fill="#a78bfa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card dashboard-card p-6">
          <h2 className="text-xl font-bold">Prioridades do dia</h2>
          <div className="mt-6 space-y-4">
            {["Reduzir horas paradas na Frente 03", "Resolver 5 ocorrencias criticas", "Acompanhar manutencoes vencidas", "Validar importacao SGPA"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-black text-[var(--color-accent)]">{index + 1}</span>
                <span className="font-semibold text-[var(--color-text-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
