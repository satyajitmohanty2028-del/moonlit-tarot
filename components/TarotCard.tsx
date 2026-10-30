import { cardNumeral, SUIT_INFO, type Suit, type TarotCard as Card } from "@/lib/deck";

const SUIT_STYLE: Record<Suit | "major", string> = {
  major: "from-[#2a2470] via-[#191a4a] to-[#0d0f2b]",
  wands: "from-[#5a2a2a] via-[#2e1830] to-[#120d24]",
  cups: "from-[#1d3f6b] via-[#16264d] to-[#0b0f2a]",
  swords: "from-[#3b4a6b] via-[#222a4a] to-[#0d1028]",
  pentacles: "from-[#2d4a35] via-[#1a2a35] to-[#0c1224]",
};

function SuitIcon({ suit, className }: { suit: Suit | "major"; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (suit) {
    case "wands":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M16 42 L32 8" />
          <path d="M32 8 l-2 6 M32 8 l4 4 M25 22 l5 1 M21 30 l-4 -1" />
          <circle cx="32" cy="8" r="2.5" />
        </svg>
      );
    case "cups":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M12 10 h24 c0 12 -5 18 -12 18 s-12 -6 -12 -18 z" />
          <path d="M24 28 v8 M16 40 h16 M18 36 h12" />
          <path d="M16 14 c3 2 13 2 16 0" />
        </svg>
      );
    case "swords":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M24 4 l3 6 v20 h-6 v-20 z" />
          <path d="M14 30 h20 M24 30 v9" />
          <circle cx="24" cy="42" r="2.5" />
        </svg>
      );
    case "pentacles":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="17" />
          <path d="M24 9 L32.8 36 L9.8 19.4 H38.2 L15.2 36 Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M30 8 a16 16 0 1 0 10 26 a13 13 0 1 1 -10 -26 z" />
          <path d="M14 12 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 z" />
          <circle cx="36" cy="14" r="0.8" fill="currentColor" />
        </svg>
      );
  }
}

export function CardBack({ className = "" }: { className?: string }) {
  return (
    <div className={`card-back-pattern relative h-full w-full rounded-[0.9rem] border border-moon-200/30 ${className}`}>
      <div className="absolute inset-2 rounded-[0.6rem] border border-moon-200/20" />
      <div className="absolute inset-0 flex items-center justify-center text-moon-200/70">
        <SuitIcon suit="major" className="w-1/3" />
      </div>
    </div>
  );
}

export function CardFace({ card, reversed }: { card: Card; reversed: boolean }) {
  const kind = card.suit ?? "major";
  const element = card.suit ? SUIT_INFO[card.suit].element : "Major Arcana";
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-between rounded-[0.9rem] border border-moon-200/40 bg-gradient-to-b p-[7%] text-moon-100 ${SUIT_STYLE[kind]}`}
    >
      <div className="absolute inset-1.5 rounded-[0.65rem] border border-moon-200/15" />
      <div className="font-display text-[0.7em] tracking-[0.2em] text-moon-200/90">{cardNumeral(card)}</div>
      <div className={`flex flex-1 items-center justify-center transition-transform ${reversed ? "rotate-180" : ""}`}>
        <SuitIcon suit={kind} className="w-[55%] max-w-24 text-moon-200 drop-shadow-[0_0_10px_rgba(231,217,173,0.35)]" />
      </div>
      <div className="text-center">
        <div className="font-display text-[0.95em] leading-tight">{card.name}</div>
        <div className="mt-0.5 text-[0.55em] uppercase tracking-[0.18em] text-mist-300/80">
          {reversed ? "Reversed" : element}
        </div>
      </div>
    </div>
  );
}

/** A card that flips from its back to its face when `revealed` becomes true. */
export function FlipCard({
  card,
  reversed,
  revealed,
  className = "",
}: {
  card: Card;
  reversed: boolean;
  revealed: boolean;
  className?: string;
}) {
  return (
    <div className={`card-scene aspect-[2/3.3] ${className}`}>
      <div className={`card-inner ${revealed ? "is-flipped" : ""}`}>
        <div className="card-face shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
          <CardBack />
        </div>
        <div className="card-face front shadow-[0_0_40px_-6px_rgba(231,217,173,0.35)]">
          <CardFace card={card} reversed={reversed} />
        </div>
      </div>
    </div>
  );
}
