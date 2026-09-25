import { Minus, Plus } from "lucide-react";
import { UI } from "../menuData";

// − 2 +  quantity control (going below 1 removes the pick)
export default function Stepper({ qty, lang, onChange, max = 20 }) {
  const b =
    "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition active:scale-90 disabled:opacity-40 dark:bg-slate-700 dark:text-slate-100";
  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      <button onClick={() => onChange(qty - 1)} disabled={qty <= 0} aria-label={UI.less[lang]} className={b}>
        <Minus size={17} />
      </button>
      <span className="w-6 text-center text-base font-bold tabular-nums">{qty}</span>
      <button onClick={() => onChange(qty + 1)} disabled={qty >= max} aria-label={UI.more[lang]} className={b}>
        <Plus size={17} />
      </button>
    </div>
  );
}
