export type CartLine = { id: string; qty: number };

const KEY = "lamp-cart";
const MAX_QTY = 99;

let memory: CartLine[] | null = null;

function clean(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((l): l is CartLine => typeof l?.id === "string" && Number.isInteger(l?.qty) && l.qty > 0)
    .map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) }));
}

export function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== null) return clean(JSON.parse(raw));
  } catch {}
  return memory ?? [];
}

function write(lines: CartLine[]) {
  memory = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  window.dispatchEvent(new CustomEvent("cart:change"));
}

export function add(id: string, qty = 1) {
  const lines = read();
  const hit = lines.find((l) => l.id === id);
  if (hit) hit.qty = Math.min(hit.qty + qty, MAX_QTY);
  else lines.push({ id, qty: Math.min(qty, MAX_QTY) });
  write(lines);
}

export function setQty(id: string, qty: number) {
  if (qty <= 0) return remove(id);
  write(read().map((l) => (l.id === id ? { id, qty: Math.min(qty, MAX_QTY) } : l)));
}

export function remove(id: string) {
  write(read().filter((l) => l.id !== id));
}

export function clear() {
  write([]);
}

export function count(): number {
  return read().reduce((n, l) => n + l.qty, 0);
}
