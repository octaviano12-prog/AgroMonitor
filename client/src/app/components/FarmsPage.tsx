"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TreePine, ChevronDown, ChevronRight, Ruler, Plus, Edit, Trash2, X, Save, Search } from "lucide-react";
import { api } from "@/lib/api";
import { demoDefaults, demoKeys, getStoredList, setStoredList, uid } from "@/lib/demoStore";

type FarmItem = (typeof demoDefaults.farms)[number];

const emptyFarm: FarmItem = {
  id: "",
  name: "",
  city: "",
  state: "MG",
  area: 0,
  responsible: "",
  lat: 0,
  lng: 0,
  plots: [],
};

function normalizeApiFarm(item: any): FarmItem {
  return {
    id: item.id,
    name: item.name,
    city: item.city ?? "",
    state: item.state ?? "",
    area: Number(item.area ?? 0),
    responsible: item.responsible ?? "",
    lat: Number(item.latitude ?? item.lat ?? 0),
    lng: Number(item.longitude ?? item.lng ?? 0),
    plots: Array.isArray(item.plots) ? item.plots.map((plot: any) => ({
      id: plot.id,
      name: plot.name,
      code: plot.code,
      area: Number(plot.area ?? 0),
      farmId: plot.farmId ?? item.id,
      crop: plot.crop ?? "",
      status: plot.status ?? "FALLOW",
    })) : [],
  };
}

export default function FarmsPage() {
  const [items, setItems] = useState<FarmItem[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<FarmItem | null>(null);
  const [source, setSource] = useState<"api" | "local">("local");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/api/farms");
        const data = Array.isArray(response.data) ? response.data.map(normalizeApiFarm) : [];
        setItems(data);
        setExpanded(data[0]?.id ?? null);
        setSource("api");
      } catch {
        const data = getStoredList(demoKeys.farms, demoDefaults.farms);
        setItems(data);
        setExpanded(data[0]?.id ?? null);
        setSource("local");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((farm) => `${farm.name} ${farm.city} ${farm.state} ${farm.responsible}`.toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  const totals = useMemo(() => ({
    area: items.reduce((total, farm) => total + Number(farm.area), 0),
    plots: items.reduce((total, farm) => total + farm.plots.length, 0),
    activePlots: items.reduce((total, farm) => total + farm.plots.filter((plot) => plot.status !== "Pousio" && plot.status !== "FALLOW").length, 0),
  }), [items]);

  const persist = (next: FarmItem[]) => {
    setItems(next);
    setStoredList(demoKeys.farms, next);
  };

  const saveFarm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;

    const payload = { ...editing, id: editing.id || uid("farm") };
    const next = items.some((item) => item.id === payload.id)
      ? items.map((item) => (item.id === payload.id ? payload : item))
      : [payload, ...items];
    persist(next);
    setExpanded(payload.id);

    if (source === "api") {
      const apiPayload = {
        name: payload.name,
        city: payload.city,
        state: payload.state,
        area: Number(payload.area),
        responsible: payload.responsible,
        latitude: Number(payload.lat),
        longitude: Number(payload.lng),
      };
      try {
        if (editing.id) await api.put(`/api/farms/${editing.id}`, apiPayload);
        else await api.post("/api/farms", apiPayload);
      } catch {
        setSource("local");
      }
    }
    setEditing(null);
  };

  const deleteFarm = async (id: string) => {
    persist(items.filter((item) => item.id !== id));
    if (source === "api") {
      try {
        await api.delete(`/api/farms/${id}`);
      } catch {
        setSource("local");
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Fazendas & Talhoes</h1>
          <p className="text-base text-[var(--color-text-secondary)] mt-1">
            {items.length} fazendas - {totals.plots} talhoes {source === "local" && "(modo local)"}
          </p>
        </div>
        <button onClick={() => setEditing(emptyFarm)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Nova Fazenda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Area Total", value: `${totals.area.toLocaleString()} ha`, icon: Ruler, color: "var(--color-accent)" },
          { label: "Fazendas Ativas", value: items.length.toString(), icon: TreePine, color: "var(--color-blue)" },
          { label: "Talhoes em Operacao", value: totals.activePlots.toString(), icon: MapPin, color: "var(--color-amber)" },
        ].map((summary, index) => (
          <motion.div key={summary.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass-card glass-card-hover p-6 min-h-[132px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${summary.color}12` }}>
                <summary.icon size={22} style={{ color: summary.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight">{summary.value}</div>
                <div className="text-sm text-[var(--color-text-secondary)]">{summary.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-5 flex items-center gap-3">
        <Search size={16} className="text-[var(--color-text-dim)]" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por fazenda, cidade ou responsavel..."
          className="w-full bg-transparent outline-none text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)]" />
      </div>

      <div className="space-y-4">
        {filtered.map((farm) => {
          const isOpen = expanded === farm.id;
          return (
            <motion.div key={farm.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
              <div className="w-full p-5 flex items-center gap-4 hover:bg-[var(--color-bg-hover)] transition-colors">
                <button onClick={() => setExpanded(isOpen ? null : farm.id)} className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/10">
                  {isOpen ? <ChevronDown size={16} className="text-[var(--color-accent)]" /> : <ChevronRight size={16} className="text-[var(--color-accent)]" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">{farm.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{farm.city}, {farm.state} - {Number(farm.area).toLocaleString()} ha - Resp: {farm.responsible}</p>
                </div>
                <span className="badge bg-[var(--color-accent)]/10 text-[var(--color-accent)]">{farm.plots.length} talhoes</span>
                <button onClick={() => setEditing(farm)} className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"><Edit size={15} /></button>
                <button onClick={() => deleteFarm(farm.id)} className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-[var(--color-danger)]/10 text-[var(--color-danger)]"><Trash2 size={15} /></button>
              </div>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-[var(--color-border-main)]">
                  <table className="data-table">
                    <thead><tr><th>Talhao</th><th>Codigo</th><th>Area</th><th>Cultura</th><th>Status</th></tr></thead>
                    <tbody>
                      {farm.plots.length === 0 ? (
                        <tr><td colSpan={5} className="text-center text-[var(--color-text-dim)]">Nenhum talhao cadastrado para esta fazenda.</td></tr>
                      ) : farm.plots.map((plot) => (
                        <tr key={plot.id}>
                          <td className="font-medium text-[var(--color-text-primary)]">{plot.name}</td>
                          <td className="font-mono">{plot.code}</td>
                          <td className="font-mono">{plot.area} ha</td>
                          <td>{plot.crop}</td>
                          <td><span className="badge bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]">{plot.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveFarm} className="glass-card w-full max-w-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{editing.id ? "Editar fazenda" : "Nova fazenda"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="w-9 h-9 rounded-md hover:bg-[var(--color-bg-hover)] flex items-center justify-center"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["name", "Nome"], ["city", "Cidade"], ["state", "Estado"], ["responsible", "Responsavel"],
              ].map(([key, label]) => (
                <label key={key} className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {label}
                  <input required value={(editing as any)[key]} onChange={(event) => setEditing({ ...editing, [key]: event.target.value })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none focus:border-[var(--color-accent)]" />
                </label>
              ))}
              <label className="space-y-2 text-sm text-[var(--color-text-secondary)]">Area
                <input type="number" required value={editing.area} onChange={(event) => setEditing({ ...editing, area: Number(event.target.value) })} className="w-full px-3 py-3 rounded-lg bg-[var(--color-bg-input)] border border-[var(--color-border-main)] outline-none" />
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
