// ============================================================================
// ✏️  EDIT THIS FILE ONLY — every piece of menu content lives here.
// Sections: 1) Store  2) UI text  3) Tags  4) Add-ons  5) Categories  6) Items
// ============================================================================

// ─── 1) STORE BRANDING ── replace with your logo + name ──────────────────────
export const STORE = {
  logo: "/logo.png", // file lives in /public
  name: { en: "Sixty Six", ar: "ستة وستين" },
  tagline: { en: "Coffee & Shisha", ar: "قهوة ونرجيلة" },
};

// Currency symbol shown before every price ("$6", "$3.50"). Prices in the data are plain numbers.
export const CURRENCY = "$";
export const money = (p) => `${CURRENCY}${p}`;
// Key used by "My picks": plain item id, or "id:SizeName" when a size was chosen.
export const favKey = (item, size) => (size ? `${item.id}:${size.label.en}` : item.id);

// ─── 2) UI TEXT ──────────────────────────────────────────────────────────────
export const UI = {
  langButton: { en: "عربي", ar: "EN" }, // shows the language you'll switch TO
  addonsTitle: { en: "Add-ons and upgrades", ar: "الإضافات والترقيات" },
  addonsHint: { en: "Available on most items. Just ask your waiter.", ar: "متوفرة على معظم الأصناف. اطلبها من النادل." },
  searchPlaceholder: { en: "Search the menu", ar: "ابحث في المنيو" },
  noResults: { en: "No items found", ar: "لا توجد نتائج" },
  noResultsHint: { en: "Try a different name or clear the search.", ar: "جرّب اسماً آخر أو امسح البحث." },
  copy: { en: "Copy", ar: "نسخ" },
  copied: { en: "Copied", ar: "تم النسخ" },
  map: { en: "Find us on the map", ar: "موقعنا على الخريطة" },
  close: { en: "Close", ar: "إغلاق" },
  favTitle: { en: "My picks", ar: "اختياراتي" },
  favHint: { en: "Adjust quantities, then show this list to your waiter.", ar: "عدّل الكميات ثم أرِ هذه القائمة للنادل." },
  favClear: { en: "Clear all", ar: "مسح الكل" },
  favAdd: { en: "Add to my picks", ar: "أضف إلى اختياراتي" },
  favRemove: { en: "Remove from my picks", ar: "إزالة من اختياراتي" },
  top: { en: "Back to top", ar: "للأعلى" },
  pickSize: { en: "Choose a size", ar: "اختر الحجم" },
  done: { en: "Done", ar: "تم" },
  favTotal: { en: "Total", ar: "المجموع" },
  less: { en: "Less", ar: "أقل" },
  more: { en: "More", ar: "أكثر" },
};

