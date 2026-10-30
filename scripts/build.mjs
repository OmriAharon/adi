// Builds the static site into dist/ with no dependencies:
//   - copies fonts and images with content-hashed names (cached forever by Firebase)
//   - inlines the minified CSS and JS into each page (one request to first paint)
//   - renders the Hebrew (/) and English (/en) pages, a 404 page, robots.txt and sitemap.xml
import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { content, SITE_URL } from '../site/content.mjs';
import { renderPage, render404 } from '../site/render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });

// 1. Hashed assets
const manifest = {};
for (const dir of ['fonts', 'img']) {
  await mkdir(path.join(dist, 'assets', dir), { recursive: true });
  for (const file of await readdir(path.join(site, 'assets', dir))) {
    if (file.startsWith('LICENSE')) continue;
    const buf = await readFile(path.join(site, 'assets', dir, file));
    const hash = createHash('sha256').update(buf).digest('hex').slice(0, 10);
    const ext = path.extname(file);
    const hashed = `${path.basename(file, ext)}.${hash}${ext}`;
    await writeFile(path.join(dist, 'assets', dir, hashed), buf);
    manifest[`${dir}/${file}`] = `/assets/${dir}/${hashed}`;
  }
}
const asset = (p) => {
  if (!manifest[p]) throw new Error(`Unknown asset: ${p}`);
  return manifest[p];
};

// 2. CSS + JS, lightly minified and inlined
const minifyCss = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();
let css = minifyCss(await readFile(path.join(site, 'styles.css'), 'utf8'));
css = css.replace(/url\(\/assets\/([^)]+)\)/g, (_, p) => `url(${asset(p)})`);

const js = (await readFile(path.join(site, 'main.js'), 'utf8'))
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\n\s*\n/g, '\n')
  .trim();

// 3. Pages
await writeFile(path.join(dist, 'index.html'), renderPage(content.he, { asset, css, js }));
await writeFile(path.join(dist, 'en.html'), renderPage(content.en, { asset, css, js }));
await writeFile(path.join(dist, '404.html'), render404({ asset, css }));

// 4. Static files (Google Search Console verification etc.)
await cp(path.join(site, 'static'), dist, { recursive: true });

// 5. SEO files
const today = new Date().toISOString().slice(0, 10);
const urls = [content.he, content.en].map((t) => `${SITE_URL}${t.path === '/' ? '/' : t.path}`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${u}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="he" href="${urls[0]}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${urls[1]}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${urls[0]}"/>
  </url>`).join('\n')}
</urlset>
`);

const size = async (f) => (await readFile(path.join(dist, f))).length;
console.log(`Built dist/ — index.html ${(await size('index.html') / 1024).toFixed(1)} KB, en.html ${(await size('en.html') / 1024).toFixed(1)} KB`);
