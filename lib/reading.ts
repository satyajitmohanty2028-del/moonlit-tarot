// Shared types and request validation for a reading.

import { CARD_BY_ID, type TarotCard } from "./deck";

export type Focus = "general" | "love" | "career" | "growth" | "clarity";
export type SpreadType = "single" | "three";

export const FOCUS_OPTIONS: { value: Focus; label: string; hint: string }[] = [
  { value: "general", label: "Open", hint: "Whatever wants to surface" },
  { value: "love", label: "Love", hint: "Relationships and the heart" },
  { value: "career", label: "Career", hint: "Work, purpose and direction" },
  { value: "growth", label: "Growth", hint: "Healing and becoming" },
  { value: "clarity", label: "Clarity", hint: "A decision or a fog to lift" },
];

export const SPREAD_POSITIONS: Record<SpreadType, string[]> = {
  single: ["Guidance"],
  three: ["Past", "Present", "Future"],
};

export interface DrawnCardInput {
  id: string;
  reversed: boolean;
}

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  position: string;
}

export interface ReadingRequest {
  question: string;
  focus: Focus;
  spread: SpreadType;
  cards: DrawnCardInput[];
}

export interface ReadingContent {
  title: string;
  opening: string;
  cards: { position: string; text: string }[];
  synthesis: string;
  reflectionQuestions: string[];
}

export interface ReadingResponse {
  /** "ai" when written by the language model; "demo" when composed from built-in meanings. */
  mode: "ai" | "demo";
  /** Which AI service wrote the reading (only in "ai" mode). */
  provider?: "gemini" | "anthropic";
  reading: ReadingContent;
  /** Why the reading is in demo mode, shown to the visitor. */
  notice?: string;
  /** True when the AI is configured but temporarily unavailable, so retrying may succeed. */
  retryable?: boolean;
}

export const MAX_QUESTION_LENGTH = 500;

/** Parse and validate an untrusted request body. Returns null when invalid. */
export function parseReadingRequest(body: unknown): { req: ReadingRequest; drawn: DrawnCard[] } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const spread = b.spread === "three" ? "three" : b.spread === "single" ? "single" : null;
  if (!spread) return null;
  const focus = FOCUS_OPTIONS.some((f) => f.value === b.focus) ? (b.focus as Focus) : "general";
  if (b.question !== undefined && typeof b.question !== "string") return null;
  const question = (b.question ?? "").trim();
  if (question.length > MAX_QUESTION_LENGTH) return null;
  if (!Array.isArray(b.cards)) return null;

  const positions = SPREAD_POSITIONS[spread];
  if (b.cards.length !== positions.length) return null;

  const seen = new Set<string>();
  const drawn: DrawnCard[] = [];
  for (const [i, raw] of b.cards.entries()) {
    if (!raw || typeof raw !== "object") return null;
    const { id, reversed } = raw as Record<string, unknown>;
    const card = typeof id === "string" ? CARD_BY_ID.get(id) : undefined;
    if (!card || seen.has(card.id) || typeof reversed !== "boolean") return null;
    seen.add(card.id);
    drawn.push({ card, reversed, position: positions[i] });
  }
  return {
    req: { question, focus, spread, cards: drawn.map((d) => ({ id: d.card.id, reversed: d.reversed })) },
    drawn,
  };
}
