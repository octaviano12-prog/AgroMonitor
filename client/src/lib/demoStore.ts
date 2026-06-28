import { equipment as mockEquipment, farms as mockFarms, operators as mockOperators } from "@/app/data/mock";

const isBrowser = () => typeof window !== "undefined";

export function getStoredList<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(stored) as T[];
  } catch {
    return fallback;
  }
}

export function setStoredList<T>(key: string, data: T[]) {
  if (isBrowser()) window.localStorage.setItem(key, JSON.stringify(data));
}

export function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export const demoKeys = {
  equipment: "agromonitor.demo.equipment",
  operators: "agromonitor.demo.operators",
  farms: "agromonitor.demo.farms",
};

export const demoDefaults = {
  equipment: mockEquipment,
  operators: mockOperators,
  farms: mockFarms,
};
