"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CARD_BY_ID, DECK, type TarotCard } from "@/lib/deck";
import {
  FOCUS_OPTIONS,
  MAX_QUESTION_LENGTH,
  SPREAD_POSITIONS,
  type Focus,
  type ReadingResponse,
  type SpreadType,
} from "@/lib/reading";
import { CardBack, FlipCard } from "./TarotCard";

type Stage = "setup" | "shuffling" | "choose" | "reveal";
type Provider = "gemini" | "anthropic" | null;
interface Pick {
  card: TarotCard;
  reversed: boolean;
}

const SPREAD_SIZE = 21;

function randomInt(max: number): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function shuffled<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PROVIDER_LABEL: Record<"gemini" | "anthropic", string> = {
  gemini: "Google Gemini",
  anthropic: "Anthropic Claude",
};

export function PrivacyNote({ provider }: { provider: Provider }) {
  if (provider === "gemini") {
    return (
      <p className="text-xs leading-relaxed text-mist-400">
        Privacy: your question and cards are sent to Google&apos;s Gemini API (free tier) to write your reading. Google may
        use free-tier content to improve its products, so please leave out names and sensitive personal details. We
        don&apos;t store your readings.
      </p>
    );
  }
  if (provider === "anthropic") {
    return (
      <p className="text-xs leading-relaxed text-mist-400">
        Privacy: your question and cards are sent to Anthropic&apos;s API to write your reading. Please leave out names
        and sensitive personal details. We don&apos;t store your readings.
      </p>
    );
  }
  return null;
}

function DemoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-300/40 bg-amber-200/10 px-4 py-3 text-sm text-amber-100">
      <span className="mr-2 inline-block rounded-full bg-amber-300/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-night-950">
        Demo mode
      </span>
      {children}
    </div>
  );
}

