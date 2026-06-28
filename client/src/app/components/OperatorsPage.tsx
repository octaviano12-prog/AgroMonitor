"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Star, Clock, Edit, Trash2, X, Save } from "lucide-react";
import { api } from "@/lib/api";
import { demoDefaults, demoKeys, getStoredList, setStoredList, uid } from "@/lib/demoStore";

type OperatorItem = (typeof demoDefaults.operators)[number];

const emptyOperator: OperatorItem = {
  id: "",
  name: "",
  cpf: "",
  phone: "",
  email: "",
  registration: "",
  role: "Operador Pleno",
  shift: "Diurno",
  supervisor: "",
  rating: 5,
  hoursWorked: 0,
};

function normalizeApiOperator(item: any): OperatorItem {
  return {
    id: item.id,
    name: item.name,
    cpf: item.cpf ?? "",
    phone: item.phone ?? "",
    email: item.email ?? "",
    registration: item.registration ?? "",
    role: item.role ?? "Operador",
    shift: item.shift === "NIGHT" ? "Noturno" : item.shift === "ROTATING" ? "Revezamento" : "Diurno",
    supervisor: item.supervisor ?? "",
    rating: Number(item.rating ?? 0),
    hoursWorked: Number(item.hoursWorked ?? 0),
    photo: item.photo ?? "",
  };
}

function toApiShift(shift: string) {
  if (shift === "Noturno") return "NIGHT";
  if (shift === "Revezamento") return "ROTATING";
  return "DAY";
}

export default function OperatorsPage() {
  const [items, setItems] = useState<OperatorItem[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<OperatorItem | null>(null);
  const [source, setSource] = useState<"api" | "local">("local");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/api/operators");
        setItems(Array.isArray(response.data) ? response.data.map(normalizeApiOperator) : []);
        setSource("api");
      } catch {
        setItems(getStoredList(demoKeys.operators, demoDefaults.operators));
        setSource("local");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((operator) => `${operator.name} ${operator.registration} ${operator.role} ${operator.supervisor}`.toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  const persist = (next: OperatorItem[]) => {
    setItems(next);
    setStoredList(demoKeys.operators, next);
  };

  const saveOperator = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;

    const payload = { ...editing, id: editing.id || uid("op") };
    const next = items.some((item) => item.id === payload.id)
      ? items.map((item) => (item.id === payload.id ? payload : item))
      : [payload, ...items];
    persist(next);

    if (source === "api") {
      const apiPayload = { ...payload, shift: toApiShift(payload.shift) };
      try {
        if (editing.id) await api.put(`/api/operators/${editing.id}`, apiPayload);
        else await api.post("/api/operators", apiPayload);
      } catch {
        setSource("local");
      }
    }
    setEditing(null);
  };

  const deleteOperator = async (id: string) => {
    persist(items.filter((item) => item.id !== id));
    if (source === "api") {
      try {
        await api.delete(`/api/operators/${id}`);
      } catch {
        setSource("local");
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Operadores</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {items.length} operadores cadastrados {source === "local" && "(modo local)"}
          </p>
        </div>
        <button onClick={() => setEditing(emptyOperator)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Novo Operador
        </button>
      </div>

      <div className="glass-card p-4 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)]">
          <Search size={16} className="text-[var(--color-text-dim)]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Buscar por nome, matricula, cargo..."
            className="bg-transparent text-sm outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
        {filtered.map((operator, index) => (
          <motion.div key={operator.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}
            className="glass-card glass-card-hover p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-blue)]/15 flex items-center justify-center text-sm font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/10">
                {operator.name.split(" ").map((part) => part[0]).join("").slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold truncate">{operator.name}</h3>
                  <div className="flex items-center gap-0.5 text-[var(--color-amber)]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-semibold">{operator.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{operator.role} - {operator.shift}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[var(--color-border-main)]">
              <div><div className="text-xs text-[var(--color-text-dim)]">Matricula</div><div className="text-sm font-mono font-semibold mt-1">{operator.registration}</div></div>
              <div><div className="text-xs text-[var(--color-text-dim)]">Supervisor</div><div className="text-sm font-medium mt-1 truncate">{operator.supervisor || "-"}</div></div>
              <div><div className="text-xs text-[var(--color-text-dim)] flex items-center gap-1"><Clock size={10} /> Horas</div><div className="text-sm font-mono font-semibold mt-1">{operator.hoursWorked}h</div></div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setEditing(operator)} className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"><Edit size={15} /></button>
              <button onClick={() => deleteOperator(operator.id)} className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-[var(--color-danger)]/10 text-[var(--color-danger)]"><Trash2 size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveOperator} className="glass-card w-full max-w-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{editing.id ? "Editar operador" : "Novo operador"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="w-9 h-9 rounded-md hover:bg-[var(--color-bg-hover)] flex items-center justify-center"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["name", "Nome"], ["registration", "Matricula"], ["cpf", "CPF"], ["phone", "Telefone"], ["email", "Email"], ["role", "Cargo"], ["supervisor", "Supervisor"],
              ].map(([key, label]) => (
                <label key={key} className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {label}
                  <input required={key !== "email" && key !== "phone"} value={(editing as any)[key]} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none focus:border-[var(--color-accent)]" />
                </label>
              ))}
              <label className="space-y-2 text-sm text-[var(--color-text-secondary)]">Turno
                <select value={editing.shift} onChange={(event) => setEditing({ ...editing, shift: event.target.value })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none">
                  <option>Diurno</option><option>Noturno</option><option>Revezamento</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-[var(--color-text-secondary)]">Horas trabalhadas
                <input type="number" value={editing.hoursWorked} onChange={(event) => setEditing({ ...editing, hoursWorked: Number(event.target.value) })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none" />
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-3 rounded-lg border border-[var(--color-border-main)] text-sm text-[var(--color-text-secondary)]">Cancelar</button>
              <button type="submit" className="btn-primary flex items-center gap-2"><Save size={15} /> Salvar</button>
            </div>
          </form>
        </div>
      )}
    </motion.div>
  );
}
