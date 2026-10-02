import type { Locale } from "../i18n/config.ts";

/**
 * Kategori sayfaları SEO'nun en verimli parçası: "chandelier", "wall sconce",
 * "kitchen pendant" gibi aramalar ana sayfaya değil bu sayfalara düşer.
 * Her kategorinin kendi başlığı, açıklaması ve giriş metni var — aynı metni
 * tekrarlayan kategori sayfaları Google'da "thin content" sayılır.
 * Kategori anahtarları (avize, sarkit...) dil fark etmeksizin sabittir;
 * yalnızca görünen metinler dile göre değişir.
 */
export const categories: Record<Locale, Record<string, {
  label: string;
  title: string;
  description: string;
  intro: string;
}>> = {
  en: {
    avize: {
      label: "Chandeliers",
      title: "Chandeliers",
      description:
        "Hand-blown glass and forged brass chandeliers. Made to measure for living rooms, dining rooms and stairwells.",
      intro:
        "A chandelier sits at a room's highest point and sets the scale for the whole space. Over a dining table, hang it 75–85 cm above the tabletop; in walkways, keep the lowest point no lower than 210 cm from the floor.",
    },
    sarkit: {
      label: "Pendants",
      title: "Pendant Lighting",
      description:
        "Single and multi-drop pendants for kitchen islands, counters and consoles. Rod length made to order.",
      intro:
        "Pendants are used to light a specific surface. Over a kitchen island, space them 80–90 cm apart; keep them 70–80 cm above the counter surface.",
    },
    aplik: {
      label: "Sconces",
      title: "Wall Sconces",
      description:
        "Sconces for bedsides, hallways and mirrors. Up-down, single-direction and switched options available.",
      intro:
        "A sconce softens the harshness of ceiling light. At the bedside, 55–65 cm above the mattress surface works well; in hallways, 160–180 cm above the floor. Use a vertical pair beside a mirror — it lights the face without shadows.",
    },
    tavan: {
      label: "Ceiling",
      title: "Ceiling Fixtures",
      description:
        "Flush-mount fixtures for low ceilings, hallways and bathrooms. IP44 options available.",
      intro:
        "If ceiling height is under 250 cm, use a flush-mount fixture instead of a pendant. IP44 protection or higher is required for bathrooms and outdoor spaces.",
    },
    masa: {
      label: "Table",
      title: "Table Lamps",
      description:
        "Table lamps for desks, consoles and nightstands. In stock, shipped in 3–5 business days.",
      intro:
        "On a table lamp, the bottom edge of the shade should sit below your eye level when seated — otherwise the bulb shines directly into view. 700–900 lumens is enough for reading.",
    },
    ayakli: {
      label: "Floor",
      title: "Floor Lamps",
      description:
        "Floor lamps for reading beside an armchair and lighting dark corners. Dimmable options available.",
      intro:
        "A floor lamp fills a room's dark corner. For reading, position it behind and to the side of the chair, just above shoulder height.",
    },
  },
  tr: {
    avize: {
      label: "Avize",
      title: "Avize Modelleri",
      description:
        "El üflemeli cam ve dövme pirinç avizeler. Salon, yemek odası ve merdiven boşluğu için ölçüye özel üretim.",
      intro:
        "Avize bir odanın en yüksek noktasında durur ve mekânın ölçeğini o belirler. Yemek masası üzerinde masa yüzeyinden 75–85 cm yukarıda asılmalı; geçiş alanlarında en alt nokta zeminden 210 cm'nin altına inmemeli.",
    },
    sarkit: {
      label: "Sarkıt",
      title: "Sarkıt Aydınlatma",
      description:
        "Mutfak adası, tezgâh ve konsol için tekli ve çoklu sarkıtlar. Çubuk boyu siparişe göre üretilir.",
      intro:
        "Sarkıtlar belirli bir yüzeyi aydınlatmak için kullanılır. Mutfak adasında 80–90 cm aralıklarla yerleştirin; tezgâh yüzeyinden 70–80 cm yukarıda kalsınlar.",
    },
    aplik: {
      label: "Aplik",
      title: "Duvar Apliği",
      description:
        "Yatak başı, koridor ve ayna yanı için aplikler. Yukarı-aşağı, tek yön ve anahtarlı seçenekler.",
      intro:
        "Aplik tavan ışığının sertliğini kırar. Yatak başında şilte yüzeyinden 55–65 cm, koridorda zeminden 160–180 cm yükseklik doğru sonucu verir. Ayna yanında dikey çift kullanın — yüzü gölgesiz aydınlatır.",
    },
    tavan: {
      label: "Tavan",
      title: "Tavan Armatürleri",
      description:
        "Alçak tavanlar, koridor ve banyo için tavana sıfır oturan armatürler. IP44 seçenekleri mevcut.",
      intro:
        "Tavan yüksekliği 250 cm'nin altındaysa sarkıt yerine tavana sıfır oturan armatür kullanın. Banyo ve dış mekânda IP44 ve üzeri koruma sınıfı şarttır.",
    },
    masa: {
      label: "Masa",
      title: "Masa Lambaları",
      description:
        "Çalışma masası, konsol ve komodin için masa lambaları. Stokta, 3–5 iş gününde kargo.",
      intro:
        "Masa lambasında abajurun alt kenarı oturduğunuzda göz hizanızın altında kalmalı — aksi hâlde ampul doğrudan göze gelir. Okuma için 700–900 lümen yeterlidir.",
    },
    ayakli: {
      label: "Ayaklı",
      title: "Ayaklı Lambalar",
      description:
        "Koltuk yanı okuma lambaları ve köşe aydınlatması için ayaklı modeller. Dimmer'lı seçenekler.",
      intro:
        "Ayaklı lamba odanın karanlık köşesini kapatır. Okuma için koltuğun arka-yan tarafına, omuz hizasının hemen üstüne gelecek şekilde konumlandırın.",
    },
  },
  ru: {
    avize: {
      label: "Люстры",
      title: "Люстры",
      description:
        "Люстры из ручного стекла и кованой латуни. Изготовление по индивидуальным размерам для гостиной, столовой и лестничного пролёта.",
      intro:
        "Люстра находится в самой высокой точке комнаты и задаёт масштаб всего пространства. Над обеденным столом вешайте на 75–85 см выше столешницы; в проходных зонах нижняя точка должна быть не ниже 210 см от пола.",
    },
    sarkit: {
      label: "Подвесы",
      title: "Подвесные светильники",
      description:
        "Одиночные и групповые подвесы для кухонного острова, столешницы и консоли. Длина стержня изготавливается на заказ.",
      intro:
        "Подвесы используются для освещения конкретной поверхности. Над кухонным островом располагайте их с шагом 80–90 см; высота над столешницей — 70–80 см.",
    },
    aplik: {
      label: "Бра",
      title: "Настенные бра",
      description:
        "Бра для прикроватной зоны, коридора и зеркала. Варианты вверх-вниз, в одну сторону и с выключателем.",
      intro:
        "Бра смягчает жёсткость потолочного света. У кровати подходит высота 55–65 см над поверхностью матраса, в коридоре — 160–180 см от пола. У зеркала используйте вертикальную пару — она освещает лицо без теней.",
    },
    tavan: {
      label: "Потолочные",
      title: "Потолочные светильники",
      description:
        "Светильники, устанавливаемые вплотную к потолку, для низких потолков, коридоров и ванных комнат. Доступны варианты с защитой IP44.",
      intro:
        "Если высота потолка меньше 250 см, используйте потолочный светильник вместо подвеса. Для ванной комнаты и улицы обязательна защита IP44 и выше.",
    },
    masa: {
      label: "Настольные",
      title: "Настольные лампы",
      description:
        "Настольные лампы для рабочего стола, консоли и тумбы. В наличии, отправка за 3–5 рабочих дней.",
      intro:
        "У настольной лампы нижний край абажура должен быть ниже уровня глаз в положении сидя — иначе лампа будет светить прямо в глаза. Для чтения достаточно 700–900 люмен.",
    },
    ayakli: {
      label: "Торшеры",
      title: "Торшеры",
      description:
        "Торшеры для чтения рядом с креслом и освещения тёмного угла. Доступны диммируемые варианты.",
      intro:
        "Торшер закрывает тёмный угол комнаты. Для чтения располагайте его сбоку и сзади кресла, чуть выше уровня плеча.",
    },
  },
};

export type CategoryKey = keyof typeof categories.en;
