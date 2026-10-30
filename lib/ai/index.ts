// Provider selection. Server-only: reads API keys from the environment.
// Order: GEMINI_API_KEY (free tier) → ANTHROPIC_API_KEY → none (demo mode).

import "server-only";
import type { DrawnCard, ReadingContent, ReadingRequest } from "../reading";
import { generateAnthropicReading } from "./anthropic";
import { generateGeminiReading } from "./gemini";

export type AiProvider = "gemini" | "anthropic";

export { AiReadingError } from "./prompt";

export function selectProvider(): AiProvider | null {
  if (process.env.GEMINI_API_KEY?.trim()) return "gemini";
  if (process.env.ANTHROPIC_API_KEY?.trim()) return "anthropic";
  return null;
}

export function generateAiReading(provider: AiProvider, req: ReadingRequest, drawn: DrawnCard[]): Promise<ReadingContent> {
  return provider === "gemini" ? generateGeminiReading(req, drawn) : generateAnthropicReading(req, drawn);
}
