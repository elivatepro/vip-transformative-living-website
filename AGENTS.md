# Agent Guide for VIPTL Website

Repository: Next.js 16 app (App Router) with TypeScript, Supabase server actions, and custom UI components.

## Commands (npm)
- Install: `npm install`.
- Dev server: `npm run dev` (Next.js).
- Build: `npm run build`.
- Start (after build): `npm run start`.
- Lint: `npm run lint` (uses `eslint-config-next`).
- Tests: None configured; no test runner present.
- Single test: not available (no test framework set up).
- Type check: enabled via TS strict; no standalone script, but `next build` enforces types.

## Environment and Platform Notes
- Node/Next: Next 16.1.4, React 19, TypeScript 5.
- Path alias: `@/*` → `./src/*` (set in `tsconfig.json`).
- TS config: strict, `moduleResolution: bundler`, JSX `react-jsx`, `noEmit` true.
- Fonts: Google fonts via `next/font` (Playfair_Display, Inter) in `src/app/layout.tsx`.
- Global scripts: Chatway widget injected in `src/app/layout.tsx` (Script id `chatway`), plus form_embed.js.
- Data: Supabase client (`@/lib/supabase-server`) used in server actions; needs Supabase env vars present.

## Repository Layout (high-level)
- `src/app/layout.tsx`: Root layout, fonts, background, scripts, `AppShell` wrapper.
- `src/app/page.tsx`: Homepage; contains hero, sections, newsletter card using `CompactNewsletterForm`.
- `src/app/actions.ts`: Server actions (newsletter subscribe, contact form) using Supabase and zod validation.
- `src/components/*`: UI building blocks; newsletter forms, layout, buttons, etc.
- No custom ESLint or Tailwind config files committed; Next defaults apply.

## Coding Style and Conventions
- Language: TypeScript with strict typing; prefer explicit types for props and returned shapes.
- Imports: use path alias `@/` for local modules; group React/Next first, then third-party, then local; keep type-only imports when applicable.
- Components: Functional React components; App Router with server/client split.
- Client components: mark with `'use client'` when using hooks/state (`CompactNewsletterForm`, `NewsletterForm`, grids, etc.).
- Server actions: exported async functions in `src/app/actions.ts` with zod validation; return small `{ success, message }` payloads.
- Forms: Prefer `<form action={serverAction}>` with hidden `source` field; handle pending/success messages on client components.
- Validation: zod schemas used for contact and newsletter; surface friendly error strings; keep minimal and precise.
- Error handling: Catch and log server errors to console; return non-throwing response objects for UI messaging; handle Supabase unique violation separately.
- Naming: camelCase for variables/functions; PascalCase for components/types; clear source identifiers (e.g., `homepage_newsletter`).
- Async code: `async/await`; wrap Supabase ops in try/catch; avoid throwing to client.
- Styles: Tailwind-style utility classes in JSX; avoid inline styles unless necessary for background images/masks.
- Fonts/classes: reuse provided CSS variables (`--font-playfair`, `--font-inter`); bodies use `bg-background` / `text-foreground` tokens.
- UI: Buttons from `@/components/ui/button`; prefer provided variants (`primary`, `secondary`, `outline`, etc.).
- Accessibility: Inputs require `required`; set placeholders thoughtfully; ensure buttons have text (avoid icon-only without labels).

## Newsletter + Contact Data Flow
- Newsletter submit: `subscribeToNewsletter(prevState, formData)` in `src/app/actions.ts`.
  - Validates `email` and optional `source` (default `website`).
  - Checks Supabase `subscribers` table for existing row; reactivates if inactive.
  - Returns `{ success, message }` without throwing.
- UI components:
  - `CompactNewsletterForm` (client): handles pending state, success/err message; props `source`, `placeholder`, `buttonText`, `className`.
  - `NewsletterForm` (client): similar, with `SubmitButton` using `useFormStatus`.
- Contact form: `submitContactForm` server action validates name/email/message; sends optional webhook `process.env.GHL_WEBHOOK_URL`; includes honeypot `website` field.

## Routing and Layout
- Uses App Router with file-based routes under `src/app`. Pages include `/`, `/newsletter`, `/speaking`, `/coaching`, `/contact`, admin pages.
- Layout wraps in `<html lang="en" className="dark">` with `BackgroundEffects` and `AppShell` around all pages.
- Assets: images referenced from `/public/images/*`.

## Linting/Formatting Expectations
- ESLint: uses Next defaults (`eslint-config-next`); run `npm run lint` before PRs when possible.
- Formatting: Follow existing JSX/Tailwind style; 2-space indent; double quotes in TSX imports; trailing commas where standard TS/Prettier defaults apply.
- Avoid disabling ESLint/TS unless necessary; prefer satisfying rules.
- Keep imports ordered and minimal; remove unused imports/vars.

## Types and State
- Prefer explicit prop interfaces (`interface Props { ... }`) for components.
- Use `Readonly<{ children: React.ReactNode }>` pattern in layouts.
- Keep state minimal; `useState` for UI messages/loading; `useFormStatus` for server action pending in nested button.
- Avoid `any`; when unavoidable, narrow quickly.

## Naming and Sources
- Track lead sources with `source` hidden input (e.g., `homepage_newsletter`, `newsletter_hero`); keep consistent across forms.
- Messages to users should be concise and reassuring.

## Error Handling and Logging
- Server actions: catch errors; log with context (`console.error('Subscription error:', error)`); return safe messages.
- Do not throw raw errors to the client; prefer structured response objects.
- Handle Supabase unique constraint (`error.code === '23505'`) as already subscribed.

