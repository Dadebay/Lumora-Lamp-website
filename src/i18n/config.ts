/**
 * Dil listesi ve URL yönlendirmesinin tek kaynağı.
 * Yeni bir dil eklemek için: locales dizisine ekle, routes/ogLocale/regionLocale
 * içine satır ekle, sonra src/i18n/ui.ts içindeki sözlüğe o dili çevir.
 */
export const locales = ["en", "tr", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Astro'nun BCP-47 kodu (Intl.NumberFormat, Intl.DisplayNames için). */
export const bcp47: Record<Locale, string> = {
  en: "en-US",
  tr: "tr-TR",
  ru: "ru-RU",
};

/** OpenGraph og:locale değeri. */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  ru: "ru_RU",
};

/**
 * URL segment çevirileri. İngilizce varsayılan dil olduğu için önek almaz
 * (site.com/products/), diğer diller kendi önekiyle gelir (site.com/tr/urunler/).
 */
export const routes: Record<Locale, {
  products: string;
  category: string;
  about: string;
  contact: string;
  faq: string;
  thankYou: string;
  cart: string;
}> = {
  en: { products: "products", category: "category", about: "about", contact: "contact", faq: "faq", thankYou: "thank-you", cart: "cart" },
  tr: { products: "urunler", category: "kategori", about: "hakkimizda", contact: "iletisim", faq: "sss", thankYou: "tesekkurler", cart: "sepet" },
  ru: { products: "produkty", category: "kategoriya", about: "o-nas", contact: "kontakty", faq: "chasto-zadavaemye-voprosy", thankYou: "spasibo", cart: "korzina" },
};

/** locale + "/urunler/" gibi önek yolu bir araya getirir; en için önek yok. */
export function localeHref(locale: Locale, path: string): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${clean}`;
}

export function productsBase(locale: Locale): string {
  return localeHref(locale, `/${routes[locale].products}/`);
}

export function productHref(locale: Locale, slug: string): string {
  return localeHref(locale, `/${routes[locale].products}/${slug}/`);
}

export function categoryHref(locale: Locale, categoryKey: string): string {
  return localeHref(locale, `/${routes[locale].products}/${routes[locale].category}/${categoryKey}/`);
}

export function aboutHref(locale: Locale): string {
  return localeHref(locale, `/${routes[locale].about}/`);
}

export function contactHref(locale: Locale, query?: string): string {
  const base = localeHref(locale, `/${routes[locale].contact}/`);
  return query ? `${base}?${query}` : base;
}

export function faqHref(locale: Locale): string {
  return localeHref(locale, `/${routes[locale].faq}/`);
}

export function thankYouHref(locale: Locale): string {
  return localeHref(locale, `/${routes[locale].thankYou}/`);
}

export function cartHref(locale: Locale): string {
  return localeHref(locale, `/${routes[locale].cart}/`);
}

export function homeHref(locale: Locale): string {
  return localeHref(locale, "/");
}

/** Her dil için aynı hesaplamayı yapıp {en,tr,ru} sözlüğü üretir (dil değiştirici / hreflang için). */
export function allLocales<T>(fn: (l: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Locale, T>;
}

/** Ülke kodunu ("LV") o dildeki adına çevirir ("Latvia" / "Letonya" / "Латвия"). */
export function regionName(locale: Locale, countryCode: string): string {
  try {
    return new Intl.DisplayNames([bcp47[locale]], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}
