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

Requires Node 18+.

**Deploys are automatic:** every push to `master` builds the site and deploys it to Firebase
Hosting via `.github/workflows/deploy.yml` (also runnable by hand from the Actions tab).
It authenticates with the `FIREBASE_SERVICE_ACCOUNT_ADIAPP_D1B5E` repository secret: a
service-account JSON key with the *Firebase Hosting Admin*, *Firebase Viewer*,
*API Keys Viewer* and *Service Usage Consumer* roles on project `adiapp-d1b5e` (the account
itself lives in the `adi-dentist-website` project). The project must have the Service Usage
and Firebase Hosting APIs enabled.
`npm run deploy` is the manual fallback (needs the Firebase CLI and `firebase login`).

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
the clinic. The Lambda source is in `src/nodemailer/`; it reads `GMAIL_USER` and
`GMAIL_APP_PASSWORD` from the function's environment variables. To update it, zip
`index.js`, `package.json` and `node_modules` (after `npm install` in that folder) and
upload via Lambda → Code → Upload from → .zip file.
