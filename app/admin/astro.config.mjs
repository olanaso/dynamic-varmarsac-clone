import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  outDir: '../backend/public',
  integrations: [tailwind()],
  server: { port: 4321 },
});
