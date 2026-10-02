# Lamba Sitesi Şablonu

Astro + Tailwind ile, Firebase Hosting'e deploy edilmek üzere hazırlanmış aydınlatma
katalog sitesi. Tüm sitede geçerli bir **ışık aç/kapa anahtarı** var: anahtar
açıldığında sayfa kararıyor ve bütün lambalar 900 ms'lik bir crossfade ile yanıyor.

## Komutlar

```bash
npm run dev      # geliştirme sunucusu
npm run build    # dist/ üret
npm run preview  # üretim çıktısını yerelde aç
```

## Yeni bir müşteriye site yapmak

Sadece üç yere dokunulur, koda hiç girilmez:

1. **`site.config.ts`** — firma adı, adres, telefon, WhatsApp, sosyal medya, para birimi.
   Adres ve telefon Google Business Profile'daki ile **birebir aynı** yazılmalı
   (yerel SEO'da NAP tutarlılığı sıralamayı doğrudan etkiler).
   Teslim ederken `isDemo: false` yapın — footer'daki demo künyesi kalkar ve
   gerçek adresle `LocalBusiness` şeması yayımlanmaya başlar.
2. **`src/content/products/*.md`** — her ürün bir dosya. Metin alanları
   (`title`, `material`, `color`, `bulb`, `images.alt`, `description`) üç dilde
   birden yazılır: `{ en: "...", tr: "...", ru: "..." }`. Fiyat, SKU, kategori,
   ölçü gibi dilden bağımsız alanlar tek satırda kalır. Şema `src/content.config.ts`
   içinde; eksik/yanlış alan varsa build hata verir.
3. **`src/assets/products/`** — her ürün için **ışık kapalı + ışık açık** iki fotoğraf.
   Aynı açı, aynı kadraj, tripod. Fade efektinin tamamı bu ikiliye dayanıyor.
   Geçici görselleri yeniden üretmek için: `node scripts/placeholders.mjs`

`src/content/products/` ve `src/assets/products/` boşaltılıp yenisi konduğunda
site tamamen o müşterinin sitesi olur.

## Diller (i18n)

Site üç dilde yayınlanır: **İngilizce (varsayılan, önek yok)**, **Türkçe (`/tr/`)**
ve **Rusça (`/ru/`)**. Yeni bir dil eklemek için tek kaynak `src/i18n/`:

- **`src/i18n/config.ts`** — dil listesi (`locales`), varsayılan dil, ve her dilde
  URL segmentlerinin çevirisi (`/urunler/` ↔ `/products/` ↔ `/produkty/`).
- **`src/i18n/ui.ts`** — tüm arayüz metinleri (menü, buton, form etiketi, sayfa
  başlıkları...). `en` bloğu referans şema olarak kullanılır; `tr`/`ru` blokları
  `satisfies typeof en` ile denetlenir — bir anahtar eksik kalırsa `astro check`
  build'i kırar.
- **`src/lib/categories.ts`**, **`src/lib/faq.ts`** — kategori ve SSS metinleri,
  aynı `Record<Locale, ...>` deseniyle.

Yeni dil eklerken: `config.ts` → `locales` dizisine kod ekle + `routes` içine
URL segmentlerini yaz, `ui.ts`/`categories.ts`/`faq.ts` içine dördüncü bir dil
bloğu yaz, ürün `.md` dosyalarındaki `{en,tr,ru}` alanlarına yeni dili ekle,
son olarak `src/pages/` altına o dil için sayfa dosyalarını oluştur (`src/pages/tr/`
klasörünü örnek al). Sayfaların gerçek içeriği `src/sections/*.astro` içinde tek
yerde durur — her dilin sayfa dosyası sadece `lang` prop'unu geçen ince bir
kabuktur, mantığı tekrar yazmaya gerek yoktur.

## Firebase Hosting'e deploy

Canlı adres: https://lumora-lighting-riga.web.app (proje: `lumora-lighting-riga`).

```bash
npm run build
firebase deploy --only hosting --project lumora-lighting-riga
# kurallar değiştiyse: firebase deploy --only firestore --project lumora-lighting-riga
```

- Ayarlar: `firebase.json` (başlıklar, önbellek, `trailingSlash`), `.firebaserc`,
  `firestore.rules`. Site statik çıkar (`output: "static"`, adapter yok).
- Yeni müşteri için: yeni Firebase projesi aç, `site.config.ts` içindeki `firebase`
  alanını ve `.firebaserc`'yi güncelle, kendi domain'ini Hosting → Add custom
  domain ile bağla, sonra **`site.config.ts` → `url`** alanını gerçek alan adıyla
  değiştir — sitemap, canonical ve JSON-LD bu değeri kullanıyor.

### İletişim / teklif formu

Statik hostta sunucu yok, bu yüzden form tarayıcıdan iki yere birden gider:

1. **Firestore** → `contactRequests` koleksiyonu (Firebase konsolundan okunur).
   `firestore.rules` yalnızca alan/uzunluk denetimli *oluşturmaya* izin verir;
   okuma, güncelleme, silme kapalıdır.
2. **E-posta** → FormSubmit.co üzerinden `site.config.ts → email` adresine.
   İlk kullanımda FormSubmit o adrese bir "Activate Form" e-postası yollar,
   linke bir kez tıklamak yeterli. Aktivasyondan önce e-posta kanalı başarısız
   olur ama Firestore kaydı yine alınır.

İki kanaldan biri başarılıysa ziyaretçi teşekkür sayfasına gider.

## Sayfa yapısı

Her sayfa üç dilde vardır; İngilizce varsayılan dil olduğu için önek almaz,
Türkçe ve Rusça kendi önekiyle gelir. Ürün slug'ı (`cosmos-avize` gibi) ve
kategori anahtarı (`avize`, `sarkit`...) üç dilde de aynıdır — sadece görünen
metin değişir, bu yüzden dil değiştirici her zaman aynı ürün/kategoriye gider.

```
/                                 en — ana sayfa           /tr/            /ru/
/products/                        en — tüm ürünler (16)    /tr/urunler/    /ru/produkty/
/products/category/<key>/         en — kategori (6)        /tr/urunler/kategori/<key>/   /ru/produkty/kategoriya/<key>/
/products/<urun>/                 en — ürün detayı (16)    /tr/urunler/<urun>/            /ru/produkty/<urun>/
/about/                           en — atölye              /tr/hakkimizda/  /ru/o-nas/
/faq/                             en — sık sorulanlar      /tr/sss/         /ru/chasto-zadavaemye-voprosy/
/contact/                         en — teklif formu        /tr/iletisim/    /ru/kontakty/
/thank-you/  /404/                noindex                  /tr/tesekkurler/ /ru/spasibo/
/llms.txt  /robots.txt  /sitemap-index.xml   (tek, dilden bağımsız)
```

Kategori sayfaları SEO'nun en verimli parçası: "avize modelleri", "mutfak sarkıt",
"yatak başı aplik" gibi aramalar ana sayfaya değil bunlara düşer. Her kategorinin
`src/lib/categories.ts` içinde **kendine ait** başlığı, açıklaması ve giriş metni
vardır — aynı metni tekrarlayan kategori sayfaları Google'da "thin content" sayılır.

## SSS metni iki seviyeli

`src/lib/faq.ts` içinde her sorunun iki cevabı var:

- `short` → ana sayfadaki tek satırlık özet
- `a` → `/sss` sayfasındaki tam cevap; `FAQPage` şeması ve `llms.txt` bunu kullanır

Ana sayfada `FAQPage` şeması **yoktur** — görünen kısa metinle şemadaki uzun cevap
uyuşmazsa Google bunu içerik uyumsuzluğu sayar. Şema yalnızca `/sss`'tedir.

## SEO'da neler hazır

| | Nerede |
|---|---|
| `LocalBusiness` / `LightingStore` şeması | her sayfada, `src/lib/schema.ts` |
| `Product` + `Offer` (fiyat, stok, ölçü) | ürün sayfaları |
| `FAQPage` | ana sayfa + `/sss` |
| `BreadcrumbList` | liste ve ürün sayfaları |
| `ItemList` (liste sayfaları) | `/products` ve kategori sayfaları (üç dilde) |
| sitemap.xml | otomatik (3 dil × ~27 URL), noindex sayfalar hariç, `hreflang` alternate her sayfanın `<head>`'inde (`Seo.astro`) |
| robots.txt + AI botları açık izin | `src/pages/robots.txt.ts` |
| **llms.txt** | `src/pages/llms.txt.ts` — ürün verisinden otomatik üretilir |
| OpenGraph / Twitter kartları | `src/components/Seo.astro` |
| Görseller AVIF/WebP + srcset | `astro:assets`, `src/lib/images.ts` |

Sayfa başına JavaScript ~1 KB (yalnızca koleksiyon sayfasındaki filtre). Işık
anahtarı ve tema hatırlama HTML'e gömülü, ayrı bir istek yapmaz.

## Sepet

`site.config.ts` → `commerceMode: "shop"` iken ürün kartında "+" butonu, ürün
sayfasında **Sepete ekle**, header'da sayaçlı sepet ikonu ve `/cart/` (`/tr/sepet/`,
`/ru/korzina/`) sayfası açılır. `"catalog"` yapınca hepsi kaybolur.

