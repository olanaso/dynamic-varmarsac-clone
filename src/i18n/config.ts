import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es";
import { en } from "./locales/en";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { es: { translation: es }, en: { translation: en } },
    fallbackLng: "es",
    lng: "es",
    supportedLngs: ["es", "en"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

if (typeof window !== "undefined") {
  window.setTimeout(() => {
    const storedLang = localStorage.getItem("varmar_lang");
    if (storedLang === "es" || storedLang === "en") {
      i18n.changeLanguage(storedLang);
    }
  }, 0);
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
