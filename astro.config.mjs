// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
  },
  integrations: [tailwind(), react(), markdoc(), keystatic()],
});