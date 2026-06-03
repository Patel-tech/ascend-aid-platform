import { createFileRoute } from "@tanstack/react-router";
import ResumePage from "@/components/pages/ResumePage";
export const Route = createFileRoute("/_app/resume")({
  head: () => ({
    meta: [
      { title: "Resume Analyzer — CareerCoach AI" },
      { name: "description", content: "Upload your resume to get an ATS score, gap analysis, and actionable improvement tips." },
      { property: "og:title", content: "Resume Analyzer — CareerCoach AI" },
      { property: "og:description", content: "Upload your resume to get an ATS score, gap analysis, and actionable improvement tips." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/resume" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/resume" }],
  }),
  component: ResumePage });
