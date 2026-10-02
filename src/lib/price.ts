import { site } from "../../site.config.ts";
import type { Locale } from "../i18n/config.ts";

const fmt = new Intl.NumberFormat(site.priceLocale, {
  style: "currency",
  currency: site.currency,
  maximumFractionDigits: 0,
});

/** 8000 → "$8,000" (dil fark etmeksizin aynı rakam biçimi kullanılır) */
export const formatPrice = (value: number) => fmt.format(value);

/** priceFrom true ise dile göre "From $8,000" / "$8,000'den başlayan" / "От $8,000" */
export const formatPriceFrom = (value: number, from: boolean, locale: Locale) => {
  const price = fmt.format(value);
  if (!from) return price;
  if (locale === "tr") return `${price}'den başlayan`;
  if (locale === "ru") return `От ${price}`;
  return `From ${price}`;
};
