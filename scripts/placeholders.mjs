/**
 * Geçici ürün görselleri üretir (ışık KAPALI + AÇIK çifti).
 * Gerçek fotoğraflar geldiğinde src/assets/products/ içine aynı isimlerle
 * koyup bu script'i silebilirsin.  Çalıştırmak için: node scripts/placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = new URL("../src/assets/products/", import.meta.url);
const W = 1200, H = 1500;

const lamps = [
  { slug: "cosmos-avize",     shape: "chandelier" },
  { slug: "orb-tavan",        shape: "flush" },
  { slug: "updown-aplik",     shape: "sconce" },
  { slug: "orb-sarkit",       shape: "pendant" },
  { slug: "jade-aplik",       shape: "sconce" },
  { slug: "linear-sarkit",    shape: "linear" },
  { slug: "lily-avize",       shape: "lily" },
  { slug: "monolit-aplik",    shape: "block" },
  { slug: "alabaster-sarkit", shape: "disk" },
  { slug: "cluster-avize",    shape: "cluster" },
  { slug: "kubbe-masa",       shape: "table" },
  { slug: "okuma-ayakli",     shape: "floor" },
  { slug: "halka-avize",      shape: "ring" },
  { slug: "tup-aplik",        shape: "tube" },
  { slug: "koni-tavan",       shape: "cone" },
  { slug: "uclu-sarkit",      shape: "trio" },
];

const body = (shape, on) => {
  const metal = on ? "#8a7256" : "#4a4440";
  const g = on ? 'url(#lit)' : "#cfc9be";
  switch (shape) {
    case "chandelier":
      return `<path d="M600 240 V560" stroke="${metal}" stroke-width="9"/>
        <path d="M600 620 C 470 620 430 700 430 780" fill="none" stroke="${metal}" stroke-width="9"/>
        <path d="M600 620 C 730 620 770 700 770 780" fill="none" stroke="${metal}" stroke-width="9"/>
        <circle cx="430" cy="812" r="52" fill="${g}"/>
        <circle cx="600" cy="600" r="58" fill="${g}"/>
        <circle cx="770" cy="812" r="52" fill="${g}"/>`;
    case "flush":
      return `<rect x="560" y="230" width="80" height="44" rx="10" fill="${metal}"/>
        <circle cx="600" cy="360" r="86" fill="${g}"/>`;
    case "sconce":
      return `<rect x="566" y="600" width="68" height="200" rx="16" fill="${metal}"/>
        <circle cx="600" cy="640" r="46" fill="${g}"/>
        <circle cx="600" cy="790" r="46" fill="${g}"/>`;
    case "pendant":
      return `<path d="M600 220 V620" stroke="${metal}" stroke-width="7"/>
        <circle cx="600" cy="710" r="92" fill="${g}"/>`;
    case "linear":
      return `<path d="M470 220 V700 M730 220 V700" stroke="${metal}" stroke-width="7"/>
        <rect x="380" y="700" width="440" height="34" rx="17" fill="${g}"/>`;
    case "lily":
      return `<path d="M600 240 V520" stroke="${metal}" stroke-width="9"/>
        ${[-260, -150, 0, 150, 260].map((dx, i) =>
          `<path d="M600 520 C ${600 + dx * 0.7} 560 ${600 + dx} 640 ${600 + dx} ${740 + (i % 2) * 70}" fill="none" stroke="${metal}" stroke-width="7"/>
           <path d="M${570 + dx} ${740 + (i % 2) * 70} h60 l-30 66 z" fill="${on ? "#ff8b5e" : "#e0654a"}"/>`
        ).join("")}`;
    case "disk":
      return `<path d="M600 220 V600" stroke="${metal}" stroke-width="7"/>
        <ellipse cx="600" cy="640" rx="150" ry="38" fill="${g}"/>`;
    case "cluster":
      return `${[[600,470,58],[470,600,44],[730,610,44],[540,740,36],[680,760,36]]
        .map(([cx,cy,r]) => `<path d="M${cx} 220 V${cy - r}" stroke="${metal}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${g}"/>`)
        .join("")}`;
    case "table":
      return `<rect x="566" y="820" width="68" height="120" rx="8" fill="${metal}"/>
        <ellipse cx="600" cy="960" rx="96" ry="18" fill="${metal}"/>
        <path d="M486 820 L714 820 L676 660 L524 660 Z" fill="${g}"/>`;
    case "floor":
      return `<path d="M600 400 V980" stroke="${metal}" stroke-width="8"/>
        <ellipse cx="600" cy="988" rx="110" ry="20" fill="${metal}"/>
        <path d="M500 400 L700 400 L664 268 L536 268 Z" fill="${g}"/>`;
    case "ring":
      return `<path d="M600 220 V420" stroke="${metal}" stroke-width="7"/>
        <ellipse cx="600" cy="640" rx="200" ry="200" fill="none" stroke="${g}" stroke-width="26"/>`;
    case "tube":
      return `<rect x="576" y="560" width="48" height="300" rx="24" fill="${g}"/>
        <rect x="560" y="536" width="80" height="26" rx="8" fill="${metal}"/>`;
    case "cone":
      return `<rect x="576" y="230" width="48" height="40" rx="8" fill="${metal}"/>
        <path d="M470 470 L730 470 L648 270 L552 270 Z" fill="${g}"/>`;
    case "trio":
      return `${[[440, 660], [600, 760], [760, 700]]
        .map(([cx, cy]) => `<path d="M${cx} 220 V${cy - 54}" stroke="${metal}" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="54" fill="${g}"/>`)
        .join("")}`;
    default:
      return `<rect x="540" y="600" width="120" height="180" rx="8" fill="${on ? "#3b322a" : "#3a352f"}"/>`;
  }
};

const svg = (shape, on) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 1200 1500">
  <defs>
    <radialGradient id="lit" cx="50%" cy="45%">
      <stop offset="0%" stop-color="#fff6e2"/><stop offset="100%" stop-color="#ffc27a"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#ffb861" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffb861" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wallOff" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e9e5dd"/><stop offset="100%" stop-color="#ddd8ce"/>
    </linearGradient>
    <linearGradient id="wallOn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a3c2c"/><stop offset="100%" stop-color="#241d16"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" fill="url(#${on ? "wallOn" : "wallOff"})"/>
  ${on ? '<ellipse cx="600" cy="740" rx="520" ry="560" fill="url(#halo)"/>' : ""}
  ${body(shape, on)}
</svg>`;

await mkdir(OUT, { recursive: true });
for (const { slug, shape } of lamps) {
  for (const state of ["off", "on"]) {
    const file = new URL(`${slug}-${state}.png`, OUT);
    await sharp(Buffer.from(svg(shape, state === "on"))).png({ quality: 90 }).toFile(file.pathname);
  }
}
console.log(`✓ ${lamps.length * 2} geçici görsel üretildi → src/assets/products/`);
