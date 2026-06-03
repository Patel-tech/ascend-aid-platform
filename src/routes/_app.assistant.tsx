import { createFileRoute } from "@tanstack/react-router";
import AssistantPage from "@/components/pages/AssistantPage";
export const Route = createFileRoute("/_app/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CareerCoach AI" },
      { name: "description", content: "Chat with an AI coach for instant help on Java, Spring, SQL, DSA, and system design." },
      { property: "og:title", content: "AI Assistant — CareerCoach AI" },
      { property: "og:description", content: "Chat with an AI coach for instant help on Java, Spring, SQL, DSA, and system design." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/assistant" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/assistant" }],
  }),
  component: AssistantPage });
