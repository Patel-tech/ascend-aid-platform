import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/components/pages/SettingsPage";
export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CareerCoach AI" },
      { name: "description", content: "Manage your account, preferences, theme, and notifications." },
      { property: "og:title", content: "Settings — CareerCoach AI" },
      { property: "og:description", content: "Manage your account, preferences, theme, and notifications." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/settings" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/settings" }],
  }),
  component: SettingsPage });
