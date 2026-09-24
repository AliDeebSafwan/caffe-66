import { useEffect } from "react";
import { Check } from "lucide-react";
import { UI, favKey, money } from "../menuData";

// Opens when the heart is tapped on an item that has sizes: pick Medium, Large, or both.
export default function SizePicker({ item, lang, favs, onToggle, onClose }) {
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
            const on = favs.has(key);
            return (
              <li key={key}>
                <button
                  onClick={() => onToggle(key)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-base font-medium ring-1 transition active:scale-[.98] ${
                    on
                      ? "bg-brand-700 text-white ring-brand-700 dark:bg-brand-400 dark:text-slate-900 dark:ring-brand-400"
                      : "bg-slate-50 text-slate-800 ring-slate-200 dark:bg-slate-700/50 dark:text-slate-100 dark:ring-slate-600"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 ${on ? "bg-white/25 ring-white/60" : "ring-slate-300 dark:ring-slate-500"}`}>
                      {on && <Check size={14} />}
                    </span>
                    {s.label[lang]}
                  </span>
                  <span dir="ltr" className="font-bold">{money(s.price)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button onClick={onClose} className="mt-4 w-full rounded-full bg-slate-100 py-2.5 text-sm font-medium active:scale-[.98] dark:bg-slate-700">
          {UI.done[lang]}
        </button>
      </div>
    </div>
  );
}
