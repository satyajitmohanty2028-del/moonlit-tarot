// The full 78-card tarot deck: 22 Major Arcana and 56 Minor Arcana.
// This is the factual source for card identities and meanings. The AI reading
// is grounded in it, and demo mode builds its readings from it.

export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Arcana = "major" | "minor";

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  suit?: Suit;
  /** 0–21 for majors; 1–14 for minors (11 Page, 12 Knight, 13 Queen, 14 King). */
  number: number;
  keywords: { upright: string[]; reversed: string[] };
  upright: string;
  reversed: string;
}

type CardSeed = [name: string, up: string[], rev: string[], upright: string, reversed: string];

const MAJORS: CardSeed[] = [
  ["The Fool", ["beginnings", "trust", "spontaneity"], ["hesitation", "recklessness", "fear of the leap"],
    "A fresh start asks for openness more than certainty. You are invited to step forward with curiosity, trusting that the path reveals itself as you walk it.",
    "You may be holding back from a leap out of fear, or leaping without looking. Ask whether caution is protecting you or simply keeping you small."],
  ["The Magician", ["willpower", "skill", "manifestation"], ["scattered energy", "manipulation", "untapped potential"],
    "You already hold the tools you need. Focus and intention can turn an idea into something real, if you commit your attention to it.",
    "Your energy may be scattered, or your talents underused. Notice where intention and action have drifted apart, and where honesty is needed."],
  ["The High Priestess", ["intuition", "inner knowing", "mystery"], ["ignored intuition", "secrets", "disconnection"],
    "Quiet knowing is available to you beneath the noise. This is a time to listen inward and let answers surface rather than forcing them.",
    "You may be overriding your intuition or keeping something hidden, even from yourself. Stillness can help you hear what you already sense."],
  ["The Empress", ["nurture", "abundance", "creativity"], ["depletion", "smothering", "creative block"],
    "Growth comes through care, patience and pleasure. Tend to what you love, including yourself, and let things ripen in their own time.",
    "You may be giving more than you receive, or neglecting your own needs. Replenishment is not indulgence; it is the soil everything grows from."],
  ["The Emperor", ["structure", "authority", "stability"], ["rigidity", "control", "lack of discipline"],
    "Clear boundaries and steady structure can support what you are building. Leadership here means taking responsibility with fairness.",
    "Control may have tipped into rigidity, or structure may be missing altogether. Consider what kind of order would actually serve you."],
  ["The Hierophant", ["tradition", "guidance", "shared values"], ["rebellion", "dogma", "personal beliefs"],
    "Wisdom passed down, mentors and shared traditions have something to offer you now. There is value in learning a path before reshaping it.",
    "You may be outgrowing inherited rules or beliefs. It is okay to question convention and define values that are truly your own."],
  ["The Lovers", ["connection", "choice", "alignment"], ["disharmony", "misalignment", "avoidance of choice"],
    "A meaningful connection or choice reflects your deepest values. Alignment between heart and action brings a sense of wholeness.",
    "Something feels out of harmony, in a relationship or within yourself. A choice may be waiting that asks you to be honest about what you value."],
  ["The Chariot", ["determination", "momentum", "direction"], ["lack of direction", "inner conflict", "forcing"],
    "Willpower and focus carry you forward. When opposing forces in you agree on a direction, remarkable momentum becomes possible.",
    "You may be pulled in competing directions or pushing too hard. Before driving forward, steady yourself and choose where you are going."],
  ["Strength", ["courage", "compassion", "gentle power"], ["self-doubt", "inner struggle", "raw emotion"],
    "True strength is gentle. Patience and compassion, especially toward your own fears, can tame what force never could.",
    "Self-doubt or overwhelming feelings may be loud right now. Meeting them with kindness rather than judgment is where your strength returns."],
  ["The Hermit", ["solitude", "reflection", "inner guidance"], ["isolation", "loneliness", "avoiding reflection"],
    "Stepping back to reflect can light your way. Solitude here is a lantern, not an escape: time alone to hear your own wisdom.",
    "Withdrawal may have become isolation, or you may be avoiding the quiet you need. Consider what balance of solitude and connection would heal."],
  ["Wheel of Fortune", ["cycles", "change", "turning points"], ["resistance to change", "setbacks", "feeling stuck"],
    "Life moves in cycles, and a turn is underway. What rises and falls is part of a larger pattern; flow with it rather than clutching.",
    "A downturn or stuck feeling may be testing your patience. Cycles still turn. Notice what is within your control and release the rest."],
  ["Justice", ["fairness", "truth", "accountability"], ["imbalance", "avoidance", "unfairness"],
    "Clear seeing and honest accountability restore balance. Choices made with integrity now will echo forward.",
    "Something may feel unfair, or you may be avoiding a hard truth. Balance begins with honesty about your own part."],
  ["The Hanged Man", ["surrender", "new perspective", "pause"], ["stalling", "resistance", "needless sacrifice"],
    "A pause can be productive. Letting go of the usual way of seeing may reveal an answer that striving could not reach.",
    "You may be stuck in limbo or resisting a necessary pause. Ask whether you are waiting with purpose or simply avoiding a decision."],
  ["Death", ["endings", "transformation", "release"], ["resisting change", "lingering", "fear of endings"],
    "Something is ending so something new can begin. This is transformation, not loss alone; clearing space is part of renewal.",
    "You may be holding on to what has already run its course. Gently ask what you would gain by letting it close."],
  ["Temperance", ["balance", "patience", "integration"], ["excess", "imbalance", "impatience"],
    "Moderation and patience blend opposites into something new. Small, steady adjustments are doing quiet, important work.",
    "Life may feel out of balance, too much of one thing, too little of another. Recalibrating gently can bring you back to centre."],
  ["The Devil", ["attachment", "patterns", "shadow"], ["release", "breaking free", "awareness"],
    "Notice what holds you, whether a habit, a fear or a relationship pattern. Naming the chain is the first step to loosening it.",
    "You are becoming aware of what has bound you, and freedom is closer than it seems. Keep choosing the way out."],
  ["The Tower", ["upheaval", "revelation", "sudden change"], ["averting disaster", "fear of change", "slow collapse"],
    "Sudden change may shake foundations that were not sound. Though jarring, it clears the ground for something more honest.",
    "You may be bracing against a change that is already happening, or feeling it unfold slowly. What would it mean to let the old structure go?"],
  ["The Star", ["hope", "renewal", "healing"], ["discouragement", "lost faith", "disconnection"],
    "After difficulty comes calm and renewed hope. You are being invited to heal, to trust the future and to shine as yourself.",
    "Hope may feel faint right now. Small acts of care can rekindle it; the light has dimmed, not gone out."],
  ["The Moon", ["uncertainty", "dreams", "the subconscious"], ["clarity emerging", "released fear", "confusion lifting"],
    "Not everything is clear, and that is okay. Fears and dreams mingle here; move gently and trust your intuition through the half-light.",
    "Confusion is beginning to lift. What seemed frightening in the dark may look different as you see it more clearly."],
  ["The Sun", ["joy", "vitality", "clarity"], ["dimmed joy", "temporary clouds", "overconfidence"],
    "Warmth, clarity and joy are available to you. Let yourself be seen, celebrate what is good and enjoy simple happiness.",
    "Joy may feel muted or hard to reach. The sun is still there behind the clouds; small pleasures can bring it back into view."],
  ["Judgement", ["awakening", "reckoning", "calling"], ["self-doubt", "harsh self-judgment", "ignoring the call"],
    "A moment of reckoning invites you to rise into a truer version of yourself. Reflect on the past, forgive and answer what calls you.",
    "Harsh self-criticism may be drowning out an inner call. Can you look at your past with the compassion you would offer a friend?"],
  ["The World", ["completion", "wholeness", "integration"], ["incompletion", "loose ends", "delays"],
    "A cycle is reaching completion. Honour how far you have come; wholeness and a sense of arrival are here, ready to be felt.",
    "Something feels nearly finished but not quite. Tying up loose ends may be the last step before you can truly move on."],
];

