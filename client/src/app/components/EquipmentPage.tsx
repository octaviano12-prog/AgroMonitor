"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { api } from "@/lib/api";
import { demoDefaults, demoKeys, getStoredList, setStoredList, uid } from "@/lib/demoStore";

type EquipmentItem = (typeof demoDefaults.equipment)[number];

const emptyEquipment: EquipmentItem = {
  id: "",
  fleet: "",
  model: "",
  brand: "",
  year: new Date().getFullYear(),
  hourMeter: 0,
  plate: "",
  type: "Trator",
  operator: "",
  front: "",
  status: "online",
  lat: 0,
  lng: 0,
  speed: 0,
  lastUpdate: "agora",
  availability: 100,
  efficiency: 0,
};

const typeFilters = ["Todos", "Trator", "Colheitadeira", "Pulverizador", "Plantadeira", "Drone"];
const statusFilters = [
  { label: "Todos", value: "Todos" },
  { label: "Trabalhando", value: "working" },
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
  { label: "Manutencao", value: "maintenance" },
];

const statusLabel: Record<EquipmentItem["status"], string> = {
  working: "Trabalhando",
  online: "Online",
  offline: "Offline",
  maintenance: "Manutencao",
};

function normalizeApiEquipment(item: any): EquipmentItem {
  return {
    id: item.id,
    fleet: item.fleet,
    model: item.model,
    brand: item.brand,
    year: Number(item.year ?? new Date().getFullYear()),
    hourMeter: Number(item.hourMeter ?? 0),
    plate: item.plate ?? "",
    type: item.type ?? "Trator",
    operator: item.operator?.name ?? item.operator ?? "",
    front: item.front?.name ?? item.front ?? "",
    status: String(item.status ?? "ONLINE").toLowerCase() as EquipmentItem["status"],
    lat: Number(item.latitude ?? item.lat ?? 0),
    lng: Number(item.longitude ?? item.lng ?? 0),
    speed: Number(item.speed ?? 0),
    lastUpdate: item.lastUpdate ? "online" : "agora",
    availability: Number(item.availability ?? 100),
    efficiency: Number(item.efficiency ?? 0),
    photo: item.photo ?? "",
  };
}

