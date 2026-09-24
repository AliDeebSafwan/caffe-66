import { Search, X } from "lucide-react";
import { UI } from "../menuData";

export default function SearchBar({ value, onChange, lang }) {
  return (
    <div className="relative">
      <Search size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={UI.searchPlaceholder[lang]}
        className="h-12 w-full rounded-2xl bg-white ps-11 pe-12 text-base ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:bg-slate-800 dark:ring-slate-700 dark:focus:ring-brand-400 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label={UI.close[lang]}
          className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
