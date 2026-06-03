import { createFileRoute } from "@tanstack/react-router";
import NotesPage from "@/components/pages/NotesPage";
export const Route = createFileRoute("/_app/notes")({
  head: () => ({
    meta: [
      { title: "Notes Summarizer — CareerCoach AI" },
      { name: "description", content: "Turn long study notes into concise, exam-ready summaries with one click." },
      { property: "og:title", content: "Notes Summarizer — CareerCoach AI" },
      { property: "og:description", content: "Turn long study notes into concise, exam-ready summaries with one click." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/notes" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/notes" }],
  }),
  component: NotesPage });
