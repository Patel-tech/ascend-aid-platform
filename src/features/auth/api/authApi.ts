import { apiClient } from "@/services/api/axios";
import type { ID, ISODate } from "@/types/api";

export interface AuthUser {
  id: ID;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
  createdAt: ISODate;
}

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload extends LoginPayload { name: string }

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<{ token: string; user: AuthUser }>("/auth/login", payload),
  register: (payload: RegisterPayload) =>
    apiClient.post<{ token: string; user: AuthUser }>("/auth/register", payload),
  forgot: (email: string) =>
    apiClient.post<{ ok: true }>("/auth/forgot", { email }),
  me: () => apiClient.get<AuthUser>("/auth/me"),
  logout: () => apiClient.post<{ ok: true }>("/auth/logout"),
};
