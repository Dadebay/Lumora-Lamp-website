# Gilroy font dosyaları

Gilroy **ticari bir fonttur** (Fontfabric). Web lisansını satın aldıktan sonra
`.woff2` dosyalarını buraya, tam olarak bu isimlerle koyun:

    Gilroy-Light.woff2       (300)
    Gilroy-Regular.woff2     (400)
    Gilroy-Medium.woff2      (500)
    Gilroy-SemiBold.woff2    (600)
    Gilroy-Bold.woff2        (700)
    Gilroy-ExtraBold.woff2   (800)

Dosyalar buraya konduğu anda site otomatik Gilroy'a geçer — kodda hiçbir
değişiklik gerekmez (`src/styles/global.css` içindeki `@font-face` blokları
bu yolları zaten işaret ediyor).

## Dosyalar gelene kadar

Yedek olarak Google Fonts'tan **Outfit** yükleniyor — Gilroy'a en yakın
ücretsiz geometrik sans. Gilroy'u koyduktan sonra `src/layouts/Layout.astro`
içindeki Google Fonts `<link>` satırlarını silin: hem bir DNS + istek tasarrufu
olur hem de LCP düşer.

## Elinizde .otf / .ttf varsa

woff2'ye çevirmek gerekir (web'de ~%40 daha küçük):

    npx woff2-cli Gilroy-Regular.otf
