import { createFileRoute } from "@tanstack/react-router";
import FlashcardsPage from "@/components/pages/FlashcardsPage";
export const Route = createFileRoute("/_app/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — CareerCoach AI" },
      { name: "description", content: "Master key concepts with spaced-repetition flashcards across all interview topics." },
      { property: "og:title", content: "Flashcards — CareerCoach AI" },
      { property: "og:description", content: "Master key concepts with spaced-repetition flashcards across all interview topics." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/flashcards" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/flashcards" }],
  }),
  component: FlashcardsPage });
