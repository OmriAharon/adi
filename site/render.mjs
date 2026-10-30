import { icon } from './icons.mjs';
import { SITE_URL, EMAIL, CONTACT_ENDPOINT, content } from './content.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const abs = (p) => SITE_URL + (p === '/' ? '/' : p);

function picture(asset, base, widths, sizes, alt, { eager = false, w, h } = {}) {
  const set = (ext) => widths.map((x) => `${asset(`img/${base}-${x}.${ext}`)} ${x}w`).join(', ');
  const largest = widths[widths.length - 1];
  return `<picture>
      <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
      <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
      <img src="${asset(`img/${base}-${largest}.jpg`)}" srcset="${set('jpg')}" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    </picture>`;
}

function head(t, { asset, css, title, description, canonical, noindex = false }) {
  const he = content.he, en = content.en;
  const bodyFont = `assistant-${t.lang === 'he' ? 'hebrew' : 'latin'}-wght-normal`;
  const headFont = `bellefair-${t.lang === 'he' ? 'hebrew' : 'latin'}-400-normal`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.name,
    alternateName: t.lang === 'he' ? en.name : he.name,
    jobTitle: t.lang === 'he' ? 'רופאת שיניים – אנדודונטיה' : 'Dentist – Endodontics',
    description: t.description,
    url: abs(t.path),
    image: SITE_URL + asset('img/og.jpg'),
    email: `mailto:${EMAIL}`,
    alumniOf: { '@type': 'CollegeOrUniversity', name: t.lang === 'he' ? 'אוניברסיטת תל אביב' : 'Tel Aviv University' },
    knowsAbout: t.treatments.items.map((i) => i.title),
  };
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="he" href="${abs(he.path)}">
  <link rel="alternate" hreflang="en" href="${abs(en.path)}">
  <link rel="alternate" hreflang="x-default" href="${abs(he.path)}">`}
  <meta name="theme-color" content="#0f2a4a">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(t.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical || SITE_URL}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:image" content="${SITE_URL}${asset('img/og.jpg')}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(t.hero.imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${asset('img/favicon.svg')}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${asset('img/apple-touch-icon.png')}">
  <link rel="preload" href="${asset(`fonts/${bodyFont}.woff2`)}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${asset(`fonts/${headFont}.woff2`)}" as="font" type="font/woff2" crossorigin>
  <style>${css}</style>
  ${noindex ? '' : `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</head>`;
}

function header(t) {
  return `<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="${t.path}" aria-label="${esc(t.name)}">
      <span class="brand-mark">${icon('tooth')}</span>
      <span class="brand-text">${esc(t.nameShort)}</span>
    </a>
    <nav class="nav" aria-label="${t.lang === 'he' ? 'ניווט ראשי' : 'Main'}">
      <a href="#about">${esc(t.nav.about)}</a>
      <a href="#treatments">${esc(t.nav.treatments)}</a>
    </nav>
    <div class="header-actions">
      <a class="lang-switch" href="${t.switchHref}" hreflang="${t.switchLang}" lang="${t.switchLang}">${esc(t.switchLabel)}</a>
      <a class="btn btn-primary btn-sm" href="#contact">${esc(t.nav.contact)}</a>
    </div>
  </div>
</header>`;
}

function hero(t, asset) {
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow" data-reveal>${esc(t.hero.eyebrow)}</p>
      <h1 id="hero-title" data-reveal><span class="title-prefix">${esc(t.hero.titlePrefix)}</span> ${esc(t.hero.titleName)}</h1>
      <p class="lead" data-reveal>${esc(t.hero.lead)}</p>
      <div class="hero-actions" data-reveal>
        <a class="btn btn-primary" href="#contact">${esc(t.hero.cta)} ${icon('arrow', 'icon icon-arrow')}</a>
        <a class="btn btn-ghost" href="#treatments">${esc(t.hero.ctaSecondary)}</a>
      </div>
    </div>
    <div class="hero-media" data-reveal>
      <div class="hero-frame">
        ${picture(asset, 'hero', [560, 880, 1092], '(min-width: 900px) 42vw, 92vw', t.hero.imageAlt, { eager: true, w: 1092, h: 1365 })}
      </div>
      <div class="hero-badge">
        <span class="hero-badge-icon">${icon('graduation')}</span>
        <span>${esc(t.hero.badge)}</span>
      </div>
    </div>
  </div>
</section>`;
}

