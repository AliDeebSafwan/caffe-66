import { useEffect } from "react";
import { UI, favKey, money } from "../menuData";
import Stepper from "./Stepper";

// Opens when the heart is tapped on an item that has sizes: choose how many of each size.
export default function SizePicker({ item, lang, favs, onQty, onClose }) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-up w-full max-w-md rounded-t-3xl bg-white p-5 shadow-xl dark:bg-slate-800 sm:rounded-3xl"
      >
        <h2 className="text-xl font-bold">{item.name[lang]}</h2>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{UI.pickSize[lang]}</p>

        <ul className="space-y-2">
          {item.sizes.map((s) => {
            const key = favKey(item, s);
            const qty = favs.get(key) || 0;
            return (
              <li
                key={key}
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors ${
                  qty > 0
                    ? "bg-brand-50 ring-brand-700 dark:bg-brand-400/10 dark:ring-brand-400"
                    : "bg-slate-50 ring-slate-200 dark:bg-slate-700/50 dark:ring-slate-600"
                }`}
              >
                <span>
                  <span className="block font-medium">{s.label[lang]}</span>
                  <span dir="ltr" className="text-sm font-bold text-brand-700 dark:text-brand-300">{money(s.price)}</span>
                </span>
                <Stepper qty={qty} lang={lang} onChange={(q) => onQty(key, q)} />
              </li>
            );
          })}
        </ul>

        <button autoFocus onClick={onClose} className="mt-4 w-full rounded-full bg-slate-100 py-2.5 text-sm font-medium active:scale-[.98] dark:bg-slate-700">
          {UI.done[lang]}
        </button>
      </div>
    </div>
  );
}
