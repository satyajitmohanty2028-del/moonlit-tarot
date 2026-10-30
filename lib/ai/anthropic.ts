// Optional alternative provider: the Anthropic Messages API (paid).

import Anthropic from "@anthropic-ai/sdk";
import type { DrawnCard, ReadingContent, ReadingRequest } from "../reading";
import { AiReadingError, buildUserPrompt, parseReadingJson, READING_SCHEMA, SYSTEM_PROMPT } from "./prompt";

export const DEFAULT_ANTHROPIC_MODEL = "claude-haiku-4-5";

export async function generateAnthropicReading(req: ReadingRequest, drawn: DrawnCard[]): Promise<ReadingContent> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: 45_000, maxRetries: 1 });
  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_ANTHROPIC_MODEL;

  let response: Anthropic.Message;
  try {
    response = await client.messages.create({
      model,
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(req, drawn) }],
      output_config: { format: { type: "json_schema", schema: READING_SCHEMA } },
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) throw new AiReadingError("rate_limit", "The AI reader is busy right now.");
    if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
      throw new AiReadingError("auth", "The AI service rejected the API key.");
    }
    if (err instanceof Anthropic.APIError) {
      throw new AiReadingError("unavailable", `The AI service returned an error (${err.status ?? "network"}).`);
    }
    throw new AiReadingError("unavailable", "Could not reach the AI service.");
  }

  if (response.stop_reason === "refusal") throw new AiReadingError("declined", "The AI declined to read for this question.");
  if (response.stop_reason === "max_tokens") throw new AiReadingError("invalid_output", "The AI reading was cut short.");

  const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  return parseReadingJson(text, drawn);
}
