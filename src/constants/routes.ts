/** Typed route paths — single source of truth for navigation. */
export const ROUTES = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot: "/auth/forgot",
  },
  app: {
    dashboard: "/dashboard",
    assistant: "/assistant",
    documents: "/documents",
    mockInterview: "/mock-interview",
    questionGenerator: "/question-generator",
    quiz: "/quiz",
    resume: "/resume",
    studyPlan: "/study-plan",
    notes: "/notes",
    flashcards: "/flashcards",
    bookmarks: "/bookmarks",
    analytics: "/analytics",
    admin: "/admin",
    settings: "/settings",
  },
} as const;

export type AppRoute =
  (typeof ROUTES.app)[keyof typeof ROUTES.app]
  | (typeof ROUTES.auth)[keyof typeof ROUTES.auth];
