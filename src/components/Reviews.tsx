import { featuredReview, proofStats, reviewCards, tripadvisor } from "@/content/site";
import TripadvisorWidget from "./TripadvisorWidget";
import { Eyebrow, SectionTitle, Stars } from "./ui";

export function ProofStrip() {
  return (
    <section
      aria-label="Tripadvisor at a glance"
      className="border-y border-[rgba(238,231,218,0.10)]"
    >
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-8 py-11">
        {proofStats.map((stat) => (
          <div key={stat.label} className="flex flex-[1_1_200px] flex-col gap-1.5">
            <span className="font-serif text-[48px] leading-none text-ivory">{stat.value}</span>
            <span className="text-[13px] tracking-[0.16em] text-label uppercase">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="wrap section-y flex flex-col gap-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[640px] flex-col gap-4">
          <Eyebrow>You found us on Tripadvisor</Eyebrow>
          <SectionTitle>In travellers&apos; own words</SectionTitle>
        </div>
        <a
          href={tripadvisor.url}
          className="inline-flex min-h-11 items-center text-[14px] tracking-[0.12em] text-gold uppercase underline"
        >
          Read all {tripadvisor.reviewCount} reviews →
        </a>
      </div>

      <div className="flex flex-wrap gap-6">
        <figure className="m-0 flex flex-[1_1_440px] flex-col justify-between gap-10 border border-[rgba(238,231,218,0.10)] bg-ink-3 p-[clamp(32px,4vw,52px)]">
          <div className="flex flex-col gap-7">
            <Stars />
            <blockquote className="m-0 font-serif text-[clamp(30px,3.2vw,42px)] leading-[1.22] font-normal text-ivory italic">
              “{featuredReview.quote}”
            </blockquote>
          </div>
          <figcaption className="flex flex-col gap-1 text-[14px] text-label">
            <span className="text-[16px] font-medium text-cream">{featuredReview.author}</span>“
            {featuredReview.title}” · Tripadvisor, {featuredReview.date}
          </figcaption>
        </figure>

        <div className="grid flex-[1_1_560px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {reviewCards.map((review) => (
            <figure
              key={review.byline}
              className="m-0 flex flex-col gap-4 border border-[rgba(238,231,218,0.12)] p-7"
            >
              <Stars size={11} gap={4} />
              <p className="m-0 font-serif text-[22px] font-medium text-ivory">{review.title}</p>
              <blockquote className="m-0 text-[15px] leading-[1.65] text-[#D2CABB]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-auto text-[13px] text-muted">{review.byline}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8 bg-ivory p-[clamp(28px,4vw,48px)] text-dark">
        <div className="flex max-w-[560px] flex-[1_1_360px] flex-col gap-3.5">
          <p className="m-0 text-[13px] font-medium tracking-[0.28em] text-gold-deep uppercase">
            Live from Tripadvisor
          </p>
          <h3 className="m-0 font-serif text-[clamp(28px,3vw,38px)] leading-[1.15] font-medium text-dark">
            The latest reviews, straight from our Tripadvisor page
          </h3>
          <p className="m-0 text-[16px] leading-[1.7] text-[#4A4238]">
            Our ranking and the newest traveller reviews update here automatically. Dined with us
            already? We would love to hear how your evening was.
          </p>
        </div>
        <TripadvisorWidget />
      </div>
    </section>
  );
}
