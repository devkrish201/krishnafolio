const fs = require('fs');
const { PNG } = require('pngjs');

const raw = fs.readFileSync('public/krishna-cutout.png');
const png = PNG.sync.read(raw);
const { width, height, data } = png;

// RGB to HSL and back
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Sakuga Target Palette
// Suit Periwinkle: H ~ 241/360 (0.669), S ~ 0.88, L ~ 0.76 (#8f8df7)
// Electric Pink: H ~ 332/360 (0.922), S ~ 1.0, L ~ 0.69 (#ff5fa8)
// Midnight Ink: #1d1a4a (H ~ 243/360, S ~ 0.48, L ~ 0.20)

for (let i = 0; i < data.length; i += 4) {
  const a = data[i + 3];
  if (a === 0) continue; // Skip transparent

  let r = data[i];
  let g = data[i + 1];
  let b = data[i + 2];

  let [h, s, l] = rgbToHsl(r, g, b);

  // 1. Blue/Navy/Cyan/Purple tones (Suit, lapels, fabric)
  // Hue roughly 190° to 270° (0.52 to 0.75)
  if (h >= 0.50 && h <= 0.78 && s > 0.15) {
    // Shift hue directly to Sakuga Periwinkle (approx 242° = 0.672)
    h = 0.672;
    // Boost vibrancy to Sakuga periwinkle
    s = Math.min(1.0, s * 1.25);

    // Deep shadows become Sakuga Midnight Ink
    if (l < 0.28) {
      r = Math.round(r * 0.7 + 29 * 0.3);
      g = Math.round(g * 0.7 + 26 * 0.3);
      b = Math.round(b * 0.7 + 74 * 0.3);
      data[i] = r; data[i + 1] = g; data[i + 2] = b;
      continue;
    }
  }

  // 2. Magenta/Red/Pink accents (pocket square, ties, pins)
  // Hue around 310° to 360° or 0° to 20°
  if ((h >= 0.84 || h <= 0.05) && s > 0.35 && l > 0.3) {
    // Force to Electric Anime Pink (#ff5fa8 = 255, 95, 168, H=0.922)
    h = 0.922;
    s = 1.0;
    l = Math.max(0.55, Math.min(0.72, l));
  }

  // 3. Dark lines & hair shadows (low lightness)
  // Shift dark lines toward Midnight Indigo #1d1a4a
  if (l < 0.15) {
    r = Math.min(r, 29);
    g = Math.min(g, 26);
    b = Math.max(b, 74);
  }

  const [newR, newG, newB] = hslToRgb(h, s, l);
  data[i] = newR;
  data[i + 1] = newG;
  data[i + 2] = newB;
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/krishna-cutout.png', buffer);
console.log('Recolored krishna-cutout.png to Sakuga palette. Size:', buffer.length);

