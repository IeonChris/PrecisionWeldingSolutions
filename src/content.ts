/**
 * Every word, number, link and photo on the site lives in this file.
 *
 * To swap a photo: drop the new file in /public/images and change its `src` below.
 * Set `src: null` to show the dark captioned placeholder instead.
 */

export interface SiteImage {
  /** Path under /public, or null to render the captioned placeholder. */
  src: string | null;
  alt: string;
  /** Shown on the placeholder, and a note of what the final photo should be. */
  placeholder: string;
  /** CSS object-position for the crop. Defaults to "50% 50%". */
  position?: string;
}

/* ---------- Business ---------- */

export const business = {
  name: "Precision Welding Solutions",
  shortName: "Precision Welding",
  description:
    "Welding, fabrication and machining in St. Thomas, Barbados. Thread repairs, seized glow and spark plug removal, aluminum TIG welding, custom fabrication, machining and on-site repairs.",
  owner: "Kris",
  /** Production domain. NEXT_PUBLIC_SITE_URL overrides it. Placeholder until the domain is chosen. */
  url: "https://precision-welding-solutions.vercel.app",
  phone: {
    display: "+1 (246) 252-5877",
    e164: "+12462525877",
    href: "tel:+12462525877",
  },
  whatsappUrl: "https://wa.me/12462525877",
  instagram: {
    handle: "precision_weldingsolutions",
    url: "https://instagram.com/precision_weldingsolutions",
  },
  address: {
    street: "Reece Rd",
    locality: "Bridgetown",
    region: "Saint Thomas",
    regionShort: "St. Thomas",
    country: "Barbados",
    countryCode: "BB",
  },
  /** From the Google Maps plus code 5C42+G6 on the business listing. */
  geo: { latitude: 13.156313, longitude: -59.599438 },
  mapQuery: "Precision Welding Solutions, Reece Rd, Bridgetown, Saint Thomas, Barbados",
  hours: {
    short: "Sun 8 AM – 1 PM · Other days by appointment",
    days: "Sunday 8 AM – 1 PM",
    note: "Weekdays by appointment",
    footer: "Sun 8 AM to 1 PM · Weekdays by appointment",
    /** Structured-data hours (schema.org openingHoursSpecification). */
    schema: [{ dayOfWeek: "Sunday", opens: "08:00", closes: "13:00" }],
  },
  credit: { name: "beCALM Group LTD.", url: "https://becalmgroup.com" },
} as const;

/* ---------- Photos ---------- */

export const images = {
  logo: {
    src: "/images/logo.png",
    alt: "Precision Welding Solutions",
    placeholder: "Logo",
  },
  hero: {
    // Getty preview (placeholder). Must be licensed or replaced with Kris's own photo before launch.
    src: "/images/hero-welder.jpg",
    alt: "Welder in a helmet laying a bead, sparks flying across the bench",
    placeholder: "Drop a wide shot of Kris welding (sparks, dark background)",
    position: "70% 50%",
  },
  servicesBg: {
    // Getty preview (placeholder), same photo as the design's weld-bg.png.
    src: "/images/weld-bg.jpg",
    alt: "",
    placeholder: "Wide workshop shot: welder in helmet, sparks (stays fixed while text scrolls)",
  },
  about: {
    // Getty preview (placeholder). Replace with a photo of Kris at the bench or lathe.
    src: "/images/workshop-grinder.jpg",
    alt: "Cutting steel with an angle grinder in the workshop",
    placeholder: "Photo of Kris at the bench / lathe",
    position: "62% 50%",
  },
  whyBg: {
    src: "/images/weld-bg.jpg",
    alt: "",
    placeholder: "Background photo",
  },
  contactBg: {
    src: "/images/weld-bg.jpg",
    alt: "",
    placeholder: "Background photo",
  },
} satisfies Record<string, SiteImage>;

/* ---------- Navigation ---------- */

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why us" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Instagram feed" },
  { href: "#contact", label: "Contact" },
] as const;

/* ---------- Hero ---------- */

export const hero = {
  eyebrow: "St. Thomas, Barbados",
  titleLines: ["Precision welding.", "Clean. Strong."],
  titleAccent: "Exact.",
  sub: "Thread repairs, plug extraction, aluminum welding, fabrication and machining.",
  secondaryCta: { href: "#work", label: "See recent work" },
} as const;

/* ---------- Intro ---------- */

export const intro = {
  eyebrow: "Precision Welding Solutions",
  title: "Welding, fabrication and machining under one roof in St. Thomas",
  body: "Run by Kris, a fabricator, welder and machinist with 20 years of experience. From seized glow plugs to full custom frames, every job leaves the shop back to spec.",
  stat: { value: "20+", label: "Years experience" },
  pillars: ["Stronger connections", "Quality work", "Lasting solutions"],
} as const;

/* ---------- Services ---------- */

export const servicesIntro = {
  eyebrow: "What we do",
  title: "Our",
  titleAccent: "services",
  body: "If it's metal and it's broken, stripped, cracked or doesn't exist yet, bring it in or send a photo on WhatsApp.",
  cta: {
    title: "Not sure what you need?",
    body: "Send a photo of the part. You'll get a straight answer and a price.",
    button: "Message on WhatsApp",
  },
} as const;

