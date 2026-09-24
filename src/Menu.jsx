import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { CARD_EXTRAS, CATEGORIES, MENU_ITEMS, UI } from "./menuData";
import MenuHeader from "./components/MenuHeader";
import MainTabs from "./components/MainTabs";
import CategoryNav from "./components/CategoryNav";
import SearchBar from "./components/SearchBar";
import AddonsBanner from "./components/AddonsBanner";
import CategorySection from "./components/CategorySection";
import MenuFooter from "./components/MenuFooter";
import ImageLightbox from "./components/ImageLightbox";
import FavoritesSheet from "./components/FavoritesSheet";
import Splash from "./components/Splash";

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

// Makes search forgiving: ignores case, accents and Arabic diacritics / alef forms
const norm = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g, "").replace(/ة/g, "ه").replace(/ى/g, "ي").trim();

const floatBtn =
  "fixed bottom-4 z-40 flex items-center justify-center rounded-full shadow-lg transition active:scale-95";

export default function Menu() {
  const [lang, setLang] = useState(() => read("menu-lang", "en"));
  const [theme, setTheme] = useState(() =>
    read("menu-theme", window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  const [query, setQuery] = useState("");
  const [main, setMain] = useState("All");
  const [zoom, setZoom] = useState(null);
  const closeZoom = useCallback(() => setZoom(null), []);

  // Favorites ("My picks"), remembered on this phone only
  const [favs, setFavs] = useState(() => {
    try {
      return new Set(JSON.parse(read("menu-favs", "[]")));
    } catch {
      return new Set();
    }
  });
  const [sheet, setSheet] = useState(false);
  const closeSheet = useCallback(() => setSheet(false), []);
  const toggleFav = useCallback(
    (id) =>
      setFavs((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    []
  );
  const favItems = useMemo(() => MENU_ITEMS.filter((i) => favs.has(i.id)), [favs]);
  useEffect(() => {
    try {
      localStorage.setItem("menu-favs", JSON.stringify([...favs]));
    } catch {}
  }, [favs]);
  useEffect(() => {
    if (!favItems.length) setSheet(false);
  }, [favItems.length]);

  // Scroll state: shrink the header and show the back-to-top button
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (y > 60 ? true : y < 10 ? false : prev));
      setShowTop(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Group items by category; filter by main tab + search; skip empty categories
  const q = norm(query);
  const sections = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        items: MENU_ITEMS.filter(
          (i) =>
            i.category === c.id &&
            (main === "All" || i.mainCategory === main) &&
            (!q || norm(i.name.en).includes(q) || norm(i.name.ar).includes(q))
        ),
      })).filter((s) => s.items.length),
    [q, main]
  );
  const [activeId, setActiveId] = useState(sections[0]?.id);

  const changeMain = (id) => {
    setMain(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Language → <html lang dir> (+ slightly larger base font for Arabic), theme → <html class="dark">
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.style.fontSize = lang === "ar" ? "17.5px" : "16px";
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("menu-lang", lang);
      localStorage.setItem("menu-theme", theme);
    } catch {}
  }, [lang, theme]);

  // Highlight the category nearest the top while scrolling
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id.replace("cat-", ""))),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`cat-${s.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <div
      className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
      style={{ fontFamily: "'Readex Pro', system-ui, sans-serif" }}
    >
      <Splash lang={lang} />

      {/* Sticky top bar: header + main tabs + category anchors */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-slate-100/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto max-w-6xl">
          <MenuHeader
            lang={lang}
            theme={theme}
            compact={scrolled}
            onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))}
            onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          />
          <MainTabs value={main} onChange={changeMain} lang={lang} />
          <CategoryNav sections={sections} activeId={activeId} lang={lang} />
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <SearchBar value={query} onChange={setQuery} lang={lang} />

        {/* key={lang} makes the content fade in again when the language changes */}
        <div key={lang} className="fade-in space-y-10">
          {!q && main === "All" && CARD_EXTRAS.upgrades && <AddonsBanner lang={lang} />}
          {sections.length ? (
            sections.map((s) => (
              <CategorySection key={s.id} section={s} lang={lang} onZoom={setZoom} favs={favs} onToggleFav={toggleFav} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-bold">{UI.noResults[lang]}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{UI.noResultsHint[lang]}</p>
            </div>
          )}
        </div>
      </main>

      <MenuFooter lang={lang} />

      {/* Floating buttons */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={UI.top[lang]}
          className={`${floatBtn} start-4 h-12 w-12 bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700`}
        >
          <ArrowUp size={20} />
        </button>
      )}
      {favItems.length > 0 && (
        <button onClick={() => setSheet(true)} className={`${floatBtn} end-4 h-12 gap-2 bg-brand-700 px-4 font-medium text-white dark:bg-brand-400 dark:text-slate-900`}>
          <Heart size={18} className="fill-current" />
          {UI.favTitle[lang]}
          <span className="rounded-full bg-white/25 px-2 text-sm">{favItems.length}</span>
        </button>
      )}

      {sheet && favItems.length > 0 && (
        <FavoritesSheet items={favItems} lang={lang} onRemove={toggleFav} onClear={() => setFavs(new Set())} onClose={closeSheet} />
      )}
      {zoom && <ImageLightbox item={zoom} lang={lang} onClose={closeZoom} />}
    </div>
  );
}
