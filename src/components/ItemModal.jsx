import { useEffect } from "react";
import { X } from "lucide-react";
import { CARD_EXTRAS, TAG_LABELS, UI, favKey, money } from "../menuData";
import { getIcon } from "./categoryIcons";
import CategoryArt, { hasArt } from "./CategoryArt";
import Stepper from "./Stepper";

// Opens when a card is tapped. Shows which category the item belongs to (in the active language),
// plus the price / sizes with quantity controls for "My picks".
export default function ItemModal({ item, category, lang, favs, onQty, onClose }) {
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

  const sized = CARD_EXTRAS.sizes && item.sizes?.length > 0;
  const rows = sized
    ? item.sizes.map((s) => ({ key: favKey(item, s), label: s.label[lang], price: s.price }))
    : [{ key: item.id, label: UI.priceLabel[lang], price: item.price }];
  const CatIcon = getIcon(category?.icon);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-up relative w-full max-w-md rounded-t-3xl bg-white/90 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl ring-1 ring-white/60 backdrop-blur-xl dark:bg-slate-800/90 dark:ring-white/10 sm:rounded-3xl"
      >
        <button
          onClick={onClose}
          aria-label={UI.close[lang]}
          className="absolute end-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 active:scale-90 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pe-10">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-100 p-2 dark:bg-slate-700/60">
            {hasArt(item.category) ? <CategoryArt id={item.category} /> : <CatIcon size={32} className="m-auto h-full text-brand-700 dark:text-brand-300" />}
          </div>
          <h2 id="item-modal-title" className="text-balance text-xl font-bold leading-snug">
            {item.name[lang]}
          </h2>
        </div>

        {/* Category badge: follows the active language */}
        {category && (
          <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-sm text-brand-800 ring-1 ring-inset ring-brand-700/15 dark:bg-brand-400/15 dark:text-brand-200 dark:ring-brand-300/20">
            <CatIcon size={16} className="shrink-0" />
            <span className="opacity-70">{UI.categoryLabel[lang]}:</span>
            <span className="truncate font-bold">{category.name[lang]}</span>
          </p>
        )}

        {CARD_EXTRAS.notes && item.note && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.note[lang]}</p>
        )}
        {CARD_EXTRAS.tags && item.tags?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li key={t} className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-black/5 dark:ring-white/10 ${TAG_LABELS[t]?.className ?? "bg-slate-200 text-slate-700"}`}>
                {TAG_LABELS[t] ? TAG_LABELS[t][lang] : t}
              </li>
            ))}
          </ul>
        )}

        <p className="mb-2 mt-5 text-sm text-slate-500 dark:text-slate-400">{sized ? UI.pickSize[lang] : UI.favAdd[lang]}</p>
        <ul className="space-y-2">
          {rows.map((r) => {
            const qty = favs.get(r.key) || 0;
            return (
              <li
                key={r.key}
                className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors ${
                  qty > 0
                    ? "bg-brand-50 ring-brand-700 dark:bg-brand-400/10 dark:ring-brand-400"
                    : "bg-slate-50 ring-slate-200 dark:bg-slate-700/50 dark:ring-slate-600"
                }`}
              >
                <span>
                  <span className="block font-medium">{r.label}</span>
                  <span dir="ltr" className="text-sm font-bold text-brand-700 dark:text-brand-300">{money(r.price)}</span>
                </span>
                <Stepper qty={qty} lang={lang} onChange={(q) => onQty(r.key, q)} />
              </li>
            );
          })}
        </ul>

        <button
          autoFocus
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-brand-700 py-3 font-bold text-white transition hover:bg-brand-800 active:scale-[.98] dark:bg-brand-400 dark:text-slate-900 dark:hover:bg-brand-300"
        >
          {UI.done[lang]}
        </button>
      </div>
    </div>
  );
}
