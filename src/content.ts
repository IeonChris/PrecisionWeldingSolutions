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
    "Welding and fabrication in St. Thomas, Barbados. Thread repairs, seized glow and spark plug removal, aluminum TIG welding, custom fabrication and on-site repairs.",
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
    days: "Sunday 8 AM – 1 PM",
    note: "Weekdays by appointment",
    footer: "Sun 8 AM to 1 PM · Weekdays by appointment",
    /** Structured-data hours (schema.org openingHoursSpecification); also drives the nav's open/closed status. */
    schema: [{ dayOfWeek: "Sunday", opens: "08:00", closes: "13:00" }],
    /** Barbados is UTC−4 all year (no daylight saving). */
    utcOffsetHours: -4,
  },
  credit: { name: "beCALM Group LTD.", url: "https://becalmgroup.com" },
} as const;

/** Prefilled first lines for WhatsApp links. `{service}` is replaced with the service title. */
export const whatsappMessages = {
  photo: "Hi Kris, here is a photo of the part.",
  service: "Hi Kris, I need help with: {service}. Photo attached.",
} as const;

/* ---------- Photos ---------- */

export const images = {
  logo: {
    src: "/images/logo.png",
    alt: "Precision Welding Solutions",
    placeholder: "Logo",
  },
  hero: {
    // First frame of the hero video (`heroVideo` below): shown instantly, and on its own when motion is off.
    src: "/images/hero-cutting-poster.jpg",
    alt: "Kris cutting steel with a torch in the shop, sparks pouring onto the floor",
    placeholder: "Drop a wide shot of Kris welding (sparks, dark background)",
    position: "40% 45%",
  },
  about: {
    src: "/images/kris-marina.jpg",
    alt: "Kris on a marina dock with his TIG torch, beside the aluminum frame he is welding",
    placeholder: "Photo of Kris at work",
  },
  contactBg: {
    src: "/images/shop-front.jpg",
    alt: "",
    placeholder: "Background photo",
    position: "50% 45%",
  },
  /** Photo half of the link-preview card (src/app/opengraph-image.tsx). */
  share: {
    src: "/images/og-cutting.jpg",
    alt: "",
    placeholder: "Share card photo",
  },
} satisfies Record<string, SiteImage>;

/**
 * Silent looping clip behind the hero, played after the page has loaded (never under
 * reduced motion or Data Saver; `images.hero` shows instead). Set to null for the photo alone.
 * `desktopLayout`: "panel" keeps a portrait clip in the right half of the hero on desktop,
 * fading into the black behind the headline; use "full" for a landscape clip (1920px+ wide).
 */
export const heroVideo: { src: string; desktopLayout: "panel" | "full" } | null = {
  src: "/media/hero-cutting.mp4",
  desktopLayout: "panel",
};

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

export const nav = {
  whatsapp: "WhatsApp",
  /** Open/closed status beside the WhatsApp button (from 1100px). Keep in step with `business.hours`. */
  status: { open: "Open now · until 1 PM", closed: "Opens Sunday 8 AM" },
} as const;

/** Phone-only bottom bar (below 832px). */
export const mobileBar = {
  call: "Call",
  photo: "Send a photo",
} as const;

/* ---------- Hero ---------- */

export const hero = {
  eyebrow: "Welding & fabrication · St. Thomas",
  title: "Seized, stripped or cracked?",
  titleAccent: "Fixed to spec.",
  sub: "Send Kris a photo of the part. You'll get a straight answer and a price, usually the same day.",
  primaryCta: "Send a photo on WhatsApp",
  /** Followed by the phone number. */
  callCta: "Call",
  proof: [
    { value: "20+ years", label: "Welding & fabrication in Barbados" },
    { value: "Steel · SS · Alu", label: "TIG welding, clean full-penetration beads" },
    { value: "Island-wide", label: "On-site repairs by arrangement" },
  ],
} as const;

/* ---------- Services ---------- */

export const servicesIntro = {
  eyebrow: "What we fix & build",
  titleLines: ["If it's metal,", "it's a job."],
  body: "Broken, stripped, cracked, or doesn't exist yet. Bring it to Reece Rd or send a photo first.",
  help: {
    lead: "Not sure what you need?",
    body: "Send a photo of the part. You'll get a straight answer and a price.",
    button: "Message on WhatsApp",
  },
  /** Read out after each service row by screen readers. */
  rowAction: "Ask Kris on WhatsApp",
} as const;

