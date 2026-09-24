import { useEffect } from "react";
import { X } from "lucide-react";
import { UI, money } from "../menuData";
import Stepper from "./Stepper";

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

// "My picks": items (or item + chosen size) with quantities, line totals, and one grand total.
export default function FavoritesSheet({ entries, lang, onQty, onClear, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const unit = (e) => parseFloat(String(e.size ? e.size.price : e.item.price).replace(",", ".")) || 0;
  const total = entries.reduce((sum, e) => sum + unit(e) * e.qty, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={UI.favTitle[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-up max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl dark:bg-slate-800 sm:rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{UI.favTitle[lang]}</h2>
          <button autoFocus onClick={onClose} aria-label={UI.close[lang]} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{UI.favHint[lang]}</p>

        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {entries.map((e) => (
            <li key={e.key} className="flex items-center gap-3 py-3">
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug">{e.item.name[lang]}</span>
                {e.size && <span className="block text-sm text-slate-500 dark:text-slate-400">{e.size.label[lang]}</span>}
              </span>
              <span dir="ltr" className="w-14 text-end text-sm font-bold text-brand-700 dark:text-brand-300">
                {money(fmt(unit(e) * e.qty))}
              </span>
              <Stepper qty={e.qty} lang={lang} onChange={(q) => onQty(e.key, q)} />
            </li>
          ))}
        </ul>

        {/* Grand total of everything picked */}
        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-bold dark:border-slate-600">
          <span>{UI.favTotal[lang]}</span>
          <span dir="ltr" className="text-brand-700 dark:text-brand-300">{money(fmt(total))}</span>
        </div>

        <button onClick={onClear} className="mt-4 w-full rounded-full bg-slate-100 py-2.5 text-sm font-medium active:scale-[.98] dark:bg-slate-700">
          {UI.favClear[lang]}
        </button>
      </div>
    </div>
  );
}
