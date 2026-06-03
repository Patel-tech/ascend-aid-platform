import { createFileRoute } from "@tanstack/react-router";
import AssistantPage from "@/components/pages/AssistantPage";
export const Route = createFileRoute("/_app/assistant")({ component: AssistantPage });
