# Precision Welding Solutions

One-page marketing site for Precision Welding Solutions: welding and fabrication on Reece Rd, St. Thomas, Barbados. The goal of every section is to get a visitor to send Kris a photo of the part on WhatsApp, or to request a quote.

The approved design is `design_handoff/Precision Welding Solutions.dc.html` (spec: `design_handoff/README.md`). It is kept for reference and is not part of the build.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), TypeScript, React 19 |
| Styling | Tailwind CSS v4. The design tokens in `src/app/globals.css` are the only colours; Tailwind's default palette is disabled |
| Fonts | Montserrat (headings) and Open Sans (body) from Google Fonts through `next/font`, self-hosted at build time with `display: swap` |
| Page | `/` is static and regenerated at most hourly (ISR) so the Instagram grid stays fresh |
| Form | Server action (`src/app/actions/quote.ts`): zod validation, honeypot, per-IP rate limit, email to the owner through Resend with a React Email template |
| Hosting | Vercel |

## Commands

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build               # production build (use build:exfat on an exFAT drive, see below)
npm run build:exfat         # production build on exFAT/FAT drives
npm run start               # serve the production build
npm run lint
npm run typecheck
npm run lighthouse          # mobile + desktop audit of a running production build
npm run instagram:refresh   # rotate a long-lived Instagram token (Option B below)
```

## Changing copy and photos

**Everything the visitor reads lives in `src/content.ts`**: phone, WhatsApp and Instagram links, address, hours, every heading and paragraph, the six services, the four reasons, the form's service list, the Instagram fallback posts, every photo and the hero video.

To swap a photo:

1. Put the file in `public/images/` (JPEG or PNG; the site serves AVIF/WebP versions automatically).
2. Change that image's `src` in `images` in `src/content.ts`. Adjust `position` (CSS `object-position`) if the crop needs to move.
3. Set `src: null` to show the dark captioned placeholder instead.

All photos are Kris's own (sent over WhatsApp, which strips location data).

| Slot | Current file | What it is |
| --- | --- | --- |
| `hero` | `hero-cutting-poster.jpg` | First frame of the hero video. Shows instantly, and on its own when the video can't play |
| `servicesBg`, `contactBg` | `ibeam-weld.jpg` | Stick-welding a steel I-beam on site. Fixed behind the text; each slot frames it differently with `position` |
| `whyBg` | `boat-rail-weld.jpg` | TIG-welding a rail mount on a fishing boat |
| `about` | `kris-marina.jpg` | Kris on a marina dock with his TIG torch (4:5 crop) |
| `share` | `og-cutting.jpg` | Photo half of the link-preview card |
| `logo` | `logo.png` | The logo on black (round avatars, email header, structured data) |

Better originals help: WhatsApp compresses photos to 1500×2000 and video to ~480p. Ask Kris to send files as a **Document** (attach → Document) to keep full resolution.

## Hero video

`public/media/hero-cutting.mp4` is a silent 6-second loop of Kris torch-cutting (1 MB, H.264). It is configured in `heroVideo` in `src/content.ts` and played by `src/components/HeroMedia.tsx`, which:

- starts it only after the page has loaded (the poster photo is what loads first);
- pauses it while the hero is scrolled out of view;
- never plays it under "reduce motion" or Data Saver (the poster stays);
- shows a pause/play button, which accessibility rules require for motion longer than five seconds.

The clip is portrait (478×850), so on desktop it fills the right half of the hero and fades into the black behind the headline (`desktopLayout: "panel"`); phones show it full-screen. With a landscape clip at least 1920px wide, set `desktopLayout: "full"`. Set `heroVideo` to `null` to use the photo alone.

To make a new loop from a phone video (ffmpeg): trim to a stretch with continuous action, drop the audio, crossfade the end into the start so it loops without a jump, and keep it near 1 MB:

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]split=2[a][b];[a]trim=start=2.8:end=9.0,setpts=PTS-STARTPTS,fps=24,settb=AVTB[body];[b]trim=start=2.0:end=2.8,setpts=PTS-STARTPTS,fps=24,settb=AVTB[head];[body][head]xfade=transition=fade:duration=0.8:offset=5.4,hqdn3d=4:3:9:7,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset veryslow -crf 30 -movflags +faststart public/media/hero-cutting.mp4
```

