import { useState } from "react";
import { AtSign, Check, Clock, Copy, MapPin, Phone, Wifi } from "lucide-react";
import { CARD_EXTRAS, DIET, INFO, STORE, UI } from "../menuData";
import { getIcon } from "./categoryIcons";

// Each row hides itself when its value in INFO (menuData.js) is empty.
function Row({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon size={18} className="shrink-0 text-brand-700 dark:text-brand-300" />
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">{children}</div>
    </div>
  );
}

export default function MenuFooter({ lang }) {
  const [copied, setCopied] = useState(false);

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(INFO.wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const link = "font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300";

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12">
      <div className="space-y-3 rounded-3xl bg-white p-5 ring-1 ring-slate-200 transition-colors duration-300 dark:bg-slate-800 dark:ring-slate-700">
        <h2 className="text-lg font-bold">{STORE.name[lang]}</h2>

        {INFO.hours?.[lang] && <Row icon={Clock}>{INFO.hours[lang]}</Row>}

        {INFO.wifi?.name && (
          <Row icon={Wifi}>
            <span dir="ltr" className="font-medium">{INFO.wifi.name}</span>
            <button onClick={copyPassword} className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium active:scale-95 dark:bg-slate-700">
              <span dir="ltr">{INFO.wifi.password}</span>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? UI.copied[lang] : UI.copy[lang]}</span>
            </button>
          </Row>
        )}

        {INFO.instagram?.handle && (
          <Row icon={AtSign}>
            <a href={INFO.instagram.url} target="_blank" rel="noreferrer" dir="ltr" className={link}>{INFO.instagram.handle}</a>
          </Row>
        )}

        {INFO.map && (
          <Row icon={MapPin}>
            <a href={INFO.map} target="_blank" rel="noreferrer" className={link}>{UI.map[lang]}</a>
          </Row>
        )}

        {INFO.phone && (
          <Row icon={Phone}>
            <a href={`tel:${INFO.phone.replace(/\s/g, "")}`} dir="ltr" className={link}>{INFO.phone}</a>
          </Row>
        )}

        {CARD_EXTRAS.diet && (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 border-t border-dashed border-slate-200 pt-3 text-xs text-slate-600 dark:border-slate-600 dark:text-slate-300">
          {Object.entries(DIET).map(([key, meta]) => {
            const Icon = getIcon(meta.icon);
            return (
              <li key={key} className="flex items-center gap-1.5">
                <Icon size={14} />
                {meta[lang]}
              </li>
            );
          })}
        </ul>
        )}
      </div>
    </footer>
  );
}
