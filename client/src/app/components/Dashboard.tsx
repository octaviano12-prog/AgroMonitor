"use client";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, BarChart3, Clock, Gauge, Tractor, TrendingUp, Zap } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartData, equipment, fronts } from "../data/mock";

const kpis = [
  { label: "Equipamentos online", value: "7/10", detail: "+2 hoje", icon: Zap, color: "var(--color-accent)" },
  { label: "Horas trabalhadas", value: "142h", detail: "+12% na semana", icon: Clock, color: "var(--color-blue)" },
  { label: "Eficiencia media", value: "89.2%", detail: "+3.1% no periodo", icon: Gauge, color: "var(--color-cyan)" },
  { label: "Alertas ativos", value: "4", detail: "2 criticos", icon: AlertTriangle, color: "var(--color-amber)" },
];

const statusData = [
  { name: "Trabalhando", value: 4, color: "#3b82f6" },
  { name: "Online", value: 3, color: "#10b981" },
  { name: "Offline", value: 1, color: "#ef4444" },
  { name: "Manutencao", value: 2, color: "#f59e0b" },
];

const chartCard = "glass-card p-6 xl:p-7";

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7 w-full">
      <section className="glass-card p-7 xl:p-8 overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-4 py-2 text-sm font-semibold text-[var(--color-accent)] mb-5">
              <Activity size={17} /> Tempo real - atualizado ha 30 segundos
            </div>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight">Dashboard Operacional</h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-3xl leading-8">
              Visao executiva da operacao agricola, com frota, frentes, produtividade e alertas em uma tela mais ampla e facil de ler.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 min-w-[340px]">
            {["Hoje", "Semana", "Mes"].map((period, index) => (
              <button key={period} className={`h-12 rounded-lg text-sm font-bold ${index === 0 ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] border border-[var(--color-border-main)]"}`}>
                {period}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-card glass-card-hover p-6 min-h-[158px]">
            <div className="flex items-start justify-between gap-5">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}16`, color: kpi.color }}>
                <kpi.icon size={26} />
              </div>
              <span className="rounded-full bg-[var(--color-bg-input)] border border-[var(--color-border-main)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                {kpi.detail}
              </span>
            </div>
            <div className="mt-5 text-4xl font-black font-mono tracking-tight">{kpi.value}</div>
            <div className="mt-2 text-base font-semibold text-[var(--color-text-secondary)]">{kpi.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <div className={chartCard}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">Producao por frente</h2>
              <p className="text-base text-[var(--color-text-secondary)] mt-1">Hectares trabalhados por dia</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-hover)] flex items-center justify-center">
              <BarChart3 size={24} className="text-[var(--color-accent)]" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={chartData.dailyProduction} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-main)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 14 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 14 }} />
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 8, fontSize: 14 }} />
              <Bar dataKey="frente1" fill="#10b981" radius={[8, 8, 0, 0]} name="Frente 01" />
              <Bar dataKey="frente2" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Frente 02" />
              <Bar dataKey="frente3" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Frente 03" />
              <Bar dataKey="frente4" fill="#a855f7" radius={[8, 8, 0, 0]} name="Frente 04" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={chartCard}>
          <h2 className="text-2xl font-black">Status da frota</h2>
          <p className="text-base text-[var(--color-text-secondary)] mt-1 mb-5">Distribuicao atual dos equipamentos</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={74} outerRadius={112} paddingAngle={4} dataKey="value" strokeWidth={0}>
                {statusData.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 8, fontSize: 14 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] px-4 py-3">
                <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-[var(--color-text-secondary)]">{item.name}</span>
                <span className="ml-auto text-sm font-mono font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <div className={chartCard}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">Atividade por hora</h2>
              <p className="text-base text-[var(--color-text-secondary)] mt-1">Equipamentos trabalhando versus parados</p>
            </div>
            <TrendingUp size={26} className="text-[var(--color-accent)]" />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData.hourlyActivity}>
              <defs>
                <linearGradient id="workingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.34} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stoppedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-main)" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 14 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 14 }} />
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 8, fontSize: 14 }} />
              <Area type="monotone" dataKey="working" stroke="#10b981" fill="url(#workingGradient)" strokeWidth={3} name="Trabalhando" />
              <Area type="monotone" dataKey="stopped" stroke="#ef4444" fill="url(#stoppedGradient)" strokeWidth={3} name="Parado" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={chartCard}>
          <h2 className="text-2xl font-black">Ranking de frentes</h2>
          <p className="text-base text-[var(--color-text-secondary)] mt-1 mb-6">Eficiencia operacional</p>
          <div className="space-y-5">
            {fronts.map((front, index) => {
              const efficiency = chartData.efficiencyByFront[index]?.efficiency ?? 0;
              return (
                <div key={front.id}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] flex items-center justify-center text-sm font-mono">{index + 1}</span>
                    <span className="font-bold flex-1 truncate">{front.name}</span>
                    <span className="font-mono font-black text-[var(--color-accent)]">{efficiency}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-[var(--color-border-main)] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-cyan)]" style={{ width: `${efficiency}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="glass-card p-6 xl:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-black">Equipamentos recentes</h2>
            <p className="text-base text-[var(--color-text-secondary)] mt-1">Ultimos apontamentos registrados</p>
          </div>
          <Tractor size={28} className="text-[var(--color-accent)]" />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Frota</th><th>Equipamento</th><th>Operador</th><th>Frente</th><th>Status</th><th>Velocidade</th><th>Eficiencia</th><th>Atualizado</th></tr>
            </thead>
            <tbody>
              {equipment.slice(0, 7).map((item) => (
                <tr key={item.id}>
                  <td><span className="font-mono font-black text-[var(--color-accent)]">{item.fleet}</span></td>
                  <td><span className="font-bold text-[var(--color-text-primary)]">{item.brand} {item.model}</span></td>
                  <td>{item.operator}</td>
                  <td>{item.front}</td>
                  <td><span className="badge bg-[var(--color-blue)]/10 text-[var(--color-blue)]">{item.status === "working" ? "Trabalhando" : item.status}</span></td>
                  <td className="font-mono">{item.speed} km/h</td>
                  <td className="font-mono">{item.efficiency}%</td>
                  <td>{item.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
