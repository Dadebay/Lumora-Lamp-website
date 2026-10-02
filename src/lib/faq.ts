import type { Locale } from "../i18n/config.ts";

/**
 * AI SEO'nun kalbi: ChatGPT/Perplexity/Gemini tam olarak bu formattaki
 * net soru-cevap bloklarını alıntılar. Cevaplar sayısal ve kendi başına
 * anlaşılır olmalı — bağlam gerektiren cevaplar alıntılanmaz.
 *
 * `short` → ana sayfadaki özet (tek satır, okunması 2 saniye)
 * `a`     → /sss sayfasındaki tam cevap; llms.txt ve FAQPage şeması bunu kullanır
 */
export const faq: Record<Locale, { q: string; short: string; a: string }[]> = {
  en: [
    {
      q: "How many watts of chandelier do I need for a living room?",
      short: "Room area (m²) × 20 lumens. A 25 m² living room ≈ 2,000–2,500 lumens, 25–30W in LED.",
      a: "General rule: room area in m² × 20 lumens. For a 25 m² living room, that's roughly 500 lumens of base lighting, with 2,000–2,500 lumens total recommended. In LED that's about 25–30W.",
    },
    {
      q: "How far below the ceiling should a chandelier hang?",
      short: "75–85 cm above a dining table; at least 210 cm from the floor in walkways.",
      a: "Over a dining table, it should hang 75–85 cm above the tabletop. In walkways, the fixture's lowest point should stay at least 210 cm above the floor.",
    },
    {
      q: "Which color temperature should I choose?",
      short: "Living room & bedroom 2700K, kitchen & bathroom 3000–3500K, workspace 4000K.",
      a: "2700K (warm white) for living rooms and bedrooms, 3000–3500K for kitchen counters and bathrooms, and 4000K for workspaces. Don't mix different color temperatures in the same room.",
    },
    {
      q: "How long does production and delivery take?",
      short: "In-stock items ship in 3–5 business days; made-to-order pieces take 3–4 weeks.",
      a: "In-stock models ship within 3–5 business days. Made-to-order handmade pieces take 3–4 weeks. Installation is scheduled the same week.",
    },
    {
      q: "Do you make custom, made-to-measure pieces?",
      short: "Yes — length, arm span, glass color and metal finish are all made to order.",
      a: "Yes. Chain/rod length, arm span, glass color and metal finish are all adjusted per order. Technical drawings and samples are provided for architectural projects.",
    },
    {
      q: "Do the fixtures work with a dimmer?",
      short: "LED models are TRIAC dimmer compatible; bulb models just need a dimmable bulb.",
      a: "Our LED models are TRIAC dimmer compatible. For bulb-based models, using a dimmable bulb is enough.",
    },
    {
      q: "What's the warranty period?",
      short: "2 years on the metal body and electrical components; hand-blown glass isn't covered for breakage.",
      a: "The metal body and electrical components carry a 2-year manufacturer warranty. Hand-blown glass parts aren't covered against breakage, but can be produced separately as spare parts.",
    },
    {
      q: "Do you ship internationally?",
      short: "Yes — in a double-layer wooden crate, insured. A freight quote is given in writing before ordering.",
      a: "Yes. Glass fixtures are shipped insured in a double-layer wooden crate. Customs and freight quotes are shared in writing before you order.",
    },
  ],
  tr: [
    {
      q: "Salon için kaç watt avize gerekir?",
      short: "Oda metrekaresi × 20 lümen. 25 m² salon ≈ 2.000–2.500 lümen, LED'de 25–30W.",
      a: "Genel kural: oda alanının metrekaresi × 20 lümen. 25 m² bir salon için yaklaşık 500 lümen temel aydınlatma, toplamda 2.000–2.500 lümen önerilir. LED'de bu 25–30W'a denk gelir.",
    },
    {
      q: "Avize tavandan ne kadar aşağıda olmalı?",
      short: "Yemek masasından 75–85 cm yukarıda; geçiş alanlarında zeminden en az 210 cm.",
      a: "Yemek masası üzerinde masa yüzeyinden 75–85 cm yukarıda olmalıdır. Geçiş alanlarında armatürün en alt noktası zeminden en az 210 cm yukarıda kalmalıdır.",
    },
    {
      q: "Hangi renk sıcaklığı seçilmeli?",
      short: "Salon ve yatak odası 2700K, mutfak ve banyo 3000–3500K, çalışma alanı 4000K.",
      a: "Salon ve yatak odası için 2700K (sıcak beyaz), mutfak tezgâhı ve banyo için 3000–3500K, çalışma alanı için 4000K önerilir. Bir mekânda farklı renk sıcaklıklarını karıştırmayın.",
    },
    {
      q: "Üretim ve teslim süresi ne kadar?",
      short: "Stoktakiler 3–5 iş günü, ölçüye özel üretim 3–4 hafta.",
      a: "Stoktaki modeller 3–5 iş günü içinde kargolanır. Ölçüye özel el yapımı üretim 3–4 hafta sürer. Montaj aynı hafta planlanır.",
    },
    {
      q: "Ölçüye özel üretim yapıyor musunuz?",
      short: "Evet — boy, kol açıklığı, cam rengi ve metal kaplaması siparişe göre değişir.",
      a: "Evet. Zincir/çubuk boyu, kol açıklığı, cam rengi ve metal kaplaması siparişe göre değiştirilir. Mimari projeler için teknik çizim ve numune sağlanır.",
    },
    {
      q: "Armatürler dimmer ile çalışır mı?",
      short: "LED modeller TRIAC dimmer uyumlu; ampullülerde dimlenebilir ampul yeterli.",
      a: "LED modellerimiz TRIAC dimmer uyumludur. Ampullü modellerde dimlenebilir ampul kullanılması yeterlidir.",
    },
    {
      q: "Garanti süresi nedir?",
      short: "Metal gövde ve elektrik aksamında 2 yıl; el üflemeli cam kırılma garantisi dışında.",
      a: "Metal gövde ve elektrik aksamında 2 yıl üretici garantisi vardır. El üflemeli cam parçalar kırılmaya karşı garanti kapsamı dışındadır, ancak yedek parça olarak ayrıca üretilebilir.",
    },
    {
      q: "Yurt dışına gönderim yapıyor musunuz?",
      short: "Evet — çift katmanlı ahşap sandıkta, sigortalı. Navlun teklifi siparişten önce yazılı verilir.",
      a: "Evet. Cam armatürler çift katmanlı ahşap sandıkta, sigortalı olarak gönderilir. Gümrük ve navlun teklifi siparişten önce yazılı olarak paylaşılır.",
    },
  ],
  ru: [
    {
      q: "Сколько ватт нужно для люстры в гостиной?",
      short: "Площадь комнаты (м²) × 20 люмен. Гостиная 25 м² ≈ 2000–2500 люмен, в LED — 25–30 Вт.",
      a: "Общее правило: площадь комнаты в м² × 20 люмен. Для гостиной 25 м² это около 500 люмен базового освещения, всего рекомендуется 2000–2500 люмен. В LED это примерно 25–30 Вт.",
    },
    {
      q: "На каком расстоянии от потолка должна висеть люстра?",
      short: "75–85 см над обеденным столом; в проходных зонах — минимум 210 см от пола.",
      a: "Над обеденным столом люстра должна висеть на 75–85 см выше столешницы. В проходных зонах нижняя точка светильника должна оставаться минимум 210 см от пола.",
    },
    {
      q: "Какую цветовую температуру выбрать?",
      short: "Гостиная и спальня — 2700K, кухня и ванная — 3000–3500K, рабочая зона — 4000K.",
      a: "Для гостиной и спальни рекомендуется 2700K (тёплый белый), для кухонной столешницы и ванной — 3000–3500K, для рабочей зоны — 4000K. Не смешивайте разные цветовые температуры в одном помещении.",
    },
    {
      q: "Сколько занимает производство и доставка?",
      short: "Товары в наличии отправляются за 3–5 рабочих дней, изготовление на заказ — 3–4 недели.",
      a: "Модели в наличии отправляются в течение 3–5 рабочих дней. Изготовление вручную на заказ занимает 3–4 недели. Монтаж планируется на ту же неделю.",
    },
    {
      q: "Вы делаете изделия по индивидуальным размерам?",
      short: "Да — длина, размах рычагов, цвет стекла и металлическое покрытие меняются под заказ.",
      a: "Да. Длина цепи/стержня, размах рычагов, цвет стекла и металлическое покрытие изменяются под заказ. Для архитектурных проектов предоставляются технические чертежи и образцы.",
    },
    {
      q: "Светильники работают с диммером?",
      short: "LED-модели совместимы с TRIAC-диммером; для ламповых достаточно диммируемой лампы.",
      a: "Наши LED-модели совместимы с TRIAC-диммером. Для ламповых моделей достаточно использовать диммируемую лампу.",
    },
    {
      q: "Какой срок гарантии?",
      short: "2 года на металлический корпус и электрику; ручное стекло не покрывается на случай боя.",
      a: "На металлический корпус и электрические компоненты действует гарантия производителя 2 года. Детали из ручного стекла не покрываются гарантией на случай боя, но могут быть изготовлены отдельно как запасные части.",
    },
    {
      q: "Осуществляете доставку за границу?",
      short: "Да — в двойном деревянном ящике, застрахованно. Стоимость доставки сообщается письменно до заказа.",
      a: "Да. Стеклянные светильники отправляются застрахованными в двойном деревянном ящике. Стоимость таможни и доставки сообщается в письменном виде до оформления заказа.",
    },
  ],
};
