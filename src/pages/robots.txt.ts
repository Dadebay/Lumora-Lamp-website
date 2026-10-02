import type { APIRoute } from "astro";

export const prerender = true;
import { site } from "../../site.config.ts";

/**
 * AI botlarını AÇIKÇA davet ediyoruz. Varsayılan "izin ver" olsa da,
 * bazı botlar adlarının geçtiği bir kural görmezse temkinli davranıyor.
 */
const AI_BOTS = [
  "GPTBot",          // OpenAI eğitim
  "OAI-SearchBot",   // ChatGPT arama
  "ChatGPT-User",    // ChatGPT'de kullanıcı linke tıkladığında
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export const GET: APIRoute = () =>
  new Response(
    `# ${site.name}
User-agent: *
Allow: /

${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${new URL("/sitemap-index.xml", site.url).href}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
