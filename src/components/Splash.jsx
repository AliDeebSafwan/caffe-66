import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { STORE } from "../menuData";

// Short opening screen (about 1.3s). Tap to skip. Skipped for reduced-motion users.
export default function Splash({ lang }) {
  const [phase, setPhase] = useState(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("menu-splash");
      sessionStorage.setItem("menu-splash", "1");
    } catch {}
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return seen || reduced ? "gone" : "show";
  });

  useEffect(() => {
    if (phase === "gone") return;
    const a = setTimeout(() => setPhase("hide"), 1300);
    const b = setTimeout(() => setPhase("gone"), 1800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div
      onClick={() => setPhase("gone")}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-brand-700 text-white transition-opacity duration-500 ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="splash-pop flex h-32 w-32 items-center justify-center">
        {STORE.logo ? <img src={STORE.logo} alt="" className="h-full w-full object-contain drop-shadow-lg" /> : <Coffee size={56} />}
      </div>
      <p className="fade-in text-2xl font-bold" style={{ animationDelay: "250ms" }}>
        {STORE.name[lang]}
      </p>
    </div>
  );
}
