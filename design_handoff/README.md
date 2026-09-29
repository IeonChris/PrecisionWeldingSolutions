# Handoff: Precision Welding Solutions — one-page website

## Overview
Marketing site for Precision Welding Solutions, a welding / fabrication / machining shop run by Kris on Reece Rd, St. Thomas, Barbados. Goal: get visitors to send a photo of their part on WhatsApp and request a quote. Single long page, dark industrial look built from the brand logo (black, electric blue, silver).

## About the design files
`Precision Welding Solutions.dc.html` is a **high-fidelity HTML design reference**, not production code. Recreate it in the target stack (recommended: Next.js/Astro static site, or plain HTML + Tailwind) using its conventions. Copy exact colors, type, spacing and copy from this README and the reference file. `image-slot.js` and `support.js` are design-tool runtime files — do not ship them.

## Fidelity
High-fidelity. Layout, colors, typography, copy and hover states are final. Photos marked "drop zone" are placeholders awaiting the client's real photos.

## Page structure (top → bottom)
1. **Top strip** — #111418 bg, 13px #9aa4b0. Left: address, hours. Right: phone (tel: link, #e6e9ed 600), Instagram handle.
2. **Sticky nav** — rgba(10,11,13,.92) + backdrop-blur 10px, 1px #1d2229 bottom border. Logo (52px circle, 2px #1e7fe0 border, object-position 50% 38%) + wordmark "PRECISION / WELDING SOLUTIONS" (Montserrat 800 18px / 600 10px letter-spacing .28em #3b9dff). Links: Services, About, Why us, Work, Contact (15px 500 #c9ced4 → #fff hover). CTA "WhatsApp us" button (#1e7fe0 → #3b9dff hover, 10px 18px, radius 4).
3. **Hero (photo)** — min-height 640px, full-bleed photo (welder, sparks) with gradient scrim linear-gradient(90deg, rgba(10,11,13,.96) 0%, .75 50%, .2 100%). Content bottom-left, max 1200px, padding 120px 24px 80px. Eyebrow "ST. THOMAS, BARBADOS" (12px 600 .22em, 28×2px blue rule). H1 Montserrat 800 clamp(42px,5.6vw,84px) line-height .98, uppercase: "Precision welding. / Clean. Strong. **Exact.**" (Exact in #3b9dff). Sub 18px #c9ced4 max 520px. Buttons: primary "WhatsApp +1 (246) 252-5877", secondary outline (1px #6b7480) "See recent work" → #work.
4. **Intro strip** — #0f1216, 1px #1d2229 borders, padding 72px 24px. 2-col grid (minmax 300px). Left: eyebrow, H2 clamp(26px,3vw,40px) "Welding, fabrication and machining under one roof in St. Thomas", body about Kris (20 years experience). Right: 4-cell grid (auto-fit 140px, 2px #1d2229 gaps): "20+ / YEARS EXPERIENCE" tile on #1e7fe0, then 3 #0a0b0d tiles with a 22px blue hexagon and Montserrat 700 13px uppercase labels: Stronger connections · Quality work · Lasting solutions.
5. **Services** — fixed-background parallax: section has `position:relative; clip-path:inset(0)`; inside it a `position:fixed; inset:0` photo layer (weld-bg) so the image stays still while text scrolls; scrim linear-gradient(180deg, rgba(10,11,13,.78), .66 50%, .78). Centered content, padding 110px 24px 120px. Eyebrow "WHAT WE DO", H2 clamp(30px,3.8vw,52px) "OUR **SERVICES**", intro paragraph, 80×2px blue rule. 3-col grid (auto-fit 280px, gap 56px 40px), each item centered: number Montserrat 800 44px #fff, title Montserrat 700 20px uppercase #3b9dff, desc 15px #e6e9ed max 340px, tags 12px .16em uppercase #8b95a1. 8th cell: bordered (1px rgba(59,157,255,.5)) CTA "Not sure what you need?" + WhatsApp button.
6. **About** — #0f1216, padding 96px 24px, 2-col (minmax 320px, gap 56px). Left: 4:5 photo of Kris with blue L-corner accent (top-left, 3px #1e7fe0, 120px) and bottom-right name plate (#1e7fe0, "KRIS / OWNER · MACHINIST"). Right: eyebrow, H2 clamp(28px,3.4vw,46px), two paragraphs 17px #aeb6c0 line-height 1.7, 2-col checklist with 18px blue hexagon bullets, outline button "Talk to Kris".
7. **Why choose us** — same fixed-background treatment as Services (scrim .86/.78/.86). Centered heading "Stronger connections. Quality work. Lasting solutions." 4-col grid (auto-fit 240px, gap 28px): 3px #1e7fe0 top border, number 34px rgba(255,255,255,.28), title 18px uppercase, desc 15px.
8. **Instagram feed** (#work) — #0f1216. Header: 72px logo circle, eyebrow "LATEST FROM INSTAGRAM", H2 "@precision_weldingsolutions", "Follow on Instagram" button. Grid auto-fill 180px, gap 10px, square tiles; each: image, small play badge top-right (22px rgba(10,11,13,.6) box, white triangle), caption gradient bottom (13px 500). Connect to Instagram Basic Display / Graph API for the latest 6 posts (or a feed service like Behold/Elfsight); fallback to the 6 static posts listed below.
9. **WhatsApp CTA band** — #1e7fe0, diagonal stripe pattern repeating-linear-gradient(-45deg, transparent 0 40px, rgba(255,255,255,.06) 40px 80px), padding 72px. H2 "Send a photo. Get a price.", sub, black button with green dot "WhatsApp +1 (246) 252-5877".
10. **Contact** — fixed background again. 2-col: left info list (dl, labels 12px .12em uppercase #6b7480), 16:9 map embed (Google Maps: Reece Rd, Bridgetown, St Thomas). Right: form card #0f1216 1px #1d2229 padding 36px — Name, Phone/WhatsApp, Service select (Thread repair, Glow / spark plug removal, Aluminum welding, Fabrication, Machining, Flange / exhaust work, On-site service, Something else), Describe the job textarea, submit button. Inputs #0a0b0d, 1px #2a3340, focus border #3b9dff. After submit button reads "Sent. Kris will be in touch". Wire to email/WhatsApp notification (e.g. Formspree, Resend, or a Netlify function).
11. **Footer** — #050607, padding 72px 24px 40px. 3-col grid (auto-fit 240px): brand + blurb + blue address; Quick links (Home, Services, About, Instagram feed, Contact); Contact us with 18px blue stroke icons (phone, WhatsApp, Instagram, hours). Divider, then centered: "© 2026 Precision Welding Solutions. All rights reserved." (#c9ced4) / "Serving St. Thomas, Bridgetown & All of Barbados" (#3b9dff) / "Designed & Developed by beCALM Group LTD." (#6b7480, link #8b95a1).
12. **Floating WhatsApp button** — fixed right 22px bottom 22px, 58px circle #25d366, white WhatsApp glyph, shadow 0 8px 24px rgba(0,0,0,.45) + 6px rgba(37,211,102,.18) ring, hover lift 2px.

## Interactions
- Smooth scroll for anchor links (html { scroll-behavior: smooth }).
- All WhatsApp links: https://wa.me/12462525877. Phone: tel:+12462525877. Instagram: https://instagram.com/precision_weldingsolutions.
- Hover: buttons #1e7fe0 → #3b9dff; outline buttons border → #3b9dff; nav links → #fff.
- Fixed-background sections: implement with the clip-path + position:fixed technique above (works on iOS unlike background-attachment:fixed). Alternative: CSS background-attachment: fixed with mobile fallback to scroll.
- Responsive: all grids use auto-fit minmax so they collapse to 1 column; nav links should collapse to a menu below ~760px (not designed — use a simple hamburger).

## Design tokens
Colors: bg #0a0b0d · panel #0f1216 · strip #111418 · footer #050607 · border #1d2229 · input border #2a3340 · blue #1e7fe0 · blue-light #3b9dff · blue-tint #e6f1ff · text #e6e9ed · text-muted #aeb6c0 · text-dim #8b95a1 · text-faint #6b7480 · silver #c9ced4 · WhatsApp green #25d366.
Type: Headings Montserrat 700/800 (uppercase). Body Open Sans 400/500/600. Eyebrows 12px 600 letter-spacing .22em uppercase #3b9dff. Body 15–18px, line-height 1.6–1.7.
Spacing: section padding 96px 24px (hero 120/80, intro 72); container max-width 1200px; grid gaps 2px (tiled), 12–56px.
Radius: buttons 4px, inputs 3px, avatars 50%. No card radius elsewhere.

## Content
Services (number, title, description, tags):
01 Thread repairs — Stripped, cross-threaded or damaged threads restored: heli-coil, time-sert, re-tap or weld and re-cut to original spec. — Restore · Repair · Reuse
02 Glow & spark plug removal — Seized or snapped glow plugs and spark plugs extracted without pulling the head. Thread repaired if needed. — Diesel · Petrol · Heads
03 Aluminum welding — TIG welding of cracked housings, intakes, tanks, wheels and castings. Clean beads, full penetration. — Clean · Strong · Precision
04 Fabrication — Custom frames, brackets, gates, racks and one-off parts in steel, stainless and aluminum. Built to last. — Custom · Durable · Professional
05 Machining — Turning, facing, boring and bushings. Parts made to fit when off-the-shelf won't. — Lathe · Fit · Tolerance
06 Flange & exhaust work — V-band conversions, flange changes, broken exhaust ears and manifold repairs. — V-band · Manifold · Repair
07 Mobile / on-site — Can't bring it in? On-site welding and repair across Barbados for equipment, gates and structures. — Island-wide · By arrangement

Why us: 01 Repaired to spec · 02 Saves the part · 03 One point of contact · 04 Local, island-wide (full copy in the HTML).
Instagram fallback captions: see igPosts array in the HTML.
Business: +1 (246) 252-5877 · Reece Rd, Bridgetown, Saint Thomas, Barbados · Sunday 8 AM–1 PM, weekdays by appointment · @precision_weldingsolutions.

## Assets (assets/)
- logo.png — brand logo 640×640 on black (use for nav/footer avatars and og:image).
- weld-bg.png — fixed background photo (Getty preview, 612px, **must be licensed or replaced** before launch).
- frame-job.png — client job photo (steel frame) from Google Maps listing.
Still needed from client: hero photo (wide, dark, welder with sparks), portrait of Kris, 6 Instagram post images (or live feed), map embed.

## Files
- Precision Welding Solutions.dc.html — the design reference (inline styles; all copy lives here).
- CLAUDE_CODE_PROMPT.md — paste-ready prompt to start the build.
