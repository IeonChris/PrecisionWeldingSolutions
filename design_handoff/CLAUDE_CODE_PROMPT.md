# Prompt for Claude Code

Build a production one-page marketing website for **Precision Welding Solutions** (welding, fabrication & machining, St. Thomas, Barbados) by recreating the attached high-fidelity HTML design reference.

## Inputs in this folder
- `README.md` — full spec: page structure, exact colors, typography, spacing, copy, interactions.
- `Precision Welding Solutions.dc.html` — the design reference. Open it in a browser to see the target. It uses inline styles; read the markup for exact values. Ignore `support.js`, `image-slot.js` and `<sc-for>/<sc-if>` tags (design-tool runtime); the data arrays for services, reasons and Instagram posts are in the `<script data-dc-script>` block at the bottom.
- `assets/` — logo.png, weld-bg.png, frame-job.png.

## Requirements
1. Stack: Astro (or Next.js static export) + Tailwind. Static hosting (Netlify/Vercel). Single `index` page with anchor sections: #services #about #why #work #contact.
2. Match the reference pixel-for-pixel at 1280px+; make it fully responsive down to 360px (grids collapse to one column, nav collapses to a hamburger, hero H1 uses the clamp() sizes given).
3. Fonts: Montserrat (headings, 700/800, uppercase) and Open Sans (body) via Google Fonts with display=swap.
4. Fixed-background sections (Services, Why us, Contact): the photo stays still while content scrolls. Use the `position:relative; clip-path:inset(0)` section + `position:fixed; inset:0` image layer technique (works on iOS). Add the gradient scrims from the README.
5. Instagram feed (#work): fetch the latest 6 posts. Implement via Instagram Graph API (long-lived token in env, build-time fetch with revalidation) OR an embeddable feed service; fall back to the 6 static captions/images from the spec if the fetch fails. Tiles are square, link to the post, show a play badge for videos and a caption gradient.
6. Contact form: Name, Phone/WhatsApp, Service (select), Describe the job. On submit send an email to the owner (Formspree, Resend or Netlify Forms), then show the "Sent. Kris will be in touch" state. Client-side required validation, no page reload.
7. Floating WhatsApp button (fixed bottom-right) and all CTAs link to https://wa.me/12462525877. Phone links use tel:+12462525877.
8. Image placeholders: where the design shows a drop zone (hero photo, Kris portrait, Instagram tiles, map), use a neutral dark placeholder component with a caption; make images easy to swap via a single `content.ts` file. Embed Google Maps for "Reece Rd, Bridgetown, Saint Thomas, Barbados" in the contact section.
9. SEO/meta: title "Precision Welding Solutions | Welding, Fabrication & Machining in Barbados", description, og:image (logo), LocalBusiness JSON-LD (name, phone, address, opening hours Sunday 08:00–13:00, sameAs Instagram).
10. Footer credit: "Designed & Developed by beCALM Group LTD."
11. Accessibility: semantic landmarks, alt text, visible focus rings (#3b9dff), 4.5:1 contrast for body text, 44px min tap targets on mobile.
12. Performance: optimize images (WebP/AVIF, lazy-load below the fold), Lighthouse 90+ mobile.

Deliver the repo with a README covering env vars (Instagram token, form endpoint), how to swap photos/copy, and deploy steps.
