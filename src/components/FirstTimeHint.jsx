import { Info, X } from "lucide-react";
import { UI } from "../menuData";

// Shown once (per browser) until the guest either dismisses it or adds their first pick.
export default function FirstTimeHint({ lang, onDismiss }) {
  return (
    <div className="fade-in flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-800 ring-1 ring-inset ring-brand-700/15 dark:bg-brand-400/10 dark:text-brand-200 dark:ring-brand-300/20">
      <Info size={18} className="shrink-0" />
      <p className="flex-1 leading-snug">{UI.firstHint[lang]}</p>
      <button
        onClick={onDismiss}
        aria-label={UI.close[lang]}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-brand-100 active:scale-90 dark:hover:bg-white/10"
      >
        <X size={16} />
      </button>
    </div>
  );
}
