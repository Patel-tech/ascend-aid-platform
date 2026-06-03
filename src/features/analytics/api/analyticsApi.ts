import { apiClient } from "@/services/api/axios";

export interface DashboardMetrics {
  questionsPracticed: number;
  mockInterviews: number;
  studyStreakDays: number;
  averageScore: number;
}

export interface TimeSeriesPoint { date: string; value: number }

export const analyticsApi = {
  metrics: () => apiClient.get<DashboardMetrics>("/analytics/metrics"),
  performance: (range: "7d" | "30d" | "90d" = "30d") =>
    apiClient.get<TimeSeriesPoint[]>("/analytics/performance", {
      params: { range },
    }),
  topicBreakdown: () =>
    apiClient.get<{ topic: string; mastery: number }[]>("/analytics/topics"),
};
