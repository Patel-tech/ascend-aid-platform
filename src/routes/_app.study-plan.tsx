import { createFileRoute } from "@tanstack/react-router";
import StudyPlanPage from "@/components/pages/StudyPlanPage";
export const Route = createFileRoute("/_app/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan — CareerCoach AI" },
      { name: "description", content: "Follow a personalized, day-by-day interview prep plan tailored to your goals." },
      { property: "og:title", content: "Study Plan — CareerCoach AI" },
      { property: "og:description", content: "Follow a personalized, day-by-day interview prep plan tailored to your goals." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/study-plan" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/study-plan" }],
  }),
  component: StudyPlanPage });
