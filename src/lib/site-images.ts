import type { CSSProperties } from "react";

const DEFAULT_SITE_IMAGES_BUCKET = "site-images";

export const SITE_IMAGES_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_SITE_IMAGES_BUCKET ?? DEFAULT_SITE_IMAGES_BUCKET;
const LOCAL_ASSET_KEYWORDS = ["logo", "icon", "lockup"];

type SupabaseResizeMode = "cover" | "contain" | "fill";

interface SiteImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  resize?: SupabaseResizeMode;
  useRenderTransform?: boolean;
}

const DEFAULT_BACKGROUND_OPTIONS: SiteImageOptions = {
  width: 1920,
  quality: 72,
  resize: "cover",
  useRenderTransform: true,
};

interface ResponsiveBackgroundOptions {
  mobileWidth?: number;
  desktopWidth?: number;
  quality?: number;
  resize?: SupabaseResizeMode;
}

const DEFAULT_RESPONSIVE_BACKGROUND_OPTIONS: Required<ResponsiveBackgroundOptions> = {
  mobileWidth: 1200,
  desktopWidth: 1920,
  quality: 72,
  resize: "cover",
};

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value) || value.startsWith("data:");
}

function normalizeLocalImagePath(imagePath: string): string {
  const trimmed = imagePath.trim();
  const withoutLeadingSlash = trimmed.replace(/^\/+/, "");

  if (withoutLeadingSlash.startsWith("images/")) {
    return withoutLeadingSlash.slice("images/".length);
  }

  return withoutLeadingSlash;
}

function shouldKeepLocalAsset(imagePath: string): boolean {
  const normalizedPath = normalizeLocalImagePath(imagePath).toLowerCase();
  return LOCAL_ASSET_KEYWORDS.some((keyword) => normalizedPath.includes(keyword));
}

function encodeStoragePath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function getSupabaseSiteImagesBaseUrl(): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/object/public/${SITE_IMAGES_BUCKET}`;
}

export function getSiteImageUrl(imagePath: string, options?: SiteImageOptions): string {
  if (!imagePath) {
    return imagePath;
  }

  if (isAbsoluteUrl(imagePath)) {
    return imagePath;
  }

  const fallbackPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  if (shouldKeepLocalAsset(imagePath)) {
    return fallbackPath;
  }

  const baseUrl = getSupabaseSiteImagesBaseUrl();

  if (!baseUrl) {
    return fallbackPath;
  }

  const storagePath = encodeStoragePath(normalizeLocalImagePath(imagePath));
  const useRenderTransform = Boolean(
    options?.useRenderTransform || options?.width || options?.height || options?.quality || options?.resize,
  );

  if (!useRenderTransform) {
    return `${baseUrl}/${storagePath}`;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  if (!supabaseUrl) {
    return fallbackPath;
  }

  const renderUrl = new URL(
    `${supabaseUrl}/storage/v1/render/image/public/${SITE_IMAGES_BUCKET}/${storagePath}`,
  );

  if (options?.width) {
    renderUrl.searchParams.set("width", String(options.width));
  }
  if (options?.height) {
    renderUrl.searchParams.set("height", String(options.height));
  }
  if (options?.quality) {
    renderUrl.searchParams.set("quality", String(options.quality));
  }
  if (options?.resize) {
    renderUrl.searchParams.set("resize", options.resize);
  }

  return renderUrl.toString();
}

export function getSiteBackgroundImage(imagePath: string, options?: SiteImageOptions): string {
  return `url("${getSiteImageUrl(imagePath, { ...DEFAULT_BACKGROUND_OPTIONS, ...options })}")`;
}

export function getResponsiveSiteBackgroundStyle(
  imagePath: string,
  options?: ResponsiveBackgroundOptions,
): CSSProperties {
  const resolvedOptions = {
    ...DEFAULT_RESPONSIVE_BACKGROUND_OPTIONS,
    ...options,
  };

  const mobileUrl = getSiteImageUrl(imagePath, {
    width: resolvedOptions.mobileWidth,
    quality: resolvedOptions.quality,
    resize: resolvedOptions.resize,
    useRenderTransform: true,
  });

  const desktopUrl = getSiteImageUrl(imagePath, {
    width: resolvedOptions.desktopWidth,
    quality: resolvedOptions.quality,
    resize: resolvedOptions.resize,
    useRenderTransform: true,
  });

  return {
    "--site-bg-mobile": `url("${mobileUrl}")`,
    "--site-bg-desktop": `url("${desktopUrl}")`,
  } as CSSProperties;
}
