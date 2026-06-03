import { apiClient } from "@/services/api/axios";
import type { ID } from "@/types/api";

export interface ResumeAnalysis {
  id: ID;
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  atsCompatible: boolean;
}

export const resumeApi = {
  analyze: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return apiClient.post<ResumeAnalysis>("/resume/analyze", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  latest: () => apiClient.get<ResumeAnalysis | null>("/resume/latest"),
};
