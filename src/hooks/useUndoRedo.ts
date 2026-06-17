import { useCallback, useRef, useState } from "react";

/**
 * Text state with undo/redo history. Coalesces rapid edits within `debounceMs`
 * into a single history entry so each Ctrl+Z step feels meaningful.
 */
export function useUndoRedo(initial = "", debounceMs = 400) {
  const [value, setValue] = useState(initial);
  const past = useRef<string[]>([]);
  const future = useRef<string[]>([]);
  const lastPush = useRef<number>(0);

  const set = useCallback(
    (next: string) => {
      const now = Date.now();
      if (now - lastPush.current > debounceMs) {
        past.current.push(value);
        future.current = [];
        lastPush.current = now;
      }
      setValue(next);
    },
    [value, debounceMs],
  );

  const undo = useCallback(() => {
    if (!past.current.length) return;
    const prev = past.current.pop()!;
    future.current.push(value);
    setValue(prev);
  }, [value]);

  const redo = useCallback(() => {
    if (!future.current.length) return;
    const next = future.current.pop()!;
    past.current.push(value);
    setValue(next);
  }, [value]);

  return {
    value,
    set,
    undo,
    redo,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  };
}
