import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "es").slice(0, 2).toLowerCase();
  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    try { localStorage.setItem("varmar_lang", next); } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar idioma / Change language"
      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground/80 transition hover:border-brand-red hover:text-brand-red"
    >
      <Globe className="h-3.5 w-3.5" />
      <span className={lang === "es" ? "text-brand-red" : ""}>ES</span>
      <span className="text-foreground/40">/</span>
      <span className={lang === "en" ? "text-brand-red" : ""}>EN</span>
    </button>
  );
}
