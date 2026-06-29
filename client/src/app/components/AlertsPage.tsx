"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Bell, RadioTower, Wrench } from "lucide-react";

const alerts = [
  { icon: RadioTower, title: "JD950 offline", text: "Sem sinal ha 18 minutos", level: "Critico" },
  { icon: Wrench, title: "TR045 com manutencao vencida", text: "Preventiva 500h ultrapassada", level: "Alta" },
  { icon: AlertTriangle, title: "Velocidade acima do limite", text: "Talhao B2 por 4 minutos", level: "Media" },
  { icon: Bell, title: "Nova ocorrencia registrada", text: "Operador solicitou suporte", level: "Baixa" },
];

export default function AlertsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Alertas</h1>
        <p className="mt-1 text-base text-[var(--color-text-secondary)]">Eventos que exigem atencao operacional.</p>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-4">
        <div className="glass-card dashboard-card p-6">
          <div className="text-sm text-[var(--color-text-secondary)]">Alertas abertos</div>
          <div className="mt-3 text-6xl font-black">18</div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--color-border-main)]">
            <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500" />
          </div>
          <div className="mt-4 text-sm text-[var(--color-text-secondary)]">5 criticos, 7 altos, 6 em observacao</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <div key={alert.title} className="glass-card dashboard-card p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center">
                  <alert.icon size={23} />
                </div>
                <div>
                  <div className="font-black">{alert.title}</div>
                  <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{alert.text}</div>
                  <span className="mt-4 inline-flex rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">{alert.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