function about(t) {
  return `<section class="section about" id="about" aria-labelledby="about-title">
  <div class="container about-grid">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t.about.eyebrow)}</p>
      <h2 id="about-title">${esc(t.about.title)}</h2>
      <p class="section-intro">${esc(t.about.intro)}</p>
    </div>
    <ul class="credentials" role="list">
      ${t.about.items.map((i) => `<li data-reveal><span class="cred-icon">${icon(i.icon)}</span><span>${esc(i.text)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function treatments(t) {
  return `<section class="section treatments" id="treatments" aria-labelledby="treatments-title">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow">${esc(t.treatments.eyebrow)}</p>
      <h2 id="treatments-title">${esc(t.treatments.title)}</h2>
    </div>
    <div class="cards">
      ${t.treatments.items.map((i) => `<article class="card" data-reveal>
        <span class="card-icon">${icon(i.icon)}</span>
        <h3>${esc(i.title)}</h3>
        <p>${esc(i.text)}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function microscope(t, asset) {
  return `<section class="microscope" aria-labelledby="microscope-title">
  <div class="container microscope-grid">
    <div class="microscope-media" data-reveal>
      ${picture(asset, 'microscope', [480, 665], '(min-width: 900px) 40vw, 92vw', t.microscope.imageAlt, { w: 665, h: 471 })}
    </div>
    <div class="microscope-copy" data-reveal>
      <span class="microscope-icon">${icon('microscope')}</span>
      <h2 id="microscope-title">${esc(t.microscope.title)}</h2>
      <p>${esc(t.microscope.text)}</p>
    </div>
  </div>
</section>`;
}

function contact(t) {
  const f = t.contact.form;
  return `<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="container contact-grid">
    <div class="contact-copy" data-reveal>
      <p class="eyebrow">${esc(t.contact.eyebrow)}</p>
      <h2 id="contact-title">${esc(t.contact.title)}</h2>
      <p class="section-intro">${esc(t.contact.text)}</p>
      <a class="email-card" href="mailto:${EMAIL}">
        <span class="email-icon">${icon('mail')}</span>
        <span><span class="email-label">${esc(t.contact.emailLabel)}</span><span class="email-value" dir="ltr">${EMAIL}</span></span>
      </a>
    </div>
    <form class="contact-form" data-reveal novalidate
          data-endpoint="${CONTACT_ENDPOINT}"
          data-msg-sending="${esc(f.sending)}" data-msg-sent="${esc(f.sent)}"
          data-msg-error="${esc(f.error)}" data-msg-required="${esc(f.required)}" data-msg-invalid-email="${esc(f.invalidEmail)}">
      <div class="field">
        <label for="f-name">${esc(f.name)}</label>
        <input id="f-name" name="name" type="text" autocomplete="name">
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-phone">${esc(f.phone)}</label>
          <input id="f-phone" name="phoneNumber" type="tel" autocomplete="tel" inputmode="tel">
        </div>
        <div class="field">
          <label for="f-email">${esc(f.email)}</label>
          <input id="f-email" name="email" type="email" autocomplete="email">
        </div>
      </div>
      <div class="field">
        <label for="f-message">${esc(f.message)}</label>
        <textarea id="f-message" name="message" rows="4"></textarea>
      </div>
      <div class="hp" aria-hidden="true"><label for="f-company">Company</label><input id="f-company" name="company" type="text" tabindex="-1" autocomplete="off"></div>
      <div class="form-footer">
        <button class="btn btn-primary" type="submit"><span class="btn-label">${esc(f.submit)}</span> ${icon('send', 'icon icon-send')}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>
</section>`;
}

function footer(t) {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container footer-inner">
    <a class="brand brand--light" href="${t.path}">
      <span class="brand-mark">${icon('tooth')}</span>
      <span class="brand-text">${esc(t.name)}</span>
    </a>
    <a class="footer-email" href="mailto:${EMAIL}" dir="ltr">${EMAIL}</a>
    <p class="footer-meta">© ${year} ${esc(t.name)}. ${esc(t.footer.rights)} · <a href="${t.switchHref}" hreflang="${t.switchLang}" lang="${t.switchLang}">${esc(t.switchLabel)}</a></p>
  </div>
</footer>`;
}

export function renderPage(t, { asset, css, js }) {
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}">
${head(t, { asset, css, title: t.title, description: t.description, canonical: abs(t.path) })}
<body>
<script>document.documentElement.classList.add('js')</script>
<a class="skip-link" href="#main">${esc(t.skip)}</a>
${header(t)}
<main id="main">
${hero(t, asset)}
${microscope(t, asset)}
${about(t)}
${treatments(t)}
${contact(t)}
</main>
${footer(t)}
<script>${js}</script>
</body>
</html>
`;
}

export function render404({ asset, css }) {
  const he = content.he, en = content.en;
  return `<!doctype html>
<html lang="he" dir="rtl">
${head(he, { asset, css, title: `${he.notFound.title} | ${he.name}`, description: he.description, canonical: '', noindex: true })}
<body>
<main class="not-found">
  <span class="brand-mark brand-mark--lg">${icon('tooth')}</span>
  <h1>${esc(he.notFound.title)}</h1>
  <p>${esc(he.notFound.text)}</p>
  <a class="btn btn-primary" href="/">${esc(he.notFound.back)}</a>
  <p class="not-found-en" lang="en" dir="ltr">${esc(en.notFound.title)} · <a href="/en">${esc(en.notFound.back)}</a></p>
</main>
</body>
</html>
`;
}
