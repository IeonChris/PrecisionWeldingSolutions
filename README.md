# Precision Welding Solutions

One-page marketing site for Precision Welding Solutions: welding and fabrication on Reece Rd, St. Thomas, Barbados. The goal of every section is to get a visitor to send Kris a photo of the part on WhatsApp, or to request a quote.

The approved design is the v3 redesign, `design_handoff/Redesign v3.dc.html`. The original handoff (`design_handoff/Precision Welding Solutions.dc.html`, spec in `design_handoff/README.md`) is beside it. Both are kept for reference and are not part of the build.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), TypeScript, React 19 |
| Styling | Tailwind CSS v4. The design tokens in `src/app/globals.css` are the only colours; Tailwind's default palette is disabled |
| Fonts | Montserrat (headings) and Open Sans (body) from Google Fonts through `next/font`, self-hosted at build time with `display: swap` |
| Page | `/` is static and regenerated at most hourly (ISR) so the Instagram ring stays fresh |
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

**Everything the visitor reads lives in `src/content.ts`**: phone, WhatsApp and Instagram links, address and hours (which also drive the nav's open/closed status), every heading and paragraph, the hero proof row, the six services and their method lines, the four reasons and their job photos, the prefilled WhatsApp messages, the Instagram fallback posts, every photo and the hero video.

To swap a photo:

1. Put the file in `public/images/` (JPEG or PNG; the site serves AVIF/WebP versions automatically).
2. Change that image's `src` in `src/content.ts` (in `images`, or in a `reasons` entry for the Why-us cards). Adjust `position` (CSS `object-position`) if the crop needs to move.
3. Set `src: null` to show the dark captioned placeholder instead.

Every photo shows Kris's own work (sent over WhatsApp, which strips location data).

| Slot | Current file | What it is |
| --- | --- | --- |
| `images.hero` | `hero-cutting-poster.jpg` | First frame of the hero video. Shows instantly, and on its own when the video can't play |
| `images.about` | `kris-marina.jpg` | Kris on a marina dock with his TIG torch (4:5 crop) |
| `images.contactBg` | `shop-front.jpg` | The shop on Reece Rd. Fixed behind the Contact section |
| `reasons[0].image` | `boat-rail-weld.jpg` | Why us 01: TIG-welding a rail mount on a fishing boat |
| `reasons[1].image` | `aluminum-frame-weld.jpg` | Why us 02: TIG-welding an aluminum frame at the bench |
| `reasons[2].image` | `vertical-weld.jpg` | Why us 03: TIG-welding a vertical joint, filler rod in hand |
| `reasons[3].image` | `ibeam-weld.jpg` | Why us 04: stick-welding a steel I-beam on site |
| `images.share` | `og-cutting.jpg` | Photo half of the link-preview card |
| `images.logo` | `logo.png` | The logo on black (round avatars, email header, structured data) |

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

The latest posts turn slowly on a 3D ring (`src/components/InstagramRing.tsx`, styles under "Instagram ring" in `globals.css`). Visitors can drag it (with a little momentum), hovering a tile pauses it, and keyboard users can Tab to a tile, which turns to the front, then use ←/→ to step round. Each tile opens its post in a new tab (unless the press was a drag), shows a play badge on videos, and reveals the first line of the caption (hashtags removed) on hover or focus. With "reduce motion" switched on, the ring only moves when dragged.

The ring sizes itself to however many posts come back, up to `MAX_POSTS` (12) in `src/lib/instagram.ts`. With 8 or fewer, each post appears twice (the copy is always on the hidden back side) so the ring has enough tiles to read as a ring: Behold's free plan sends 6, which fills 12 slots. Past ~12 posts the ring turns into a wide, shallow arc; raise `MAX_POSTS` with that in mind.

Posts are fetched on the server (the Instagram token never reaches the browser). The page refreshes hourly (`INSTAGRAM_REVALIDATE_SECONDS`, kept in step with `revalidate` in `src/app/page.tsx`); a Behold response is kept for 3 hours. With no feed configured, or if the feed fails, the six captions in `instagramFallbackPosts` (`src/content.ts`) are shown as dark placeholders.

**Option A: Behold (recommended, no upkeep).**

1. Create a free account at [behold.so](https://behold.so) and connect @precision_weldingsolutions.
2. Create a feed, choose **JSON** as the output, and copy the feed URL (`https://feeds.behold.so/…`).
3. Set `INSTAGRAM_FEED_URL` to that URL. Behold handles Instagram's token refreshes.

Behold's free plan updates the feed once a day, returns up to six posts, and allows 1,200 feed requests a month (every request to the JSON URL counts; images don't). Keeping its response for 3 hours uses at most ~250 of them. Paid plans send more posts (Starter, $10/month: 50, updated hourly); on one, `BEHOLD_REVALIDATE_SECONDS` can drop to `3600`.

**Option B: Instagram API directly.**

1. The Instagram account must be a Business or Creator account.
2. In the Meta developer dashboard, create a Business app with the *Instagram API with Instagram Login* product, add the account as a tester, and generate a long-lived access token (scope `instagram_business_basic`).
3. Set `INSTAGRAM_ACCESS_TOKEN`.
4. The token expires 60 days after it is issued or refreshed. Before then, run `npm run instagram:refresh`, which prints a new token and its expiry date, and paste it into Vercel. A calendar reminder at ~50 days works. If it lapses, the site quietly falls back to the static posts.

The API can return any of the account's posts (up to its 10,000 most recent); the site asks for `MAX_POSTS`.

If both variables are set, Behold wins.

## Quote form

The form has three fields: Name and Phone / WhatsApp (both required) and Describe the job. It posts to a server action without reloading the page. The browser enforces the required fields, the server validates again, drops bot submissions caught by a hidden honeypot field, limits each IP to five requests an hour, and emails the request to the owner (subject "Quote request: {name}"). On success the button reads **"Sent. Kris will be in touch"**.

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
| `INSTAGRAM_FEED_URL` | Instagram ring (Option A) | Behold JSON feed URL |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram ring (Option B) | Long-lived token, refreshed every < 60 days |
| `PING_SECRET` | `/api/seo/ping` | Any long random string. `.env.local` already has one for local use |

## SEO

- `src/app/layout.tsx`: title, description, canonical, Open Graph and Twitter tags, and `LocalBusiness` JSON-LD (address, geo from the Google Maps plus code 5C42+G6, hours of Mon–Sat 08:00–17:00 and Sun 08:00–13:00, Instagram `sameAs`).
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

Local Lighthouse runs on this machine under-report mobile performance, for two reasons:

- Chrome here records each response's decompressed size as its transfer size, so Lighthouse's simulated throttling treats the gzipped page as uncompressed (about 5× larger). Use DevTools throttling (`--throttling-method=devtools`) instead.
- Next 15.5 builds on **Windows** emit no font preload links: its font manifest plugin matches `'/next-font-loader/index.js?'` with forward slashes, which Windows module paths never contain, so `.next/server/next-font-manifest.json` stays empty. The fonts then arrive late and the hero headline can re-wrap (a one-off layout shift of ~0.1 in about one load in five). Vercel builds on Linux, where the preloads are emitted.

With the preloads in place (as on Vercel), the v3 redesign measured 89–98 performance (mean ~95), 100 accessibility, 100 best practices and 100 SEO on mobile with DevTools throttling, CLS ≤ 0.031 (2026-10-07). Results also swing with whatever else the machine is running, so compare versions side by side in one session rather than against an old number, and confirm on the deployed URL with PageSpeed Insights.

## Design notes

At 1280px the page matches `design_handoff/Redesign v3.dc.html` to within a pixel.

**Sections, top to bottom** (`src/app/page.tsx`):

1. **Nav** (`SiteNav`): logo, links, and from 832px a WhatsApp button; from 1100px an open/closed status (`ShopStatus`, worked out in the browser from `business.hours`, Barbados time). Below 832px: hamburger menu.
2. **Hero**: problem-led headline, "Send a photo on WhatsApp" + "Call" buttons, proof row. The video panel is `HeroMedia`.
3. **Services**: sticky intro on the left (from 768px), and a list of rows on the right; each row opens WhatsApp prefilled with that service.
4. **About**: Kris's photo and story.
5. **Why us**: four reasons, each with one of Kris's job photos.
6. **Instagram** (#work): the live feed on a turning 3D ring (see above).
7. **Contact**: details, map and the quote form over the fixed shop-front photo.
8. **Footer**, then the **mobile action bar** (Call / Send a photo, below 832px only, with a 72px spacer so it never covers the footer). The floating WhatsApp button shows from 832px up.

**Colour rules:**

- `--color-blue` (`#1e7fe0`) is for accents, rules, borders and avatar rings. Any blue fill that carries text uses `--color-blue-strong` (`#1a73d0`, 4.77:1 with white): every `btn-primary` and the About name plate. `--color-amber` is only the nav's "closed" dot.
- The design's faintest grey `#6b7480` is lifted to `#77808c` where it is text, so it meets 4.5:1 (it stays `#6b7480` for borders).
- Over the bright shop-front photo in Contact, the small labels and sub-lines use `muted` and the Instagram link `blue-hover`; with the scrim's middle stop at .82, every text element there measures 4.5:1 or better against the lightest part of the photo behind it.

**Mechanics:**

- Contact keeps its photo still while the text scrolls: the section has `clip-path: inset(0)` and the photo sits in a `position: fixed` layer (`src/components/FixedBackground.tsx`). This works on iOS, unlike `background-attachment: fixed`.
- Below-the-fold blocks use `content-visibility: auto` (`cv-auto`) so phones skip laying them out until they near the screen; each has a `--cv-h` height estimate per breakpoint (measured; it only affects the scrollbar before the block renders). Never put `cv-auto` on a `.fixed-bg` section itself; it would break the fixed photo.
- Other choices: the Google map has a dark filter to match the page, and anchor links stop 80px below the top so the sticky nav never covers a heading.
