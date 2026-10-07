import { getInstagramFeed } from "@/lib/instagram";
import { createServiceSchema, createServicesListSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Contact } from "@/components/sections/Contact";

/** Static page, regenerated at most every 3 hours so the Instagram grid stays current. Matches INSTAGRAM_REVALIDATE_SECONDS. */
export const revalidate = 10800;

export default async function HomePage() {
  const feed = await getInstagramFeed();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-[4px] focus:bg-blue-strong focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <InstagramFeed posts={feed.posts} />
        <Contact />
      </main>
      <SiteFooter />
      <MobileActionBar />
      <FloatingWhatsApp />
      <JsonLd data={[createServicesListSchema(), createServiceSchema()]} />
    </>
  );
}
