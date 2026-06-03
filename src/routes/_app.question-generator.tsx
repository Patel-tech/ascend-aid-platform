import { createFileRoute } from "@tanstack/react-router";
import QuestionGeneratorPage from "@/components/pages/QuestionGeneratorPage";
export const Route = createFileRoute("/_app/question-generator")({ component: QuestionGeneratorPage });
