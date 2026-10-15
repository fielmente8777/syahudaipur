import Image from "next/image";
import { tripadvisor, whatsappUrl } from "@/content/site";
import { AwardIcon, RankingIcon, Stars, WhatsAppIcon } from "./ui";

const navLinks = [
  { href: "#reviews", label: "Reviews" },
  { href: "#menu", label: "The menu" },
  { href: "#visit", label: "Plan your visit" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[820px] flex-col justify-end overflow-hidden bg-ink"
    >
      <Image
        src="/images/hero-night.webp"
        alt="Syah's garden and entrance lit at night on Kasotia Ji Farm"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[50%_60%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,14,12,0.70) 0%, rgba(15,14,12,0.10) 30%, rgba(15,14,12,0.55) 62%, #0F0E0C 100%)",
        }}
      />

      <header className="absolute inset-x-0 top-0 z-[2]">
        <div className="wrap flex items-center justify-between gap-6 py-7">
          <a href="#top" aria-label="Syah, back to top" className="flex items-center">
            <Image
              src="/images/syah-logo.svg"
              alt="Syah"
              width={118}
              height={64}
              unoptimized
              className="h-16 w-auto"
            />
          </a>
          <nav
            aria-label="Sections"
            className="flex items-center gap-8 text-[13px] tracking-[0.18em] uppercase max-[760px]:hidden"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[#DDD5C6]">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#reserve"
            className="inline-flex min-h-11 items-center justify-center border border-[rgba(238,231,218,0.55)] px-[22px] text-[13px] font-medium tracking-[0.18em] text-cream uppercase"
          >
            Reserve
          </a>
        </div>
      </header>

      <div className="wrap relative z-[1] flex w-full flex-wrap items-end justify-between gap-12 pt-40 pb-[72px]">
        <div className="flex max-w-[760px] min-w-0 flex-[1_1_560px] flex-col gap-7">
          <p className="m-0 text-[13px] font-medium tracking-[0.28em] text-gold uppercase">
            Travellers&apos; Choice 2026 · Kasotia Ji Farm, Udaipur
          </p>
          <h1 className="m-0 font-serif text-[clamp(46px,6.4vw,92px)] leading-[1.02] font-normal tracking-[-0.01em] text-ivory">
            A farm-to-table tasting menu, <span className="text-gold italic">rated 5.0</span> by
            travellers
          </h1>
          <p className="m-0 max-w-[560px] text-[18px] leading-[1.65] text-copy-2">
            An unhurried evening of contemporary Indian cuisine, cooked from the seasons and served
            among the fruit and vegetable garden at Bujra.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-1">
            <a
              href="#reserve"
              className="inline-flex min-h-[54px] items-center justify-center bg-gold px-8 text-[14px] font-semibold tracking-[0.16em] text-dark uppercase"
            >
              Reserve your table
            </a>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-[54px] items-center justify-center gap-2.5 border border-[rgba(238,231,218,0.55)] px-7 text-[14px] font-medium tracking-[0.16em] text-cream uppercase"
            >
              <WhatsAppIcon />
              WhatsApp us
            </a>
          </div>
        </div>

        <a
          href={tripadvisor.url}
          className="flex flex-[0_1_340px] flex-col gap-[18px] border border-[rgba(238,231,218,0.18)] bg-[rgba(15,14,12,0.72)] px-[30px] py-7 text-cream backdrop-blur-[10px]"
        >
          <span className="text-[12px] font-medium tracking-[0.24em] text-[#BDB4A4] uppercase">
            On Tripadvisor
          </span>
          <div className="flex items-center gap-3.5">
            <span className="font-serif text-[56px] leading-none text-ivory">
              {tripadvisor.rating}
            </span>
            <div className="flex flex-col gap-2">
              <Stars />
              <span className="text-[14px] text-copy-2">{tripadvisor.reviewCount} reviews</span>
            </div>
          </div>
          <div className="h-px bg-[rgba(238,231,218,0.16)]" />
          <div className="flex flex-col gap-2.5 text-[15px] text-[#E4DCCD]">
            <span className="flex items-center gap-2.5">
              <AwardIcon color="#C49A6C" />
              {tripadvisor.award}
            </span>
            <span className="flex items-center gap-2.5">
              <RankingIcon color="#C49A6C" />
              {tripadvisor.ranking}
            </span>
          </div>
          <span className="text-[13px] tracking-[0.08em] text-gold">Read the reviews →</span>
        </a>
      </div>
    </section>
  );
}
