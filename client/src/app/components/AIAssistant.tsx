"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BarChart3, Tractor, Clock, AlertTriangle } from "lucide-react";

interface Message { role: "user" | "ai"; content: string; time: string; }

const suggestions = [
  { icon: BarChart3, text: "Qual equipamento ficou mais tempo parado?" },
  { icon: Tractor, text: "Mostrar relatório da frota 3201" },
  { icon: Clock, text: "Qual operador trabalhou mais hoje?" },
  { icon: AlertTriangle, text: "Criar resumo operacional do dia" },
];

const aiResponses: Record<string, string> = {
  "Qual equipamento ficou mais tempo parado?": "## Análise de Tempo Parado\n\nO equipamento **Frota 6201** (JD 6130J) foi o que registrou maior tempo parado nos últimos 7 dias:\n\n| Métrica | Valor |\n|---------|-------|\n| Tempo parado | 48h 32min |\n| Motivo principal | Manutenção preventiva |\n| Última operação | 24/06 às 14:20 |\n| Status atual | Em manutenção |\n\n**Recomendação**: A frota 6201 está com horímetro de 5.200h e necessita revisão no sistema hidráulico. Sugiro agendar a manutenção para esta semana.\n\n### Ranking de paradas (últimos 7 dias):\n1. Frota 6201 — 48h 32min (manutenção)\n2. Frota 4302 — 12h 15min (offline)\n3. Frota 2102 — 8h 45min (manutenção programada)",
  "Mostrar relatório da frota 3201": "## Relatório — Frota 3201 (JD 8R 410)\n\n**Operador**: Carlos Silva\n**Frente**: Frente 01 - Preparo\n**Data**: 25/06/2024\n\n### Resumo Operacional\n| Indicador | Valor |\n|-----------|-------|\n| Primeiro apontamento | 06:00 |\n| Último apontamento | 17:59 |\n| Área trabalhada | 120 ha |\n| Operação principal | Aração + Gradagem |\n| Diesel consumido | 340 L |\n| Tempo produtivo | 9h 15min |\n| Tempo improdutivo | 1h 24min |\n| Eficiência | **87%** |\n| Disponibilidade | **94%** |\n\n### Alertas do dia\n- 10:30 — Velocidade acima do padrão (11.2 km/h, limite 9 km/h) — duração: 3 min\n\n### Status: Operação dentro dos parâmetros esperados.",
  "Qual operador trabalhou mais hoje?": "## Ranking de Operadores — Hoje (25/06/2024)\n\n| Posição | Operador | Frota | Horas | Eficiência |\n|---------|----------|-------|-------|------------|\n| 1º | **João Oliveira** | 2101 | 10h 45min | 91% |\n| 2º | **Carlos Silva** | 3201 | 9h 15min | 87% |\n| 3º | **André Costa** | 4301 | 8h 50min | 89% |\n| 4º | **Marcos Souza** | 5101 | 8h 30min | 93% |\n| 5º | **Roberto Santos** | 3202 | 7h 45min | 82% |\n\nJoão Oliveira lidera com 10h45 de operação na colheitadeira S790, mantendo a maior eficiência entre os operadores seniores.",
  "Criar resumo operacional do dia": "## Resumo Operacional — 25/06/2024\n\n### Visão Geral\n- **Equipamentos ativos**: 7 de 10 (70%)\n- **Horas trabalhadas**: 142h (meta: 150h — 94.7%)\n- **Área total trabalhada**: 2.840 ha\n- **Eficiência média**: 89.2%\n\n### Por Frente de Trabalho\n| Frente | Área | Eficiência | Status |\n|--------|------|------------|--------|\n| Frente 01 - Preparo | 520 ha | 87% | ✅ No prazo |\n| Frente 02 - Colheita | 380 ha | 91% | ✅ Acima da meta |\n| Frente 03 - Pulverização | 640 ha | 89% | ✅ No prazo |\n| Frente 04 - Plantio | 290 ha | 93% | ✅ Excelente |\n| Frente 05 - Monitoramento | — | — | ⏸ Pausada |\n\n### Alertas e Ocorrências\n1. ⚠️ Frota 3201 — Excesso de velocidade no Talhão B1 (resolvido)\n2. 🔴 Frota 4302 — Offline há 3h — verificar comunicação\n3. 🟡 Frota 2102 — Manutenção preventiva agendada\n\n### Recomendações da IA\n- Reativar comunicação da Frota 4302 antes do turno da tarde\n- Programar manutenção da Frota 6201 para evitar impacto na Frente 01\n- Frente 04 apresenta melhor eficiência — considerar redistribuição de recursos",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Olá! Sou a **Agro IA**, seu assistente inteligente para análise de dados operacionais.\n\nPosso ajudar com:\n- Relatórios de equipamentos e operadores\n- Análise de produtividade e eficiência\n- Detecção de falhas e anomalias\n- Resumos operacionais\n- Sugestões de melhoria\n\nComo posso ajudar?", time: "09:00" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages(prev => [...prev, { role: "user", content: msg, time }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = aiResponses[msg] || `## Análise sobre: "${msg}"\n\nBaseado nos dados disponíveis, aqui está minha análise:\n\n- Os dados foram processados considerando o período atual\n- Foram identificados padrões relevantes para sua consulta\n- Recomendo verificar os detalhes no dashboard para visualização completa\n\n**Próximos passos sugeridos**:\n1. Consultar o dashboard para métricas em tempo real\n2. Verificar a linha do tempo dos equipamentos relevantes\n3. Revisar os indicadores de eficiência\n\nPosso ajudar com algo mais específico?`;
      setMessages(prev => [...prev, { role: "ai", content: response, time }]);
      setLoading(false);
    }, 1500);
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-[14px] font-bold mt-4 mb-2">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-[12px] font-semibold mt-3 mb-1.5 text-[var(--color-accent)]">{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <div key={i} className="flex gap-2 text-[12px] ml-2 my-0.5"><span className="text-[var(--color-accent)] mt-0.5">•</span><span>{renderInline(line.slice(2))}</span></div>;
      if (line.startsWith("| ") && line.endsWith(" |")) return null;
      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) return <div key={i} className="text-[12px] ml-2 my-0.5">{renderInline(line)}</div>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-[12px] my-0.5">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="text-[var(--color-text-primary)] font-semibold">{part.slice(2, -2)}</strong>;
      return part;
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col max-w-[1000px] mx-auto">
      <div className="mb-4">
        <h1 className="text-[22px] font-bold tracking-tight flex items-center gap-2">
          <Sparkles size={22} className="text-[var(--color-accent)]" />
          Agro IA
        </h1>
        <p className="text-[12px] text-[var(--color-text-dim)] mt-1">Assistente inteligente para análise de dados operacionais</p>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-4 min-h-0 mb-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/10" : "bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/10"}`}>
                {msg.role === "ai" ? <Sparkles size={14} className="text-[var(--color-accent)]" /> : <div className="text-[11px] font-bold text-[var(--color-blue)]">AP</div>}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "ai" ? "bg-[var(--color-bg-input)] border border-[var(--color-border-main)]" : "bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/15"}`}>
                <div>{renderMarkdown(msg.content)}</div>
                <div className="text-[10px] text-[var(--color-text-dim)] mt-2 font-medium">{msg.time}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
              <Sparkles size={14} className="text-[var(--color-accent)]" />
            </div>
            <div className="bg-[var(--color-bg-input)] border border-[var(--color-border-main)] rounded-2xl p-4 flex items-center gap-2">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            </div>
          </motion.div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s.text)} className="glass-card glass-card-hover p-3 flex items-center gap-3 text-left">
              <s.icon size={15} className="text-[var(--color-accent)] shrink-0" />
              <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">{s.text}</span>
            </button>
          ))}
        </div>
      )}

      <div className="glass-card p-3 flex items-center gap-3">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Pergunte à Agro IA..."
          className="flex-1 bg-transparent text-[13px] outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)]" />
        <button onClick={() => sendMessage()} className="btn-primary flex items-center justify-center w-9 h-9 rounded-xl">
          <Send size={15} />
        </button>
      </div>
    </motion.div>
  );
}
