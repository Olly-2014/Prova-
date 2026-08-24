const IT = "it-IT";

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLongDate(date = new Date()): string {
  return date.toLocaleDateString(IT, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatShortDate(key: string): string {
  return parseKey(key).toLocaleDateString(IT, {
    day: "numeric",
    month: "short",
  });
}

export function greeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 5) return "Buonanotte";
  if (hour < 12) return "Buongiorno";
  if (hour < 18) return "Buon pomeriggio";
  if (hour < 22) return "Buonasera";
  return "Buonanotte";
}

export function weekKeys(from = new Date()): string[] {
  const start = new Date(from);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const next = new Date(start);
    next.setDate(start.getDate() + i);
    return todayKey(next);
  });
}

export function weekdayLetter(key: string): string {
  return parseKey(key).toLocaleDateString(IT, { weekday: "narrow" });
}

export function id(): string {
  return crypto.randomUUID();
}
