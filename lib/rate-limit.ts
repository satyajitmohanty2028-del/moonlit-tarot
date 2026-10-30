// Simple in-memory, per-IP sliding-window rate limiter for AI readings.
// It is best-effort: on serverless hosts each warm instance keeps its own
// counts, which is enough to stop casual quota abuse without extra services.

const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_IPS = 10_000;

const hits = new Map<string, number[]>();

export function readingsPerHour(): number {
  const n = Number(process.env.AI_READINGS_PER_HOUR);
  return Number.isInteger(n) && n > 0 ? n : 5;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Records a hit for `key` if it is under the limit. Returns false when the limit is reached. */
export function consume(key: string, limit = readingsPerHour(), now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.delete(key); // re-insert so the Map stays ordered by most recent activity
  hits.set(key, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return true;
}