// ─── 3) TAGS ── key = value used in item.tags. Add new tags here. ────────────
export const TAG_LABELS = {
  Healthy: { en: "Healthy", ar: "صحي", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300" },
  Bestseller: { en: "Bestseller", ar: "الأكثر طلباً", className: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300 tag-pulse" },
  New: { en: "New", ar: "جديد", className: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300" },
  Fresh: { en: "Fresh", ar: "طازج", className: "bg-lime-100 text-lime-800 dark:bg-lime-400/15 dark:text-lime-300" },
  Trending: { en: "Trending", ar: "رائج", className: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-300" },
  Signature: { en: "Signature", ar: "توقيعنا", className: "bg-brand-100 text-brand-800 dark:bg-brand-400/15 dark:text-brand-300" },
  Special: { en: "Special", ar: "مميز", className: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300" },
};

// ─── 3b) DIETARY ICONS ── item.diet = ["Vegan", "GlutenFree", ...] (icon-only, legend shown in footer)
export const DIET = {
  Vegan: { icon: "Vegan", en: "Vegan", ar: "نباتي" },
  Spicy: { icon: "Flame", en: "Spicy", ar: "حار" },
  GlutenFree: { icon: "WheatOff", en: "Gluten-free", ar: "خالٍ من الغلوتين" },
  Nuts: { icon: "Nut", en: "Contains nuts", ar: "يحتوي على مكسرات" },
  DairyFree: { icon: "MilkOff", en: "Dairy-free", ar: "خالٍ من الحليب" },
};

// ─── 3c) FOOTER INFO ── replace with your real details. Set a field to "" to hide it.
// Fields left as "" are hidden in the footer. Fill in hours / Wi-Fi / Instagram / phone when you have them.
export const INFO = {
  hours: { en: "", ar: "" },
  wifi: { name: "", password: "" },
  instagram: { handle: "", url: "" },
  map: "https://maps.app.goo.gl/k24SyjK34nwQ2u6n7?g_st=ic", // header pin + footer link
  phone: "",
};

// ─── 4) ADD-ONS ──────────────────────────────────────────────────────────────
// Item upgrades are plain strings (see items below). This map gives each one an
// Arabic label. If a string isn't listed here, the English text is shown as-is.
export const UPGRADE_AR = {
  "+ $1 Extra Cheese": "+ 1$ جبنة إضافية",
  "+ $0.5 Espresso Shot": "+ 0.5$ شوت إسبريسو",
  "+ $0.75 Oat Milk": "+ 0.75$ حليب الشوفان",
  "+ $0.5 Whipped Cream": "+ 0.5$ كريمة مخفوقة",
  "+ $1 Ice Cream Scoop": "+ 1$ كرة آيس كريم",
  "+ $3 Premium Flavor": "+ 3$ نكهة مميزة",
  "+ $2 Extra Coal": "+ 2$ فحم إضافي",
};
export const upgradeLabel = (text, lang) => (lang === "ar" && UPGRADE_AR[text]) || text;

// Shown in the highlighted banner at the top of the menu:
export const GENERAL_ADDONS = ["+ $0.5 Espresso Shot", "+ $0.75 Oat Milk", "+ $0.5 Whipped Cream", "+ $1 Extra Cheese"];

// ─── 5) CATEGORIES ── order here = order on the page ─────────────────────────
// id must match item.category. icon = any name exported by ./components/categoryIcons.js
export const CATEGORIES = [
  { id: "Crepe", icon: "Sandwich", name: { en: "Crepes", ar: "الكريب" } },
  { id: "Plates", icon: "Cherry", name: { en: "Plates", ar: "الصحون" } },
  { id: "Cocktail", icon: "Martini", name: { en: "Cocktails", ar: "الكوكتيل" } },
  { id: "NaturalJuice", icon: "Citrus", name: { en: "Fresh Juices", ar: "العصائر الطبيعية" } },
  { id: "Milkshakes", icon: "Milk", name: { en: "Milkshakes", ar: "الميلك شيك" } },
  { id: "HotDrinks", icon: "Coffee", name: { en: "Hot Drinks", ar: "المشروبات الساخنة" } },
  { id: "Shisha", icon: "Flame", name: { en: "Shisha", ar: "النرجيلة" } },
];

// ─── 5b) MAIN TABS ── id "All" shows everything; the others match item.mainCategory
export const MAIN_TABS = [
  { id: "All", en: "All", ar: "الكل" },
  { id: "Food", en: "Food", ar: "أكل" },
  { id: "Beverages", en: "Drinks", ar: "مشروبات" },
  { id: "Special", en: "Shisha", ar: "النرجيلة" },
];

// ─── 6) MENU ITEMS ── replace the mock items below with your real menu ───────
// Images: paste any image URL (Unsplash, your CDN, or "/images/latte.jpg").
// If an image fails to load, the card shows a fallback icon automatically.
// mainCategory: "Food" | "Beverages" | "Special" (Shisha).  No descriptions by design.
// Photos: an item shows its photo only when SHOW_IMAGES is true AND its `image` field is not empty
// (e.g. image: "/images/latte.webp"). Every other item keeps the category illustration.
export const SHOW_IMAGES = false;

// Extra info on the cards. Only name + price + icon show while these are false.
// Set any of them to true to bring it back (the data stays in the items below).
export const CARD_EXTRAS = { tags: true, diet: false, upgrades: false, sizes: true, notes: true };
// notes = the short playful tip under some item names (item.note = { en, ar }). Set notes: false to hide them all.

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;
// Larger version for the tap-to-zoom view (works with Unsplash URLs; local images are used as-is).
export const bigImage = (url) => url.replace(/w=\d+/, "w=1200");
// Sizes helper. Optional item fields:
//   sizes: [sz("Small", "صغير", "4 USD"), sz("Large", "كبير", "5 USD")]  (replaces the single price pill)
//   diet:  ["Vegan", "Spicy", "GlutenFree", "Nuts", "DairyFree"]
const sz = (en, ar, price) => ({ label: { en, ar }, price });

// Placeholder photo per category (hidden while SHOW_IMAGES is false). Replace per item later if you like.
const IMG = {
  crepe: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&q=80",
  plates: "https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?w=500&q=80",
  cocktail: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80",
  juice: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80",
  shake: "https://images.unsplash.com/photo-1572490122747-3968b75bf699?w=500&q=80",
  hot: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80",
  shisha: "https://images.unsplash.com/photo-1574513904571-0f73b64ab226?w=500&q=80",
};

// Prices are plain numbers (the "$" is added automatically). Items with sizes: price = lowest size.
export const MENU_ITEMS = [
  // ── Crepes ──
  { id: "cr1", name: { en: "Nutella Crepe", ar: "كريب نوتيلا" }, price: "6", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: [], note: { en: "Classic comfort", ar: "دفء كلاسيكي" } },
  { id: "cr2", name: { en: "Oreo Crepe", ar: "كريب أوريو" }, price: "6", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: [] },
  { id: "cr3", name: { en: "Kinder Crepe", ar: "كريب كيندر" }, price: "6", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: [], note: { en: "Kid at heart", ar: "للطفل الذي فيك" } },
  { id: "cr4", name: { en: "Fettuccine Crepe", ar: "كريب فوتوتشيني" }, price: "7", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: [] },
  { id: "cr5", name: { en: "Fruits Crepe", ar: "كريب فواكه" }, price: "7", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: ["Fresh"] },
  { id: "cr6", name: { en: "Lotus Crepe", ar: "كريب لوتس" }, price: "6", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: [] },
  { id: "cr7", name: { en: "Dubai Chocolate Crepe", ar: "كريب شوكولا دبي" }, price: "7", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: ["Trending"], note: { en: "Worth a photo", ar: "تستاهل صورة" } },
  { id: "cr8", name: { en: "Sixty Six Crepe", ar: "كريب ستة وستين" }, price: "10", image: IMG.crepe, mainCategory: "Food", category: "Crepe", upgrades: [], tags: ["Signature"], note: { en: "Treat yourself", ar: "دلّع نفسك" } },

  // ── Plates ──
  { id: "pl1", name: { en: "Ashta & Fruits Plate", ar: "صحن قشطة وفواكه" }, price: "10", image: IMG.plates, mainCategory: "Food", category: "Plates", upgrades: [], tags: [] },
  { id: "pl2", name: { en: "Ashta, Avocado & Nutella Plate", ar: "صحن قشطة أفوكادو نوتيلا" }, price: "10", image: IMG.plates, mainCategory: "Food", category: "Plates", upgrades: [], tags: [] },
  { id: "pl3", name: { en: "Ashta, Avocado & Fruits Plate", ar: "صحن قشطة أفوكادو وفواكه" }, price: "12", image: IMG.plates, mainCategory: "Food", category: "Plates", upgrades: [], tags: ["Special"], note: { en: "Sweet finish to the night", ar: "ختام حلو للسهرة" } },

  // ── Cocktails ──
  { id: "ck1", name: { en: "Banana Milk", ar: "موز بحليب" }, price: "3", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "3"), sz("Large", "كبير", "4")] },
  { id: "ck2", name: { en: "Banana Milk & Strawberry", ar: "موز بحليب وفريز" }, price: "3", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "3"), sz("Large", "كبير", "4")] },
  { id: "ck3", name: { en: "Avocado", ar: "أفوكادو" }, price: "5", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "5"), sz("Large", "كبير", "6")] },
  { id: "ck4", name: { en: "Avocado Nutella", ar: "أفوكادو نوتيلا" }, price: "6", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "6"), sz("Large", "كبير", "7")] },
  { id: "ck5", name: { en: "Avocado Lotus", ar: "أفوكادو لوتس" }, price: "6", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "6"), sz("Large", "كبير", "7")] },
  { id: "ck6", name: { en: "Avocado Cocktail", ar: "أفوكادو كوكتيل" }, price: "5", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "5"), sz("Large", "كبير", "6")] },
  { id: "ck7", name: { en: "Pieces Cocktail", ar: "كوكتيل الشقف" }, price: "5", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], sizes: [sz("Medium", "وسط", "5"), sz("Large", "كبير", "6")] },
  { id: "ck8", name: { en: "Tahiti", ar: "تاهيتي" }, price: "7", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], note: { en: "Tropical escape", ar: "هروب استوائي" } },
  { id: "ck9", name: { en: "Kiwi Cocktail", ar: "كوكتيل بالكيوي" }, price: "7", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [] },
  { id: "ck10", name: { en: "Sixty Six Cocktail", ar: "كوكتيل ستة وستين" }, price: "8", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: ["Signature"], note: { en: "Our signature sip", ar: "رشفتنا المميزة" } },
  { id: "ck11", name: { en: "Katyusha", ar: "كاتيوشا" }, price: "10", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [], note: { en: "For the bold", ar: "للجريئين" } },
  { id: "ck12", name: { en: "Extra Fruits Cup with Ashta", ar: "كوب فواكه إكسترا مع قشطة" }, price: "9", image: IMG.cocktail, mainCategory: "Beverages", category: "Cocktail", upgrades: [], tags: [] },

  // ── Fresh Juices ──
  { id: "nj1", name: { en: "Orange", ar: "برتقال" }, price: "3", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj2", name: { en: "Orange & Carrot", ar: "برتقال وجزر" }, price: "3", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj3", name: { en: "Carrot", ar: "جزر" }, price: "2", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj4", name: { en: "Apple", ar: "تفاح" }, price: "2", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj5", name: { en: "Lemonade & Mint", ar: "ليموناضة ونعنع" }, price: "3.50", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [], note: { en: "Instant cool-down", ar: "تبريد فوري" } },
  { id: "nj6", name: { en: "Lemonade", ar: "ليموناضة" }, price: "3", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj7", name: { en: "Pomegranate", ar: "رمان" }, price: "6", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [], note: { en: "Ruby refresh", ar: "انتعاش ياقوتي" } },
  { id: "nj8", name: { en: "Strawberry", ar: "فريز" }, price: "3.50", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj9", name: { en: "Mango", ar: "مانجا" }, price: "5", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },
  { id: "nj10", name: { en: "Guava", ar: "جوافة" }, price: "5", image: IMG.juice, mainCategory: "Beverages", category: "NaturalJuice", upgrades: [], tags: [] },

  // ── Milkshakes ──
  { id: "ms1", name: { en: "Oreo", ar: "أوريو" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [] },
  { id: "ms2", name: { en: "Strawberry", ar: "فريز" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [] },
  { id: "ms3", name: { en: "Lotus", ar: "لوتس" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [] },
  { id: "ms4", name: { en: "Nutella", ar: "نوتيلا" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [], note: { en: "Dessert in a glass", ar: "حلوى بكأس" } },
  { id: "ms5", name: { en: "Vanilla", ar: "فانيليا" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [] },
  { id: "ms6", name: { en: "Brownie", ar: "براوني" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [] },
  { id: "ms7", name: { en: "Blueberry", ar: "بلوبيري" }, price: "5", image: IMG.shake, mainCategory: "Beverages", category: "Milkshakes", upgrades: [], tags: [], note: { en: "Berry good mood", ar: "مزاج التوت" } },

  // ── Hot Drinks ──
  { id: "hd1", name: { en: "Espresso", ar: "إسبريسو" }, price: "1", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [] },
  { id: "hd2", name: { en: "Cappuccino", ar: "كابتشينو" }, price: "1", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [], note: { en: "Morning ritual", ar: "طقس الصباح" } },
  { id: "hd3", name: { en: "Nescafe", ar: "نسكافيه" }, price: "2", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [] },
  { id: "hd4", name: { en: "Hot Chocolate", ar: "هوت شوكليت" }, price: "3", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [], note: { en: "A warm hug", ar: "حضنٌ دافئ" } },
  { id: "hd5", name: { en: "Turkish Coffee", ar: "قهوة تركية" }, price: "3", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [], sizes: [sz("Small", "صغير", "3"), sz("Large", "كبير", "3.50")], note: { en: "Slow sip, long chat", ar: "رشفة هادئة وحديث طويل" } },
  { id: "hd6", name: { en: "Tea", ar: "شاي" }, price: "1", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [] },
  { id: "hd7", name: { en: "Mixed Herbal Tea", ar: "زهورات مشكلة" }, price: "1", image: IMG.hot, mainCategory: "Beverages", category: "HotDrinks", upgrades: [], tags: [], note: { en: "Calm the evening", ar: "هدّئ مساءك" } },

  // ── Shisha ──
  { id: "sh1", name: { en: "Double Apple Edara", ar: "تفاحتين إدارة" }, price: "5", image: IMG.shisha, mainCategory: "Special", category: "Shisha", upgrades: [], tags: [], note: { en: "The classic choice", ar: "الاختيار الكلاسيكي" } },
  { id: "sh2", name: { en: "Double Apple Gold", ar: "تفاحتين جولد" }, price: "5", image: IMG.shisha, mainCategory: "Special", category: "Shisha", upgrades: [], tags: [] },
  { id: "sh3", name: { en: "Lemon & Mint", ar: "حامض ونعناع" }, price: "5", image: IMG.shisha, mainCategory: "Special", category: "Shisha", upgrades: [], tags: [], note: { en: "Cool clouds", ar: "غيوم منعشة" } },
  { id: "sh4", name: { en: "Grape", ar: "عنب" }, price: "5", image: IMG.shisha, mainCategory: "Special", category: "Shisha", upgrades: [], tags: [] },
];

// ─── Data checker (development only): prints warnings in the browser console if the data has a mistake ───
if (import.meta.env?.DEV) {
  const ids = new Set();
  const cats = new Set(CATEGORIES.map((c) => c.id));
  const bad = (v) => Number.isNaN(parseFloat(String(v).replace(",", ".")));
  MENU_ITEMS.forEach((i) => {
    if (ids.has(i.id)) console.warn("[menu] duplicate id:", i.id);
    ids.add(i.id);
    if (!cats.has(i.category)) console.warn("[menu] unknown category (item hidden):", i.id, i.category);
    if (!i.name?.en || !i.name?.ar) console.warn("[menu] missing English or Arabic name:", i.id);
    if (bad(i.price)) console.warn("[menu] price is not a number:", i.id, i.price);
    i.sizes?.forEach((sz) => bad(sz.price) && console.warn("[menu] size price is not a number:", i.id, sz.label.en));
  });
}
