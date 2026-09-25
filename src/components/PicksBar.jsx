import { ChevronUp } from "lucide-react";
import { UI, money } from "../menuData";

// Sits fixed at the very bottom, full width, like a cart summary. Only rendered when picks exist.
export default function PicksBar({ count, total, lang, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 bg-brand-700 px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] text-white shadow-[0_-6px_20px_rgba(0,0,0,.18)] transition active:opacity-90 dark:bg-brand-800"
    >
      <span className="flex items-center gap-2.5">
        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white/20 px-1.5 text-sm font-bold tabular-nums">{count}</span>
        <span className="font-bold">{UI.favTitle[lang]}</span>
      </span>
      <span className="flex items-center gap-1.5 font-bold">
        <span dir="ltr">{money(total)}</span>
        <ChevronUp size={18} />
      </span>
    </button>
  );
}
