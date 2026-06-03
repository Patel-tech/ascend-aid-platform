import { createFileRoute } from "@tanstack/react-router";
import QuestionGeneratorPage from "@/components/pages/QuestionGeneratorPage";
export const Route = createFileRoute("/_app/question-generator")({
  head: () => ({
    meta: [
      { title: "Question Generator — CareerCoach AI" },
      { name: "description", content: "Generate role-specific interview questions tailored to your target company and level." },
      { property: "og:title", content: "Question Generator — CareerCoach AI" },
      { property: "og:description", content: "Generate role-specific interview questions tailored to your target company and level." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/question-generator" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/question-generator" }],
  }),
  component: QuestionGeneratorPage });