- Sepet tarayıcıda (`localStorage`) tutulur, backend gerekmez; yalnızca `{id, adet}`
  saklanır, başlık/fiyat/görsel her sayfada o dilin kataloğundan çözülür
  (`src/lib/cartData.ts`). Mantık: `src/scripts/cart.ts`.
- **Ödeme yoktur.** Sepetteki "Teklif isteyin" butonu iletişim formunu sepet
  içeriğiyle doldurur, "Telegram/WhatsApp ile gönder" aynı özeti sohbete taşır.
  Form gönderilince teşekkür sayfasında sepet boşalır.

## Sonraki aşama: gerçek ödeme

Şablon bunun için hazırlandı:

- Stripe/Shopify bağlanırken `src/scripts/cart.ts` ve sepet sayfasının "Teklif isteyin" butonu değişir.
- `output: "static"` kalır; sepet/ödeme/hesap sayfalarına tek tek
  `export const prerender = false` eklenir ve ilgili Astro adapter'ı (Cloud Run /
  Cloud Functions) bağlanır — katalog sayfaları statik ve hızlı kalmaya devam eder.
- Ürün şeması (`sku`, `price`, `availability`) zaten Shopify/Stripe ile
  eşleşecek şekilde tasarlandı. `src/content.config.ts` içindeki `loader`
  değiştirilir, sayfalar ve bileşenler aynı kalır.

