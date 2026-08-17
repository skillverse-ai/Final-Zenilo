// Simple in-memory sliding window rate limiter helper for serverless/edge compatibility
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the current sliding window
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    rateLimitMap.set(ip, validTimestamps);
    return { success: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  return { success: true, remaining: limit - validTimestamps.length };
}
