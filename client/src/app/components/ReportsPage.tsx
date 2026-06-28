"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, FileDown, Mail, Printer, Clock } from "lucide-react";

const reports = [
  { id: "1", name: "Relatório Diário de Produção", type: "Produção", format: "PDF", date: "25/06/2024", status: "Pronto" },
  { id: "2", name: "Relatório Semanal de Eficiência", type: "Eficiência", format: "Excel", date: "24/06/2024", status: "Pronto" },
  { id: "3", name: "Análise de Disponibilidade da Frota", type: "Frota", format: "PDF", date: "23/06/2024", status: "Pronto" },
  { id: "4", name: "Ranking de Operadores - Junho", type: "Operadores", format: "Excel", date: "22/06/2024", status: "Pronto" },
  { id: "5", name: "Consumo de Combustível", type: "Custos", format: "CSV", date: "21/06/2024", status: "Pronto" },
  { id: "6", name: "Mapa de Operações - Talhão A1", type: "Mapa", format: "PDF", date: "20/06/2024", status: "Gerando" },
];

const scheduled = [
  { name: "Relatório diário automático", freq: "Diário 06:00", recipients: "antonio@fazenda.com, maria@fazenda.com", next: "26/06 06:00" },
  { name: "Resumo semanal", freq: "Segunda 08:00", recipients: "antonio@fazenda.com", next: "01/07 08:00" },
  { name: "Alertas de manutenção", freq: "Tempo real", recipients: "equipe@fazenda.com", next: "Imediato" },
];

export default function ReportsPage() {
  const [tab, setTab] = useState<"reports" | "generate" | "scheduled">("reports");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Relatórios</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">Gere, visualize e agende relatórios operacionais</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><FileText size={15} /> Novo Relatório</button>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-main)] w-fit">
        {[
          { id: "reports" as const, label: "Relatórios", icon: FileText },
          { id: "generate" as const, label: "Gerar Novo", icon: FileDown },
          { id: "scheduled" as const, label: "Agendados", icon: Clock },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${tab === t.id ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"}`}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "reports" && (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead><tr><th>Nome</th><th>Tipo</th><th>Formato</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td className="font-medium text-[var(--color-text-primary)]">{r.name}</td>
                  <td><span className="badge bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]">{r.type}</span></td>
                  <td><span className={`badge font-mono ${r.format === "PDF" ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]" : r.format === "Excel" ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"}`}>{r.format}</span></td>
                  <td className="text-[11px] text-[var(--color-text-dim)]">{r.date}</td>
                  <td><span className={`badge ${r.status === "Pronto" ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "bg-[var(--color-amber)]/10 text-[var(--color-amber)]"}`}>{r.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Download size={13} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Printer size={13} /></button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"><Mail size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "generate" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-[14px] font-bold">Configurar Relatório</h3>
            <div>
              <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">Tipo de Relatório</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50">
                <option>Produção Diária</option><option>Eficiência por Frente</option><option>Disponibilidade da Frota</option><option>Ranking de Operadores</option><option>Consumo de Combustível</option><option>Resumo Operacional</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">Período</label>
              <div className="flex gap-2">
                <input type="date" defaultValue="2024-06-01" className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50" />
                <input type="date" defaultValue="2024-06-25" className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">Formato de Exportação</label>
              <div className="flex gap-2">
                {["PDF", "Excel", "CSV", "Word"].map((f, i) => (
                  <button key={f} className={`flex-1 py-2 rounded-lg text-[11px] font-semibold border ${i === 0 ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20" : "border-[var(--color-border-main)] text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)]"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">Filtros</label>
              <div className="flex flex-wrap gap-2">
                {["Frente 01", "Frente 02", "Frente 03", "Frente 04", "Frente 05"].map((f, i) => (
                  <button key={f} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium ${i < 3 ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20" : "border border-[var(--color-border-main)] text-[var(--color-text-dim)]"}`}>{f}</button>
                ))}
              </div>
            </div>
            <button className="btn-primary w-full py-3 flex items-center justify-center gap-2"><FileDown size={15} /> Gerar Relatório</button>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-[14px] font-bold mb-4">Prévia</h3>
            <div className="p-8 rounded-xl border border-dashed border-[var(--color-border-bright)] flex flex-col items-center justify-center text-center min-h-[300px]">
              <FileText size={36} className="text-[var(--color-text-dim)] mb-3" />
              <p className="text-[12px] text-[var(--color-text-dim)] font-medium">Configure os parâmetros e clique em gerar para visualizar a prévia</p>
            </div>
          </div>
        </div>
      )}

      {tab === "scheduled" && (
        <div className="space-y-3">
          {scheduled.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card glass-card-hover p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/10">
                <Mail size={17} className="text-[var(--color-accent)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-semibold">{s.name}</h4>
                <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5 font-medium">{s.freq} · {s.recipients}</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[var(--color-text-dim)] font-medium">Próximo envio</div>
                <div className="text-[12px] font-mono font-bold text-[var(--color-accent)]">{s.next}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
