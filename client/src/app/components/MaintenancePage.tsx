"use client";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Wrench } from "lucide-react";

const maintenance = [
  { fleet: "TR045", title: "Preventiva 500h", status: "Vencida", due: "Ontem", priority: "critica" },
  { fleet: "TR023", title: "Troca de oleo", status: "Programada", due: "Amanha", priority: "media" },
  { fleet: "JD950", title: "Revisao eletrica", status: "Em execucao", due: "Hoje", priority: "alta" },
  { fleet: "PL012", title: "Calibracao de plantio", status: "Concluida", due: "Hoje", priority: "baixa" },
];

export default function MaintenancePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manutencoes</h1>
          <p className="mt-1 text-base text-[var(--color-text-secondary)]">Controle preventivas, corretivas e vencimentos da frota.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Wrench size={18} /> Nova manutencao</button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Vencidas", value: "3", icon: CalendarClock, color: "#ef4444" },
          { label: "Programadas", value: "12", icon: Wrench, color: "#facc15" },
          { label: "Concluidas no mes", value: "28", icon: CheckCircle2, color: "#22c55e" },
        ].map((item) => (
          <div key={item.label} className="glass-card dashboard-card p-6">
            <item.icon size={28} style={{ color: item.color }} />
            <div className="mt-4 text-4xl font-black">{item.value}</div>
            <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.label}</div>
          </div>
        ))}
      </section>

      <div className="glass-card dashboard-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Frota</th><th>Servico</th><th>Status</th><th>Prazo</th><th>Prioridade</th></tr>
          </thead>
          <tbody>
            {maintenance.map((item) => (
              <tr key={item.fleet}>
                <td><span className="font-mono font-black text-[var(--color-accent)]">{item.fleet}</span></td>
                <td><span className="font-bold text-[var(--color-text-primary)]">{item.title}</span></td>
                <td>{item.status}</td>
                <td>{item.due}</td>
                <td><span className="badge bg-[var(--color-amber)]/15 text-[var(--color-amber)]">{item.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