## Data and External Services
- Supabase client factory `createClient` expected in `@/lib/supabase-server`; requires env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` or similar) set at runtime.
- Contact webhook uses `process.env.GHL_WEBHOOK_URL`; agent should not hardcode secrets. Check for presence before sending.

## Styling Patterns
- Dark theme baseline; cards use `bg-surface`, `border-border`, gold accents via `text-gold`, gradients like `bg-gold-gradient`.
- Use rounded corners, subtle borders, gradients for CTAs; avoid introducing new design systems unless requested.
- Respect responsive patterns (e.g., `flex-col sm:flex-row`, `max-w-*`, `container mx-auto px-4`).

## Adding/Modifying Forms
- Reuse `CompactNewsletterForm` or `NewsletterForm` for email capture to ensure Supabase integration.
- Always include a `source` hidden field for attribution.
- Keep privacy note near newsletter forms.

## Build/Debug Tips
- For hydration/client issues, ensure client components declare `'use client'` and avoid server-only modules.
- When adding scripts, prefer `next/script` with explicit `strategy` and `id`.
- If adding new Supabase tables/columns, update server actions accordingly.

## Git Practices
- Conventional commits (e.g., `feat: ...`, `fix: ...`, `chore: ...`).
- Avoid committing secrets or `.env` files.
- Run `npm run lint` before committing when feasible; there are no tests to run.

## Cursor / Copilot Rules
- No Cursor rules (`.cursor/` or `.cursorrules`) present.
- No Copilot instructions file detected (`.github/copilot-instructions.md`).

## When in Doubt
- Follow existing patterns in `src/components` and `src/app/actions.ts`.
- Keep UX aligned with current dark + gold theme.
- Prefer small, composable components over large monoliths.
- Validate user input with zod; never trust raw `FormData`.

## App Router Patterns
- Default export pages from `src/app/**/page.tsx`; layouts live beside as `layout.tsx`.
- Client components require `'use client'` at the top; server components are default.
- Use `next/link` for internal navigation; avoid `a` tags unless external or with `target`.
- For metadata, use `export const metadata` in layout/page where needed.

## SEO / Metadata
- Root metadata in `src/app/layout.tsx`; reuse for title/description; icons defined there.
- OpenGraph defaults set to the main site; update carefully for new pages if distinct.

## Assets and Images
- Images under `public/images`; prefer `next/image` with `fill`/`sizes` for performance.
- For decorative backgrounds, keep gradients/overlays to maintain contrast on dark theme.

## UI Components and Variants
- Buttons: use `@/components/ui/button` variants (`primary`, `secondary`, `outline`, `ghost`, etc.).
- Cards: `bg-surface` / `bg-surface-elevated`, borders via `border-border` or gold accents.
- Spacing: classes align with Tailwind utilities; keep responsive stacks (`flex-col sm:flex-row`).

## State and Form UX
- Show pending state on submits (`useFormStatus` or manual `isPending`).
- Display inline errors near inputs; show success banners when returning success messages.
- Keep privacy/unsubscribe notes adjacent to newsletter forms.

## Error Surfaces
- Log server issues with context strings; avoid leaking stack traces to users.
- User-facing messages should be short and reassuring.

## External Libraries
- `framer-motion` used for grids/animations; keep motion components client-side.
- `lucide-react` for icons; ensure icons have accessible labels if standalone.
- `zod` for validation; extend schemas rather than ad-hoc checks.

## File/Folder Naming
- Use kebab or lower-case for folders; PascalCase for React components; avoid spaces.
- Place shared UI in `src/components/ui`; feature-specific in `src/components/*`.

## Data Persistence Notes
- Supabase table `subscribers` expected to have `email`, `source`, `is_active`, `unsubscribed_at`.
- Reactivation path updates `is_active` to true and clears `unsubscribed_at`.

## Accessibility
- Ensure headings follow hierarchy (h1 on page, descending order).
- Provide `alt` text for `Image`; if decorative, set `aria-hidden` appropriately.
- Maintain focus states; avoid removing outlines; rely on Tailwind focus styles.

## Performance Considerations
- Prefer `strategy="afterInteractive"`/`lazyOnload` for third-party scripts via `next/script`.
- Avoid client components when server components suffice; keep bundles lean.
- Use `AnimatePresence`/`motion` sparingly to avoid layout thrash.

## Deployment / Env
- Production URL set in metadata to `https://viptansformativeliving.com`; confirm spelling before edits.
- Ensure Supabase env vars and webhook URLs are present for server actions when deploying.

## Working Locally
- Run `npm run dev` and navigate to `/` for homepage, `/newsletter` for articles.
- No Husky hooks configured; manual lint before commit recommended.
- If `next build` fails, check TS strict errors first.

## Branching/Commits
- Use conventional commit prefixes (`feat`, `fix`, `chore`, `refactor`, `docs`, etc.).
- Avoid force pushes; keep main clean; prefer feature branches for larger work.

## Troubleshooting Supabase
- If subscriptions fail locally, verify service role key is available; server actions run on server only.
- Unique constraint errors return friendly "already subscribed" message; no action needed.

## Checklist Before PR
- Lint passes (`npm run lint`).
- Visual check on desktop + mobile for new UI.
- Sources tracked on new forms; privacy note present.
- No secrets committed; `.env*` should remain untracked.

## No Cursor / Copilot Rules Found
- Confirmed by absence of `.cursor/` and `.github/copilot-instructions.md`.
