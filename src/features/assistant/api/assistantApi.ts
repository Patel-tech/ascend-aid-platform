import { apiClient } from "@/services/api/axios";
import type { ID, ISODate } from "@/types/api";

export interface ChatMessage {
  id: ID;
  role: "user" | "assistant";
  content: string;
  createdAt: ISODate;
}

export interface ChatThread {
  id: ID;
  title: string;
  updatedAt: ISODate;
  messages: ChatMessage[];
}

export const assistantApi = {
  threads: () => apiClient.get<ChatThread[]>("/assistant/threads"),
  thread: (id: ID) => apiClient.get<ChatThread>(`/assistant/threads/${id}`),
  send: (threadId: ID, content: string) =>
    apiClient.post<ChatMessage>(`/assistant/threads/${threadId}/messages`, {
      content,
    }),
  create: (title: string) =>
    apiClient.post<ChatThread>("/assistant/threads", { title }),
};
