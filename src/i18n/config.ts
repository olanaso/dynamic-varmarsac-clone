import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { es } from "./locales/es";
import { en } from "./locales/en";

if (!i18n.isInitialized) {
  const base = i18n.use(initReactI18next);
  if (typeof window !== "undefined") base.use(LanguageDetector);
  base.init({
    resources: { es: { translation: es }, en: { translation: en } },
    fallbackLng: "es",
    lng: typeof window === "undefined" ? "es" : undefined,
    supportedLngs: ["es", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "varmar_lang",
    },
  });
}

// Geo-detection (only first visit, no stored preference)
if (typeof window !== "undefined" && !localStorage.getItem("varmar_lang")) {
  // Spanish-speaking countries
  const esCountries = new Set([
    "PE", "ES", "MX", "AR", "CO", "CL", "VE", "EC", "BO", "PY", "UY",
    "CR", "PA", "CU", "DO", "GT", "HN", "NI", "SV", "PR",
  ]);
  fetch("https://ipapi.co/json/")
    .then((r) => r.json())
    .then((d) => {
      const cc = (d?.country || d?.country_code || "").toUpperCase();
      if (cc) {
        const lang = esCountries.has(cc) ? "es" : "en";
        if (i18n.language !== lang) i18n.changeLanguage(lang);
      }
    })
    .catch(() => {});
}

export default i18n;
