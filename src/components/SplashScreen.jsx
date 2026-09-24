import { useEffect, useRef, useState } from "react";
import { Coffee } from "lucide-react";
import { STORE } from "../menuData";

const SHOW_MS = 1600; // how long the logo stays fully visible
const FADE_MS = 700; // fade-out length (the menu fades in during this time)

// Opening screen: big crisp logo, then a smooth cross-fade into the menu.
// Shown once per browser session. Tap to skip. Skipped for reduced-motion users.
export default function SplashScreen({ lang, onDone }) {
  const [phase, setPhase] = useState(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("menu-splash");
    } catch {}
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return seen || reduced ? "gone" : "show";
  });
  const notified = useRef(false);

  // Tell the menu to start fading in as soon as the splash starts fading out (or if it never shows)
  useEffect(() => {
    if (phase !== "show" && !notified.current) {
      notified.current = true;
      onDone?.();
    }
  }, [phase, onDone]);

  useEffect(() => {
    if (phase === "show") {
      try {
        sessionStorage.setItem("menu-splash", "1");
      } catch {}
      document.body.style.overflow = "hidden"; // no scrolling behind the splash
      const t = setTimeout(() => setPhase("hide"), SHOW_MS);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
    if (phase === "hide") {
      const t = setTimeout(() => setPhase("gone"), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      role="presentation"
      onClick={() => phase === "show" && setPhase("hide")}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-brand-700 px-6 text-white transition-opacity ease-out ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="splash-pop relative flex h-[min(60vw,16rem)] w-[min(60vw,16rem)] items-center justify-center">
        <div className="absolute inset-6 rounded-full bg-white/15 blur-3xl" />
        {STORE.logo ? (
          <img
            src={STORE.logoHd || STORE.logo}
            alt={STORE.name[lang]}
            decoding="sync"
            draggable="false"
            className="relative h-full w-full select-none object-contain drop-shadow-2xl"
          />
        ) : (
          <Coffee size={72} className="relative" />
        )}
      </div>
      <div className="fade-in text-center" style={{ animationDelay: "400ms" }}>
        <p className="text-2xl font-bold tracking-wide">{STORE.name[lang]}</p>
        <p className="mt-1 text-sm text-brand-100">{STORE.tagline[lang]}</p>
      </div>
    </div>
  );
}