const RANK_NAMES = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];

const MINORS: Record<Suit, CardSeed[]> = {
  wands: [
    ["", ["inspiration", "spark", "potential"], ["delays", "lack of direction", "creative block"],
      "A spark of inspiration or passion is igniting. Something wants to begin, and your enthusiasm is the fuel.",
      "The spark is there but not catching. Delays or doubts may be dampening your fire; protect the flame while it grows."],
    ["", ["planning", "decisions", "vision"], ["fear of the unknown", "playing it safe", "indecision"],
      "You are surveying the horizon and weighing your next move. Bold planning now shapes the adventure ahead.",
      "Fear of the unknown may be keeping you close to home. Ask what small step would honour your bigger vision."],
    ["", ["expansion", "foresight", "progress"], ["obstacles", "frustration", "delays"],
      "Your efforts are beginning to expand outward. Keep your eyes on the horizon; what you set in motion is gathering momentum.",
      "Progress may feel slower than you hoped. Setbacks are not verdicts; adjust your plans and keep watch."],
    ["", ["celebration", "home", "harmony"], ["instability", "transition", "lack of support"],
      "A moment of celebration and belonging. Pause to enjoy what you have built and the people who share it.",
      "Home or community may feel unsettled. Look for the small rituals that still offer you a sense of belonging."],
    ["", ["conflict", "competition", "tension"], ["avoiding conflict", "resolution", "inner tension"],
      "Friction and competing voices are in the air. Healthy tension can sharpen ideas if everyone is willing to listen.",
      "Conflict may be easing, or you may be avoiding a needed disagreement. Consider which battles are actually yours."],
    ["", ["recognition", "victory", "confidence"], ["self-doubt", "lack of recognition", "fall from grace"],
      "Your efforts are being seen. Let yourself receive recognition and the confidence that comes with a hard-won step forward.",
      "You may feel unseen or doubt your achievements. Your worth does not depend on applause."],
    ["", ["perseverance", "standing ground", "conviction"], ["overwhelm", "giving up", "exhaustion"],
      "You may need to hold your ground for what you believe in. Your conviction is stronger than the pressure around you.",
      "Defending everything at once is exhausting. Choose what is worth standing up for and let the rest go."],
    ["", ["swift action", "movement", "news"], ["waiting", "frustration", "scattered energy"],
      "Things are moving quickly now. Messages, momentum and opportunities arrive fast; ride the energy while it flows.",
      "Plans may feel stalled or rushed in the wrong direction. Slow down enough to aim before you act."],
    ["", ["resilience", "persistence", "boundaries"], ["fatigue", "defensiveness", "paranoia"],
      "You have come far and you are nearly there. Weary but resilient, you have one more stretch in you.",
      "You may be guarding yourself so tightly that it drains you. Rest is part of resilience, not the opposite of it."],
    ["", ["burden", "responsibility", "hard work"], ["release", "delegation", "burnout"],
      "You are carrying a great deal. Recognise the weight and ask whether all of it is truly yours to hold.",
      "It may be time to set some burdens down or share them. Letting go of a load is not failure."],
    ["", ["curiosity", "enthusiasm", "exploration"], ["hesitation", "lack of direction", "impatience"],
      "A curious, adventurous spirit invites you to explore. Follow what excites you, even before you know where it leads.",
      "Enthusiasm may be scattered or stalled. Pick one thread of curiosity and see where it goes."],
    ["", ["passion", "adventure", "bold action"], ["impulsiveness", "haste", "frustration"],
      "Passion pushes you into bold action. Energy and courage are high; channel them into the direction that matters most.",
      "Rushing ahead may scatter your fire. Check that passion has a direction before it becomes impulse."],
    ["", ["confidence", "warmth", "determination"], ["insecurity", "jealousy", "self-neglect"],
      "Warm, magnetic confidence is yours to embody. Lead with heart, independence and an open, generous presence.",
      "Your inner fire may feel dimmed by insecurity. Remember what makes you radiant and give yourself the warmth you give others."],
    ["", ["vision", "leadership", "inspiration"], ["impulsiveness", "overbearing", "high expectations"],
      "Visionary leadership is available to you. See the big picture and inspire others by acting on what you believe in.",
      "Expectations, of yourself or others, may be running too high. Vision is strongest when paired with patience."],
  ],
  cups: [
    ["", ["new feelings", "love", "openness"], ["blocked emotions", "emptiness", "self-love needed"],
      "Your heart is opening to something new: love, compassion or creative feeling. Let yourself receive what flows in.",
      "Your emotional cup may feel empty or closed off. Begin by offering yourself the tenderness you long for."],
    ["", ["partnership", "mutual attraction", "connection"], ["imbalance", "broken communication", "tension"],
      "A meaningful bond built on mutual respect is highlighted. Connection deepens when both people feel seen.",
      "A relationship may feel out of balance. Honest, gentle conversation can help restore equal footing."],
    ["", ["friendship", "community", "celebration"], ["overindulgence", "isolation", "gossip"],
      "Friendship and shared joy lift your spirit. Lean on the people who celebrate you, and celebrate them in return.",
      "Social energy may feel draining or out of tune. Seek connection that nourishes rather than distracts."],
    ["", ["contemplation", "apathy", "reevaluation"], ["renewed interest", "acceptance", "seizing opportunity"],
      "You may be turned inward, unmoved by what is offered. Reflection is useful, but notice if something worthwhile is being overlooked.",
      "You are emerging from withdrawal, ready to engage again. New offers may look more inviting now."],
    ["", ["loss", "grief", "regret"], ["acceptance", "moving on", "forgiveness"],
      "Disappointment or loss calls for honest grieving. Yet not everything has spilled; something still stands behind you.",
      "You are beginning to accept what happened and turn toward what remains. Healing has started."],
    ["", ["nostalgia", "innocence", "kindness"], ["stuck in the past", "unrealistic memories", "moving forward"],
      "Tender memories and simple kindness bring comfort. Your inner child has something gentle to remind you of.",
      "Nostalgia may be keeping you from the present. Honour the past, then bring its sweetness forward."],
    ["", ["choices", "imagination", "wishful thinking"], ["clarity", "focus", "decisiveness"],
      "Many possibilities shimmer before you, not all of them real. Dream freely, then discern what deserves your energy.",
      "Illusions are clearing and a choice is coming into focus. Trust the clarity that is arriving."],
    ["", ["walking away", "seeking deeper meaning", "letting go"], ["fear of leaving", "aimlessness", "avoidance"],
      "Something no longer fulfils you, and you may be ready to walk toward deeper meaning, even if it means leaving comfort behind.",
      "You may be unsure whether to stay or go. Ask what you are truly seeking, and whether it can be found where you are."],
    ["", ["contentment", "wishes fulfilled", "gratitude"], ["dissatisfaction", "materialism", "unmet wishes"],
      "Contentment and emotional satisfaction are within reach. Notice and savour what is already good.",
      "Something you wished for may feel hollow or out of reach. Consider what would truly satisfy you."],
    ["", ["harmony", "family", "emotional fulfilment"], ["disconnection", "broken harmony", "misaligned values"],
      "Deep emotional harmony and a sense of belonging are highlighted. Love shared freely creates a lasting home.",
      "Family or close relationships may feel strained. Small, sincere gestures can rebuild connection."],
    ["", ["intuitive messages", "curiosity", "tenderness"], ["emotional immaturity", "creative block", "insecurity"],
      "A gentle, imaginative message arrives from your heart. Stay open to surprising feelings and creative impulses.",
      "Feelings may be hard to express or easily bruised. Be patient with your tender side."],
    ["", ["romance", "following the heart", "charm"], ["moodiness", "unrealistic ideals", "disappointment"],
      "You are invited to follow your heart toward an ideal, a romance or a creative offer. Let feeling guide your steps.",
      "Ideals may be running ahead of reality. Check whether you are chasing a feeling or a person."],
    ["", ["compassion", "emotional depth", "intuition"], ["emotional overwhelm", "codependence", "self-neglect"],
      "Deep compassion and emotional intelligence are your gifts. Trust your feelings, and hold space for yourself as you do for others.",
      "You may be absorbing others' emotions at your own expense. Caring for yourself is not selfish."],
    ["", ["emotional balance", "diplomacy", "calm"], ["suppressed feelings", "volatility", "manipulation"],
      "Emotional maturity and calm guide you. You can feel deeply while staying steady, a rare and valuable balance.",
      "Feelings held down may be leaking out sideways. Acknowledge them before they decide for you."],
  ],
  swords: [
    ["", ["clarity", "breakthrough", "truth"], ["confusion", "miscommunication", "clouded judgment"],
      "A breakthrough of clarity cuts through confusion. Truth spoken plainly can open the way forward.",
      "Thoughts may feel tangled or words misunderstood. Wait for clarity before making decisive cuts."],
    ["", ["difficult decisions", "stalemate", "avoidance"], ["information overload", "indecision", "lesser of two evils"],
      "You may be avoiding a choice by holding everything at arm's length. Removing the blindfold is the first step.",
      "Pressure to choose is building. Gather what you need, then trust yourself to decide."],
    ["", ["heartbreak", "sorrow", "painful truth"], ["recovery", "releasing pain", "forgiveness"],
      "A painful truth or grief needs to be felt. Naming the hurt honestly is part of how it begins to heal.",
      "You are beginning to release old pain. Recovery is not linear, but it is happening."],
    ["", ["rest", "recovery", "contemplation"], ["restlessness", "burnout", "stagnation"],
      "Rest is not optional right now. Step back, recover and let your mind be quiet before the next effort.",
      "You may be resisting the rest you need, or rest may have turned into stagnation. Find the gentle middle."],
    ["", ["conflict", "winning at a cost", "tension"], ["reconciliation", "making amends", "lingering resentment"],
      "A conflict may have no true winner. Ask whether being right is worth what it costs.",
      "The dust is settling and repair is possible. Consider whether making amends would bring you peace."],
    ["", ["transition", "moving on", "calmer waters"], ["resistance to change", "unfinished business", "baggage"],
      "You are moving away from difficulty toward calmer waters. The journey may be quiet, but it is healing.",
      "Something may be keeping you from moving on. Notice what baggage you can leave on the shore."],
    ["", ["strategy", "secrecy", "going it alone"], ["coming clean", "conscience", "rethinking approach"],
      "Strategy and discretion may be needed. Be honest with yourself about whether you are being clever or evasive.",
      "Truth may be asking to come out. Rethinking your approach could free you from carrying a secret."],
    ["", ["feeling trapped", "limiting beliefs", "self-imposed restriction"], ["release", "new perspective", "self-acceptance"],
      "You may feel trapped, yet the bindings are looser than they seem. Limiting beliefs are often the strongest walls.",
      "You are beginning to see a way out. A new perspective is loosening what held you."],
    ["", ["anxiety", "worry", "sleepless nights"], ["hope", "reaching out", "easing fear"],
      "Worry may be heavier at night than in the light of day. Your fears are real feelings, but not always accurate forecasts.",
      "Anxiety is beginning to ease. Reaching out to someone can make the weight lighter still."],
    ["", ["painful ending", "rock bottom", "release"], ["recovery", "regeneration", "resisting an end"],
      "Something has reached its lowest point, and so it can only rise from here. Dawn follows even the longest night.",
      "You are recovering from a hard ending. Allow regeneration to take its time."],
    ["", ["curiosity", "new ideas", "vigilance"], ["scattered thoughts", "gossip", "defensiveness"],
      "A curious, alert mind is eager for new ideas. Ask questions and keep learning.",
      "Thoughts may be scattered or words hasty. Pause before speaking or reacting."],
    ["", ["ambition", "fast thinking", "drive"], ["recklessness", "burnout", "carelessness"],
      "Quick thinking and fierce drive propel you forward. Charge toward your goal, but keep your mind clear.",
      "Speed may be outpacing wisdom. Slow down enough to consider who might be hurt by haste."],
    ["", ["clear boundaries", "independence", "honest perception"], ["coldness", "bitterness", "harsh words"],
      "Clear, honest perception guides you. You can speak truth with kindness and set boundaries with grace.",
      "Old hurts may be sharpening your words. Clarity is strongest when softened by compassion."],
    ["", ["intellectual authority", "truth", "ethics"], ["misuse of power", "manipulation", "cold logic"],
      "Fair, clear judgment is called for. Lead with reason and integrity, and others will trust your word.",
      "Logic may be overriding empathy, or power may be used carelessly. Balance the head with the heart."],
  ],
  pentacles: [
    ["", ["opportunity", "prosperity", "new venture"], ["missed chance", "poor planning", "scarcity mindset"],
      "A grounded new opportunity is taking root: in work, health or resources. Plant it with care.",
      "An opportunity may slip by without solid planning. Return to basics and build a firm foundation."],
    ["", ["balance", "adaptability", "juggling priorities"], ["overwhelm", "disorganisation", "overcommitment"],
      "You are juggling many demands, and doing so with grace. Flexibility helps you keep everything in motion.",
      "Too many balls in the air can lead to dropping them. Choose your priorities intentionally."],
    ["", ["teamwork", "collaboration", "craftsmanship"], ["lack of teamwork", "disregard for skill", "misalignment"],
      "Collaboration and skill bring your work to life. Shared effort creates something greater than any one person could.",
      "Teamwork may be faltering. Make sure everyone is working toward the same vision."],
    ["", ["security", "saving", "holding on"], ["greed", "letting go", "generosity"],
      "Stability and security matter to you right now. Protecting what you have is wise, as long as it does not become fear.",
      "Holding too tightly may be limiting you. Consider where generosity could open new flow."],
    ["", ["hardship", "insecurity", "feeling left out"], ["recovery", "spiritual poverty", "help is near"],
      "A time of hardship or feeling outside the warmth. Help may be closer than you realise; look for the lit window.",
      "Difficult times are easing. Accepting support is a strength, not a weakness."],
    ["", ["generosity", "giving and receiving", "sharing"], ["strings attached", "debt", "one-sided charity"],
      "A healthy flow of giving and receiving brings balance. Be generous, and allow yourself to receive too.",
      "Generosity may feel conditional or imbalanced. Notice whether giving is freely offered."],
    ["", ["patience", "long-term view", "perseverance"], ["impatience", "lack of reward", "poor investment"],
      "Your efforts are growing, though slowly. Pause to assess, and trust that patient work is bearing fruit.",
      "Frustration with slow progress may be rising. Check whether your investment of energy aligns with your goals."],
    ["", ["diligence", "mastery", "skill-building"], ["perfectionism", "lack of focus", "uninspired work"],
      "Steady practice and dedication refine your skills. Mastery is built one careful repetition at a time.",
      "Perfectionism or boredom may be creeping in. Reconnect with why the craft matters to you."],
    ["", ["self-sufficiency", "luxury", "independence"], ["over-investment in work", "setbacks", "dependence"],
      "You are enjoying the fruits of your labour. Self-reliance and refined pleasures are well earned.",
      "Independence may have tipped into isolation, or rewards may feel fragile. Revisit what security means to you."],
    ["", ["legacy", "family", "lasting wealth"], ["family disputes", "instability", "short-term focus"],
      "Long-term stability, family and legacy are highlighted. What you build now can support generations.",
      "Family or financial foundations may feel shaky. Focus on the values you want to pass on."],
    ["", ["ambition", "learning", "manifestation"], ["procrastination", "lack of progress", "learning from failure"],
      "A studious, grounded energy invites you to learn and plan. Small, practical steps make dreams tangible.",
      "Progress may be stalled by procrastination. Begin with one modest, concrete action."],
    ["", ["hard work", "routine", "reliability"], ["boredom", "stagnation", "laziness"],
      "Steady, methodical effort wins the day. Reliability and routine are carrying you closer to your goal.",
      "Routine may have turned into a rut. A small change of approach could renew your momentum."],
    ["", ["nurturing", "practicality", "abundance"], ["self-care neglect", "work-home imbalance", "smothering"],
      "Practical care and warmth create a nourishing life. You can support others while staying grounded.",
      "Caring for everyone else may be crowding out care for yourself. Rebalance home, work and rest."],
    ["", ["wealth", "security", "discipline"], ["greed", "stubbornness", "materialism"],
      "Abundance and stability come from disciplined effort. You are capable of building lasting security.",
      "Material focus may be crowding out meaning, or stubbornness blocking growth. What would true wealth look like?"],
  ],
};