export const services = [
  {
    num: "01",
    title: "Thread repairs",
    desc: "Stripped, cross-threaded or damaged threads restored: heli-coil, time-sert, re-tap or weld and re-cut to original spec.",
    tags: "Restore · Repair · Reuse",
  },
  {
    num: "02",
    title: "Glow & spark plug removal",
    desc: "Seized or snapped glow plugs and spark plugs extracted without pulling the head. Thread repaired if needed.",
    tags: "Diesel · Petrol · Heads",
  },
  {
    num: "03",
    title: "Aluminum welding",
    desc: "TIG welding of cracked housings, intakes, tanks, wheels and castings. Clean beads, full penetration.",
    tags: "Clean · Strong · Precision",
  },
  {
    num: "04",
    title: "Fabrication",
    desc: "Custom frames, brackets, gates, racks and one-off parts in steel, stainless and aluminum. Built to last.",
    tags: "Custom · Durable · Professional",
  },
  {
    num: "05",
    title: "Machining",
    desc: "Turning, facing, boring and bushings. Parts made to fit when off-the-shelf won't.",
    tags: "Lathe · Fit · Tolerance",
  },
  {
    num: "06",
    title: "Flange & exhaust work",
    desc: "V-band conversions, flange changes, broken exhaust ears and manifold repairs.",
    tags: "V-band · Manifold · Repair",
  },
  {
    num: "07",
    title: "Mobile / on-site",
    desc: "Can't bring it in? On-site welding and repair across Barbados for equipment, gates and structures.",
    tags: "Island-wide · By arrangement",
  },
] as const;

/* ---------- About ---------- */

export const about = {
  eyebrow: "About",
  title: "Fabricator, welder and machinist. One shop, one standard.",
  paragraphs: [
    "Precision Welding Solutions is run by Kris, a fabricator, welder and machinist with over 20 years of experience, working out of Reece Rd, St. Thomas. Most jobs that come through the door are things other shops turned away: seized glow plugs, stripped threads, snapped studs, cracked aluminum housings.",
    "Having machining and welding under one roof means a repair isn't just patched. It's brought back to spec.",
  ],
  points: [
    "Welding + machining in one shop",
    "Steel, stainless & aluminum",
    "Straight answers, honest pricing",
    "Photos quoted over WhatsApp",
  ],
  nameplate: { name: "Kris", role: "Owner · Machinist" },
  cta: "Talk to Kris",
} as const;

/* ---------- Why us ---------- */

export const whyIntro = {
  eyebrow: "Why choose us",
  title: "Stronger connections. Quality work. Lasting solutions.",
} as const;

export const reasons = [
  {
    num: "01",
    title: "Repaired to spec",
    desc: "Not a patch job. Threads, fits and welds brought back to original tolerance so the fix holds.",
  },
  {
    num: "02",
    title: "Saves the part",
    desc: "Seized plugs, snapped studs and cracked castings recovered instead of replaced. Cheaper than a new head or housing.",
  },
  {
    num: "03",
    title: "One point of contact",
    desc: "You deal with Kris from quote to pickup. No handoffs, no surprises.",
  },
  {
    num: "04",
    title: "Local, island-wide",
    desc: "Based in St. Thomas, five minutes from Bridgetown. Mobile service anywhere in Barbados.",
  },
] as const;

/* ---------- Instagram ---------- */

export const instagramIntro = {
  eyebrow: "Latest from Instagram",
  button: "Follow on Instagram",
} as const;

/**
 * Shown when no live feed is configured or the fetch fails. Give a post an `image`
 * (path under /public) and an `href` (the post's link) to show a real photo.
 */
export const instagramFallbackPosts: {
  id: string;
  caption: string;
  isVideo: boolean;
  image?: string;
  href?: string;
}[] = [
  { id: "ig1", caption: "Remove seized or broken glow plugs. Spark plugs also. Thread repairs.", isVideo: true },
  { id: "ig2", caption: "No threads? Internal nut broken off.", isVideo: true },
  { id: "ig3", caption: "Tap & drill chart: fractional / wire / letter / metric", isVideo: true },
  { id: "ig4", caption: "Changing flange to a V-band flange", isVideo: true },
  { id: "ig5", caption: "Broken ear? Don't fear. We gone clear.", isVideo: true },
  { id: "ig6", caption: "Failed universal joint?", isVideo: true },
];

/* ---------- WhatsApp band ---------- */

export const whatsappBand = {
  title: "Send a photo. Get a price.",
  body: "Fastest way to reach the shop is WhatsApp, usually answered same day.",
} as const;

/* ---------- Contact ---------- */

export const contact = {
  eyebrow: "Contact",
  title: "Find the shop",
  phoneNote: "Call or WhatsApp",
  mapTitle: "Map: Precision Welding Solutions on Reece Rd, St. Thomas",
  form: {
    title: "Request a quote",
    descriptionPlaceholder: "What is it, what's wrong, material if you know it…",
    submit: "Send request",
    sending: "Sending…",
    sent: "Sent. Kris will be in touch",
    note: "Photos help. Attach them on WhatsApp after you send this.",
  },
} as const;

/** Options in the quote form's Service dropdown. */
export const serviceOptions = [
  "Thread repair",
  "Glow / spark plug removal",
  "Aluminum welding",
  "Fabrication",
  "Machining",
  "Flange / exhaust work",
  "On-site service",
  "Something else",
] as const;

/* ---------- Footer ---------- */

export const footer = {
  blurb:
    "Welding, fabrication and machining in Barbados. 20+ years of stronger connections, quality work and lasting solutions.",
  serving: "Serving St. Thomas, Bridgetown & All of Barbados",
} as const;
