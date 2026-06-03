import { createFileRoute } from "@tanstack/react-router";
import BookmarksPage from "@/components/pages/BookmarksPage";
export const Route = createFileRoute("/_app/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — CareerCoach AI" },
      { name: "description", content: "Save and revisit the questions, answers, and resources you want to remember." },
      { property: "og:title", content: "Bookmarks — CareerCoach AI" },
      { property: "og:description", content: "Save and revisit the questions, answers, and resources you want to remember." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/bookmarks" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/bookmarks" }],
  }),
  component: BookmarksPage });
