import { createFileRoute } from "@tanstack/react-router";
import FlashcardsPage from "@/components/pages/FlashcardsPage";
export const Route = createFileRoute("/_app/flashcards")({ component: FlashcardsPage });
