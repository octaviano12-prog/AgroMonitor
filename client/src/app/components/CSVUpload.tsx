"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Sparkles, FileUp } from "lucide-react";

const detectedColumns = [
  { original: "FROTA_EQUIP", detected: "Frota", confidence: 98 },
  { original: "NOME_OPER", detected: "Operador", confidence: 95 },
  { original: "COORD_LAT", detected: "Latitude", confidence: 99 },
  { original: "COORD_LNG", detected: "Longitude", confidence: 99 },
  { original: "DT_APONT", detected: "Data", confidence: 97 },
  { original: "HR_APONT", detected: "Hora", confidence: 96 },
  { original: "VELOC_MED", detected: "Velocidade", confidence: 92 },
  { original: "TIPO_OP", detected: "Operação", confidence: 88 },
  { original: "STATUS_EQ", detected: "Status", confidence: 94 },
  { original: "COD_TALHAO", detected: "Talhão", confidence: 85 },
];

const sampleRows = [
  ["3201", "Carlos Silva", "-19.9173", "-44.1573", "25/06/2024", "06:25", "8.2", "Aração", "Ativo", "TA1"],
  ["3202", "Roberto Santos", "-19.9200", "-44.1600", "25/06/2024", "06:30", "7.5", "Aração", "Ativo", "TA2"],
  ["4301", "André Costa", "-19.9100", "-44.1700", "25/06/2024", "07:10", "12.0", "Pulverização", "Ativo", "TB1"],
];

const steps = ["Upload", "Detecção", "Mapeamento", "Revisão", "Importação"];

