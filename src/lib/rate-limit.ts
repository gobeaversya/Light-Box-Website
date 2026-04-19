// Simple in-memory rate limiter for serverless environments.
// Limits reset on cold starts, but still blocks sustained abuse within a single instance.

const hits = new Map<string, { count: number; resetAt: number }>()

// Clean up stale entries periodically so memory doesn't grow unbounded
setInterval(() => {
  const now = Date.now()
  hits.forEach((entry, key) => {
    if (now > entry.resetAt) hits.delete(key)
  })
}, 60_000)

/**
 * Returns true if the request should be BLOCKED (rate limit exceeded).
 * @param key    Unique identifier (e.g. IP address or IP + route)
 * @param limit  Max requests allowed in the window
 * @param windowMs  Window duration in milliseconds
 */
export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  entry.count++
  return entry.count > limit
}

/** Extract client IP from a Next.js request (works on Netlify/Vercel). */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}
