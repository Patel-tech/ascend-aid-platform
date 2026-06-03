import { createFileRoute } from "@tanstack/react-router";
import QuizPage from "@/components/pages/QuizPage";
export const Route = createFileRoute("/_app/quiz")({ component: QuizPage });
