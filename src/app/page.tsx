import { getInstagramFeed } from "@/lib/instagram";
import { createServiceSchema, createServicesListSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { TopStrip } from "@/components/TopStrip";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { WhatsAppBand } from "@/components/sections/WhatsAppBand";
import { Contact } from "@/components/sections/Contact";

/** Static page, regenerated at most hourly so the Instagram grid stays current. */
export const revalidate = 3600;

export default async function HomePage() {
  const feed = await getInstagramFeed();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-[4px] focus:bg-blue focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <TopStrip />
      <SiteNav />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <About />
        <WhyUs />
        <InstagramFeed posts={feed.posts} />
        <WhatsAppBand />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <JsonLd data={[createServicesListSchema(), createServiceSchema()]} />
    </>
  );
}
