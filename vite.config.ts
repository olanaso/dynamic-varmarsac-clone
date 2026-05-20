// Configuración para generar un sitio 100% estático listo para cPanel.
// - cloudflare: false  -> no se genera Worker, el output es estático en /dist
// - tanstackStart.prerender / pages -> prerenderiza cada ruta a su propio index.html
// - tanstackStart.spa -> habilita un shell para fallback SPA en navegación cliente
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const pages = [
  "/",
  "/nosotros",
  "/servicios",
  "/flota",
  "/proyectos",
  "/galeria",
  "/contacto",
  "/terminos",
].map((path) => ({ path }));

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages,
  },
});
