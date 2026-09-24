import { useEffect } from "react";
import { X } from "lucide-react";
import { UI, money } from "../menuData";

// "My picks": each entry is an item, or an item + the size the guest chose (with that size's price).
export default function FavoritesSheet({ entries, lang, onRemove, onClear, onClose }) {
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
      aria-label={UI.favTitle[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-up max-h-[75vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl dark:bg-slate-800 sm:rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{UI.favTitle[lang]}</h2>
          <button onClick={onClose} aria-label={UI.close[lang]} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{UI.favHint[lang]}</p>

        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {entries.map(({ key, item, size }) => (
            <li key={key} className="flex items-center gap-3 py-3">
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{item.name[lang]}</span>
                {size && <span className="block text-sm text-slate-500 dark:text-slate-400">{size.label[lang]}</span>}
              </span>
              <span dir="ltr" className="text-sm font-bold text-brand-700 dark:text-brand-300">
                {money(size ? size.price : item.price)}
              </span>
              <button onClick={() => onRemove(key)} aria-label={UI.favRemove[lang]} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>

        <button onClick={onClear} className="mt-4 w-full rounded-full bg-slate-100 py-2.5 text-sm font-medium active:scale-[.98] dark:bg-slate-700">
          {UI.favClear[lang]}
        </button>
      </div>
    </div>
  );
}
