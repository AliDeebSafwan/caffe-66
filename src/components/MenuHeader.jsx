import { Coffee, MapPin, Moon, Sun } from "lucide-react";
import { INFO, STORE, UI } from "../menuData";

const base = "flex h-10 items-center justify-center rounded-full text-sm font-medium transition-colors active:scale-95";
const outline = `${base} border border-slate-300 text-slate-700 hover:bg-slate-200 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700`;

// compact = true once the page is scrolled: smaller logo, no tagline
export default function MenuHeader({ lang, theme, compact, onToggleLang, onToggleTheme }) {
  const dark = theme === "dark";
  const t = "absolute inset-0 transition-all duration-500";
  return (
    <header className={`flex items-center gap-2 px-4 transition-all duration-300 ${compact ? "py-2" : "py-3"}`}>
      {/* Logo: file is /public/logo.png (set in STORE.logo) */}
      <div className={`flex shrink-0 items-center justify-center transition-all duration-300 ${compact ? "h-10 w-10" : "h-14 w-14"}`}>
        {STORE.logo ? (
          <img src={STORE.logo} alt={STORE.name[lang]} className="h-full w-full object-contain drop-shadow" />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-700 text-white">
            <Coffee size={compact ? 20 : 28} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 ps-1">
        <h1 key={lang} className={`fade-in truncate font-bold leading-tight transition-[font-size] duration-300 ${compact ? "text-base" : "text-xl"}`}>
          {STORE.name[lang]}
        </h1>
        <p className={`overflow-hidden truncate text-xs text-slate-500 transition-all duration-300 dark:text-slate-400 ${compact ? "max-h-0 opacity-0" : "max-h-5 opacity-100"}`}>
          {STORE.tagline[lang]}
        </p>
      </div>

      {/* Location pin: opens Google Maps (link is INFO.map in menuData.js) */}
      {INFO.map && (
        <a
          href={INFO.map}
          target="_blank"
          rel="noreferrer"
          aria-label={UI.map[lang]}
          title={UI.map[lang]}
          className={`${base} w-10 shrink-0 bg-brand-700 text-white hover:bg-brand-800 dark:bg-brand-400 dark:text-slate-900 dark:hover:bg-brand-300`}
        >
          <MapPin size={18} />
        </a>
      )}

      <button onClick={onToggleLang} className={`${outline} shrink-0 px-3`} aria-label="Switch language">
        <span key={lang} className="fade-in">{UI.langButton[lang]}</span>
      </button>

      {/* Sun and moon swap with a spin */}
      <button onClick={onToggleTheme} className={`${outline} w-10 shrink-0`} aria-label="Toggle light and dark theme">
        <span className="relative block h-[18px] w-[18px]">
          <Sun size={18} className={`${t} ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          <Moon size={18} className={`${t} ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        </span>
      </button>
    </header>
  );
}
