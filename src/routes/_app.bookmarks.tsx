import { createFileRoute } from "@tanstack/react-router";
import BookmarksPage from "@/components/pages/BookmarksPage";
export const Route = createFileRoute("/_app/bookmarks")({ component: BookmarksPage });
