import { useState } from "react";
import { AtSign, Check, Clock, Copy, MapPin, MessageCircle, Phone, Wifi } from "lucide-react";
import { CARD_EXTRAS, DIET, INFO, STORE, UI } from "../menuData";
import { getIcon } from "./categoryIcons";

const glass =
  "rounded-3xl bg-white/70 p-5 shadow-sm ring-1 ring-white/60 backdrop-blur-md transition-colors duration-300 dark:bg-slate-800/60 dark:ring-white/10";

// navigator.clipboard needs https; fall back to the old method so it also works on plain http / older phones
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

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
    if (await copyText(INFO.wifi.password)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const waHref = `https://wa.me/${INFO.whatsapp}?text=${encodeURIComponent(UI.waText[lang])}`;
  const link = "font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300";
  const hasInfo = INFO.hours?.[lang] || INFO.instagram?.handle || INFO.map || INFO.phone;

  return (
    <footer className="mx-auto max-w-6xl space-y-3 px-4 pb-32">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* WhatsApp feedback */}
        {INFO.whatsapp && (
          <section className="flex flex-col rounded-3xl bg-brand-700 p-5 text-white shadow-sm dark:bg-brand-800">
            <div className="flex items-start gap-3">
              <MessageCircle size={26} className="mt-0.5 shrink-0 text-brand-200" />
              <div>
                <h2 className="text-lg font-bold leading-snug">{UI.waTitle[lang]}</h2>
                <p className="mt-0.5 text-sm text-brand-100">{UI.waBody[lang]}</p>
              </div>
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-auto flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 pt-0 font-bold text-brand-800 transition hover:bg-brand-50 active:scale-95"
              style={{ marginTop: "1rem" }}
            >
              <MessageCircle size={18} />
              {UI.waCta[lang]}
            </a>
          </section>
        )}

        {/* Wi-Fi card with copy button */}
        {INFO.wifi?.name && (
          <section className={`${glass} flex flex-col`}>
            <div className="flex items-center gap-2">
              <Wifi size={22} className="text-brand-700 dark:text-brand-300" />
              <h2 className="text-lg font-bold">{UI.wifiTitle[lang]}</h2>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500 dark:text-slate-400">{UI.wifiName[lang]}</dt>
                <dd dir="ltr" className="font-bold">{INFO.wifi.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500 dark:text-slate-400">{UI.wifiPass[lang]}</dt>
                <dd dir="ltr" className="select-all font-mono font-bold">{INFO.wifi.password}</dd>
              </div>
            </dl>
            <button
              onClick={copyPassword}
              className={`mt-4 flex h-11 items-center justify-center gap-2 rounded-full font-bold transition active:scale-95 ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-700 text-white hover:bg-brand-800 dark:bg-brand-400 dark:text-slate-900 dark:hover:bg-brand-300"
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? UI.copied[lang] : UI.copy[lang]}
            </button>
            <span role="status" aria-live="polite" className="sr-only">{copied ? UI.copied[lang] : ""}</span>
          </section>
        )}
      </div>

      {hasInfo && (
        <div className={`${glass} space-y-3`}>
          <h2 className="text-lg font-bold">{STORE.name[lang]}</h2>
          {INFO.hours?.[lang] && <Row icon={Clock}>{INFO.hours[lang]}</Row>}
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
      )}
    </footer>
  );
}
