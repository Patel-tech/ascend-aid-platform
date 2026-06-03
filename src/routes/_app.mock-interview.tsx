import { createFileRoute } from "@tanstack/react-router";
import MockInterviewPage from "@/components/pages/MockInterviewPage";
export const Route = createFileRoute("/_app/mock-interview")({
  head: () => ({
    meta: [
      { title: "Mock Interview — CareerCoach AI" },
      { name: "description", content: "Run live AI-driven mock interviews with realistic questions and instant feedback." },
      { property: "og:title", content: "Mock Interview — CareerCoach AI" },
      { property: "og:description", content: "Run live AI-driven mock interviews with realistic questions and instant feedback." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/mock-interview" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/mock-interview" }],
  }),
  component: MockInterviewPage });
