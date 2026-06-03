import { apiClient } from "@/services/api/axios";
import type { ID } from "@/types/api";

export interface QuizQuestion {
  id: ID;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topic: string;
}

export interface QuizAttempt {
  id: ID;
  score: number;
  total: number;
  completedAt: string;
}

export const quizApi = {
  questions: (topic?: string) =>
    apiClient.get<QuizQuestion[]>("/quiz/questions", { params: { topic } }),
  submit: (answers: { questionId: ID; selectedIndex: number }[]) =>
    apiClient.post<QuizAttempt>("/quiz/attempts", { answers }),
  history: () => apiClient.get<QuizAttempt[]>("/quiz/attempts"),
};
