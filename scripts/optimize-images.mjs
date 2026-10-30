// Generates the optimized, responsive images in site/assets/img from the
// originals in site/images-src. Run with `npm run images` after changing a photo.
// The outputs are committed, so a normal `npm run build` needs no dependencies.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => path.join(root, 'site/images-src', f);
const out = (f) => path.join(root, 'site/assets/img', f);
await mkdir(out(''), { recursive: true });

// Portrait (About section): Adi in the clinic, cropped to a 4:5 portrait around her.
const clinic = sharp(src('adi-clinic.jpg'));
const { width: cw, height: ch } = await clinic.metadata();
const cropW = Math.round(ch * 0.8);
const centerX = Math.round(cw * 0.485);
const portrait = { left: Math.max(0, Math.min(cw - cropW, centerX - Math.round(cropW / 2))), top: 0, width: cropW, height: ch };

for (const w of [560, 880, 1092]) {
  const base = sharp(src('adi-clinic.jpg')).extract(portrait).resize({ width: w });
  await base.clone().avif({ quality: 52, effort: 6 }).toFile(out(`portrait-${w}.avif`));
  await base.clone().webp({ quality: 74, effort: 6 }).toFile(out(`portrait-${w}.webp`));
  await base.clone().jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(out(`portrait-${w}.jpg`));
}

// Full-screen hero backdrop: the endodontic microscope, desaturated and tinted navy.
// To use a better photo, replace site/images-src/hero-microscope.jpg (landscape, microscope
// on the left, ideally 2000px+ wide) and run `npm run images`. Small sources get a soft blur
// so the upscaling isn't visible behind the translucent overlay.
const heroSrc = sharp(src('hero-microscope.jpg'));
const { width: hw } = await heroSrc.metadata();
const blur = hw < 1200 ? 2.2 * (1800 / hw) / 6 : 0;
for (const w of [900, 1800]) {
  let base = sharp(src('hero-microscope.jpg'))
    .modulate({ saturation: 0 })
    .linear(1.15, -12)
    .resize({ width: w, kernel: 'lanczos3' })
    .tint('#6f8db0');
  if (blur) base = base.blur(Math.max(0.3, blur * (w / 1800)));
  await base.clone().avif({ quality: 45, effort: 6 }).toFile(out(`hero-bg-${w}.avif`));
  await base.clone().webp({ quality: 70, effort: 6 }).toFile(out(`hero-bg-${w}.webp`));
  await base.clone().jpeg({ quality: 72, mozjpeg: true, progressive: true }).toFile(out(`hero-bg-${w}.jpg`));
}

// Adi with the endodontic microscope (microscope section).
for (const w of [480, 665]) {
  const base = sharp(src('adi-microscope.png')).flatten({ background: '#ffffff' }).resize({ width: w });
  await base.clone().avif({ quality: 58, effort: 6 }).toFile(out(`microscope-${w}.avif`));
  await base.clone().webp({ quality: 80, effort: 6 }).toFile(out(`microscope-${w}.webp`));
  await base.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(out(`microscope-${w}.jpg`));
}

// Social share image (Open Graph / WhatsApp / Facebook previews), 1200x630.
await sharp(src('adi-clinic.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out('og.jpg'));

// Icons: white tooth mark on navy.
const tooth = 'M7 3c-2.2 0-4 1.8-4 4.5 0 2.2.8 3.6 1.6 5 .7 1.3 1 3 1.3 5l.4 3.2c.1.8.8 1.3 1.5 1.3.7 0 1.3-.5 1.5-1.2l1-4.3c.2-.9.9-1.5 1.7-1.5s1.5.6 1.7 1.5l1 4.3c.2.7.8 1.2 1.5 1.2.8 0 1.4-.5 1.5-1.3l.4-3.2c.3-2 .6-3.7 1.3-5 .8-1.4 1.6-2.8 1.6-5C21 4.8 19.2 3 17 3c-1.6 0-2.8.8-5 .8S8.6 3 7 3z';
const iconSvg = (size, radius) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">` +
  `<rect width="32" height="32" rx="${radius}" fill="#0f2a4a"/>` +
  `<g transform="translate(5 5) scale(.9167)"><path d="${tooth}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></g></svg>`
);
await sharp(iconSvg(180, 0)).png().toFile(out('apple-touch-icon.png'));
await sharp(iconSvg(512, 7)).png().toFile(out('icon-512.png'));
await writeFile(out('favicon.svg'), iconSvg(32, 7));

console.log('Images written to site/assets/img');
