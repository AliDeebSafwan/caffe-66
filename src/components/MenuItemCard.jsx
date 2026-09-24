import { useEffect, useRef, useState } from "react";
import { Heart, Utensils } from "lucide-react";
import { CARD_EXTRAS, CATEGORIES, DIET, SHOW_IMAGES, TAG_LABELS, UI, favKey, money, upgradeLabel } from "../menuData";
import { getIcon } from "./categoryIcons";
import CategoryArt, { hasArt } from "./CategoryArt";

export default function MenuItemCard({ item, lang, index = 0, onZoom, favs, onToggleFav, onPickSizes }) {
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(false);
  const ref = useRef(null);
  const CategoryIcon = getIcon(CATEGORIES.find((c) => c.id === item.category)?.icon);
  const pill = "rounded-full bg-brand-700 px-2.5 py-1 text-xs font-bold text-white dark:bg-brand-400 dark:text-slate-900";
  const sized = CARD_EXTRAS.sizes && item.sizes?.length > 0;
  const isFav = sized ? item.sizes.some((sz) => favs.has(favKey(item, sz))) : favs.has(item.id);

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

  const heart = (
    <button
      onClick={() => (sized ? onPickSizes(item) : onToggleFav(item.id))}
      aria-pressed={isFav}
      aria-label={isFav ? UI.favRemove[lang] : UI.favAdd[lang]}
      className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full transition active:scale-90 hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <Heart size={19} className={`transition-all duration-300 ${isFav ? "scale-110 fill-rose-500 text-rose-500" : "text-slate-400"}`} />
    </button>
  );

  return (
    <article
      ref={ref}
      style={{ transitionDelay: shown ? `${(index % 3) * 70}ms` : "0ms" }}
      className={`relative flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-500 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none dark:bg-slate-800 dark:ring-slate-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${SHOW_IMAGES ? "sm:flex-col" : "gap-3 p-3"}`}
    >
      {/* Photo (SHOW_IMAGES = true) or the category illustration */}
      {SHOW_IMAGES ? (
        <div className="relative min-h-[8rem] w-28 shrink-0 bg-slate-200 dark:bg-slate-700 sm:aspect-[4/3] sm:min-h-0 sm:w-full">
          {item.image && !failed ? (
            <button onClick={() => onZoom(item)} aria-label={item.name[lang]} className="absolute inset-0 block cursor-zoom-in">
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
              {item.sizes.map((sz) => (
                <li key={sz.label.en} className={`flex items-center justify-between gap-2 ${pill}`}>
                  <span>{sz.label[lang]}</span>
                  <span dir="ltr">{money(sz.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span dir="ltr" className={`shrink-0 ${pill}`}>{money(item.price)}</span>
          )}
        </div>

        {/* Playful one-line tip (only on some items) */}
        {CARD_EXTRAS.notes && item.note && (
          <p className="flex w-fit max-w-full items-center gap-1.5 rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-400/10 dark:text-brand-200">
            <span aria-hidden="true" className={`inline-block text-sm ${shown ? "splash-pop" : ""}`} style={{ animationDelay: "350ms" }}>
              {item.note.emoji}
            </span>
            <span className="truncate">{item.note[lang]}</span>
          </p>
        )}

        {((CARD_EXTRAS.tags && item.tags?.length > 0) || (CARD_EXTRAS.diet && item.diet?.length > 0)) && (
          <ul className="flex flex-wrap items-center gap-1.5">
            {CARD_EXTRAS.tags && item.tags?.map((t) => {
              const tag = TAG_LABELS[t];
              return (
                <li key={t} className={`rounded-full px-2 py-0.5 text-xs font-medium ${tag?.className ?? "bg-slate-200 text-slate-700"}`}>
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

      {SHOW_IMAGES ? <div className="absolute end-2 top-2 rounded-full bg-white/85 dark:bg-slate-800/85">{heart}</div> : heart}
    </article>
  );
}
