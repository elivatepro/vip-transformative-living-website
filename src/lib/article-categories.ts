export function parseCategoryList(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatCategoryList(
  value: string | null | undefined,
  separator = " • ",
): string {
  return parseCategoryList(value).join(separator);
}

export function hasCategoryMatch(
  value: string | null | undefined,
  candidates: string[],
): boolean {
  if (candidates.length === 0) return false;

  const categorySet = new Set(
    parseCategoryList(value).map((item) => item.toLowerCase()),
  );

  return candidates.some((candidate) =>
    categorySet.has(candidate.toLowerCase()),
  );
}
