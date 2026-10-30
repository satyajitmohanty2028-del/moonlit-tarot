// Demo-mode reading: composed from the built-in card meanings, used only when
// no ANTHROPIC_API_KEY is configured (or the AI service is unreachable).
// The UI always labels these readings as demo mode, never as AI-written.

import { SUIT_INFO } from "./deck";
import type { DrawnCard, ReadingContent, ReadingRequest } from "./reading";

const POSITION_LEAD: Record<string, string> = {
  Guidance: "As guidance for now",
  Past: "Looking back",
  Present: "In the present",
  Future: "Looking ahead",
};

export function buildDemoReading(req: ReadingRequest, drawn: DrawnCard[]): ReadingContent {
  const cards = drawn.map(({ card, reversed, position }) => {
    const keywords = reversed ? card.keywords.reversed : card.keywords.upright;
    const meaning = reversed ? card.reversed : card.upright;
    return {
      position,
      text: `${POSITION_LEAD[position] ?? position}, ${card.name}${reversed ? " (reversed)" : ""} speaks of ${keywords.join(", ")}. ${meaning}`,
    };
  });

  const majors = drawn.filter((d) => d.card.arcana === "major").length;
  const reversals = drawn.filter((d) => d.reversed).length;
  const suits = drawn.flatMap((d) => (d.card.suit ? [d.card.suit] : []));
  const notes: string[] = [];
  if (drawn.length > 1 && majors >= 2) notes.push("Several Major Arcana cards suggest significant themes at work.");
  if (drawn.length > 1 && reversals >= 2) notes.push("Multiple reversals point to energy turned inward or temporarily blocked.");
  const dominant = suits.find((s, i) => suits.indexOf(s) !== i);
  if (dominant) notes.push(`A repeated suit of ${dominant} emphasises ${SUIT_INFO[dominant].theme}.`);

  return {
    title: drawn.length === 1 ? drawn[0].card.name : drawn.map((d) => d.card.name).join(" · "),
    opening: req.question
      ? `You asked: “${req.question}”. These are the traditional meanings of the cards you drew.`
      : "These are the traditional meanings of the cards you drew.",
    cards,
    synthesis: notes.length ? notes.join(" ") : "Read the meanings side by side and notice which phrases resonate with you.",
    reflectionQuestions: [
      "Which line above stood out to you first, and why?",
      "What would change if you acted on that today?",
    ],
  };
}
