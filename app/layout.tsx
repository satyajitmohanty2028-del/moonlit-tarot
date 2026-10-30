import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Moonlit Tarot · AI tarot readings for reflection", template: "%s · Moonlit Tarot" },
  description:
    "Draw from a full 78-card deck and receive a thoughtful, AI-written tarot reading for reflection. No signup needed.",
  openGraph: {
    title: "Moonlit Tarot",
    description: "AI tarot readings for reflection.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d22",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <div className="stars" aria-hidden />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="moon-glow inline-block size-6 rounded-full bg-gradient-to-br from-moon-50 to-moon-300" aria-hidden />
              <span className="font-display text-2xl tracking-wide text-moon-100">Moonlit Tarot</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-mist-300">
              <Link href="/" className="hover:text-moon-100">Reading</Link>
              <Link href="/about" className="hover:text-moon-100">How it works</Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mx-auto w-full max-w-5xl px-4 py-10 text-center text-xs leading-relaxed text-mist-400 sm:px-6">
            <p>
              Readings are for reflection and entertainment, not professional advice. For medical, legal, financial or
              mental-health concerns, please consult a qualified person.{" "}
              <Link href="/about#disclaimer" className="underline decoration-mist-400/50 underline-offset-2 hover:text-moon-100">
                Read more
              </Link>
            </p>
            <p className="mt-2">© {new Date().getFullYear()} Moonlit Tarot</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
