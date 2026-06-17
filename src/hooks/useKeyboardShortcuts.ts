import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Global keyboard shortcuts.
 *
 * With modifier (Ctrl/Cmd):
 *   B → back, H → dashboard, , → settings
 *
 * Single-key (when not typing in an input/textarea):
 *   D → Dashboard       Q → Quiz            A → Assistant
 *   M → Mock Interview  R → Resume          N → Notes
 *   F → Flashcards      B → Bookmarks       G → Analytics
 *   S → Settings        ? → show help (alert)
 */
export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const singleKeyMap: Record<string, string> = {
      d: "/dashboard",
      q: "/quiz",
      a: "/assistant",
      m: "/mock-interview",
      r: "/resume",
      n: "/notes",
      f: "/flashcards",
      b: "/bookmarks",
      g: "/analytics",
      s: "/settings",
    };

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (mod) {
        if (isTyping && key !== "b" && key !== "h" && key !== ",") return;
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
        return;
      }

      if (isTyping || e.altKey || e.shiftKey) return;

      if (e.key === "?") {
        e.preventDefault();
        alert(
          "Keyboard shortcuts:\n\n" +
            "D Dashboard   Q Quiz   A Assistant\n" +
            "M Mock Interview   R Resume   N Notes\n" +
            "F Flashcards   B Bookmarks   G Analytics\n" +
            "S Settings\n\n" +
            "Ctrl/Cmd+B  Back\n" +
            "Ctrl/Cmd+H  Home (Dashboard)\n" +
            "Ctrl/Cmd+,  Settings",
        );
        return;
      }

      const to = singleKeyMap[key];
      if (to) {
        e.preventDefault();
        router.navigate({ to });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
}
