"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight, Zap, Gauge, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { equipment, chartData, fronts } from "../data/mock";

const kpis = [
  { label: "Equipamentos Online", value: "7/10", change: "+2", up: true, icon: Zap, color: "var(--color-accent)", gradient: "from-[var(--color-accent)]/20 to-transparent" },
  { label: "Horas Trabalhadas", value: "142h", change: "+12%", up: true, icon: Clock, color: "var(--color-blue)", gradient: "from-[var(--color-blue)]/20 to-transparent" },
  { label: "Eficiência Média", value: "89.2%", change: "+3.1%", up: true, icon: Gauge, color: "var(--color-accent-bright)", gradient: "from-[var(--color-accent-bright)]/20 to-transparent" },
  { label: "Alertas Ativos", value: "4", change: "-2", up: false, icon: AlertTriangle, color: "var(--color-amber)", gradient: "from-[var(--color-amber)]/20 to-transparent" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const statusData = [
    { name: "Trabalhando", value: 4, color: "#3b82f6" },
    { name: "Online", value: 3, color: "#10b981" },
    { name: "Offline", value: 1, color: "#ef4444" },
    { name: "Manutenção", value: 2, color: "#f59e0b" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Dashboard Operacional</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Tempo real
            </span>
            <span>·</span>
            <span>Atualizado há 30 segundos</span>
          </p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-main)]">
          {["Hoje", "Semana", "Mês"].map((p, i) => (
            <button key={p} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all ${i === 0 ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={item} className="glass-card glass-card-hover p-5 relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}12` }}>
                  <kpi.icon size={19} style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg ${kpi.up ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "text-[var(--color-danger)] bg-[var(--color-danger)]/10"}`}>
                  {kpi.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-[26px] font-bold tracking-tight font-mono">{kpi.value}</div>
              <div className="text-[11px] text-[var(--color-text-dim)] mt-1.5 font-medium">{kpi.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Production chart */}
        <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[14px] font-bold">Produção por Frente</h3>
              <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Hectares trabalhados por dia</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-hover)] flex items-center justify-center">
              <BarChart3 size={15} className="text-[var(--color-text-dim)]" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData.dailyProduction} barGap={3}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-dim)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-dim)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 12, fontSize: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
              <Bar dataKey="frente1" fill="#10b981" radius={[6, 6, 0, 0]} name="Frente 01" />
              <Bar dataKey="frente2" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Frente 02" />
              <Bar dataKey="frente3" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Frente 03" />
              <Bar dataKey="frente4" fill="#a855f7" radius={[6, 6, 0, 0]} name="Frente 04" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status pie */}
        <motion.div variants={item} className="glass-card p-5">
          <div className="mb-4">
            <h3 className="text-[14px] font-bold">Status da Frota</h3>
            <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Distribuição atual</p>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value" strokeWidth={0}>
                {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {statusData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 8px ${d.color}60` }} />
                <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">{d.name}</span>
                <span className="text-[10px] font-mono text-[var(--color-text-dim)] ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity chart + fronts ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[14px] font-bold">Atividade por Hora</h3>
              <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Equipamentos trabalhando vs parados</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-hover)] flex items-center justify-center">
              <Activity size={15} className="text-[var(--color-text-dim)]" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData.hourlyActivity}>
              <defs>
                <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-main)" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-dim)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-dim)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="working" stackId="1" stroke="#10b981" fill="url(#gradGreen)" strokeWidth={2} name="Trabalhando" />
              <Area type="monotone" dataKey="stopped" stackId="1" stroke="#ef4444" fill="url(#gradRed)" strokeWidth={2} name="Parado" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Fronts ranking */}
        <motion.div variants={item} className="glass-card p-5">
          <div className="mb-5">
            <h3 className="text-[14px] font-bold">Ranking de Frentes</h3>
            <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Eficiência operacional</p>
          </div>
          <div className="space-y-4">
            {fronts.map((f, i) => (
              <div key={f.id} className="group">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[var(--color-text-dim)] w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold truncate">{f.name}</span>
                      <span className="text-[12px] font-mono font-bold text-[var(--color-accent)]">{chartData.efficiencyByFront[i]?.efficiency}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${chartData.efficiencyByFront[i]?.efficiency}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className="progress-bar-fill" style={{ background: `linear-gradient(90deg, var(--color-accent), var(--color-accent-bright))` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Equipment table */}
      <motion.div variants={item} className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-bold">Equipamentos Recentes</h3>
            <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Últimos apontamentos registrados</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Frota</th><th>Equipamento</th><th>Operador</th><th>Frente</th><th>Status</th><th>Velocidade</th><th>Eficiência</th><th>Atualizado</th>
              </tr>
            </thead>
            <tbody>
              {equipment.slice(0, 6).map((eq) => (
                <tr key={eq.id}>
                  <td><span className="font-mono font-bold text-[var(--color-accent)]">{eq.fleet}</span></td>
                  <td><span className="font-medium text-[var(--color-text-primary)]">{eq.brand} {eq.model}</span></td>
                  <td>{eq.operator}</td>
                  <td className="text-[12px]">{eq.front}</td>
                  <td>
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`pulse-dot ${eq.status === "working" ? "blue" : eq.status === "online" ? "green" : eq.status === "maintenance" ? "amber" : "red"}`} />
                      <span className="text-[11px] font-medium">{eq.status === "working" ? "Trabalhando" : eq.status === "online" ? "Online" : eq.status === "maintenance" ? "Manutenção" : "Offline"}</span>
                    </span>
                  </td>
                  <td><span className="font-mono text-[11px]">{eq.speed} km/h</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-14"><div className="progress-bar-fill" style={{ width: `${eq.efficiency}%`, background: eq.efficiency > 85 ? "var(--color-accent)" : eq.efficiency > 50 ? "var(--color-amber)" : "var(--color-danger)" }} /></div>
                      <span className="text-[11px] font-mono font-medium">{eq.efficiency}%</span>
                    </div>
                  </td>
                  <td className="text-[11px] text-[var(--color-text-dim)]">{eq.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
