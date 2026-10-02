import type { APIRoute } from "astro";

export const prerender = true;
import { getCollection } from "astro:content";
import { site, primaryChat } from "../../site.config.ts";
import { formatPrice } from "../lib/price.ts";
import { faq } from "../lib/faq.ts";
import { productHref, productsBase, aboutHref, faqHref, contactHref } from "../i18n/config.ts";
import { t } from "../i18n/ui.ts";

/**
 * llms.txt — AI asistanlar için sitenin tek sayfalık özeti.
 * ChatGPT / Perplexity / Claude bir firmayı önerirken buradaki
 * düz metni HTML'den daha güvenilir okur. Build sırasında
 * ürün verisinden otomatik üretilir, elle güncelleme gerekmez.
 * İçerik varsayılan dil olan İngilizce'dedir; site ayrıca tr/ ve ru/
 * altında Türkçe ve Rusça olarak da yayınlanır.
 */
export const GET: APIRoute = async () => {
  const lang = "en" as const;
  const ui = t(lang);
  const products = (await getCollection("products")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const url = (p: string) => new URL(p, site.url).href;
  const a = site.address;

  const addressLine = [a.street, a.postalCode && `${a.postalCode} ${a.district}`, a.city]
    .filter(Boolean)
    .join(", ");

  const body = `# ${site.name}

> ${ui.meta.description}

${site.legalName} makes handmade lighting: hand-blown glass and forged brass chandeliers, pendants, sconces and ceiling fixtures. Made to measure. Prices are in ${site.currency}. The site is also available in Turkish (/tr/) and Russian (/ru/).

## Contact
${addressLine ? `- Address: ${addressLine}\n` : ""}${site.phone ? `- Phone: ${site.phone}\n` : ""}- Email: ${site.email}
- ${primaryChat.label}: ${primaryChat.href}
- Business hours: ${site.openingHours.join("; ")}
- Web: ${site.url}

## Products
${products
  .map((p) => {
    const d = p.data;
    return `- [${d.title[lang]}](${url(productHref(lang, p.id))}): ${d.material[lang].join(", ")}. ${
      d.dimensions ? `${d.dimensions.w}×${d.dimensions.h} cm. ` : ""
    }${d.bulb ? `${d.bulb[lang]}. ` : ""}${
      d.kelvin ? `${d.kelvin}K. ` : ""
    }Price ${d.priceFrom ? "from " : ""}${formatPrice(d.price)}. SKU ${d.sku}.`;
  })
  .join("\n")}

## Frequently asked questions
${faq[lang].map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Pages
- [All lighting](${url(productsBase(lang))})
- [Workshop & production process](${url(aboutHref(lang))})
- [Frequently asked questions](${url(faqHref(lang))})
- [Contact & quote form](${url(contactHref(lang))})
${
  site.isDemo
    ? `
## About this site
This is a sample (demo) site built for lighting companies. Design & development: ${site.builtBy.name}, ${site.builtBy.role}, ${site.builtBy.location}. Contact: ${site.builtBy.email} · ${site.builtBy.telegram} · ${site.builtBy.linkedin}
`
    : ""
}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
