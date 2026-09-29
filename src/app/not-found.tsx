import Image from "next/image";
import Link from "next/link";
import { business, images } from "@/content";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-base px-6 text-center">
      <Image
        src={images.logo.src}
        alt={business.name}
        width={120}
        height={120}
        sizes="120px"
        className="h-[120px] w-[120px] rounded-full border-2 border-blue object-cover"
        style={{ objectPosition: "50% 38%" }}
      />
      <p className="eyebrow m-0">Error 404</p>
      <h1 className="display m-0 text-[clamp(28px,4vw,46px)] leading-[1.05]">This page isn&apos;t in the shop</h1>
      <p className="m-0 max-w-[420px] text-[17px] leading-[1.6] text-muted">
        The link may be old. Everything lives on the home page, or send Kris a photo on WhatsApp.
      </p>
      <div className="flex flex-wrap justify-center gap-[14px]">
        <Link href="/" className="btn btn-primary px-7 py-4 text-[16px]">
          Back to the home page
        </Link>
        <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-7 py-4 text-[16px]">
          WhatsApp {business.phone.display}
        </a>
      </div>
    </main>
  );
}
