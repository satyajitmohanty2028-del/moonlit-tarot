// Primary provider: the Google Gemini API (free tier) via its REST endpoint.

import type { DrawnCard, ReadingContent, ReadingRequest } from "../reading";
import { AiReadingError, buildUserPrompt, parseReadingJson, READING_SCHEMA, SYSTEM_PROMPT } from "./prompt";

const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Models tried in order when GEMINI_MODEL is not set. gemini-3.5-flash-lite has
 * the most generous free-tier quota (15 RPM / 500 requests per day). A model the
 * API reports as not found is skipped; quota errors (429) are not retried on
 * another model.
 */
export const DEFAULT_GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-2.5-flash-lite"];

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
  error?: { code?: number; message?: string; status?: string };
}

class ModelNotFound extends Error {}
class SchemaUnsupported extends Error {}

async function callModel(
  model: string,
  apiKey: string,
  req: ReadingRequest,
  drawn: DrawnCard[],
  useSchema = true,
): Promise<ReadingContent> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: buildUserPrompt(req, drawn) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          ...(useSchema ? { responseJsonSchema: READING_SCHEMA } : {}),
          // Flash models may spend part of this budget on internal thinking.
          maxOutputTokens: 4096,
        },
      }),
      signal: AbortSignal.timeout(45_000),
    });
  } catch {
    throw new AiReadingError("unavailable", "Could not reach the AI service.");
  }

  const data = (await res.json().catch(() => ({}))) as GeminiResponse;

  if (!res.ok) {
    const status = data.error?.status ?? "";
    if (res.status === 429 || status === "RESOURCE_EXHAUSTED") {
      throw new AiReadingError("rate_limit", "The free AI reader has reached its limit for now.");
    }
    if (res.status === 404 || status === "NOT_FOUND") throw new ModelNotFound(model);
    if (useSchema && res.status === 400 && /response_?json_?schema/i.test(data.error?.message ?? "")) {
      throw new SchemaUnsupported(model);
    }
    if (res.status === 401 || res.status === 403 || /api key/i.test(data.error?.message ?? "")) {
      throw new AiReadingError("auth", "The AI service rejected the API key.");
    }
    throw new AiReadingError("unavailable", `The AI service returned an error (${res.status}).`);
  }

  if (data.promptFeedback?.blockReason) {
    throw new AiReadingError("declined", "The AI declined to read for this question.");
  }
  const candidate = data.candidates?.[0];
  if (candidate?.finishReason === "SAFETY" || candidate?.finishReason === "PROHIBITED_CONTENT") {
    throw new AiReadingError("declined", "The AI declined to read for this question.");
  }
  if (candidate?.finishReason === "MAX_TOKENS") {
    throw new AiReadingError("invalid_output", "The AI reading was cut short.");
  }
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought)
    .map((p) => p.text ?? "")
    .join("");
  return parseReadingJson(text, drawn);
}

export async function generateGeminiReading(req: ReadingRequest, drawn: DrawnCard[]): Promise<ReadingContent> {
  const apiKey = process.env.GEMINI_API_KEY!.trim();
  const configured = process.env.GEMINI_MODEL?.trim();
  const models = configured ? [configured] : DEFAULT_GEMINI_MODELS;

  for (const model of models) {
    try {
      try {
        return await callModel(model, apiKey, req, drawn);
      } catch (err) {
        // Older models without JSON-schema output still follow the JSON instructions in the prompt.
        if (err instanceof SchemaUnsupported) return await callModel(model, apiKey, req, drawn, false);
        throw err;
      }
    } catch (err) {
      if (err instanceof ModelNotFound) {
        console.warn(`Gemini model "${model}" not found; trying the next one.`);
        continue;
      }
      throw err;
    }
  }
  throw new AiReadingError("unavailable", "No configured Gemini model is available.");
}
