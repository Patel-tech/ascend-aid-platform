# Architecture

Enterprise-grade folder structure for the PrepPilot AI Interview Prep app.

## Tech stack

| Layer            | Choice                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Language         | TypeScript (strict)                                                     |
| UI library       | React 19                                                                |
| Component kit    | Material UI v9 (`@mui/material`, `@mui/icons-material`)                 |
| State management | Redux Toolkit + React-Redux                                             |
| Routing          | TanStack Router (TanStack Start template — replaces `react-router-dom`) |
| Data fetching    | Axios (`src/services/api/axios.ts`) with interceptors                   |
| Charts           | Recharts                                                                |
| Build            | Vite 7 (TanStack Start plugin)                                          |

> **Why TanStack Router instead of `react-router-dom`?**
> The project template is TanStack Start, which provides file-based routing,
> SSR, and server functions. TanStack Router *is* the React Router for this
> stack — its `<Link>`, `useNavigate`, `useParams`, and route loaders are
> fully type-safe. Adding `react-router-dom` on top would break SSR and
> framework conventions.

## Folder layout

```
src/
├── app/                      # App-level wiring (providers, theme, router)
├── components/               # Shared presentational + layout components
│   ├── AppShell.tsx
│   ├── AuthLayout.tsx
│   ├── Providers.tsx
│   └── pages/                # Page-level views (consumed by routes)
├── features/                 # Feature modules (vertical slices)
│   ├── auth/
│   │   └── api/authApi.ts
│   ├── assistant/
│   │   └── api/assistantApi.ts
│   ├── documents/
│   │   └── api/documentsApi.ts
│   ├── quiz/
│   │   └── api/quizApi.ts
│   ├── resume/
│   │   └── api/resumeApi.ts
│   ├── mockInterview/
│   │   └── api/mockInterviewApi.ts
│   └── analytics/
│       └── api/analyticsApi.ts
├── hooks/                    # Reusable hooks (useDebounce, useLocalStorage…)
├── services/
│   └── api/
│       └── axios.ts          # Centralized Axios instance + interceptors
├── store/                    # Redux Toolkit store + slices
│   ├── index.ts
│   ├── authSlice.ts
│   ├── chatSlice.ts
│   └── themeSlice.ts
├── theme/                    # MUI theme tokens (light + dark)
├── types/                    # Shared TS contracts (api.ts, common.ts)
├── constants/                # Routes, config, storage keys
├── utils/                    # Pure helpers (formatters, validators)
└── routes/                   # TanStack file-based routes (thin shells)
```

## Conventions

1. **Vertical slices.** Each business module owns its API client, types, slice
   (when needed), and UI components under `src/features/<module>/`.
2. **Thin routes.** Files under `src/routes/` only declare the route and
   render a page component from `src/components/pages/` or
   `src/features/*/components/`.
3. **Single Axios instance.** All HTTP calls go through
   `src/services/api/axios.ts`. Per-feature `*Api.ts` modules expose typed
   functions and never instantiate their own clients.
4. **Typed routes.** Navigation uses constants from
   `src/constants/routes.ts` so renames stay safe.
5. **No browser globals at module scope.** `window` / `localStorage` are
   only touched inside hooks (`useLocalStorage`), effects, or event handlers
   to keep SSR healthy.
6. **Redux scope.** Slices hold app-wide UI state (theme, auth user, active
   chat). Server data should be fetched via the feature API + React Query in
   future iterations — slices are not a server cache.
7. **Barrel exports.** Each feature exposes a single `index.ts` for clean
   imports: `import { quizApi } from "@/features/quiz"`.

## Adding a new feature

1. Create `src/features/<name>/api/<name>Api.ts` and types.
2. Build components under `src/features/<name>/components/`.
3. Add the route under `src/routes/_app.<name>.tsx` (thin shell).
4. Register the path in `src/constants/routes.ts`.
5. If it owns global UI state, add `src/features/<name>/<name>Slice.ts` and
   register it in `src/store/index.ts`.

## Environment variables

- `VITE_API_URL` — base URL for Axios. Defaults to `/api`.
- Server-only secrets must **not** use the `VITE_` prefix and must be read
  inside a `createServerFn().handler()` body.
