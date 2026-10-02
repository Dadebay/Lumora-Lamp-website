import { getCollection } from "astro:content";
import { getImage } from "astro:assets";
import { productImage } from "./images.ts";
import { formatPriceFrom } from "./price.ts";
import { productHref, type Locale } from "../i18n/config.ts";

export type CatalogEntry = {
  title: string;
  sku: string;
  price: number;
  priceLabel: string;
  href: string;
  off?: string;
  on?: string;
};

/**
 * Sepet istemci tarafında (localStorage) tutulur; yalnızca {id, adet} saklanır.
 * Başlık/fiyat/görsel her sayfada o dilin kataloğundan çözülür — böylece
 * kullanıcı dil değiştirse bile sepet doğru dilde görünür.
 */
export async function buildCatalog(lang: Locale, withImages = false) {
  const products = await getCollection("products");
  const entries = await Promise.all(
    products.map(async (p): Promise<[string, CatalogEntry]> => {
      const d = p.data;
      const entry: CatalogEntry = {
        title: d.title[lang],
        sku: d.sku,
        price: d.price,
        priceLabel: formatPriceFrom(d.price, d.priceFrom, lang),
        href: productHref(lang, p.id),
      };
      if (withImages) {
        const [off, on] = await Promise.all([
          getImage({ src: productImage(d.images.off), width: 240, format: "webp" }),
          getImage({ src: productImage(d.images.on), width: 240, format: "webp" }),
        ]);
        entry.off = off.src;
        entry.on = on.src;
      }
      return [p.id, entry];
    }),
  );
  return Object.fromEntries(entries);
}

/** <script type="application/json"> içine güvenle gömülecek JSON. */
export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
