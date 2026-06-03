/** Centralized app config. Reads VITE_ env vars (client-safe). */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 20_000,
} as const;

export const APP_CONFIG = {
  name: "PrepPilot",
  tagline: "AI Interview Coach",
  supportEmail: "support@preppilot.app",
} as const;

export const STORAGE_KEYS = {
  authToken: "pp.authToken",
  themeMode: "pp.themeMode",
  recentSearches: "pp.recentSearches",
} as const;