const SUIT_TITLES: Record<Suit, string> = { wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pentacles" };

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function build(): TarotCard[] {
  const cards: TarotCard[] = MAJORS.map(([name, up, rev, upright, reversed], i) => ({
    id: slug(name.replace(/^The /, "")),
    name,
    arcana: "major",
    number: i,
    keywords: { upright: up, reversed: rev },
    upright,
    reversed,
  }));
  for (const suit of Object.keys(MINORS) as Suit[]) {
    MINORS[suit].forEach(([, up, rev, upright, reversed], i) => {
      const name = `${RANK_NAMES[i]} of ${SUIT_TITLES[suit]}`;
      cards.push({
        id: slug(name),
        name,
        arcana: "minor",
        suit,
        number: i + 1,
        keywords: { upright: up, reversed: rev },
        upright,
        reversed,
      });
    });
  }
  return cards;
}

export const DECK: TarotCard[] = build();
export const CARD_BY_ID: Map<string, TarotCard> = new Map(DECK.map((c) => [c.id, c]));

export const SUIT_INFO: Record<Suit, { element: string; theme: string; glyph: string }> = {
  wands: { element: "Fire", theme: "passion, drive and creativity", glyph: "🜂" },
  cups: { element: "Water", theme: "emotion, love and intuition", glyph: "🜄" },
  swords: { element: "Air", theme: "thought, truth and conflict", glyph: "🜁" },
  pentacles: { element: "Earth", theme: "work, body and material life", glyph: "🜃" },
};

const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

/** Short label shown at the top of a card face: a roman numeral, rank number or court title. */
export function cardNumeral(card: TarotCard): string {
  if (card.arcana === "major") return ROMAN[card.number];
  if (card.number === 1) return "A";
  if (card.number <= 10) return String(card.number);
  return RANK_NAMES[card.number - 1].toUpperCase();
}
