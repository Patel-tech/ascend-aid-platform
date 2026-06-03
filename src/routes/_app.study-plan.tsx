import { createFileRoute } from "@tanstack/react-router";
import StudyPlanPage from "@/components/pages/StudyPlanPage";
export const Route = createFileRoute("/_app/study-plan")({ component: StudyPlanPage });