/** Each row opens WhatsApp with `whatsappMessages.service`. The structured data reads `title` and `desc`. */
export const services = [
  {
    title: "Thread repairs",
    desc: "Stripped, cross-threaded or damaged threads brought back to original spec.",
    methods: "Heli-coil · Time-sert · Re-tap · Weld & re-cut",
  },
  {
    title: "Glow & spark plug removal",
    desc: "Seized or snapped plugs extracted without pulling the head. Thread repaired if needed.",
    methods: "Diesel · Petrol · Aluminum heads",
  },
  {
    title: "Aluminum welding",
    desc: "TIG welding with clean beads and full penetration.",
    methods: "Housings · Intakes · Tanks · Wheels · Castings",
  },
  {
    title: "Fabrication",
    desc: "Custom, one-off parts built to last.",
    methods: "Frames · Brackets · Gates · Racks · Steel, stainless & aluminum",
  },
  {
    title: "Flange & exhaust work",
    desc: "V-band conversions, flange changes and manifold repairs.",
    methods: "V-band · Flanges · Broken ears · Manifolds",
  },
  {
    title: "Mobile / on-site",
    desc: "Can't bring it in? On-site welding and repair anywhere in Barbados.",
    methods: "Equipment · Gates · Structures · By arrangement",
  },
] as const;

/* ---------- About ---------- */

export const about = {
  eyebrow: "About",
  title: "Welder and fabricator. One shop, one standard.",
  paragraphs: [
    "Precision Welding Solutions is run by Kris, a welder and fabricator with over 20 years of experience, working out of Reece Rd, St. Thomas. Most jobs that come through the door are things other shops turned away: seized glow plugs, stripped threads, snapped studs, cracked aluminum housings.",
    "Having welding and fabrication under one roof means a repair isn't just patched. It's brought back to spec.",
  ],
  points: [
    "Welding + fabrication in one shop",
    "Steel, stainless & aluminum",
    "Straight answers, honest pricing",
    "Photos quoted over WhatsApp",
  ],
  nameplate: { name: "Kris", role: "Owner · Welder" },
  cta: "Talk to Kris",
} as const;

/* ---------- Why us ---------- */

export const whyIntro = {
  eyebrow: "Why choose us",
  title: "Stronger connections. Quality work. Lasting solutions.",
  note: "No stock photos. Every picture here is a job Kris did himself.",
} as const;

/** Each reason pairs with one of Kris's job photos; `chip` is the caption on the photo. */
export const reasons: {
  num: string;
  title: string;
  desc: string;
  chip: string;
  image: SiteImage;
}[] = [
  {
    num: "01",
    title: "Repaired to spec",
    desc: "Not a patch job. Threads, fits and welds brought back to original tolerance so the fix holds.",
    chip: "TIG · boat rail mount",
    image: {
      src: "/images/boat-rail-weld.jpg",
      alt: "TIG-welding a rail mount on a fishing boat",
      placeholder: "Job photo",
      position: "50% 30%",
    },
  },
  {
    num: "02",
    title: "Saves the part",
    desc: "Seized plugs, snapped studs and cracked castings recovered instead of replaced. Cheaper than a new head or housing.",
    chip: "Cutting stock in the shop",
    image: {
      src: "/images/hero-cutting-poster.jpg",
      alt: "Torch-cutting steel in the shop, sparks falling to the floor",
      placeholder: "Job photo",
      position: "40% 45%",
    },
  },
  {
    num: "03",
    title: "One point of contact",
    desc: "You deal with Kris from quote to pickup. No handoffs, no surprises.",
    chip: "Fabrication · steel frame",
    image: {
      src: "/images/frame-job.png",
      alt: "Custom welded steel frame",
      placeholder: "Job photo",
      position: "50% 50%",
    },
  },
  {
    num: "04",
    title: "Local, island-wide",
    desc: "Based in St. Thomas, five minutes from Bridgetown. Mobile service anywhere in Barbados.",
    chip: "On-site · steel I-beam",
    image: {
      src: "/images/ibeam-weld.jpg",
      alt: "Stick-welding a steel I-beam on site",
      placeholder: "Job photo",
      position: "50% 40%",
    },
  },
];

/* ---------- Instagram ---------- */

export const instagramIntro = {
  eyebrow: "Latest from Instagram",
  button: "Follow on Instagram",
  /** Screen-reader name of each tile, followed by the caption when the post has one. */
  postLabel: "Instagram post",
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

/* ---------- Footer ---------- */

export const footer = {
  blurb:
    "Welding and fabrication in Barbados. 20+ years of stronger connections, quality work and lasting solutions.",
  serving: "Serving St. Thomas, Bridgetown & All of Barbados",
} as const;
