import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/components/pages/DashboardPage";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CareerCoach AI" },
      { name: "description", content: "Track your interview readiness, study streak, and recent activity in one place." },
      { property: "og:title", content: "Dashboard — CareerCoach AI" },
      { property: "og:description", content: "Track your interview readiness, study streak, and recent activity in one place." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/dashboard" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/dashboard" }],
  }),
  component: DashboardPage,
});
