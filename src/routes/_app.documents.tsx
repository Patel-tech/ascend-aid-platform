import { createFileRoute } from "@tanstack/react-router";
import DocumentsPage from "@/components/pages/DocumentsPage";
export const Route = createFileRoute("/_app/documents")({
  head: () => ({
    meta: [
      { title: "Documents — CareerCoach AI" },
      { name: "description", content: "Upload notes and PDFs to power retrieval-augmented answers from your AI assistant." },
      { property: "og:title", content: "Documents — CareerCoach AI" },
      { property: "og:description", content: "Upload notes and PDFs to power retrieval-augmented answers from your AI assistant." },
      { property: "og:url", content: "https://ascend-aid-platform.lovable.app/documents" },
    ],
    links: [{ rel: "canonical", href: "https://ascend-aid-platform.lovable.app/documents" }],
  }),
  component: DocumentsPage });
