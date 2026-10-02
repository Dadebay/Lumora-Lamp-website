import type { ImageMetadata } from "astro";

/**
 * Ürün görselleri src/assets/products/ içinde durur (public/ değil) —
 * böylece Astro her birini AVIF/WebP'ye çevirip srcset üretir.
 * Markdown'daki "cosmos-avize-off.png" değeri buradan çözülür.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/products/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

export function productImage(name: string): ImageMetadata {
  const hit = files[`/src/assets/products/${name}`];
  if (!hit) {
    throw new Error(
      `Görsel bulunamadı: src/assets/products/${name}\n` +
        `Mevcut olanlar:\n  ${Object.keys(files).join("\n  ")}`,
    );
  }
  return hit.default;
}
