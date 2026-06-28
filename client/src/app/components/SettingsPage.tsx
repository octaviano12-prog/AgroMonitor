"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Bell, Palette, Database, Globe, Key, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "data", label: "Dados", icon: Database },
  { id: "integrations", label: "Integrações", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-[22px] font-bold tracking-tight">Configurações</h1>
        <p className="text-[12px] text-[var(--color-text-dim)] mt-1">Gerencie seu perfil, segurança e preferências</p>
      </div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all ${activeTab === t.id ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-muted)]"}`}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-[14px] font-bold">Dados do Perfil</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-blue)]/20 flex items-center justify-center text-[18px] font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/10">AP</div>
                <div>
                  <button className="text-[12px] px-3 py-2 rounded-lg border border-[var(--color-border-main)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] font-medium transition-colors">Alterar foto</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Nome completo", value: "Antônio Pereira", type: "text" },
                  { label: "Email", value: "antonio@fazenda.com", type: "email" },
                  { label: "Telefone", value: "(34) 99999-0001", type: "tel" },
                  { label: "Cargo", value: "Administrador", type: "text" },
                  { label: "Empresa", value: "Fazenda Boa Vista Ltda", type: "text" },
                  { label: "Timezone", value: "America/Sao_Paulo (UTC-3)", type: "text" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">{f.label}</label>
                    <input type={f.type} defaultValue={f.value} className="w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50 transition-colors" />
                  </div>
                ))}
              </div>
              <button className="btn-primary flex items-center gap-2"><Save size={14} /> Salvar alterações</button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-[14px] font-bold">Alterar Senha</h3>
                <div className="grid grid-cols-1 gap-4 max-w-md">
                  {["Senha atual", "Nova senha", "Confirmar nova senha"].map((l, i) => (
                    <div key={i}>
                      <label className="text-[10px] text-[var(--color-text-dim)] block mb-1.5 font-semibold uppercase tracking-wider">{l}</label>
                      <input type="password" className="w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="btn-primary flex items-center gap-2"><Key size={14} /> Atualizar senha</button>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-[14px] font-bold mb-4">Autenticação em Dois Fatores (2FA)</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Adicione uma camada extra de segurança</p>
                    <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">Usar aplicativo autenticador (Google Authenticator, Authy)</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-[12px] font-semibold hover:bg-[var(--color-accent)]/10 transition-colors">Ativar 2FA</button>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-[14px] font-bold mb-4">Sessões Ativas</h3>
                <div className="space-y-2">
                  {[
                    { device: "Chrome · Windows", location: "Uberaba, MG", time: "Agora", current: true },
                    { device: "Safari · iPhone", location: "Uberaba, MG", time: "2h atrás", current: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
                      <div>
                        <div className="text-[12px] font-medium">{s.device} {s.current && <span className="text-[var(--color-accent)] font-semibold">(Sessão atual)</span>}</div>
                        <div className="text-[10px] text-[var(--color-text-dim)] font-medium">{s.location} · {s.time}</div>
                      </div>
                      {!s.current && <button className="text-[12px] text-[var(--color-danger)] hover:underline font-medium">Encerrar</button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab !== "profile" && activeTab !== "security") && (
            <div className="glass-card p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-hover)] flex items-center justify-center mx-auto mb-3">
                {tabs.find(t => t.id === activeTab)?.icon && (() => { const I = tabs.find(t => t.id === activeTab)!.icon; return <I size={20} className="text-[var(--color-text-dim)]" />; })()}
              </div>
              <p className="text-[13px] text-[var(--color-text-dim)] font-medium">Configurações de {tabs.find(t => t.id === activeTab)?.label}</p>
              <p className="text-[11px] text-[var(--color-text-dim)] mt-1">Em desenvolvimento</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
