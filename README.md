# Moonlit Tarot

AI tarot readings for reflection. A visitor can type a question or choose a focus (love, career, growth, clarity), draw from a full 78-card deck where each card lands upright or reversed at random, and get a personal reading for a one-card or three-card (Past · Present · Future) spread. There is no signup.

Built with Next.js (App Router), TypeScript and Tailwind CSS. It deploys to Vercel with no extra setup.

> Course submission notes that used to live in this README are now in [SUBMISSION.md](./SUBMISSION.md).

## How readings are generated

The server API route `app/api/reading/route.ts` picks a provider in this order:

| Order | Condition | Reading | Cost |
| --- | --- | --- | --- |
| 1 | `GEMINI_API_KEY` is set | AI-written by Google Gemini (`gemini-3.5-flash-lite` by default) | Free tier, no billing |
| 2 | Only `ANTHROPIC_API_KEY` is set | AI-written by Anthropic Claude (`claude-haiku-4-5` by default) | Paid, optional |
| 3 | No key is set | **Demo mode**: the cards' traditional meanings from the built-in library | Free |

- **AI readings** get each card's traditional meaning from `lib/deck.ts`, along with the visitor's question and focus. The model writes one reflective reading that ties the cards together. The prompt lives in `lib/ai/prompt.ts`.
- **Demo mode** is always labelled in the UI with a "Demo mode · This is not an AI reading" banner. Template text is never shown as an AI reading.
- **AI errors**, such as a Gemini free-tier quota hit (HTTP 429) or a network problem, show a friendly "please try again in a minute" message. The visitor still sees the labelled built-in meanings and gets a retry button.
- The app works fully with **no key configured**. AI readings turn on only when a key is present in the deployment environment.

## Getting a free Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com) and sign in with a Google account.
2. Click **Get API key** → **Create API key**. No billing account is needed for the free tier.
3. Add the key to your environment as `GEMINI_API_KEY` (see below).

Free-tier limits are set by Google per project and can change. At the time of writing, `gemini-3.5-flash-lite` allows about 15 requests per minute and 500 per day. When the quota runs out, visitors see the retry-later message described above.

## Privacy

When AI readings are on, each visitor's question, focus and drawn cards are sent to **Google's Gemini API free tier** to write the reading, or to Anthropic's API if that provider is used instead. Google may use free-tier content to improve its products, so the UI asks visitors to leave out names and sensitive details. The app has no accounts and stores no questions or readings. The same note appears on the reading form and on the About page.

## Security and abuse protection

- **API keys stay on the server.** They are read from `process.env` only in `lib/ai/*`, which imports `server-only` so the build fails if client code ever imports it. Keys never reach the browser bundle. `.gitignore` excludes every `.env*` file except `.env.example`.
- **Per-IP rate limit.** Each client IP gets 5 AI readings per hour by default (set `AI_READINGS_PER_HOUR` to change it). Past the limit, visitors get the labelled built-in reading with a "come back later" note, so anonymous traffic can't use up the daily free quota. The limiter runs in memory on each server instance. On Vercel that is best-effort, because each warm instance counts separately. For a strict global limit, swap `lib/rate-limit.ts` for a shared store such as Upstash Redis.
- **Input caps.** Questions can be up to 500 characters (enforced in the form and on the server), and request bodies over 4 KB are rejected. The server also checks that card IDs are real and appear only once.

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | No | — | Turns on AI readings through the Gemini API free tier (primary provider) |
| `GEMINI_MODEL` | No | `gemini-3.5-flash-lite` | Overrides the Gemini model. Without it, the app falls back to `gemini-2.5-flash-lite` if the default model doesn't exist |
| `ANTHROPIC_API_KEY` | No | — | Optional paid alternative, used only when `GEMINI_API_KEY` is not set |
| `ANTHROPIC_MODEL` | No | `claude-haiku-4-5` | Overrides the Anthropic model |
| `AI_READINGS_PER_HOUR` | No | `5` | AI readings allowed per client IP per hour |

## Running locally

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
cp .env.example .env.local   # optional: add GEMINI_API_KEY for AI readings
```

```bash
npm run dev
```

Open http://localhost:3000. With no key set, the app runs in labelled demo mode.

Production build:

```bash
npm run build && npm start
```

## Deploying to Vercel with a custom domain

1. Import this repository into [Vercel](https://vercel.com/new). It detects Next.js on its own.
2. Under **Settings → Environment Variables**, add `GEMINI_API_KEY` for Production (and Preview if you want). Redeploy so the change takes effect.
3. Under **Settings → Domains**, add your domain (for example `moonlittarot.in`) and create the DNS records Vercel shows. HTTPS is set up automatically.

## Project structure

```
app/
  page.tsx              Landing page and reading flow
  about/page.tsx        How it works, privacy and disclaimer
  api/reading/route.ts  Reading API: validation, rate limit, provider selection
components/
  ReadingFlow.tsx       Question → shuffle → choose → reveal → reading (client)
  TarotCard.tsx         Card back and face, 3D flip
lib/
  deck.ts               All 78 cards with upright and reversed meanings
  reading.ts            Shared types and request validation
  demo-engine.ts        Labelled demo-mode readings from built-in meanings
  rate-limit.ts         Per-IP sliding-window limiter
  ai/                   Provider selection, Gemini and Anthropic clients, prompt
```

## Disclaimer

Moonlit Tarot is for reflection and entertainment. Readings are not predictions, and they are not medical, legal, financial or psychological advice.
