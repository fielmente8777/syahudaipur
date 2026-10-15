import Image from "next/image";
import { contact, visitDetails } from "@/content/site";
import { Eyebrow, SectionTitle } from "./ui";

export default function Visit() {
  return (
    <section id="visit" className="wrap section-y flex flex-wrap gap-[clamp(40px,6vw,88px)]">
      <div className="flex flex-[1_1_380px] flex-col gap-6">
        <Eyebrow>Plan your visit</Eyebrow>
        <SectionTitle>Everything to know before you go</SectionTitle>
        <p className="m-0 text-[17px] leading-[1.75] text-copy">
          Syah serves dinner only, from July to April. Book ahead, and our cab can bring you from
          your hotel and back.
        </p>
        <div className="relative aspect-[3/2] w-full">
          <Image
            src="/images/tea-pour.webp"
            alt="Mint tea poured from a copper kettle into a clay cup"
            fill
            sizes="(max-width: 960px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </div>

      <dl className="m-0 flex flex-[1_1_520px] flex-col">
        {visitDetails.map((row, i) => (
          <div
            key={row.label}
            className={`flex flex-wrap gap-x-6 gap-y-2 border-t border-[rgba(238,231,218,0.14)] py-6 ${
              i === visitDetails.length - 1 ? "border-b" : ""
            }`}
          >
            <dt className="flex-[0_0_180px] text-[13px] font-medium tracking-[0.16em] text-label uppercase">
              {row.label}
            </dt>
            <dd
              className={`m-0 flex-[1_1_240px] text-[17px] leading-[1.6] text-cream ${
                row.maps ? "flex flex-col gap-2" : ""
              }`}
            >
              {row.value}
              {row.maps && (
                <a
                  href={contact.mapsUrl}
                  className="inline-flex min-h-11 items-center text-[14px] tracking-[0.12em] text-gold uppercase underline"
                >
                  Open in Maps →
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
