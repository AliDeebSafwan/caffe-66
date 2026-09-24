import { Sparkles } from "lucide-react";
import { GENERAL_ADDONS, UI, upgradeLabel } from "../menuData";

export default function AddonsBanner({ lang }) {
  return (
    <section className="rounded-3xl bg-brand-700 p-5 text-white dark:bg-brand-900/70">
      <div className="flex items-center gap-3">
        <Sparkles size={22} className="shrink-0 text-brand-200" />
        <div>
          <h2 className="text-lg font-bold leading-tight">{UI.addonsTitle[lang]}</h2>
          <p className="text-sm text-brand-100">{UI.addonsHint[lang]}</p>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {GENERAL_ADDONS.map((a) => (
          <li key={a} className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
            {upgradeLabel(a, lang)}
          </li>
        ))}
      </ul>
    </section>
  );
}
