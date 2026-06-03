import { createFileRoute } from "@tanstack/react-router";
import MockInterviewPage from "@/components/pages/MockInterviewPage";
export const Route = createFileRoute("/_app/mock-interview")({ component: MockInterviewPage });
