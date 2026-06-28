"use client";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, AlertCircle, Check } from "lucide-react";
import { notifications } from "../data/mock";

const typeIcons: Record<string, React.ElementType> = { alert: AlertTriangle, info: Info, warning: AlertCircle, success: CheckCircle };
const typeColors: Record<string, string> = { alert: "var(--color-danger)", info: "var(--color-blue)", warning: "var(--color-amber)", success: "var(--color-accent)" };

export default function NotificationsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Notificacoes</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">{notifications.filter(n => !n.read).length} não lidas</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border-main)] text-[11px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] font-medium transition-colors">
          <Check size={13} /> Marcar todas como lidas
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = typeIcons[n.type];
          const color = typeColors[n.type];
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`glass-card p-4 flex items-start gap-4 cursor-pointer transition-all hover:border-[var(--color-border-bright)] ${!n.read ? "border-l-2" : ""}`}
              style={{ borderLeftColor: !n.read ? color : "transparent" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}12` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`text-[13px] ${!n.read ? "font-semibold text-[var(--color-text-primary)]" : "font-medium text-[var(--color-text-secondary)]"}`}>{n.title}</h4>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
                </div>
                <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5 font-medium">{n.message}</p>
              </div>
              <span className="text-[10px] text-[var(--color-text-dim)] shrink-0 font-mono">{n.time}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
