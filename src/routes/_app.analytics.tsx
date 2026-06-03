import { createFileRoute } from "@tanstack/react-router";
import AnalyticsPage from "@/components/pages/AnalyticsPage";
export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CareerCoach AI" },
      { name: "description", content: "Visualize your readiness across topics, quiz performance, and weekly progress." },
      { property: "og:title", content: "Analytics — CareerCoach AI" },
      { property: "og:description", content: "Visualize your readiness across topics, quiz performance, and weekly progress." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/analytics" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/analytics" }],
  }),
  component: AnalyticsPage });
