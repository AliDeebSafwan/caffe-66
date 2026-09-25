import { useEffect, useRef, useState } from "react";
import { Plus, Utensils } from "lucide-react";
import { CARD_EXTRAS, CATEGORIES, DIET, SHOW_IMAGES, TAG_LABELS, UI, favKey, money, upgradeLabel } from "../menuData";
import { getIcon } from "./categoryIcons";
import CategoryArt, { hasArt } from "./CategoryArt";
import Stepper from "./Stepper";

export default function MenuItemCard({ item, lang, index = 0, onZoom, favs, onQty, onOpen }) {
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef(null);
  const CategoryIcon = getIcon(CATEGORIES.find((c) => c.id === item.category)?.icon);
  // Sizes get a subtle chip (several sit side by side); a single price is plain bold text, no pill
  const chip = "rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800 ring-1 ring-inset ring-brand-700/15 dark:bg-brand-400/10 dark:text-brand-200 dark:ring-brand-300/20";
  const sized = CARD_EXTRAS.sizes && item.sizes?.length > 0;
  // Quantity already picked for this item (summed across sizes when it has them)
  const qty = sized ? item.sizes.reduce((n, s) => n + (favs.get(favKey(item, s)) || 0), 0) : favs.get(item.id) || 0;

  // Stop the stagger delay once the reveal is over, so hover/press feel instant
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 900);
    return () => clearTimeout(t);
  }, [shown]);

  // Slide/fade in the first time the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fast-add control: a lone "+" when nothing is picked yet, a full − qty + once it is.
  // Sized items always open the popup (a size must be chosen there) instead of adding directly.
  const addControl =
    qty > 0 && !sized ? (
      <div className="relative z-20 self-start" onClick={(e) => e.stopPropagation()}>
        <Stepper qty={qty} lang={lang} onChange={(q) => onQty(item.id, q)} />
      </div>
    ) : (
      <button
        onClick={() => (sized ? onOpen(item) : onQty(item.id, 1))}
        aria-label={UI.favAdd[lang]}
        className={`relative z-20 flex h-11 min-w-11 shrink-0 items-center justify-center self-start gap-1 rounded-full px-2 text-sm font-bold transition active:scale-90 ${
          qty > 0
            ? "bg-brand-700 text-white dark:bg-brand-400 dark:text-slate-900"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        }`}
      >
        {qty > 0 ? qty : <Plus size={20} />}
      </button>
    );

  return (
    <article
      ref={ref}
      style={{ transitionDelay: shown && !settled ? `${(index % 3) * 70}ms` : "0ms" }}
      className={`relative flex overflow-hidden rounded-2xl bg-white/85 shadow-sm ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-0.5 hover:shadow-md active:scale-[.99] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none dark:bg-slate-800/80 dark:ring-slate-700/70 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${SHOW_IMAGES ? "sm:flex-col" : "gap-3 p-3"}`}
    >
      {/* Photo (SHOW_IMAGES = true) or the category illustration */}
      {SHOW_IMAGES ? (
        <div className="relative min-h-[8rem] w-28 shrink-0 bg-slate-200 dark:bg-slate-700 sm:aspect-[4/3] sm:min-h-0 sm:w-full">
          {item.image && !failed ? (
            <button onClick={() => onZoom(item)} aria-label={item.name[lang]} className="absolute inset-0 z-20 block cursor-zoom-in">
              <img src={item.image} alt="" width={600} height={450} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-cover" />
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <Utensils size={30} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 p-1.5 text-brand-800 dark:bg-slate-700/60 dark:text-brand-300">
          {hasArt(item.category) ? <CategoryArt id={item.category} /> : <CategoryIcon size={24} />}
        </div>
      )}

      <div className={`flex min-w-0 flex-1 flex-col gap-2 ${SHOW_IMAGES ? "p-3" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug">{item.name[lang]}</h3>
          {/* Prices sit on the end side of the row (left in Arabic); sizes stack vertically */}
          {sized ? (
            <ul className="flex shrink-0 flex-col gap-1">
              {item.sizes.map((s) => (
                <li key={s.label.en} className={`flex items-center justify-between gap-2 ${chip}`}>
                  <span>{s.label[lang]}</span>
                  <span dir="ltr">{money(s.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span dir="ltr" className="shrink-0 text-base font-extrabold text-brand-800 dark:text-brand-300">{money(item.price)}</span>
          )}
        </div>

        {/* Playful one-line tip (only on some items) */}
        {CARD_EXTRAS.notes && item.note && (
          <p className="flex w-fit max-w-full items-center gap-1.5 rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-400/10 dark:text-brand-200">
            <span className="truncate">{item.note[lang]}</span>
          </p>
        )}

        {((CARD_EXTRAS.tags && item.tags?.length > 0) || (CARD_EXTRAS.diet && item.diet?.length > 0)) && (
          <ul className="flex flex-wrap items-center gap-1.5">
            {CARD_EXTRAS.tags && item.tags?.map((t) => {
              const tag = TAG_LABELS[t];
              return (
                <li key={t} className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-black/5 dark:ring-white/10 ${tag?.className ?? "bg-slate-200 text-slate-700"}`}>
                  {tag ? tag[lang] : t}
                </li>
              );
            })}
            {CARD_EXTRAS.diet && item.diet?.map((d) => {
              const meta = DIET[d];
              if (!meta) return null;
              const Icon = getIcon(meta.icon);
              return (
                <li key={d} role="img" title={meta[lang]} aria-label={meta[lang]} className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  <Icon size={14} />
                </li>
              );
            })}
          </ul>
        )}

        {CARD_EXTRAS.upgrades && item.upgrades?.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-dashed border-slate-200 pt-2 dark:border-slate-600">
            {item.upgrades.map((u) => (
              <li key={u} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {upgradeLabel(u, lang)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Whole card is tappable (opens the item popup); the heart sits above it */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={item.name[lang]}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2"
      />
      {SHOW_IMAGES ? <div className="absolute end-2 top-2 z-20 rounded-full bg-white/85 dark:bg-slate-800/85">{addControl}</div> : addControl}
    </article>
  );
}
