import {
  Coffee, Croissant, Martini, CupSoda, Citrus, Cherry, Milk, Pizza, Flame, Leaf, GlassWater, Utensils, // category icons
  Vegan, WheatOff, Nut, MilkOff, // dietary icons
} from "lucide-react";

// The key here is the icon name written in CATEGORIES (menuData.js). To use a new lucide icon:
// import it above, add it to this object, then set `icon: "YourIcon"` on the category.
const ICONS = {
  Coffee, // Hot Drinks
  Croissant, // Crepes
  Martini, // Cocktails
  CupSoda, // Cold Drinks (soft drinks, energy drinks, water)
  Citrus, // Fresh Juices
  Cherry, // Plates
  Milk, // Milkshakes
  Pizza, // Manaqeesh & Kaak
  Flame, // Shisha
  Leaf, // Mojito
  GlassWater, // Bottled Juices
  Vegan, WheatOff, Nut, MilkOff, // dietary icons
};

export const getIcon = (name) => ICONS[name] || Utensils; // Utensils = safe fallback
