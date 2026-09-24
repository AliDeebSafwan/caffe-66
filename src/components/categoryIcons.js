import {
  Coffee, Sandwich, Martini, CupSoda, Citrus, Cherry, Milk, Pizza, Flame, Utensils, // categories
  Vegan, WheatOff, Nut, MilkOff, // dietary icons
} from "lucide-react";

// Add any lucide icon here, then reference its key in CATEGORIES / DIET (menuData.js).
const ICONS = { Coffee, Sandwich, Martini, CupSoda, Citrus, Cherry, Milk, Pizza, Flame, Vegan, WheatOff, Nut, MilkOff };

export const getIcon = (name) => ICONS[name] || Utensils;
