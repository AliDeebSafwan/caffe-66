import { MAIN_TABS } from "../menuData";

// All / Food / Drinks / Shisha with a sliding highlight (mirrors correctly in RTL)
export default function MainTabs({ value, onChange, lang }) {
  const n = MAIN_TABS.length;
  const index = Math.max(0, MAIN_TABS.findIndex((t) => t.id === value));
  const dir = lang === "ar" ? -1 : 1;

  return (
    <div
      role="tablist"
      className="relative mx-4 mb-3 grid rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-800"
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 start-1 rounded-full bg-white shadow transition-transform duration-300 ease-out dark:bg-slate-600"
        style={{ width: `calc((100% - 0.5rem) / ${n})`, transform: `translateX(${dir * index * 100}%)` }}
      />
      {MAIN_TABS.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === value}
          onClick={() => onChange(t.id)}
          className={`relative z-10 h-9 rounded-full text-sm font-medium transition-colors ${
            t.id === value ? "text-brand-800 dark:text-white" : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {t[lang]}
        </button>
      ))}
    </div>
  );
}
