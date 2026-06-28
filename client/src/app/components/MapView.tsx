"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { equipment, farms } from "../data/mock";

export default function MapView() {
  const [mapReady, setMapReady] = useState(false);
  const [selectedEq, setSelectedEq] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mapReady || typeof window === "undefined") return;
    const initMap = async () => {
      const L = await import("leaflet");
      const map = L.map("agro-map").setView([-19.925, -44.155], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      equipment.forEach(eq => {
        const color = eq.status === "working" ? "#3b82f6" : eq.status === "online" ? "#10b981" : eq.status === "maintenance" ? "#f59e0b" : "#ef4444";
        const icon = L.divIcon({
          html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 12px ${color}60;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:bold;">${eq.fleet.slice(-2)}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker([eq.lat, eq.lng], { icon }).addTo(map);
        marker.bindPopup(`<div style="font-family:Inter,sans-serif;padding:4px"><strong style="font-size:14px">${eq.brand} ${eq.model}</strong><br/><span style="color:#64748b;font-size:12px">Frota ${eq.fleet} · ${eq.operator}</span><br/><span style="color:${color};font-size:12px;font-weight:600">${eq.status === "working" ? "Trabalhando" : eq.status === "online" ? "Online" : eq.status === "maintenance" ? "Manutenção" : "Offline"}</span><br/><span style="font-size:11px;color:#94a3b8">${eq.speed} km/h · ${eq.lastUpdate} atrás</span></div>`);
      });

      farms.forEach(farm => {
        L.circle([farm.lat, farm.lng], { radius: 500, color: "#10b981", fillColor: "#10b981", fillOpacity: 0.08, weight: 1 }).addTo(map)
          .bindPopup(`<strong>${farm.name}</strong><br/>${farm.area} ha`);
      });
    };
    initMap();
  }, [mapReady]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 h-full flex flex-col max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">Mapa Operacional</h1>
          <p className="text-[12px] text-[var(--color-text-dim)] mt-1">Visualização em tempo real de equipamentos e operações</p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-main)]">
          {["Todos", "Trator", "Colheitadeira", "Pulverizador"].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 rounded-md text-[11px] font-medium ${i === 0 ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-[var(--color-border-main)]">
          <div id="agro-map" className="w-full h-full" style={{ minHeight: 500 }} />
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-[1000]">
            <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-main)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-border-bright)] transition-all"><ZoomIn size={15} /></button>
            <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-main)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-border-bright)] transition-all"><ZoomOut size={15} /></button>
            <button className="w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-main)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-border-bright)] transition-all"><Navigation size={15} /></button>
          </div>
        </div>

        <div className="w-72 shrink-0 space-y-3 overflow-y-auto">
          <div className="glass-card p-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] mb-3">Legenda</h3>
            <div className="space-y-2.5">
              {[
                { label: "Trabalhando", color: "#3b82f6", count: 4 },
                { label: "Online", color: "#10b981", count: 3 },
                { label: "Offline", color: "#ef4444", count: 1 },
                { label: "Manutenção", color: "#f59e0b", count: 2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                  <span className="text-[11px] text-[var(--color-text-secondary)] flex-1 font-medium">{item.label}</span>
                  <span className="text-[10px] font-mono font-semibold text-[var(--color-text-dim)]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-dim)] mb-3">Equipamentos</h3>
            <div className="space-y-1 max-h-[380px] overflow-y-auto">
              {equipment.map(eq => (
                <button key={eq.id} onClick={() => setSelectedEq(eq.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${selectedEq === eq.id ? "bg-[var(--color-bg-hover)]" : "hover:bg-[var(--color-bg-hover)]"}`}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: eq.status === "working" ? "#3b82f6" : eq.status === "online" ? "#10b981" : eq.status === "maintenance" ? "#f59e0b" : "#ef4444" }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium truncate"><span className="font-mono text-[var(--color-accent)] font-semibold">{eq.fleet}</span> · {eq.model}</div>
                    <div className="text-[10px] text-[var(--color-text-dim)]">{eq.operator}</div>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-dim)]">{eq.speed > 0 ? `${eq.speed}km/h` : "—"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
