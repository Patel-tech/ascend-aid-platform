import { apiClient } from "@/services/api/axios";
import type { ID, ISODate } from "@/types/api";

export interface InterviewSession {
  id: ID;
  role: string;
  durationSec: number;
  status: "scheduled" | "in-progress" | "completed";
  startedAt?: ISODate;
}

export interface InterviewQuestion {
  id: ID;
  prompt: string;
  difficulty: "easy" | "medium" | "hard";
  followUps?: string[];
}

export const mockInterviewApi = {
  start: (role: string) =>
    apiClient.post<InterviewSession>("/mock-interview/sessions", { role }),
  questions: (sessionId: ID) =>
    apiClient.get<InterviewQuestion[]>(
      `/mock-interview/sessions/${sessionId}/questions`,
    ),
  answer: (sessionId: ID, questionId: ID, answer: string) =>
    apiClient.post<{ feedback: string; score: number }>(
      `/mock-interview/sessions/${sessionId}/answers`,
      { questionId, answer },
    ),
  finish: (sessionId: ID) =>
    apiClient.post<InterviewSession>(
      `/mock-interview/sessions/${sessionId}/finish`,
    ),
};
