# adigoldshtein.com

Static site for Dr. Adi Goldshtein Aharon. Hebrew at `/`, English at `/en`.

The pages are pre-rendered HTML with the CSS and JS inlined, self-hosted fonts and
responsive AVIF/WebP images. There is no framework or runtime, and the build itself has no dependencies.

## Edit content

All text, in both languages, lives in [`site/content.mjs`](site/content.mjs).
Layout is in `site/render.mjs`, styles in `site/styles.css`, and the small client script
(contact form and scroll effects) in `site/main.js`.

## Build, preview, deploy

```bash
npm run build      # → dist/
npm run preview    # build + serve dist/ at http://localhost:4173
npm run deploy     # build + firebase deploy --only hosting
```

Requires Node 18+. `npm run deploy` needs the Firebase CLI (`npm i -g firebase-tools`) and
`firebase login`.

## Photos

Original photos are in `site/images-src/`. After replacing or adding one, regenerate the
optimized versions in `site/assets/img/` and commit them:

```bash
npm install        # installs sharp (only needed for this step)
npm run images
```

## Contact form

The form posts JSON (`name`, `email`, `phoneNumber`, `message`) to the existing AWS
API Gateway → Lambda endpoint (`CONTACT_ENDPOINT` in `site/content.mjs`), which emails
the clinic. The Lambda source is in `src/nodemailer/`.
