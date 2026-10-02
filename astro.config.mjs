import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./site.config.ts";

export default defineConfig({
  site: site.url,

  // Şu an her sayfa statik üretiliyor (0 KB sunucu, en hızlı LCP, en iyi SEO).
  // Firebase Hosting statik dosya sunar; sunucu tarafı gerekirse (ödeme, hesap)
  // Cloud Functions / Cloud Run ayrıca bağlanır.
  output: "static",

  i18n: {
    locales: ["en", "tr", "ru"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !["/tesekkurler/", "/spasibo/", "/thank-you/", "/sepet/", "/korzina/", "/cart/", "/404/"].some((p) => page.endsWith(p)),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", tr: "tr-TR", ru: "ru-RU" },
      },
    }),
  ],

  vite: { plugins: [tailwindcss()] },

  image: {
    // AI crawler'lar ve Google için: her görsel AVIF/WebP + doğru boyut
    responsiveStyles: true,
    layout: "constrained",
  },

  server: { port: Number(process.env.PORT) || 4321, host: false },

  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