(`trim` picks the stretch: the loop runs from 2.8s to 9.0s and the 2.0–2.8s head is blended into its end; `offset` = loop length − crossfade.) Then export its first frame as the poster in `public/images/`.

## Instagram feed (#work)

The grid shows the six latest posts. Each tile links to the post, shows a play badge on videos and the first line of the caption (hashtags removed). Posts are fetched on the server and cached for an hour. With no feed configured, or if the feed fails, the six captions in `instagramFallbackPosts` (`src/content.ts`) are shown as dark placeholders.

**Option A: Behold (recommended, no upkeep).**

1. Create a free account at [behold.so](https://behold.so) and connect @precision_weldingsolutions.
2. Create a feed, choose **JSON** as the output, and copy the feed URL (`https://feeds.behold.so/…`).
3. Set `INSTAGRAM_FEED_URL` to that URL. Behold handles Instagram's token refreshes.

**Option B: Instagram API directly.**

1. The Instagram account must be a Business or Creator account.
2. In the Meta developer dashboard, create a Business app with the *Instagram API with Instagram Login* product, add the account as a tester, and generate a long-lived access token (scope `instagram_business_basic`).
3. Set `INSTAGRAM_ACCESS_TOKEN`.
4. The token expires 60 days after it is issued or refreshed. Before then, run `npm run instagram:refresh`, which prints a new token and its expiry date, and paste it into Vercel. A calendar reminder at ~50 days works. If it lapses, the site quietly falls back to the static posts.

If both variables are set, Behold wins.

## Quote form

The form posts to a server action without reloading the page. The browser enforces the required fields (name and phone), the server validates again, drops bot submissions caught by a hidden honeypot field, limits each IP to five requests an hour, and emails the request to the owner. On success the button reads **"Sent. Kris will be in touch"**.

The email (`src/emails/BusinessNotification.tsx`, React Email) shows the customer's details and the job, with a **Reply on WhatsApp** button that opens a chat with the customer's number. Seven-digit local numbers get the +1 246 prefix automatically.

Setup:

1. Create a [Resend](https://resend.com) account and an API key → `RESEND_API_KEY`.
2. Set `QUOTE_TO` to the address that should receive requests (comma-separate several).
3. Verify the sending domain in Resend and set `EMAIL_FROM`, e.g. `Precision Welding Solutions <quotes@yourdomain.com>`. Until the domain is verified, leave `EMAIL_FROM` unset: Resend's sandbox sender only delivers to the email address that owns the Resend account.

In local development without these variables, a submitted request is printed to the terminal and the form still shows the success state. In production, missing configuration shows the visitor an error with the WhatsApp link instead.

The form does not ask for an email address (the design doesn't), so there is no customer confirmation email.

## Environment variables

Copy `.env.local.example` to `.env.local` for local development and add the same variables to the Vercel project (Settings → Environment Variables).

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, robots, JSON-LD, OG image | Full URL, no trailing slash. On Vercel it can stay unset until the domain is live (the Vercel production URL is used) |
| `RESEND_API_KEY` | Quote emails | From resend.com |
| `QUOTE_TO` | Quote emails | Recipient address(es) |
| `EMAIL_FROM` | Quote emails | Sender on a Resend-verified domain. Unset = sandbox sender |
| `INSTAGRAM_FEED_URL` | Instagram grid (Option A) | Behold JSON feed URL |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram grid (Option B) | Long-lived token, refreshed every < 60 days |
| `PING_SECRET` | `/api/seo/ping` | Any long random string. `.env.local` already has one for local use |

## SEO

- `src/app/layout.tsx`: title, description, canonical, Open Graph and Twitter tags, and `LocalBusiness` JSON-LD (address, geo from the Google Maps plus code 5C42+G6, Sunday 08:00–13:00 hours, Instagram `sameAs`).
- `src/app/page.tsx`: the services as `ItemList` and `Service` + `OfferCatalog` JSON-LD.
- `src/app/opengraph-image.tsx`: branded 1200×630 share card (spark photo, logo, headline, WhatsApp number). It renders once at build time on Node and is re-encoded as a ~70 KB JPEG, because WhatsApp silently drops link-preview images over ~300 KB; a photo card as PNG is ~650 KB.
- `src/app/sitemap.ts`, `src/app/robots.ts`: one URL; `/admin` and `/api/` disallowed.
- `GET /api/seo/ping?token=PING_SECRET` (or `Authorization: Bearer …`) pings Google and Bing with the sitemap. Google retired its ping endpoint in 2023 and answers 404, so also submit `/sitemap.xml` once in Google Search Console.
- Structured-data helpers (`createMetadata`, `createServiceSchema`, `createBreadcrumbSchema`, …) are in `src/lib/metadata.ts`.

## Deployment (Vercel)

1. Push the project to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repository. Framework preset: Next.js; no overrides.
3. Add the environment variables above.
4. Deploy. Add the client's domain under **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
6. Check the live site in [PageSpeed Insights](https://pagespeed.web.dev).

### Building on an exFAT drive

`next build` fails on exFAT/FAT volumes (like this project's `F:` drive) with `EISDIR: illegal operation on a directory, readlink`. `npm run build:exfat` preloads `scripts/exfat-fs-fix.cjs`, which translates that error into the one Next expects. `next dev` and Vercel builds don't need it.

### Measuring performance locally

Local Lighthouse runs on this machine under-report mobile performance. Chrome here records each response's decompressed size as its transfer size, so Lighthouse's simulated throttling treats the gzipped page as uncompressed (about 5× larger). Measured with DevTools throttling instead (`--throttling-method=devtools`), the production build scored 96 performance / 97 accessibility / 100 best practices / 100 SEO on mobile (2026-09-28). Results also swing with whatever else the machine is running: on a busy day the same build scored 44–63, so compare versions side by side in one session rather than against an old number, and confirm on the deployed URL with PageSpeed Insights.

## Design notes

- Colours, type, spacing and copy follow the handoff. At 1280px the layout matches the reference to within a pixel.
- Photo sections (Services, Why us, Contact) keep their photo still while the text scrolls: the section has `clip-path: inset(0)` and the photo sits in a `position: fixed` layer (`src/components/FixedBackground.tsx`). This works on iOS, unlike `background-attachment: fixed`.
- Below-the-fold blocks use `content-visibility: auto` (`cv-auto`) so phones skip laying them out until they near the screen. Never put it on a `.fixed-bg` section itself; it would break the fixed photo.
- Responsive decisions the handoff left open: the nav collapses into a menu below 832px (the full bar needs about 806px); the Instagram grid is two columns on phones; the design's faintest grey `#6b7480` is lifted to `#77808c` where it is used for text so it meets 4.5:1 (it stays `#6b7480` for borders); the Google map is shown with a dark filter to match the page; the design-tool note under the Instagram grid ("Feed pulls the latest 6 posts…") is omitted.
- White on the brand blue `#1e7fe0` is 4.06:1: fine for the large headline in the WhatsApp band, below 4.5:1 for small button labels and the light-blue sub-labels (Lighthouse's one accessibility finding). It is left as designed because it is a brand decision. Darkening text-bearing blue surfaces to `#1a73d0` (4.77:1 with white) would clear it: change `--color-blue` in `src/app/globals.css`.
