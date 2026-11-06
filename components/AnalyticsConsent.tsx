"use client";
import { useEffect, useState } from "react";

type ClarityWindow = Window & { clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] } };
const KEY = "moonlit-analytics-consent-v1";
const PROJECT = "z9icbi46dy";
export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setChoice(saved);
    setOpen(!saved);
    if (saved !== "accepted" || !PROJECT) return;
    const w = window as ClarityWindow;
    if (!w.clarity) {
      const queue = ((...args: unknown[]) => { queue.q.push(args); }) as ((...args: unknown[]) => void) & { q: unknown[][] };
      queue.q = [];
      w.clarity = queue;
      w.clarity("consentv2", { analytics_Storage: "granted", ad_Storage: "denied" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${PROJECT}`;
      script.id = "moonlit-clarity";
      document.head.appendChild(script);
    }
  }, []);
  function choose(accepted: boolean) {
    localStorage.setItem(KEY, accepted ? "accepted" : "declined");
    const w = window as ClarityWindow;
    if (!accepted && w.clarity) {
      w.clarity("consentv2", { analytics_Storage: "denied", ad_Storage: "denied" });
      for (const key of ["_clck", "_clsk"]) {
        document.cookie = `${key}=; Max-Age=0; Path=/`;
        document.cookie = `${key}=; Max-Age=0; Path=/; Domain=.moonlit-tarot.online`;
      }
    }
    window.location.reload();
  }
  if (!PROJECT) return null;
  return <>
    <button type="button" onClick={() => setOpen(true)} className="mx-auto mb-5 block text-xs text-moon-200 underline underline-offset-4">Analytics preferences</button>
    {open && <aside aria-label="Optional analytics" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-mist-400/30 bg-night-900 p-5 shadow-2xl" style={{backgroundColor:"#11162d"}}>
      <h2 className="font-display text-2xl text-moon-100">Your privacy, your choice</h2>
      <p className="mt-2 text-sm leading-relaxed text-mist-300">Optional Microsoft Clarity records clicks and page interactions to help improve this site. Tarot questions and reading text are masked. Microsoft may use visitor data for its own products and advertising under its privacy policy. Shipped reads aggregate counts for public course progress. Nothing loads until you accept. Declining does not affect readings.</p>
      <p className="mt-2 text-xs text-mist-300"><a className="underline" href="/about#privacy">Privacy details</a>{" · "}<a className="underline" href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noreferrer">Microsoft privacy</a></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose(false)} className="rounded-lg border border-mist-400/40 px-4 py-2 text-sm text-moon-100">Decline analytics</button>
        <button type="button" onClick={() => choose(true)} className="rounded-lg bg-moon-200 px-4 py-2 text-sm text-night-950">Accept analytics</button>
        {choice && <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-mist-300">Close</button>}
      </div>
    </aside>}
  </>;
}
