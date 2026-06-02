# Project Architecture & Patterns Guide

This document outlines the architectural patterns and folder structure used in the **Estithmarcom** project. It serves as a blueprint for maintaining consistency and can be used as a reference for future projects.

## 1. Folder Structure

The project follows a modular structure within the `src` directory, separating concerns between UI, logic, and routing.

```text
src/
├── app/                  # Next.js App Router (Locale-based: [locale])
│   ├── [locale]/
│   │   ├── (website)/    # Route groups for specific layouts
│   │   │   ├── services/
│   │   │   │   ├── page.tsx          # Server Component (SSR & Prefetching)
│   │   │   │   └── _components/      # Route-specific client components
│   ├── globals.css       # Global styles (Tailwind CSS)
├── components/           # Reusable UI components
│   ├── global/           # Cross-cutting components (Hero, Loaders, etc.)
│   ├── ui/               # Shadcn UI base components
│   ├── [feature]/        # Feature-specific components (blog, service, stats)
├── hooks/                # Custom React hooks (use-axios, use-locale)
├── lib/                  # Core logic and configuration
│   ├── apis/             # API client functions (Server & Client side)
│   ├── locales/          # i18n JSON files (ar/en)
│   ├── schemas/          # Zod validation schemas
│   ├── types/            # TypeScript interfaces/types
│   ├── i18n.ts           # Internationalization setup
│   ├── fetch-server.ts   # Server-side fetch wrapper
├── utils/                # Helper functions/formatters
```

---

## 2. State Management & Data Fetching

### React Query + SSR
We use `@tanstack/react-query` for server-state management. The pattern involves prefetching data on the server and hydrating the client to ensure SEO and fast initial loads.

- **Server Side:** Prefetch data in `page.tsx` using `prefetchQuery`.
- **Hydration:** Wrap the client component in `<HydrationBoundary state={dehydrate(queryClient)}>`.
- **Client Side:** Use `useQuery` to access the cached data and handle subsequent updates (like filtering or pagination).

### Axios Hook
A custom `use-axios.ts` hook is used to provide an Axios instance with base configuration, interceptors (if needed), and automatic locale handling.

---

## 3. Form Handling

We use **Formik** for form state management, combined with **Zod** for schema-based validation.

- **Schemas:** Defined in `src/lib/schemas/` using Zod. Error messages are localized using translation keys (e.g., `form.validation.name`).
- **Adapter:** `zod-formik-adapter` connects Zod schemas to Formik's `validationSchema`.
- **Mutations:** `useMutation` from React Query handles form submissions, providing `isPending` states for UI feedback (e.g., loading buttons).
- **Toasts:** `sonner` is used for success/error notifications.

---

## 4. Pagination & "Load More" Pattern

To avoid flickering and provide a smooth user experience, we implement a "Load More" pattern that appends data rather than replacing it.

1. **Source of Truth:** Use `data.results` from React Query for the initial page (SSR/Hydrated).
2. **Merging Logic:** Maintain a `mergedItems` state that appends new pages.
3. **Display Logic:**
   - If `page === 1`, display `data.results` directly (avoids flicker).
   - If `page > 1`, display `mergedItems`.
4. **Resets:** Clear `mergedItems` and reset `page` to 1 whenever filters (like search or country) change.

---

## 5. Internationalization (i18n)

The project supports Arabic (RTL) and English (LTR).

- **Locales:** JSON files in `src/lib/locales/[ar|en]/translations.json`.
- **Hooks:**
  - `useLocale()`: Retrieves the current language.
  - `getTranslator(locale)`: Provides a `t()` function that handles nested keys and type safety.
- **RTL Support:** Tailwind `dir` attributes and logical properties are used to ensure layout symmetry.

---

## 6. UI & Components (Shadcn UI)

Shadcn UI provides the foundation for our component library.

- **Installation:** Components are added via the Shadcn CLI to `src/components/ui/`.
- **Customization:** We wrap Shadcn components or create high-level components in `src/components/global/` to match the project's specific design system.
- **Tailwind:** Standard utility classes for styling, with custom theme configuration in `tailwind.config.ts`.

---

## 7. Best Practices

- **Surgical Edits:** Favor specific code updates over full file overwrites to keep history clean.
- **Type Safety:** Ensure every API response and component prop is strictly typed in `src/lib/types/`.
- **SEO:** Prefetch critical data (Title, Main Lists) on the server to ensure it's available in the initial HTML.
- **Consistency:** Follow established naming conventions for APIs (`getFeature`, `getFeatureClient`) and components.
