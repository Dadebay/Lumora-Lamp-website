<div align="center">

# Lumora

**Işığı açın. Farkı görün.**

Tek bir anahtarla bütün sayfanın ve koleksiyonun sıcak ışığa büründüğü,
üç dilli aydınlatma kataloğu şablonu.

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/products/hosting)
![Diller](https://img.shields.io/badge/diller-EN%20%C2%B7%20TR%20%C2%B7%20RU-2E2A26)

**[Canlı demo: lumora-lighting-riga.web.app](https://lumora-lighting-riga.web.app)**

<br />

<table>
  <tr>
    <th align="center">Işık kapalı</th>
    <th align="center">Işık açık</th>
  </tr>
  <tr>
    <td><img src="docs/images/hero-light.webp" alt="Lumora ana sayfa, ışık kapalı" /></td>
    <td><img src="docs/images/hero-dark.webp" alt="Lumora ana sayfa, ışık açık" /></td>
  </tr>
</table>

</div>

---

## Fikir

Aydınlatma satan bir sitede en iyi satış argümanı lambanın **yanmış hâlini** göstermektir.
Lumora bunu bir anahtara çevirir: sağ üstteki ampul butonuna basınca sayfa kararır,
arka plana sıcak ortam ışığı yayılır ve katalogdaki **bütün lambalar aynı anda,
900 ms'lik bir crossfade ile yanar**.

Her ürün için aynı açıdan çekilmiş iki fotoğraf (kapalı + açık) bulunur; geçişi
yalnızca CSS yapar. JavaScript sadece anahtarın durumunu `<html data-light>` üzerine yazar,
tercih `localStorage`'da hatırlanır ve sayfa boyanmadan önce uygulanır (yanıp sönme yok).

<table>
  <tr>
    <th align="center">Işık kapalı</th>
    <th align="center">Işık açık</th>
  </tr>
  <tr>
    <td><img src="docs/images/lamps-off.webp" alt="Altı lamba, ışık kapalı" /></td>
    <td><img src="docs/images/lamps-on.webp" alt="Aynı altı lamba, ışık açık" /></td>
  </tr>
</table>

## Ekran görüntüleri

### Koleksiyon

<table>
  <tr>
    <td><img src="docs/images/collection-light.webp" alt="Koleksiyon, ışık kapalı" /></td>
    <td><img src="docs/images/collection-dark.webp" alt="Koleksiyon, ışık açık" /></td>
  </tr>
</table>

Kategori filtresi, S / M / L görünüm yoğunluğu ve her kartta hızlı "sepete ekle" butonu.
Filtre istemci tarafındadır ama bütün ürünler HTML'de durur, bu yüzden SEO'dan bir şey kaybolmaz.

### Ürün detayı

<table>
  <tr>
    <td><img src="docs/images/product-light.webp" alt="Ürün sayfası, ışık kapalı" /></td>
    <td><img src="docs/images/product-dark.webp" alt="Ürün sayfası, ışık açık" /></td>
  </tr>
</table>

Teknik tablo (ölçü, ampul, lümen, renk sıcaklığı), `Product` + `Offer` şeması, benzer ürünler.

### Sepet

<table>
  <tr>
    <td><img src="docs/images/cart-light.webp" alt="Sepet, ışık kapalı" /></td>
    <td><img src="docs/images/cart-dark.webp" alt="Sepet, ışık açık" /></td>
  </tr>
</table>

Sepet tarayıcıda tutulur, ödeme yoktur: sepet bir **teklif talebine** dönüşür
(iletişim formunu sepetle doldurur ya da özeti Telegram/WhatsApp'a taşır).

### Mobil

<div align="center">
  <img src="docs/images/mobile.webp" alt="Mobil görünüm, ışık kapalı ve açık" width="640" />
</div>

### Üç dil

<table>
  <tr><th align="center">Işık kapalı</th></tr>
  <tr><td><img src="docs/images/languages-light.webp" alt="Ana sayfa: İngilizce, Türkçe, Rusça" /></td></tr>
  <tr><th align="center">Işık açık</th></tr>
  <tr><td><img src="docs/images/languages-dark.webp" alt="Ana sayfa: İngilizce, Türkçe, Rusça (ışık açık)" /></td></tr>
</table>

---

## Özellikler

- **Işık anahtarı**: tüm sayfa ve katalog tek anahtarla değişir, tercih hatırlanır, `prefers-reduced-motion` saygı görür.
- **Üç dil (EN varsayılan, TR, RU)**: yerelleştirilmiş URL'ler, `hreflang`, her sayfada aynı sayfanın diğer dildeki karşılığına giden dil menüsü.
- **Yüzen navbar**: cam efektli hap şeklinde bar, ampul butonu, dil menüsü, sepet rozeti ve CTA.
- **Sepet**: `localStorage`, adet kontrolü, tahmini toplam, teklif formu / sohbet entegrasyonu.
- **Teklif formu**: Firestore'a kayıt + e-posta bildirimi, honeypot ile spam koruması.
- **SEO ve yapay zekâ görünürlüğü**: JSON-LD (`LightingStore`, `Product`, `FAQPage`, `BreadcrumbList`, `ItemList`), `llms.txt`, AI botlarına açık `robots.txt`, sitemap, OpenGraph / Twitter kartları.
- **Performans**: görseller `astro:assets` ile AVIF/WebP + `srcset` olarak üretilir, sayfa başına çok az JavaScript.
- **Erişilebilirlik**: skip link, `aria-*`, klavye ile kullanılabilir sepet, odak yönetimi.
- **Şablon mantığı**: yeni müşteri için üç yere dokunmak yeterli (aşağıda).

## Teknoloji

| | |
|---|---|
| Çatı | [Astro 5](https://astro.build) (tamamen statik çıktı) |
| Stil | [Tailwind CSS 4](https://tailwindcss.com), özel CSS değişkenleriyle ışık/karanlık durumu |
| Dil | TypeScript (`astro check` ile denetim) |
| İçerik | Astro Content Collections (Markdown + Zod şeması) |
| Görseller | `astro:assets` + `sharp` |
| Barındırma | Firebase Hosting |
| Form deposu | Firestore (REST, SDK yok) + FormSubmit.co e-posta |

## Hızlı başlangıç

```bash
npm install
npm run dev       # geliştirme sunucusu  → http://localhost:4321
npm run build     # dist/ üret
npm run preview   # üretim çıktısını yerelde aç
npm run check     # astro check (tipler + .astro dosyaları)
```

Sayfalar: İngilizce kökte, Türkçe `/tr/`, Rusça `/ru/` altında.

## Proje yapısı

```
site.config.ts            firma bilgileri, para birimi, Firebase, ticaret modu
src/
  assets/products/        32 görsel: <slug>-off.webp / <slug>-on.webp
  content/products/       16 ürün (.md), metin alanları {en, tr, ru}
  content.config.ts       ürün şeması (eksik alan varsa build hata verir)
  i18n/                   config.ts (diller, URL segmentleri), ui.ts (arayüz metinleri)
  layouts/Layout.astro    <html>, SEO, header/footer, sepet çalışma zamanı
  components/             Header, Footer, ProductCard, LightToggle, CartRuntime, Seo, JsonLd
  sections/               sayfaların asıl içeriği (Home, ProductDetail, Cart, Contact...)
  pages/                  en (kök) · tr/ · ru/ · llms.txt · robots.txt · 404
  lib/                    categories, faq, price, schema, images, cartData
  scripts/cart.ts         sepet mantığı (localStorage)
  styles/global.css       tema değişkenleri, lamba crossfade'i
docs/images/              README görselleri
firebase.json             hosting başlıkları, önbellek, trailingSlash
firestore.rules           form kayıt kuralları
```

Her dilin sayfa dosyası (`src/pages/tr/...`) yalnızca `lang` prop'unu geçen ince bir kabuktur;
gerçek içerik `src/sections/` altında **tek yerde** durur.

---

## Yeni bir müşteriye site yapmak

Sadece üç yere dokunulur:

**1. `site.config.ts`**: firma adı, adres, telefon, WhatsApp/Telegram, sosyal medya, para birimi,
Firebase projesi. Adres ve telefon Google Business Profile'daki ile **birebir aynı** yazılmalı
(yerel SEO'da NAP tutarlılığı sıralamayı doğrudan etkiler). Teslim ederken `isDemo: false` yapın;
footer'daki demo künyesi kalkar ve gerçek adresle `LocalBusiness` şeması yayımlanmaya başlar.

**2. `src/content/products/*.md`**: her ürün bir dosya. Dile bağlı metin alanları `{ en, tr, ru }`
olarak, dilden bağımsızlar (fiyat, SKU, ölçü) tek satırda yazılır:

```yaml
---
title: { en: "Alabaster Disc Pendant", tr: "Alabaster Disk Sarkıt", ru: "Подвес Alabaster Disk" }
sku: "LMR-PND-009"
price: 5400
priceFrom: true
category: "sarkit"
material:
  en: ["Natural alabaster stone", "Brushed brass"]
  tr: ["Doğal alabaster taşı", "Fırçalanmış pirinç"]
  ru: ["Натуральный алебастровый камень", "Матовая латунь"]
dimensions: { w: 60, h: 14 }
lumens: 1800
kelvin: 2700
images:
  off: "alabaster-sarkit-off.webp"
  on: "alabaster-sarkit-on.webp"
  alt: { en: "...", tr: "...", ru: "..." }
description: { en: "...", tr: "...", ru: "..." }
featured: true
order: 9
---
```

**3. `src/assets/products/`**: her ürün için **ışık kapalı + ışık açık** iki fotoğraf.

`src/content/products/` ve `src/assets/products/` boşaltılıp yenisi konduğunda site tamamen o müşterinin sitesi olur.

### Ürün görselleri nasıl üretilir

Crossfade'in kalitesi, iki karenin **birbirine piksel piksel oturmasına** bağlıdır.

1. Önce **kapalı** kareyi üret (4:5 dikey, 1200 × 1500 px).
2. İkinci kareyi ayrı üretme: kapalı görseli yükleyip **ışığı değiştirmesini iste**. Ayrı üretimlerde lamba kayar ve geçiş titrer.
3. `<slug>-off` ve `<slug>-on` adıyla WebP olarak kaydet. Dosya adı yanlışsa build hangi dosyanın eksik olduğunu söyler.

```bash
cwebp -q 85 gorsel.png -o src/assets/products/cosmos-avize-off.webp   # ~1,7 MB PNG → ~80 KB
```

<details>
<summary>Prompt şablonları (ChatGPT / Gemini)</summary>

**Adım 1: kapalı kare** (`[SUBJECT]` yerine ürünü yaz)

```text
Professional interior product photograph of [SUBJECT], switched off.

Setting: a plain, softly textured plaster wall in warm off-white (#EDEAE4),
no furniture, no props, no decoration.
Lighting: soft, even, diffused daylight from a large window to the left.
Gentle natural shadow. No lamp light — the fixture is completely unlit.
Camera: straight-on eye-level view, 50mm lens, no perspective distortion,
fixture centred in frame with generous empty wall around it.
Style: calm, editorial, high-end lighting catalogue. Muted natural colour,
true-to-material texture, no colour grading, no vignette.
Vertical 4:5 aspect ratio, 1200x1500px.

Avoid: people, furniture, plants, text, watermark, logo, glowing light,
lens flare, dramatic shadows, wide angle, tilted camera, busy background.
```

Örnek `[SUBJECT]`: *a handmade chandelier with three hand-blown Murano glass spheres in swirled
multicolour patterns, held at different heights on curved forged-brass arms, 86cm wide*

**Adım 2: açık kare** (kapalı görseli yükleyip yaz)

```text
Take this exact image and change ONLY the lighting.

Keep identical: camera angle, crop, framing, the fixture's position, size,
shape, material and every proportion. Do not redraw or move the fixture.

Change: the lamp is now switched ON. Bulbs and glass glow warm amber (2700K).
A soft pool of warm light spills onto the wall around and below the fixture.
The rest of the room has gone dark — the wall is now a deep warm brown-black
(#221D18) where the light does not reach. Glass becomes translucent and lit
from within. Metal catches warm highlights on its edges.

Same 4:5 vertical framing, 1200x1500px. Photorealistic, no added objects.
```

</details>

---

## Diller (i18n)

İngilizce varsayılan dildir ve önek almaz; diğer diller kendi önekiyle gelir ve **URL kelimeleri de çevrilir**.
Ürün slug'ı (`cosmos-avize`) ve kategori anahtarı (`avize`) üç dilde aynıdır, bu yüzden dil menüsü
her zaman aynı ürüne/kategoriye gider.

| Sayfa | İngilizce | Türkçe | Rusça |
|---|---|---|---|
| Ana sayfa | `/` | `/tr/` | `/ru/` |
| Koleksiyon | `/products/` | `/tr/urunler/` | `/ru/produkty/` |
| Kategori | `/products/category/<key>/` | `/tr/urunler/kategori/<key>/` | `/ru/produkty/kategoriya/<key>/` |
| Ürün | `/products/<urun>/` | `/tr/urunler/<urun>/` | `/ru/produkty/<urun>/` |
| Atölye | `/about/` | `/tr/hakkimizda/` | `/ru/o-nas/` |
| SSS | `/faq/` | `/tr/sss/` | `/ru/chasto-zadavaemye-voprosy/` |
| İletişim | `/contact/` | `/tr/iletisim/` | `/ru/kontakty/` |
| Sepet | `/cart/` | `/tr/sepet/` | `/ru/korzina/` |

- **`src/i18n/config.ts`**: dil listesi, varsayılan dil, URL segmentleri.
- **`src/i18n/ui.ts`**: tüm arayüz metinleri. `en` bloğu referans şemadır; `tr` ve `ru` blokları
  `satisfies typeof en` ile denetlenir, **bir anahtar eksikse `npm run check` kırılır**.
- **`src/lib/categories.ts`, `src/lib/faq.ts`**: kategori ve SSS metinleri, aynı desenle.

Yeni dil eklemek: `config.ts` içine kodu ve URL segmentlerini ekle, `ui.ts` / `categories.ts` / `faq.ts`
içine yeni blok yaz, ürün `.md` dosyalarındaki `{en,tr,ru}` alanlarına dili ekle, `src/pages/<dil>/`
kabuk sayfalarını oluştur (`src/pages/tr/` örnek alınabilir).

## Sepet

`site.config.ts` → `commerceMode: "shop"` iken kartlarda "+" butonu, ürün sayfasında **Sepete ekle**,
header'da sayaçlı sepet ikonu ve sepet sayfası açılır. `"catalog"` yapınca hepsi kaybolur.

- Sepet `localStorage`'da `{id, adet}` olarak tutulur (`src/scripts/cart.ts`). Başlık, fiyat ve görsel
  her sayfada o dilin kataloğundan çözülür (`src/lib/cartData.ts`), yani dil değiştirince sepet de çevrilir.
- **Ödeme yoktur.** "Teklif isteyin" iletişim formunu sepet içeriğiyle doldurur; "Telegram ile gönder" aynı
  özeti sohbete taşır. Fiyatların çoğu "başlayan" fiyat olduğu için sepette bunu belirten bir not bulunur.
- Form gönderilince teşekkür sayfasında sepet boşalır.

## İletişim / teklif formu

Statik hostta sunucu yok; form tarayıcıdan iki yere birden gider:

1. **Firestore** → `contactRequests` koleksiyonu (Firebase konsolundan okunur). `firestore.rules` yalnızca
   alan ve uzunluk denetimli *oluşturmaya* izin verir; okuma, güncelleme ve silme kapalıdır.
2. **E-posta** → FormSubmit.co üzerinden `site.config.ts → email` adresine. İlk kullanımda FormSubmit o adrese
   bir "Activate Form" e-postası yollar, linke bir kez tıklamak yeterlidir. Aktivasyondan önce e-posta kanalı
   başarısız olur ama Firestore kaydı yine alınır.

İki kanaldan biri başarılıysa ziyaretçi teşekkür sayfasına gider.

## Firebase Hosting'e yayınlama

```bash
npm run build
firebase deploy --only hosting --project lumora-lighting-riga
# kurallar değiştiyse:
firebase deploy --only firestore --project lumora-lighting-riga
```

- Ayarlar: `firebase.json` (güvenlik başlıkları, `/_astro/*` için sonsuz önbellek, `trailingSlash`), `.firebaserc`, `firestore.rules`.
- **Yeni müşteri için**: yeni bir Firebase projesi aç, `site.config.ts` içindeki `firebase` alanını ve `.firebaserc`'yi güncelle,
  kendi alan adını Hosting → *Add custom domain* ile bağla. Sonra **`site.config.ts` → `url`** alanını gerçek alan adıyla
  değiştir; sitemap, canonical ve JSON-LD bu değeri kullanır.

## SEO'da neler hazır

| | Nerede |
|---|---|
| `LightingStore` / `LocalBusiness` şeması | her sayfada, `src/lib/schema.ts` |
| `Product` + `Offer` (fiyat, stok, ölçü) | ürün sayfaları |
| `FAQPage` | SSS sayfası |
| `BreadcrumbList`, `ItemList` | liste, kategori ve ürün sayfaları |
| `hreflang` + `og:locale` | her sayfanın `<head>`'i, `src/components/Seo.astro` |
| sitemap | otomatik, `noindex` sayfalar (sepet, teşekkür, 404) hariç |
| `robots.txt` | AI botlarına açık izin, `src/pages/robots.txt.ts` |
| **`llms.txt`** | ürün verisinden otomatik üretilir, `src/pages/llms.txt.ts` |
| Görseller | AVIF/WebP + `srcset`, `astro:assets` |

Kategori sayfaları SEO'nun en verimli parçasıdır: "chandeliers", "wall sconces", "kitchen pendant" gibi aramalar
ana sayfaya değil bunlara düşer. Her kategorinin `src/lib/categories.ts` içinde **kendine ait** başlığı, açıklaması
ve giriş metni vardır; aynı metni tekrarlayan kategori sayfaları Google'da "thin content" sayılır.

**SSS iki seviyelidir** (`src/lib/faq.ts`): `short` ana sayfada kısa özet, `a` SSS sayfasında tam cevap;
`FAQPage` şeması ve `llms.txt` `a`'yı kullanır. Şema yalnızca SSS sayfasındadır.

## Para birimi ve fiyat biçimi

```ts
// site.config.ts
currency: "USD",      // JSON-LD Offer ve llms.txt bunu kullanır
priceLocale: "en-US", // $8,000  (tr-TR olsaydı: 8.000,00 $)
```

Ürün dosyalarındaki `price` her zaman **sayıdır** (`price: 8000`); biçimlendirmeyi `src/lib/price.ts` yapar.
"Başlayan" ifadesi dile göre çevrilir ("From $8,000", "$8,000'den başlayan", "От $8,000").

## Demo künyesi

`isDemo: true` iken footer'da ve iletişim sayfasında "bu siteyi kim yaptı" bloğu görünür ve `llms.txt`'e bir not düşer.
Demo modunda sahte posta adresi ve koordinat **yayımlanmaz**; uydurma işletme verisi Google'da spam işareti alır.
Gerçek adres girilip `isDemo: false` yapıldığında `LocalBusiness` şeması tam hâliyle üretilir.

## Font

Arayüz **Gilroy** ile tasarlandı. Gilroy ticari bir fonttur (Fontfabric) ve repoda yer almaz. Lisanslı `.woff2`
dosyalarını `public/fonts/` içine koyduğunuz anda site otomatik Gilroy'a geçer (dosya adları `public/fonts/README.md`'de).
O zamana kadar Google Fonts'tan **Outfit** yüklenir; Gilroy eklendikten sonra `src/layouts/Layout.astro` içindeki
Google Fonts satırlarını silin.

## Yol haritası

- Gerçek ödeme: `src/scripts/cart.ts` ve sepetteki "Teklif isteyin" butonu Stripe/Shopify ile değiştirilir.
  Ürün şeması (`sku`, `price`, `availability`) bunlarla eşleşecek şekilde tasarlandı; `src/content.config.ts`
  içindeki `loader` değiştirilir, sayfalar aynı kalır.
- Sunucu tarafı gerekirse (hesap, ödeme webhook'u) ilgili sayfalara `export const prerender = false` eklenip
  Cloud Run / Cloud Functions için Astro adapter'ı bağlanır; katalog sayfaları statik kalır.
- Form spam'i artarsa Firebase App Check.

---

<div align="center">

Tasarım ve geliştirme: **Gurbanov Dadebay**, Flutter & Web Developer, Riga, Latvia

[E-posta](mailto:dadebaygurbanow333@gmail.com) · [Telegram](https://t.me/Gurbanov_D) · [LinkedIn](https://www.linkedin.com/in/gurbanovv) · [GitHub](https://github.com/Dadebay)

</div>
