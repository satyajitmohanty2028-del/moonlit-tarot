import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description: "How Moonlit Tarot draws cards and writes AI tarot readings for reflection.",
};

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 rounded-2xl border border-mist-400/15 bg-night-800/50 p-6 backdrop-blur sm:p-8">
      <h2 className="font-display text-3xl text-moon-100">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-mist-300">{children}</div>
    </section>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 pb-6 pt-6 sm:px-6 sm:pt-10">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-moon-300">About</p>
        <h1 className="mt-3 font-display text-5xl text-moon-50">How Moonlit Tarot works</h1>
      </header>

      <Section title="The deck">
        <p>
          Every reading draws from the complete 78-card tarot: the 22 Major Arcana, which speak to life&apos;s larger
          themes, and the 56 Minor Arcana across four suits: Wands (fire, drive), Cups (water, feeling), Swords (air,
          thought) and Pentacles (earth, the material world).
        </p>
        <p>
          The deck is shuffled in your browser using a cryptographically secure random source. Each card you choose has
          an even chance of landing upright or reversed. A reversal doesn&apos;t mean &ldquo;bad&rdquo;; it often points to energy
          that is blocked, turned inward or still forming.
        </p>
      </Section>

      <Section title="The spreads">
        <p>
          <strong className="text-moon-100">One card</strong> offers a single piece of guidance for the moment you&apos;re in.{" "}
          <strong className="text-moon-100">Three cards</strong> tell a small story: what has shaped you (Past), what is
          alive now (Present), and what is opening up (Future), read as possibility rather than fate.
        </p>
      </Section>

      <Section title="The reading">
        <p>
          When AI readings are switched on, your cards, their traditional meanings, your focus and your optional question
          are sent to a language model, which writes a reading that speaks to your question and weaves the cards
          together. The model is guided to be warm, honest and grounded in each card&apos;s meaning, and to avoid
          predictions or professional advice.
        </p>
        <p>
          Readings are written by Google&apos;s Gemini API (free tier). The site owner can optionally use Anthropic&apos;s
          Claude instead. Each AI reading is labelled with the service that wrote it.
        </p>
        <p>
          If AI readings are off or the AI service is busy, you&apos;ll see a clearly marked{" "}
          <span className="rounded bg-amber-300/90 px-1.5 py-0.5 text-xs font-semibold uppercase text-night-950">Demo mode</span>{" "}
          reading instead, showing the cards&apos; traditional meanings from our built-in library. Demo readings are
          never presented as AI-written.
        </p>
      </Section>

      <Section id="privacy" title="Privacy">
        <p>
          There are no accounts and we don&apos;t store your questions or readings. When AI readings are on, your question
          and cards are processed by Google&apos;s Gemini API free tier (or Anthropic&apos;s API, if the site owner chose
          it). Google may use free-tier content to improve its products, so please leave out names and sensitive
          personal details.
        </p>
      </Section>

      <Section id="disclaimer" title="A gentle disclaimer">
        <p>
          Moonlit Tarot is for reflection and entertainment. Tarot can be a beautiful mirror for your thoughts, but it
          cannot predict the future, and readings are not medical, legal, financial or psychological advice. Please trust
          your own judgment and seek a qualified professional for decisions that matter.
        </p>
        <p>
          If you are going through something difficult or feel unsafe, please reach out to someone you trust or to your
          local emergency or crisis services.
        </p>
      </Section>

      <div className="pt-2 text-center">
        <Link
          href="/"
          className="inline-block rounded-xl bg-gradient-to-r from-moon-200 to-moon-400 px-6 py-3 font-medium text-night-950 transition hover:brightness-110"
        >
          Draw your cards
        </Link>
      </div>
    </div>
  );
}