export default function EquipmentPage() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [editing, setEditing] = useState<EquipmentItem | null>(null);
  const [source, setSource] = useState<"api" | "local">("local");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/api/equipment/all");
        const data = Array.isArray(response.data) ? response.data.map(normalizeApiEquipment) : [];
        setItems(data);
        setSource("api");
      } catch {
        setItems(getStoredList(demoKeys.equipment, demoDefaults.equipment));
        setSource("local");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((eq) => {
      const haystack = `${eq.fleet} ${eq.model} ${eq.brand} ${eq.operator} ${eq.front}`.toLowerCase();
      if (search && !haystack.includes(search.toLowerCase())) return false;
      if (typeFilter !== "Todos" && eq.type !== typeFilter) return false;
      if (statusFilter !== "Todos" && eq.status !== statusFilter) return false;
      return true;
    });
  }, [items, search, typeFilter, statusFilter]);

  const persist = (next: EquipmentItem[]) => {
    setItems(next);
    setStoredList(demoKeys.equipment, next);
  };

  const saveEquipment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;

    const payload = { ...editing, id: editing.id || uid("eq") };
    const next = items.some((item) => item.id === payload.id)
      ? items.map((item) => (item.id === payload.id ? payload : item))
      : [payload, ...items];
    persist(next);

    if (source === "api") {
      const apiPayload = {
        fleet: payload.fleet,
        model: payload.model,
        brand: payload.brand,
        year: Number(payload.year),
        hourMeter: Number(payload.hourMeter),
        plate: payload.plate,
        type: payload.type,
        status: payload.status.toUpperCase(),
        speed: Number(payload.speed),
        latitude: Number(payload.lat),
        longitude: Number(payload.lng),
        availability: Number(payload.availability),
        efficiency: Number(payload.efficiency),
      };
      try {
        if (editing.id) await api.put(`/api/equipment/${editing.id}`, apiPayload);
        else await api.post("/api/equipment", apiPayload);
      } catch {
        setSource("local");
      }
    }
    setEditing(null);
  };

  const deleteEquipment = async (id: string) => {
    persist(items.filter((item) => item.id !== id));
    if (source === "api") {
      try {
        await api.delete(`/api/equipment/${id}`);
      } catch {
        setSource("local");
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Equipamentos</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {items.length} equipamentos cadastrados {source === "local" && "(modo local)"}
          </p>
        </div>
        <button onClick={() => setEditing(emptyEquipment)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Novo Equipamento
        </button>
      </div>

      <div className="glass-card p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[260px] flex items-center gap-2.5 px-3.5 py-3 rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-input)]">
          <Search size={16} className="text-[var(--color-text-dim)]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Buscar por frota, modelo, operador..."
            className="bg-transparent text-sm outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] w-full" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {typeFilters.map((type) => (
            <button key={type} onClick={() => setTypeFilter(type)} className={`px-3 py-2 rounded-md text-xs font-medium ${typeFilter === type ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"}`}>{type}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((status) => (
            <button key={status.value} onClick={() => setStatusFilter(status.value)} className={`px-3 py-2 rounded-md text-xs font-medium ${statusFilter === status.value ? "bg-[var(--color-blue)]/15 text-[var(--color-blue)]" : "bg-[var(--color-bg-input)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"}`}>{status.label}</button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Frota</th><th>Tipo</th><th>Modelo</th><th>Operador</th><th>Frente</th><th>Status</th><th>Horimetro</th><th>Velocidade</th><th>Disp.</th><th>Ef.</th><th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((eq) => (
                <tr key={eq.id}>
                  <td><span className="font-mono font-bold text-[var(--color-accent)]">{eq.fleet}</span></td>
                  <td><span className="badge bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]">{eq.type}</span></td>
                  <td><span className="text-[var(--color-text-primary)] font-medium">{eq.brand} {eq.model}</span><div className="text-xs text-[var(--color-text-dim)]">{eq.year} - {eq.plate}</div></td>
                  <td>{eq.operator || "-"}</td>
                  <td>{eq.front || "-"}</td>
                  <td><span className="badge bg-[var(--color-blue)]/10 text-[var(--color-blue)]">{statusLabel[eq.status]}</span></td>
                  <td className="font-mono">{Number(eq.hourMeter).toLocaleString()} h</td>
                  <td className="font-mono">{Number(eq.speed) > 0 ? `${eq.speed} km/h` : "-"}</td>
                  <td className="font-mono">{eq.availability}%</td>
                  <td className="font-mono">{eq.efficiency}%</td>
                  <td>
                    <div className="flex gap-1">
                      <button title="Editar" onClick={() => setEditing(eq)} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"><Edit size={14} /></button>
                      <button title="Excluir" onClick={() => deleteEquipment(eq.id)} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[var(--color-danger)]/10 text-[var(--color-danger)]"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveEquipment} className="glass-card w-full max-w-4xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{editing.id ? "Editar equipamento" : "Novo equipamento"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="w-9 h-9 rounded-md hover:bg-[var(--color-bg-hover)] flex items-center justify-center"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["fleet", "Frota"], ["brand", "Marca"], ["model", "Modelo"], ["plate", "Placa"], ["operator", "Operador"], ["front", "Frente"],
              ].map(([key, label]) => (
                <label key={key} className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {label}
                  <input required value={(editing as any)[key]} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none focus:border-[var(--color-accent)]" />
                </label>
              ))}
              <label className="space-y-2 text-sm text-[var(--color-text-secondary)]">Tipo
                <select value={editing.type} onChange={(event) => setEditing({ ...editing, type: event.target.value })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none">
                  {typeFilters.filter((type) => type !== "Todos").map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-[var(--color-text-secondary)]">Status
                <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as EquipmentItem["status"] })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none">
                  {statusFilters.filter((status) => status.value !== "Todos").map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
              </label>
              {[
                ["year", "Ano"], ["hourMeter", "Horimetro"], ["speed", "Velocidade"], ["availability", "Disponibilidade"], ["efficiency", "Eficiencia"],
              ].map(([key, label]) => (
                <label key={key} className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {label}
                  <input type="number" value={(editing as any)[key]} onChange={(event) => setEditing({ ...editing, [key]: Number(event.target.value) })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none focus:border-[var(--color-accent)]" />
                </label>
              ))}
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
