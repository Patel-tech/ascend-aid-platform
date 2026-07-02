import { createFileRoute } from "@tanstack/react-router";
import LeaderboardPage from "@/components/pages/LeaderboardPage";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — CareerCoach AI" },
      { name: "description", content: "See global rankings, earn achievement badges, and level up from Beginner to Expert." },
      { property: "og:title", content: "Leaderboard — CareerCoach AI" },
      { property: "og:description", content: "See global rankings, earn achievement badges, and level up from Beginner to Expert." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/leaderboard" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/leaderboard" }],
  }),
  component: LeaderboardPage,
});
