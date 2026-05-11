import { AdSpec } from "./data";

const MAX_SELECTION = 5;
const STORAGE_KEY = "adspec_selected_slugs";

type StateChangeCallback = (slugs: string[]) => void;
const listeners: StateChangeCallback[] = [];

function load(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(slugs: string[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  listeners.forEach((cb) => cb(slugs));
}

export function getSelected(): string[] {
  return load();
}

export function isSelected(slug: string): boolean {
  return load().includes(slug);
}

export function toggle(slug: string): { ok: boolean; message?: string } {
  const current = load();
  if (current.includes(slug)) {
    save(current.filter((s) => s !== slug));
    return { ok: true };
  }
  if (current.length >= MAX_SELECTION) {
    return { ok: false, message: `Maximum ${MAX_SELECTION} specs can be selected.` };
  }
  save([...current, slug]);
  return { ok: true };
}

export function remove(slug: string): void {
  save(load().filter((s) => s !== slug));
}

export function clear(): void {
  save([]);
}

export function onStateChange(cb: StateChangeCallback): () => void {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getSelectedSpecs(specs: AdSpec[]): AdSpec[] {
  const slugs = load();
  return slugs.map((slug) => specs.find((s) => s.slug === slug)!).filter(Boolean);
}
