import { NextResponse } from "next/server";
import { AiReadingError, generateAiReading, selectProvider } from "@/lib/ai";
import { buildDemoReading } from "@/lib/demo-engine";
import { MAX_QUESTION_LENGTH, parseReadingRequest, type ReadingResponse } from "@/lib/reading";
import { clientIp, consume, readingsPerHour } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 4_096;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RETRY_MESSAGES: Record<AiReadingError["kind"], string> = {
  rate_limit: "The free AI reader has reached its limit for the moment. Please try again in a minute or two.",
  auth: "The AI reader isn't set up correctly on this site right now.",
  declined: "The AI reader couldn't respond to this question. You might try rephrasing it.",
  invalid_output: "The AI reading didn't come through properly. Please try again.",
  unavailable: "The AI reader couldn't be reached. Please try again in a moment.",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseReadingRequest(body);
  if (!parsed) {
    return NextResponse.json(
      { error: `Invalid reading request. Questions can be up to ${MAX_QUESTION_LENGTH} characters.` },
      { status: 400 },
    );
  }
  const { req, drawn } = parsed;

  const provider = selectProvider();
  if (!provider) {
    const res: ReadingResponse = {
      mode: "demo",
      reading: buildDemoReading(req, drawn),
      notice: "AI readings aren't switched on for this site, so you're seeing the cards' traditional meanings instead.",
    };
    return NextResponse.json(res);
  }

  // Only AI readings count toward the limit; built-in readings cost nothing.
  if (!consume(clientIp(request))) {
    const res: ReadingResponse = {
      mode: "demo",
      reading: buildDemoReading(req, drawn),
      notice: `You've reached the limit of ${readingsPerHour()} AI readings per hour, which keeps this free service available for everyone. Please come back a little later. Meanwhile, here are the cards' traditional meanings.`,
    };
    return NextResponse.json(res);
  }

  try {
    const res: ReadingResponse = { mode: "ai", provider, reading: await generateAiReading(provider, req, drawn) };
    return NextResponse.json(res);
  } catch (err) {
    console.error(`AI reading via ${provider} failed:`, err);
    const kind = err instanceof AiReadingError ? err.kind : "unavailable";
    const res: ReadingResponse = {
      mode: "demo",
      reading: buildDemoReading(req, drawn),
      notice: `${RETRY_MESSAGES[kind]} Meanwhile, here are the cards' traditional meanings.`,
      retryable: kind !== "auth",
    };
    return NextResponse.json(res);
  }
}

/** Lets the page show whether AI readings are on before a reading is requested. */
export async function GET() {
  return NextResponse.json({ provider: selectProvider() });
}
