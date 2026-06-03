import { createFileRoute } from "@tanstack/react-router";
import QuizPage from "@/components/pages/QuizPage";
export const Route = createFileRoute("/_app/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — CareerCoach AI" },
      { name: "description", content: "Sharpen your skills with topic-wise MCQ quizzes and instant scoring." },
      { property: "og:title", content: "Quiz — CareerCoach AI" },
      { property: "og:description", content: "Sharpen your skills with topic-wise MCQ quizzes and instant scoring." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/quiz" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/quiz" }],
  }),
  component: QuizPage });