export default function ReadingFlow() {
  const [provider, setProvider] = useState<Provider | undefined>(undefined);
  const [stage, setStage] = useState<Stage>("setup");
  const [question, setQuestion] = useState("");
  const [focus, setFocus] = useState<Focus>("general");
  const [spread, setSpread] = useState<SpreadType>("three");
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [result, setResult] = useState<ReadingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const readingRef = useRef<HTMLDivElement>(null);

  const positions = SPREAD_POSITIONS[spread];

  useEffect(() => {
    fetch("/api/reading")
      .then((r) => r.json())
      .then((d: { provider: Provider }) => setProvider(d.provider))
      .catch(() => setProvider(null));
  }, []);

  function begin() {
    setDeck(shuffled(DECK).slice(0, SPREAD_SIZE));
    setPicks([]);
    setResult(null);
    setError(null);
    setRevealedCount(0);
    setStage("shuffling");
    setTimeout(() => setStage("choose"), 1400);
  }

  function choose(card: TarotCard) {
    if (picks.length >= positions.length || picks.some((p) => p.card.id === card.id)) return;
    const next = [...picks, { card, reversed: randomInt(2) === 1 }];
    setPicks(next);
    if (next.length === positions.length) {
      setTimeout(() => {
        setStage("reveal");
        requestReading(next);
      }, 500);
    }
  }

  async function requestReading(chosen: Pick[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          focus,
          spread,
          cards: chosen.map((p) => ({ id: p.card.id, reversed: p.reversed })),
        }),
      });
      if (!res.ok) throw new Error();
      setResult((await res.json()) as ReadingResponse);
    } catch {
      setError("We couldn't reach the reading service. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  // Flip the chosen cards one at a time once the reveal stage begins.
  useEffect(() => {
    if (stage !== "reveal" || revealedCount >= picks.length) return;
    const t = setTimeout(() => setRevealedCount((n) => n + 1), revealedCount === 0 ? 400 : 750);
    return () => clearTimeout(t);
  }, [stage, revealedCount, picks.length]);

  const allRevealed = stage === "reveal" && revealedCount >= picks.length;

  useEffect(() => {
    if (allRevealed && result) readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [allRevealed, result]);

  function reset() {
    setStage("setup");
    setPicks([]);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pickedIds = useMemo(() => new Set(picks.map((p) => p.card.id)), [picks]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      {stage === "setup" && (
        <section className="fade-up mx-auto max-w-2xl pb-6 pt-6 text-center sm:pt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-moon-300">AI tarot for reflection</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moon-50 sm:text-6xl">
            Ask the cards, <em className="text-moon-200">listen to yourself.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist-300">
            Hold a question in mind, draw from a full 78-card deck, and receive a thoughtful reading that weaves your cards
            into a story worth sitting with. No signup, no cost.
          </p>

          {provider === null && (
            <div className="mt-8 text-left">
              <DemoBanner>
                AI readings aren&apos;t switched on for this site yet. You can still draw cards and see their traditional
                meanings.
              </DemoBanner>
            </div>
          )}

          <div className="mt-8 space-y-6 rounded-2xl border border-mist-400/20 bg-night-800/60 p-5 text-left shadow-2xl backdrop-blur sm:p-7">
            <div>
              <label htmlFor="question" className="font-display text-xl text-moon-100">
                Your question <span className="text-sm font-sans text-mist-400">(optional)</span>
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION_LENGTH))}
                rows={3}
                placeholder="e.g. What do I need to understand about this new chapter at work?"
                className="mt-2 w-full resize-none rounded-xl border border-mist-400/25 bg-night-950/60 px-4 py-3 text-moon-50 placeholder:text-mist-400/60 focus:border-moon-300/60 focus:outline-none focus:ring-2 focus:ring-moon-300/20"
              />
              <div className="mt-1 text-right text-xs text-mist-400">
                {question.length}/{MAX_QUESTION_LENGTH}
              </div>
            </div>

            <fieldset>
              <legend className="font-display text-xl text-moon-100">Focus</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {FOCUS_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFocus(f.value)}
                    title={f.hint}
                    aria-pressed={focus === f.value}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${
                      focus === f.value
                        ? "border-moon-300 bg-moon-200 text-night-950"
                        : "border-mist-400/30 text-mist-300 hover:border-moon-300/60 hover:text-moon-100"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-xl text-moon-100">Spread</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "single", title: "One card", desc: "A single message for now" },
                    { value: "three", title: "Three cards", desc: "Past · Present · Future" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSpread(s.value)}
                    aria-pressed={spread === s.value}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      spread === s.value
                        ? "border-moon-300 bg-moon-200/10"
                        : "border-mist-400/25 hover:border-moon-300/50"
                    }`}
                  >
                    <div className="font-display text-lg text-moon-100">{s.title}</div>
                    <div className="text-xs text-mist-400">{s.desc}</div>
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={begin}
              className="w-full rounded-xl bg-gradient-to-r from-moon-200 to-moon-400 px-6 py-3.5 font-medium text-night-950 shadow-[0_0_30px_-5px_rgba(231,217,173,0.6)] transition hover:brightness-110 active:scale-[0.99]"
            >
              Shuffle the deck
            </button>
            <PrivacyNote provider={provider ?? null} />
          </div>
        </section>
      )}

      {stage === "shuffling" && (
        <section className="flex min-h-[60vh] flex-col items-center justify-center" aria-live="polite">
          <div className="relative h-48 w-32">
            <div className="shuffle-a absolute inset-0"><CardBack /></div>
            <div className="shuffle-b absolute inset-0"><CardBack /></div>
            <div className="absolute inset-0"><CardBack /></div>
          </div>
          <p className="mt-8 font-display text-2xl italic text-moon-200">Shuffling the deck…</p>
        </section>
      )}

      {stage === "choose" && (
        <section className="fade-up pb-10 pt-4 text-center">
          <h2 className="font-display text-3xl text-moon-100 sm:text-4xl">
            Choose {positions.length === 1 ? "a card" : `${positions.length} cards`}
          </h2>
          <p className="mt-2 text-sm text-mist-300">
            {question ? "Keep your question in mind and " : "Breathe, and "}let your hand go where it&apos;s drawn.{" "}
            {positions.length > 1 && (
              <span className="text-moon-200">
                {picks.length < positions.length ? `Next: ${positions[picks.length]}` : "All chosen"}
              </span>
            )}
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-5 gap-2 sm:grid-cols-7 sm:gap-3">
            {deck.map((card, i) => {
              const picked = pickedIds.has(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => choose(card)}
                  disabled={picked || picks.length >= positions.length}
                  aria-label={`Face-down card ${i + 1}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className={`deal-in aspect-[2/3.3] transition duration-300 ${
                    picked
                      ? "-translate-y-3 scale-95 opacity-25"
                      : "hover:-translate-y-2 hover:drop-shadow-[0_0_14px_rgba(231,217,173,0.45)] focus-visible:-translate-y-2"
                  }`}
                >
                  <CardBack />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {stage === "reveal" && (
        <section className="pb-10 pt-4">
          <div className={`mx-auto grid gap-4 sm:gap-8 ${picks.length === 1 ? "max-w-[15rem] grid-cols-1" : "max-w-3xl grid-cols-3"}`}>
            {picks.map((p, i) => (
              <div key={p.card.id} className="deal-in text-center" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="mb-2 text-[0.65rem] uppercase tracking-[0.25em] text-moon-300 sm:text-xs">{positions[i]}</div>
                <FlipCard
                  card={CARD_BY_ID.get(p.card.id)!}
                  reversed={p.reversed}
                  revealed={i < revealedCount}
                  className="text-[11px] sm:text-base"
                />
              </div>
            ))}
          </div>

          <div ref={readingRef} className="mx-auto mt-10 max-w-2xl scroll-mt-6">
            {(!allRevealed || loading) && !error && (
              <p className="text-center font-display text-2xl italic text-moon-200" aria-live="polite">
                {allRevealed ? "The cards are speaking…" : "Turning the cards…"}
              </p>
            )}
            {error && (
              <div className="text-center">
                <p className="text-amber-100">{error}</p>
                <button
                  onClick={() => requestReading(picks)}
                  className="mt-4 rounded-xl border border-moon-300/50 px-5 py-2 text-moon-100 hover:bg-moon-200/10"
                >
                  Try again
                </button>
              </div>
            )}
            {allRevealed && !loading && result && (
              <ReadingView
                result={result}
                question={question}
                onRetry={() => requestReading(picks)}
                onReset={reset}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function ReadingView({
  result,
  question,
  onRetry,
  onReset,
}: {
  result: ReadingResponse;
  question: string;
  onRetry: () => void;
  onReset: () => void;
}) {
  const { reading, mode } = result;
  const isDemo = mode === "demo";
  return (
    <article className="fade-up space-y-6">
      {isDemo ? (
        <DemoBanner>
          <span className="font-medium">This is not an AI reading.</span> {result.notice}
          {result.retryable && (
            <button onClick={onRetry} className="ml-2 underline underline-offset-2 hover:text-white">
              Try the AI reading again
            </button>
          )}
        </DemoBanner>
      ) : (
        <div className="flex justify-center">
          <span className="rounded-full border border-moon-300/40 bg-moon-200/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-moon-200">
            AI reading · {PROVIDER_LABEL[result.provider ?? "gemini"]}
          </span>
        </div>
      )}

      <header className="text-center">
        <h2 className="font-display text-4xl text-moon-50 sm:text-5xl">{reading.title}</h2>
        {question && <p className="mt-3 text-sm italic text-mist-300">“{question}”</p>}
      </header>

      <p className="font-display text-xl leading-relaxed text-moon-100 sm:text-2xl">{reading.opening}</p>

      <div className="space-y-4">
        {reading.cards.map((c, i) => (
          <section
            key={i}
            className="rounded-2xl border border-mist-400/15 bg-night-800/50 p-5 backdrop-blur sm:p-6"
          >
            <h3 className="text-xs uppercase tracking-[0.25em] text-moon-300">{c.position}</h3>
            <p className="mt-2 leading-relaxed text-moon-50/90">{c.text}</p>
          </section>
        ))}
      </div>

      <section className="rounded-2xl border border-moon-300/25 bg-gradient-to-b from-moon-200/10 to-transparent p-5 sm:p-6">
        <h3 className="font-display text-2xl text-moon-100">{isDemo ? "Patterns in your draw" : "Woven together"}</h3>
        <p className="mt-2 leading-relaxed text-moon-50/90">{reading.synthesis}</p>
      </section>

      {reading.reflectionQuestions.length > 0 && (
        <section>
          <h3 className="font-display text-2xl text-moon-100">To sit with</h3>
          <ul className="mt-3 space-y-2">
            {reading.reflectionQuestions.map((q, i) => (
              <li key={i} className="flex gap-3 text-mist-300">
                <span className="text-moon-300" aria-hidden>✦</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-center text-xs text-mist-400">
        This reading is an invitation to reflect, not a prediction or professional advice.
      </p>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="rounded-xl bg-gradient-to-r from-moon-200 to-moon-400 px-6 py-3 font-medium text-night-950 transition hover:brightness-110"
        >
          Begin a new reading
        </button>
      </div>
    </article>
  );
}
