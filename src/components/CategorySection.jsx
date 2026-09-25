import { getIcon } from "./categoryIcons";
import MenuItemCard from "./MenuItemCard";
import CategoryArt, { hasArt } from "./CategoryArt";

export default function CategorySection({ section, lang, onZoom, favs, onQty, onOpen }) {
  const Icon = getIcon(section.icon);
  return (
    // id is the anchor target for CategoryNav; scroll-mt clears the sticky header
    <section id={`cat-${section.id}`} className="scroll-mt-40">
      {/* Sticks to the top bar while the guest scrolls through this category, so it's always clear which section they're in */}
      <div
        className="sticky z-30 -mx-4 mb-4 flex items-center gap-3 bg-slate-100/95 px-4 py-2.5 backdrop-blur-md transition-colors duration-300 dark:bg-slate-900/95"
        style={{ top: "var(--sticky-h, 9.5rem)" }}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 text-brand-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-brand-300 dark:ring-slate-700">
          {hasArt(section.id) ? <CategoryArt id={section.id} /> : <Icon size={20} />}
        </span>
        <h2 className="text-xl font-bold">{section.name[lang]}</h2>
      </div>

      {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, i) => (
          <MenuItemCard
            key={item.id}
            item={item}
            lang={lang}
            index={i}
            onZoom={onZoom}
            favs={favs}
            onQty={onQty}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}
