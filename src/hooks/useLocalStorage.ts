import { useCallback, useEffect, useState } from "react";

/** SSR-safe localStorage hook. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      try { setValue(JSON.parse(raw) as T); } catch { /* ignore */ }
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
