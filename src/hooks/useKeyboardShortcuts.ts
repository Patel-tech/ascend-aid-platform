import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Global keyboard shortcuts.
 * - Ctrl/Cmd + B: navigate back
 * - Ctrl/Cmd + H: go to dashboard (home)
 * - Ctrl/Cmd + ,: open settings
 */
export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "b") {
        e.preventDefault();
        router.history.back();
      } else if (key === "h") {
        e.preventDefault();
        router.navigate({ to: "/dashboard" });
      } else if (key === ",") {
        e.preventDefault();
        router.navigate({ to: "/settings" });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
}
