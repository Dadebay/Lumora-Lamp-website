import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Ürünler şimdilik markdown dosyalarından geliyor.
 * Mağaza aşamasına geçilince bu `loader` Shopify/Stripe/Sanity loader'ı ile
 * değiştirilir — şema aynı kaldığı için hiçbir sayfa/komponent değişmez.
 */
// Metin alanları üç dilde birden tutulur — en/tr/ru sözlüğü tek dosyada kalır,
// tek kaynaktan çeviri eksik olursa build hata verir.
const localizedString = z.object({ en: z.string(), tr: z.string(), ru: z.string() });
const localizedStringArray = z.object({
  en: z.array(z.string()),
  tr: z.array(z.string()),
  ru: z.array(z.string()),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: localizedString,
    // Google Product schema'sı için zorunlu alanlar
    sku: z.string(),
    price: z.number(),
    priceFrom: z.boolean().default(true), // "8.000 TL'den başlayan"
    availability: z.enum(["InStock", "MadeToOrder", "OutOfStock"]).default("MadeToOrder"),

    category: z.enum(["avize", "sarkit", "aplik", "tavan", "masa", "ayakli"]),
    // Arama motorları + AI için zengin nitelikler
    material: localizedStringArray.default({ en: [], tr: [], ru: [] }),
    color: localizedString.optional(),
    dimensions: z.object({ w: z.number(), h: z.number(), d: z.number().optional() }).optional(),
    bulb: localizedString.optional(),   // "3 × E14, maks. 40W"
    lumens: z.number().optional(),
    kelvin: z.number().optional(),

    // Ürün açıklaması: markdown gövdesi yerine burada, üç dilde
    description: localizedString,

    // Işık kapalı / açık görsel çifti — fade efektinin temeli
    images: z.object({
      off: z.string(),
      on: z.string(),
      alt: localizedString,
    }),

    featured: z.boolean().default(false),
    order: z.number().default(100),
    isNew: z.boolean().default(false),
  }),
});

export const collections = { products };
