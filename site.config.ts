/**
 * MÜŞTERİ BAŞINA DEĞİŞTİRİLECEK TEK DOSYA.
 * Yeni bir lamba firmasına site yaparken bu dosyayı + src/content/products/
 * klasörünü ve src/assets/products/ görsellerini değiştirmek yeterli.
 */

export const site = {
  // --- Vitrin markası (örnek/demo marka; müşteri için burası değişir) ---
  name: "Lumora",
  legalName: "Lumora Lighting",
  tagline: "Handcrafted lighting",
  description:
    "Hand-blown Murano glass and forged brass chandeliers, sconces and pendants. Made to order, installed on site.",
  url: "https://lumora-lighting-riga.web.app",
  locale: "tr-TR",

  // --- Teklif/iletişim formu ---
  // Mesajlar Firestore'a (contactRequests) yazılır ve aynı anda `email` adresine
  // FormSubmit.co üzerinden iletilir. Bu değerler herkese açıktır (güvenlik
  // firestore.rules ile sağlanır).
  firebase: {
    projectId: "lumora-lighting-riga",
    apiKey: "AIzaSyDRl1KApES11s3keIMCgS1O7arUDyTkIWI",
  },

  // --- Fiyatlandırma ---
  currency: "USD",
  priceLocale: "en-US", // $8,000 biçimi (tr-TR olsaydı "8.000,00 $" olurdu)

  // --- İletişim: demo sitede talepler doğrudan bana gelsin ---
  // TODO: telefon/WhatsApp numaranı buraya yaz. Boş bırakılırsa site
  // otomatik olarak Telegram'a düşer, hiçbir yer kırılmaz.
  phone: "",
  whatsapp: "", // ülke kodu + numara, + ve boşluk olmadan. Örn: "37120000000"
  telegram: "https://t.me/Gurbanov_D",
  email: "dadebaygurbanow333@gmail.com",

  // --- Konum (yerel SEO) ---
  // Müşteriye teslim ederken burası ONUN Google Business Profile adresiyle
  // BİREBİR aynı olmalı — NAP tutarlılığı yerel sıralamayı doğrudan etkiler.
  address: {
    street: "",
    district: "",
    city: "Riga",
    region: "Riga",
    postalCode: "",
    country: "LV",
  },
  geo: { lat: 56.9496, lng: 24.1052 },
  openingHours: ["Mo-Fr 09:00-19:00", "Sa 10:00-17:00"],
  priceRange: "$$$",

  social: {
    instagram: "",
    pinterest: "",
    facebook: "",
  },

  /**
   * Siteyi kimin yaptığı. Footer'da görünür — demo siteyi lamba firmalarına
   * gönderdiğinde seni bulabilmeleri için asıl satış kanalı burası.
   */
  builtBy: {
    name: "Gurbanov Dadebay",
    role: "Flutter & Web Developer",
    location: "Riga, Latvia",
    email: "dadebaygurbanow333@gmail.com",
    telegram: "https://t.me/Gurbanov_D",
    linkedin: "https://www.linkedin.com/in/gurbanovv",
    github: "https://github.com/Dadebay",
    googlePlay: "https://play.google.com/store/apps/developer?id=Gurbanow",
  },

  /**
   * true → footer'da "bu bir demo" şeridi görünür ve sahte işletme şeması
   * (adres/koordinat) yayımlanmaz. Gerçek müşteriye teslim ederken false yap.
   */
  isDemo: true,

  // "catalog" → fiyat gösterilir, sepet yok, CTA = teklif iste (BAŞLANGIÇ)
  // "shop"    → sepet açık (ürün sayfası + header). Ödeme yok: sepet, teklif
  //             talebine / sohbete dönüşür. Gerçek ödeme için Stripe/Shopify bağlanır.
  commerceMode: "shop" as "catalog" | "shop",
};

export type Site = typeof site;

/** WhatsApp yoksa Telegram'a düş — tek doğru kaynak. */
export const primaryChat = site.whatsapp
  ? { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` }
  : { label: "Telegram", href: site.telegram };
