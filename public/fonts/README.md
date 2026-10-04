# Gilroy font dosyaları

Gilroy **ticari bir fonttur** (Fontfabric) ve repoda yer almaz. Web lisansını satın aldıktan sonra
`.woff2` dosyalarını buraya, şu isimlerle koyun:

    Gilroy-Light.woff2       (300)
    Gilroy-Regular.woff2     (400)
    Gilroy-Medium.woff2      (500)
    Gilroy-SemiBold.woff2    (600)
    Gilroy-Bold.woff2        (700)
    Gilroy-ExtraBold.woff2   (800)

## Etkinleştirme

Dosyalar yokken `@font-face` tanımlamak tarayıcıda 404 hatalarına yol açtığı için
`src/styles/global.css` içinde bu bloklar **bilerek yok**. Dosyaları koyduktan sonra aşağıdakini
`global.css` içindeki `@theme { ... }` bloğundan **önce** yapıştırın (font yığını zaten
`Gilroy → Outfit → sistem` olarak hazır):

```css
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-Light.woff2") format("woff2");     font-weight: 300; font-style: normal; font-display: swap; }
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-Regular.woff2") format("woff2");   font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-Medium.woff2") format("woff2");    font-weight: 500; font-style: normal; font-display: swap; }
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-SemiBold.woff2") format("woff2");  font-weight: 600; font-style: normal; font-display: swap; }
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-Bold.woff2") format("woff2");      font-weight: 700; font-style: normal; font-display: swap; }
@font-face { font-family: "Gilroy"; src: url("/fonts/Gilroy-ExtraBold.woff2") format("woff2"); font-weight: 800; font-style: normal; font-display: swap; }
```

Sonra `src/layouts/Layout.astro` içindeki Google Fonts `<link>` satırlarını silin: bir DNS araması ve
render-blocking bir istek kalkar, LCP düşer.

## Dosyalar gelene kadar

Yedek olarak Google Fonts'tan **Outfit** yüklenir, Gilroy'a en yakın ücretsiz geometrik sans.

## Elinizde .otf / .ttf varsa

woff2'ye çevirmek gerekir (web'de ~%40 daha küçük):

    npx woff2-cli Gilroy-Regular.otf
