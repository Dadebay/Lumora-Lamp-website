import { site } from "../../site.config.ts";
import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/config.ts";
import { productHref } from "../i18n/config.ts";
import { t } from "../i18n/ui.ts";

const abs = (path: string) => new URL(path, site.url).href;

/**
 * Google'ın yerel sonuçlarda ve Knowledge Panel'de kullandığı ana varlık.
 * Demo modunda (ya da adres girilmemişse) sahte bir posta adresi/koordinat
 * yayımlanmaz — uydurma işletme verisi hem yanıltıcı olur hem de Google'da
 * spam işareti alır. Müşteriye teslimde site.config.ts'ye gerçek adres
 * yazılıp isDemo: false yapıldığında bu alanlar otomatik eklenir.
 */
export function localBusinessSchema(locale: Locale) {
  const a = site.address;
  const hasRealAddress = !site.isDemo && Boolean(a.street && a.postalCode);

  return {
    "@context": "https://schema.org",
    "@type": ["LightingStore", "LocalBusiness"],
    "@id": `${site.url}#business`,
    name: site.name,
    legalName: site.legalName,
    description: t(locale).meta.description,
    url: site.url,
    ...(site.phone && { telephone: site.phone }),
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    image: abs("/images/og.jpg"),
    ...(hasRealAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: a.street,
            addressLocality: a.district,
            addressRegion: a.region,
            postalCode: a.postalCode,
            addressCountry: a.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.geo.lat,
            longitude: site.geo.lng,
          },
          openingHours: site.openingHours,
        }
      : {
          areaServed: { "@type": "City", name: a.city },
        }),
    sameAs: [
      ...Object.values(site.social).filter(Boolean),
      site.telegram,
    ].filter(Boolean),
  };
}

/** Ürün kartlarının Google'da fiyatla görünmesini sağlar. */
export function productSchema(p: CollectionEntry<"products">, locale: Locale) {
  const d = p.data;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": abs(`${productHref(locale, p.id)}#product`),
    name: d.title[locale],
    sku: d.sku,
    description: d.description[locale]?.slice(0, 300).replace(/\s+/g, " ").trim(),
    image: [abs(d.images.on), abs(d.images.off)],
    category: d.category,
    material: d.material[locale].join(", ") || undefined,
    color: d.color?.[locale],
    brand: { "@type": "Brand", name: site.name },
    ...(d.dimensions && {
      width: { "@type": "QuantitativeValue", value: d.dimensions.w, unitCode: "CMT" },
      height: { "@type": "QuantitativeValue", value: d.dimensions.h, unitCode: "CMT" },
    }),
    offers: {
      "@type": "Offer",
      url: abs(productHref(locale, p.id)),
      price: d.price,
      priceCurrency: site.currency,
      availability: `https://schema.org/${
        d.availability === "OutOfStock" ? "OutOfStock" : "InStock"
      }`,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${site.url}#business` },
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/** AI asistanların doğrudan alıntıladığı format. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Liste sayfaları için: Google'a "bu sayfa şu ürünleri listeliyor" der. */
export function itemListSchema(items: CollectionEntry<"products">[], name: string, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(productHref(locale, p.id)),
      name: p.data.title[locale],
    })),
  };
}
