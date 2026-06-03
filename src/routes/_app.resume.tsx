import { createFileRoute } from "@tanstack/react-router";
import ResumePage from "@/components/pages/ResumePage";
export const Route = createFileRoute("/_app/resume")({ component: ResumePage });
