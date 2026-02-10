# VIPTL Supabase Image Streaming TODO

## Goal
- Move all website image assets from local `/public/images` usage to Supabase Storage and serve them via Supabase URLs (or a Supabase-backed streaming route where required).

## Progress (2026-02-10)
- [x] Added shared image URL helpers in `src/lib/site-images.ts` with local fallback behavior.
- [x] Updated `next.config.ts` to allow Supabase Storage remote images (`/storage/v1/object/public/**`).
- [x] Refactored current `src/app/**` and `src/components/**` `/images/*` usage to helper-backed URLs.
- [x] Added image sync script: `npm run sync:site-images` (`scripts/sync-site-images.mjs`).
- [ ] Run real upload to Supabase bucket after env + bucket setup.

## Architecture Decision (Do First)
- [ ] Choose serving model:
- Option A (recommended): public bucket + Supabase CDN URLs directly in `next/image`.
- Option B: private bucket + Next.js route handler that streams bytes from Supabase Storage.
- [ ] Decide bucket strategy:
- Single bucket (e.g. `site-images`) for all site assets.
- Keep existing `article-images` bucket for editorial uploads, or merge into one bucket.
- [ ] Lock file naming/path convention:
- Example: `site/home/hero/wayne-photo-oct-15-2025.jpg`
- Include rules for lowercase, hyphenated names, and no spaces.

## Supabase Setup
- [ ] Create/confirm storage bucket(s) in Supabase (`site-images`, `article-images`).
- [ ] Add/verify storage RLS policies for read and upload flows.
- [ ] Configure cache headers for uploaded assets (`cache-control`, long max-age for static assets).
- [ ] Add required env vars to `.env.example` if missing:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only flows)

## Code Foundations
- [ ] Add a media helper module (e.g. `src/lib/media.ts`) with:
- `getSiteImageUrl(path: string)` for public CDN URLs, or
- `getSignedSiteImageUrl(path: string)` / stream helper for private access.
- [ ] Update `next.config.ts` `images.remotePatterns` to allow Supabase image domain(s).
- [ ] Add central constants map for static asset keys (e.g. `src/lib/site-images.ts`) so components stop hardcoding URLs.

## Asset Migration
- [ ] Inventory all current local image references:
- `src/app/**`, `src/components/**`, `src/app/layout.tsx` metadata icons.
- [ ] Upload all assets from `public/images/**` (and required files from root `images/**`) to Supabase with final path convention.
- [ ] Create a migration manifest mapping old path -> new Supabase path/URL.
- [ ] Keep local files in place until full rollout verification is complete.

## Refactor UI References
- [ ] Replace all `src="/images/...` usages in `next/image` components with Supabase-backed URLs/constants.
- [ ] Replace inline CSS backgrounds like `backgroundImage: "url('/images/...')"` with Supabase-backed URLs.
- [ ] Replace remaining raw `<img>` uses that point to local assets where needed.
- [ ] Update metadata icons in `src/app/layout.tsx` to Supabase-hosted equivalents (if full migration scope includes icons/favicons).

## Admin and Content Flows
- [ ] Align article upload flow (`src/app/admin/articles/upload-action.ts`) with chosen bucket strategy.
- [ ] Ensure editor-inserted and featured article images remain consistent with new asset policy.
- [ ] Add/confirm fallback behavior when an image URL is missing or invalid.

## Performance and Reliability
- [ ] Ensure `next/image` optimization still works with Supabase remote sources.
- [ ] Validate caching behavior (browser cache + Supabase CDN cache).
- [ ] Add graceful fallback image strategy per section/page.
- [ ] Add monitoring/logging for failed image fetches in server routes (if using streaming route).

## Rollout Plan
- [ ] Deploy in two phases:
- Phase 1: upload assets + dual support (local and Supabase URLs).
- Phase 2: switch all references to Supabase and remove local fallbacks.
- [ ] Run validation:
- `npm run lint`
- `npm run build`
- [ ] Run reference audit to confirm migration completeness:
- `rg -n \"src=\\\"/images/|url\\('/images/|/images/\" src`
- [ ] Manually QA desktop + mobile on key pages:
- `/`
- `/about`
- `/coaching`
- `/speaking`
- `/resources`
- `/newsletter`
- `/contact`
- admin login/layout pages

## Cleanup
- [ ] Remove deprecated local assets from `public/images` only after production verification.
- [ ] Update README/deployment docs with image storage workflow.
- [ ] Document naming, upload, and cache rules for future contributors.
