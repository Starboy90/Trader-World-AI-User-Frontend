"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import { z } from "zod";
const schema = z.object({
  watchlist: z.array(z.string()),
  entries: z.array(
    z.object({ id: z.string(), text: z.string(), date: z.string() }),
  ),
  alerts: z.array(
    z.object({ id: z.string(), symbol: z.string(), price: z.number() }),
  ),
});
type Stored = z.infer<typeof schema>;
const defaults: Stored = { watchlist: ["BTC", "ETH"], entries: [], alerts: [] };
const key = "twai-workspace";
const fallback = JSON.stringify(defaults);
const serverSnapshot = () => fallback;
function getSnapshot() {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("twai-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("twai-storage", callback);
  };
}
function parse(raw: string): Stored {
  try {
    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result.data : defaults;
  } catch {
    return defaults;
  }
}
export function useWorkspace() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const data = useMemo(() => parse(snapshot), [snapshot]);
  const [session, setSession] = useState<Stored | null>(null);
  const [error, setError] = useState("");
  function update<K extends keyof Stored>(
    field: K,
    value: Stored[K] | ((previous: Stored[K]) => Stored[K]),
  ) {
    const current = session ?? parse(getSnapshot());
    const next = {
      ...current,
      [field]: typeof value === "function" ? value(current[field]) : value,
    };
    try {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event("twai-storage"));
    } catch {
      setSession(next);
      setError(
        "Browser storage is unavailable. Changes will last for this session only.",
      );
    }
  }
  return { data: session ?? data, update, storageError: error };
}

const profileSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.email(),
  plan: z.string().min(1),
});
function profileSnapshot() {
  try {
    return localStorage.getItem("twai-profile") ?? "";
  } catch {
    return "";
  }
}
export function useDemoProfile() {
  const snapshot = useSyncExternalStore(subscribe, profileSnapshot, () => "");
  return useMemo(() => {
    try {
      const parsed = profileSchema.safeParse(JSON.parse(snapshot));
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }, [snapshot]);
}
