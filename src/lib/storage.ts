import type { Store } from "./types";
import { todayKey } from "./dates";

const KEY = "sereno.v1";

export const seed: Store = {
  tasks: [
    {
      id: "t1",
      title: "Bere un bicchiere d'acqua",
      done: true,
      due: todayKey(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "t2",
      title: "Fare una passeggiata di 15 minuti",
      done: false,
      due: todayKey(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "t3",
      title: "Scrivere tre cose per cui sono grato",
      done: false,
      due: todayKey(),
      createdAt: new Date().toISOString(),
    },
  ],
  notes: [
    {
      id: "n1",
      title: "Benvenuto in Sereno",
      body: "Questo è il tuo spazio. Aggiungi attività, annota idee e segna le abitudini. Tutto resta sul dispositivo: niente account, niente cloud.",
      updatedAt: new Date().toISOString(),
    },
  ],
  habits: [
    {
      id: "h1",
      name: "Lettura",
      accent: "#c45c26",
      checks: { [todayKey()]: false },
    },
    {
      id: "h2",
      name: "Movimento",
      accent: "#4a6b4f",
      checks: { [todayKey()]: false },
    },
    {
      id: "h3",
      name: "Senza social",
      accent: "#5b4a8a",
      checks: { [todayKey()]: false },
    },
  ],
};

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.tasks || !parsed.notes || !parsed.habits) {
      return structuredClone(seed);
    }
    return parsed;
  } catch {
    return structuredClone(seed);
  }
}

export function saveStore(store: Store): void {
  localStorage.setItem(KEY, JSON.stringify(store));
}
