import Image from "next/image";
import { dishes, reasons } from "@/content/site";
import { Eyebrow, SectionTitle } from "./ui";

export function Reasons() {
  return (
    <section className="border-t border-[rgba(238,231,218,0.08)] bg-ink-2">
      <div className="wrap section-y flex flex-col gap-[clamp(64px,8vw,104px)]">
        <div className="flex max-w-[700px] flex-col gap-4">
          <Eyebrow>Why travellers rate us 5.0</Eyebrow>
          <SectionTitle>Three reasons to make Syah your evening in Udaipur</SectionTitle>
        </div>

        {reasons.map((reason, index) => (
          <div
            key={reason.number}
            className={`flex flex-wrap items-center gap-[clamp(32px,5vw,72px)] ${
              index % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full min-w-0 flex-[1_1_520px]">
              <Image
                src={reason.image}
                alt={reason.alt}
                fill
                sizes="(max-width: 760px) 100vw, 640px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-[1_1_380px] flex-col gap-5">
              <span className="font-serif text-[64px] leading-none text-gold">{reason.number}</span>
              <h3 className="m-0 font-serif text-[clamp(30px,3vw,40px)] leading-[1.12] font-medium text-ivory">
                {reason.title}
              </h3>
              <p className="m-0 text-[17px] leading-[1.75] text-copy">{reason.body}</p>
              <p className="m-0 text-[15px] leading-[1.6] text-gold">{reason.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MenuGrid() {
  return (
    <section id="menu" className="wrap section-y flex flex-col gap-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[640px] flex-col gap-4">
          <Eyebrow>From the tasting menu</Eyebrow>
          <SectionTitle>Dishes travellers write home about</SectionTitle>
        </div>
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.65] text-label">
          The menu changes with the seasons, so your evening may differ from the dishes shown here.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-6 gap-y-8">
        {dishes.map((dish) => (
          <figure key={dish.name} className="m-0 flex flex-col gap-3.5">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={dish.image}
                alt={dish.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <figcaption className="font-serif text-[21px] leading-[1.3] text-cream">
              {dish.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
