"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CirclePause,
  FileSpreadsheet,
  Flag,
  Fuel,
  Gauge,
  MapPin,
  RadioTower,
  Tractor,
  User,
  Users,
  Wrench,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData, equipment, fronts } from "../data/mock";

const kpis = [
  { label: "Equipamentos Total", value: "128", note: "100%", caption: "Total cadastrados", icon: Tractor, color: "#22c55e" },
  { label: "Trabalhando", value: "75", note: "58,6%", caption: "Em operacao", icon: Gauge, color: "#22c55e" },
  { label: "Parados", value: "32", note: "25,0%", caption: "Sem operacao", icon: CirclePause, color: "#facc15" },
  { label: "Offline", value: "21", note: "16,4%", caption: "Sem sinal", icon: RadioTower, color: "#ef4444" },
  { label: "Operadores Ativos", value: "86", note: "100%", caption: "Total ativos", icon: User, color: "#38bdf8" },
  { label: "Frentes Ativas", value: "12", note: "100%", caption: "Em andamento", icon: Flag, color: "#c084fc" },
];

const production = [
  { name: "Frente 01", value: 850 },
  { name: "Frente 02", value: 650 },
  { name: "Frente 03", value: 560 },
  { name: "Frente 04", value: 420 },
  { name: "Frente 05", value: 320 },
  { name: "Frente 06", value: 270 },
];

const availability = [
  { name: "Disponivel", value: 78.4, color: "#22c55e" },
  { name: "Indisponivel", value: 21.6, color: "#113020" },
];

const shiftData = [
  { name: "Manha", value: 45, color: "#22c55e", label: "561 h" },
  { name: "Tarde", value: 35, color: "#facc15", label: "436 h" },
  { name: "Noite", value: 20, color: "#38bdf8", label: "251 h" },
];

const alerts = [
  { icon: RadioTower, title: "Equipamento JD950 - Offline", time: "Ha 15 minutos", color: "#ef4444" },
  { icon: Wrench, title: "Manutencao vencida - TR045", time: "Ha 1 hora", color: "#facc15" },
  { icon: Fuel, title: "Baixo nivel de combustivel - TR023", time: "Ha 2 horas", color: "#f97316" },
  { icon: AlertTriangle, title: "Ocorrencia critica - TR067", time: "Ha 3 horas", color: "#ef4444" },
];

const activities = [
  { icon: FileSpreadsheet, title: "CSV importado com sucesso", text: "Arquivo: sgpa_24_05_2024.csv", time: "Ha 5 minutos" },
  { icon: Tractor, title: "Equipamento TR045 iniciou operacao", text: "Frente 02 - Talhao 12", time: "Ha 15 minutos" },
  { icon: CheckCircle2, title: "Ocorrencia #OC125 finalizada", text: "Equipamento JD950", time: "Ha 30 minutos" },
  { icon: Wrench, title: "Manutencao preventiva realizada", text: "Equipamento TR023", time: "Ha 1 hora" },
  { icon: Users, title: "Novo operador cadastrado", text: "Maria Aparecida", time: "Ha 2 horas" },
];

function MiniSparkline({ color = "#22c55e" }: { color?: string }) {
  return (
    <svg viewBox="0 0 160 48" className="h-12 w-36">
      <path
        d="M2 39 C20 18 28 31 43 17 S65 31 78 15 S98 26 112 12 S135 27 158 5"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M2 46 C30 22 52 38 78 20 S122 29 158 12 V48 H2Z" fill={color} opacity="0.12" />
    </svg>
  );
}

function DashboardCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`glass-card dashboard-card ${className}`}>{children}</section>;
}

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Visao geral das operacoes</p>
        </div>
        <div className="flex rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)] p-1">
          {["Hoje", "Semana", "Mes"].map((item, index) => (
            <button key={item} className={`h-9 rounded-md px-4 text-sm font-bold ${index === 0 ? "bg-emerald-600 text-white" : "text-[var(--color-text-secondary)]"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <DashboardCard key={kpi.label} className="p-5 min-h-[126px]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}22`, color: kpi.color }}>
                <kpi.icon size={28} />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-[var(--color-text-secondary)]">{kpi.label}</div>
                <div className="mt-1 text-3xl font-black leading-none">{kpi.value}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={kpi.color === "#ef4444" || kpi.color === "#facc15" ? "text-orange-400 font-bold" : "text-[var(--color-accent)] font-bold"}>{kpi.note}</span>
              <span className="text-[var(--color-text-secondary)]">{kpi.caption}</span>
            </div>
          </DashboardCard>
        ))}
      </section>

      <section className="grid grid-cols-1 2xl:grid-cols-[1.15fr_1fr_0.55fr] gap-4">
        <DashboardCard className="p-5 min-h-[310px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Mapa das Operacoes</h2>
            <div className="flex gap-2">
              <button className="rounded-md border border-[var(--color-border-bright)] px-4 py-2 text-sm font-bold text-[var(--color-text-secondary)]">Mapa</button>
              <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-bold text-white">Satelite</button>
            </div>
          </div>
          <div className="relative h-[250px] overflow-hidden rounded-lg border border-[var(--color-border-main)] bg-[radial-gradient(circle_at_20%_25%,rgba(34,197,94,0.24),transparent_22%),radial-gradient(circle_at_70%_35%,rgba(245,158,11,0.22),transparent_20%),linear-gradient(135deg,#122718,#07131d_55%,#17120a)]">
            <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_0_47%,rgba(245,158,11,0.25)_48%,transparent_50%),linear-gradient(115deg,transparent_0_43%,rgba(245,158,11,0.22)_44%,transparent_47%)] bg-[length:140px_90px]" />
            {[
              ["12%", "34%", "#22c55e"],
              ["24%", "55%", "#22c55e"],
              ["42%", "68%", "#facc15"],
              ["53%", "42%", "#facc15"],
              ["70%", "58%", "#ef4444"],
              ["84%", "72%", "#38bdf8"],
            ].map(([top, left, color], index) => (
              <div key={`${top}-${left}`} className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/15 flex items-center justify-center shadow-lg" style={{ top, left, background: color }}>
                <Tractor size={17} className="text-white" />
              </div>
            ))}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg bg-black/45 px-3 py-2 text-xs backdrop-blur">
              {[
                ["Trabalhando", "#22c55e"],
                ["Parado", "#facc15"],
                ["Manutencao", "#f97316"],
                ["Offline", "#ef4444"],
                ["Sem sinal", "#38bdf8"],
              ].map(([label, color]) => (
                <span key={label} className="flex items-center gap-2 text-white/85">
                  <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
            <div className="absolute right-3 top-3 grid gap-2">
              {["+", "-", "◇"].map((item) => (
                <button key={item} className="h-9 w-9 rounded-md bg-slate-950/80 text-lg font-bold text-white">{item}</button>
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="p-5 min-h-[310px]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Producao por Frente <span className="text-sm font-normal text-[var(--color-text-secondary)]">(hoje)</span></h2>
            </div>
            <button className="rounded-md border border-[var(--color-border-bright)] px-4 py-2 text-sm text-[var(--color-text-secondary)]">Hoje</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={production}>
              <CartesianGrid stroke="var(--color-border-main)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border-bright)", borderRadius: 8 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard className="p-5 min-h-[310px]">
          <h2 className="text-xl font-bold">Disponibilidade</h2>
          <div className="relative mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={availability} dataKey="value" innerRadius={74} outerRadius={94} startAngle={90} endAngle={-270} strokeWidth={0}>
                  {availability.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-black">78,4%</div>
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">Disponivel</div>
              <div className="mt-1 text-sm font-bold text-[var(--color-accent)]">+8,2% <span className="font-normal text-[var(--color-text-secondary)]">vs ontem</span></div>
            </div>
          </div>
        </DashboardCard>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1.05fr] gap-4">
        <DashboardCard className="p-5 min-h-[155px]">
          <h2 className="text-lg font-bold">Horas Trabalhadas <span className="text-sm font-normal text-[var(--color-text-secondary)]">(hoje)</span></h2>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-4xl font-black">1.248<span className="text-2xl font-bold"> h</span></div>
              <div className="mt-3 text-sm text-[var(--color-text-secondary)]"><span className="font-bold text-[var(--color-accent)]">+12,5%</span> vs ontem</div>
            </div>
            <MiniSparkline />
          </div>
        </DashboardCard>

        <DashboardCard className="p-5 min-h-[155px]">
          <h2 className="text-lg font-bold">Horas Paradas <span className="text-sm font-normal text-[var(--color-text-secondary)]">(hoje)</span></h2>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-4xl font-black">320<span className="text-2xl font-bold"> h</span></div>
              <div className="mt-3 text-sm text-[var(--color-text-secondary)]"><span className="font-bold text-red-400">+8,3%</span> vs ontem</div>
            </div>
            <MiniSparkline color="#ef4444" />
          </div>
        </DashboardCard>

        <DashboardCard className="p-5 min-h-[155px]">
          <h2 className="text-lg font-bold">Ocorrencias <span className="text-sm font-normal text-[var(--color-text-secondary)]">(hoje)</span></h2>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-4xl font-black">18</div>
              <div className="mt-3 text-sm text-[var(--color-text-secondary)]">5 criticas <span className="mx-2">•</span> 13 normais</div>
            </div>
            <ResponsiveContainer width={86} height={86}>
              <PieChart>
                <Pie data={[{ value: 5, color: "#ef4444" }, { value: 13, color: "#facc15" }]} dataKey="value" innerRadius={26} outerRadius={42} strokeWidth={0}>
                  {[{ color: "#ef4444" }, { color: "#facc15" }].map((entry) => <Cell key={entry.color} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard className="p-5 row-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Alertas Recentes</h2>
            <button className="text-sm font-bold text-[var(--color-accent)]">Ver todos</button>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.title} className="flex items-start gap-4 border-b border-[var(--color-border-main)] pb-4 last:border-0">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: `${alert.color}22`, color: alert.color }}>
                  <alert.icon size={20} />
                </div>
                <div>
                  <div className="font-bold">{alert.title}</div>
                  <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard className="p-5">
          <h2 className="text-lg font-bold">Horas por Turno <span className="text-sm font-normal text-[var(--color-text-secondary)]">(hoje)</span></h2>
          <div className="mt-5 grid grid-cols-[120px_1fr] gap-4 items-center">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={shiftData} dataKey="value" innerRadius={42} outerRadius={60} strokeWidth={0}>
                  {shiftData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {shiftData.map((item) => (
                <div key={item.name} className="flex items-center gap-3 text-sm">
                  <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                  <span className="flex-1 text-[var(--color-text-secondary)]">{item.name}</span>
                  <span className="font-bold">{item.value}%</span>
                  <span className="text-[var(--color-text-secondary)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="p-5">
          <h2 className="text-lg font-bold">Top 5 Equipamentos - Horas Trabalhadas</h2>
          <div className="mt-5 space-y-3">
            {equipment.slice(0, 5).map((item, index) => (
              <div key={item.id} className="grid grid-cols-[64px_1fr_44px] items-center gap-3 text-sm">
                <span className="font-bold text-[var(--color-text-secondary)]">{item.fleet}</span>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-border-main)]">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: `${92 - index * 8}%` }} />
                </div>
                <span className="text-right font-mono">{(12.5 - index * 0.7).toFixed(1)} h</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard className="p-5">
          <h2 className="text-lg font-bold">Top 5 Operadores - Horas Trabalhadas</h2>
          <div className="mt-5 space-y-3">
            {["Joao Silva", "Carlos Mendes", "Roberto Lima", "Paulo Santos", "Lucas Almeida"].map((name, index) => (
              <div key={name} className="grid grid-cols-[1fr_1fr_44px] items-center gap-3 text-sm">
                <span className="font-bold text-[var(--color-text-secondary)]">{name}</span>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-border-main)]">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-300" style={{ width: `${88 - index * 8}%` }} />
                </div>
                <span className="text-right font-mono">{(12.5 - index * 0.8).toFixed(1)} h</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard className="p-5">
        <h2 className="mb-5 text-lg font-bold">Atividades Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {activities.map((activity) => (
            <div key={activity.title} className="rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)] p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-[var(--color-accent)]">
                  <activity.icon size={19} />
                </div>
                <MapPin size={14} className="ml-auto text-[var(--color-accent)]" />
              </div>
              <div className="text-sm font-bold">{activity.title}</div>
              <div className="mt-1 text-xs text-[var(--color-text-secondary)]">{activity.text}</div>
              <div className="mt-4 text-xs text-[var(--color-text-secondary)]">{activity.time}</div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </motion.div>
  );
}