## Font

Arayüz **Gilroy** ile tasarlandı. Gilroy ticari bir fonttur (Fontfabric) ve
repoda yer almaz. Lisanslı `.woff2` dosyalarını `public/fonts/` içine koyduğunuz
anda site otomatik Gilroy'a geçer — dosya isimleri ve tam yönerge
`public/fonts/README.md` içinde.

Dosyalar gelene kadar Google Fonts'tan **Outfit** yükleniyor (Gilroy'a en yakın
ücretsiz geometrik sans). Gilroy eklendikten sonra `src/layouts/Layout.astro`
içindeki Google Fonts satırlarını silin.

## Para birimi ve fiyat biçimi

`site.config.ts` içinde iki alan:

```ts
currency: "USD",      // JSON-LD Offer ve llms.txt bunu kullanır
priceLocale: "en-US", // $8,000  (tr-TR olsaydı: 8.000,00 $)
```

Ürün dosyalarındaki `price` her zaman **sayı** olarak yazılır (`price: 8000`),
biçimlendirmeyi `src/lib/price.ts` yapar. Para birimini değiştirmek için
ürünlere değil, sadece bu iki alana dokunun.

## Demo künyesi

`isDemo: true` iken footer'da ve `/iletisim` sayfasında "bu siteyi kim yaptı"
bloğu görünür, `llms.txt`'e de bir not düşer. Siteyi lamba firmalarına örnek
olarak gönderirken seni bulabilecekleri yer burasıdır. Bilgiler
`site.config.ts` → `builtBy` altında.

Demo modunda sahte posta adresi ve koordinat **yayımlanmaz** — uydurma işletme
verisi Google'da spam işareti alır. Gerçek adres girilip `isDemo: false`
yapıldığında `LocalBusiness` şeması tam hâliyle üretilir.