export default function CSVUpload() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setFile("SGPA_apontamentos_jun2024.csv");
    setTimeout(() => setStep(1), 500);
  }, []);

  const simulateImport = () => {
    setStep(4);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Upload Inteligente de Dados</h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-1">Processamento automatico de arquivos CSV, Excel e TXT do SGPA</p>
      </div>

      {/* Step indicator */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all duration-300
                ${i < step ? "bg-[var(--color-accent)] text-white" : i === step ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30" : "bg-[var(--color-bg-hover)] text-[var(--color-text-dim)]"}`}>
                {i < step ? <CheckCircle size={13} /> : i + 1}
              </div>
              <span className={`text-[11px] font-medium ${i <= step ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-dim)]"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-main)]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="glass-card p-12 text-center">
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
              className="border-2 border-dashed border-[var(--color-border-bright)] rounded-2xl p-12 hover:border-[var(--color-accent)]/50 transition-all cursor-pointer group"
              onClick={() => { setFile("SGPA_apontamentos_jun2024.csv"); setTimeout(() => setStep(1), 500); }}>
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Upload size={26} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="text-[16px] font-bold mb-2">Arraste seu arquivo aqui</h3>
              <p className="text-[12px] text-[var(--color-text-dim)] mb-4">ou clique para selecionar</p>
              <div className="flex items-center justify-center gap-2">
                {["CSV", "Excel", "TXT"].map(f => (
                  <span key={f} className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-[var(--color-bg-hover)] text-[var(--color-text-dim)]">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 text-left">
              <h4 className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-3">Uploads recentes</h4>
              <div className="space-y-2">
                {[
                  { name: "SGPA_apontamentos_mai2024.csv", date: "20/05/2024", records: "1.180" },
                  { name: "SGPA_apontamentos_abr2024.csv", date: "22/04/2024", records: "1.095" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] cursor-pointer transition-colors">
                    <FileText size={15} className="text-[var(--color-accent)]" />
                    <span className="text-[12px] text-[var(--color-text-secondary)] flex-1 font-medium">{f.name}</span>
                    <span className="text-[10px] text-[var(--color-text-dim)] font-mono">{f.records} registros</span>
                    <span className="text-[10px] text-[var(--color-text-dim)]">{f.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="detect" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={18} className="text-[var(--color-accent)]" />
                <div className="flex-1">
                  <h3 className="text-[13px] font-bold">{file}</h3>
                  <p className="text-[11px] text-[var(--color-text-dim)]">1.245 linhas · 10 colunas detectadas · 2.4 MB</p>
                </div>
                <span className="badge bg-[var(--color-accent)]/10 text-[var(--color-accent)]">Validado</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/15">
                <Sparkles size={15} className="text-[var(--color-accent)]" />
                <span className="text-[12px] text-[var(--color-accent)] font-medium">IA detectou automaticamente 10 colunas com 94% de confiança média</span>
              </div>
            </div>
            <div className="glass-card p-5">
              <h4 className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-3">Colunas Detectadas</h4>
              <div className="grid grid-cols-2 gap-2">
                {detectedColumns.map((col, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)]">
                    <CheckCircle size={13} className="text-[var(--color-accent)] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-[var(--color-text-dim)]">{col.original}</span>
                      <span className="text-[10px] text-[var(--color-accent)] mx-1.5">→</span>
                      <span className="text-[11px] font-medium">{col.detected}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-semibold ${col.confidence > 95 ? "text-[var(--color-accent)]" : "text-[var(--color-amber)]"}`}>{col.confidence}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg border border-[var(--color-border-main)] text-[12px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] flex items-center gap-2 font-medium"><ArrowLeft size={13} /> Voltar</button>
              <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">Confirmar Detecção <ArrowRight size={13} /></button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="map" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-[14px] font-bold mb-4">Mapeamento de Colunas</h3>
              <p className="text-[11px] text-[var(--color-text-dim)] mb-4">Revise e ajuste o mapeamento das colunas do arquivo para os campos do sistema.</p>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Coluna CSV</th><th>Campo do Sistema</th><th>Amostra</th><th>Confiança</th></tr></thead>
                  <tbody>
                    {detectedColumns.map((col, i) => (
                      <tr key={i}>
                        <td className="font-mono text-[11px]">{col.original}</td>
                        <td><span className="badge bg-[var(--color-accent)]/10 text-[var(--color-accent)]">{col.detected}</span></td>
                        <td className="text-[11px] text-[var(--color-text-dim)] font-mono">{sampleRows[0]?.[i] || "—"}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="progress-bar w-12"><div className="progress-bar-fill" style={{ width: `${col.confidence}%`, background: col.confidence > 95 ? "var(--color-accent)" : "var(--color-amber)" }} /></div>
                            <span className="text-[10px] font-mono font-semibold">{col.confidence}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/15 flex items-center gap-2">
                <AlertCircle size={13} className="text-[var(--color-amber)]" />
                <span className="text-[11px] text-[var(--color-amber)] font-medium">Nova coluna detectada: &quot;COD_TALHAO&quot; — mapeada como &quot;Talhão&quot;. Deseja salvar este layout?</span>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-[var(--color-border-main)] text-[12px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] flex items-center gap-2 font-medium"><ArrowLeft size={13} /> Voltar</button>
              <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">Salvar Mapeamento <ArrowRight size={13} /></button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-[14px] font-bold mb-4">Revisão dos Dados</h3>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Registros", value: "1.245", color: "var(--color-accent)" },
                  { label: "Equipamentos", value: "10", color: "var(--color-blue)" },
                  { label: "Operadores", value: "8", color: "var(--color-purple)" },
                  { label: "Frentes", value: "5", color: "var(--color-amber)" },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] text-center">
                    <div className="text-[18px] font-bold font-mono tracking-tight" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px] text-[var(--color-text-dim)] font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
              <h4 className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-2">Prévia dos dados</h4>
              <div className="overflow-x-auto rounded-lg border border-[var(--color-border-main)]">
                <table className="data-table">
                  <thead><tr>{detectedColumns.map((c, i) => <th key={i}>{c.detected}</th>)}</tr></thead>
                  <tbody>
                    {sampleRows.map((row, ri) => (
                      <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="font-mono text-[10px]">{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border border-[var(--color-border-main)] text-[12px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] flex items-center gap-2 font-medium"><ArrowLeft size={13} /> Voltar</button>
              <button onClick={simulateImport} className="btn-primary flex items-center gap-2"><FileUp size={13} /> Iniciar Importação</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="import" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-12 text-center">
            {progress < 100 ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                    <Sparkles size={26} className="text-[var(--color-accent)]" />
                  </motion.div>
                </div>
                <h3 className="text-[16px] font-bold mb-2">Importando dados...</h3>
                <p className="text-[12px] text-[var(--color-text-dim)] mb-6">Processando {Math.round(progress * 12.45)} de 1.245 registros</p>
                <div className="w-64 mx-auto progress-bar h-2">
                  <motion.div className="progress-bar-fill h-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-bright))" }} />
                </div>
                <p className="text-[11px] font-mono text-[var(--color-text-dim)] mt-2">{Math.round(progress)}%</p>
              </>
            ) : (
              <>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={30} className="text-[var(--color-accent)]" />
                </motion.div>
                <h3 className="text-[16px] font-bold mb-2">Importação concluída!</h3>
                <p className="text-[12px] text-[var(--color-text-dim)] mb-6">1.245 registros importados com sucesso em 4.2 segundos</p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => { setStep(0); setFile(null); setProgress(0); }} className="px-4 py-2 rounded-lg border border-[var(--color-border-main)] text-[12px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] font-medium">Novo Upload</button>
                  <button className="btn-primary">Ver Dados</button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
