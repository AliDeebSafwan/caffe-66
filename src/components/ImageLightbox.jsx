import { useEffect } from "react";
import { X } from "lucide-react";
import { UI, bigImage } from "../menuData";

// Full-screen image view. Tap the backdrop, the X button, or press Esc to close.
export default function ImageLightbox({ item, lang, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // lock page scroll behind the overlay
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-4"
    >
      <button
        onClick={onClose}
        aria-label={UI.close[lang]}
        className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white active:scale-95"
      >
        <X size={22} />
      </button>
      <img
        src={bigImage(item.image)}
        alt={item.name[lang]}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
      />
      <p className="text-lg font-bold text-white">{item.name[lang]}</p>
    </div>
  );
}
