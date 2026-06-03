import { apiClient } from "@/services/api/axios";
import type { ID, ISODate, Paginated } from "@/types/api";

export interface DocumentItem {
  id: ID;
  name: string;
  type: "pdf" | "docx" | "txt";
  sizeBytes: number;
  uploadedAt: ISODate;
  indexed: boolean;
}

export const documentsApi = {
  list: (page = 1, pageSize = 20) =>
    apiClient.get<Paginated<DocumentItem>>("/documents", {
      params: { page, pageSize },
    }),
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return apiClient.post<DocumentItem>("/documents", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  remove: (id: ID) => apiClient.delete<{ ok: true }>(`/documents/${id}`),
};
