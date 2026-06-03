import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "@/components/pages/AdminPage";
export const Route = createFileRoute("/_app/admin")({
  head: () => ({
    meta: [
      { title: "Admin — CareerCoach AI" },
      { name: "description", content: "Administrator console for managing users, content, and platform settings." },
      { property: "og:title", content: "Admin — CareerCoach AI" },
      { property: "og:description", content: "Administrator console for managing users, content, and platform settings." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/admin" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/admin" }],
  }),
  component: AdminPage });
