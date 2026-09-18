export function mediaUrl(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value) return value
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as { url?: unknown }).url
    if (typeof url === 'string' && url) return url
  }
  return fallback
}

export function asList<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

export function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value : fallback
}
