import Link from "next/link";
import ReadingFlow from "@/components/ReadingFlow";

const STEPS = [
  { title: "Set an intention", body: "Type a question, or simply choose a focus like love, career, growth or clarity." },
  { title: "Draw your cards", body: "The full 78-card deck is shuffled fresh. Each card may land upright or reversed." },
  { title: "Reflect", body: "Your cards are woven into one reading, with questions to carry into your day." },
];

export default function Home() {
  return (
    <>
      <ReadingFlow />
      <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-mist-400/15 bg-night-800/40 p-5">
              <div className="font-display text-3xl text-moon-300">{["I", "II", "III"][i]}</div>
              <h3 className="mt-1 font-display text-xl text-moon-100">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-mist-300">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-mist-400">
          Curious how readings are made?{" "}
          <Link href="/about" className="text-moon-200 underline decoration-moon-200/40 underline-offset-2 hover:text-moon-100">
            Learn how it works
          </Link>
        </p>
      </section>
    </>
  );
}
