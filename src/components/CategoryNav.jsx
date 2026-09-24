import { useEffect, useRef } from "react";
import { getIcon } from "./categoryIcons";

export default function CategoryNav({ sections, activeId, lang }) {
  const buttons = useRef({});

  // Keep the active pill visible inside the scrollable row
  useEffect(() => {
    buttons.current[activeId]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeId]);

  const jumpTo = (id) =>
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav aria-label="Menu categories">
      <ul className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map(({ id, icon, name }) => {
          const Icon = getIcon(icon);
          const active = id === activeId;
          return (
            <li key={id} className="shrink-0">
              <button
                ref={(el) => (buttons.current[id] = el)}
                onClick={() => jumpTo(id)}
                aria-current={active ? "true" : undefined}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors active:scale-95 ${
                  active
                    ? "bg-brand-700 text-white dark:bg-brand-400 dark:text-slate-900"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <Icon size={16} />
                {name[lang]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
