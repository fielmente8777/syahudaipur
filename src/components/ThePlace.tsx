import Image from "next/image";
import { carouselReviews, kitchenPhotos } from "@/content/site";
import ReviewCarousel from "./ReviewCarousel";
import { Stars } from "./ui";

export default function ThePlace() {
  return (
    <>
      <section className="relative flex min-h-[620px] items-end overflow-hidden">
        <Image
          src="/images/dining-dusk.webp"
          alt="The dining room at dusk, tables set and lamps glowing"
          fill
          sizes="100vw"
          className="kb object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(15,14,12,0.15) 0%, rgba(15,14,12,0.88) 100%)",
          }}
        />
        <div className="wrap relative flex w-full flex-col gap-5 pt-[120px] pb-[72px]">
          <Stars size={13} />
          <ReviewCarousel reviews={carouselReviews} />
        </div>
      </section>

      <section aria-label="The kitchen and the team" className="wrap flex flex-wrap gap-6 pt-6">
        {kitchenPhotos.map((photo) => (
          <figure key={photo.image} className="m-0 flex flex-[1_1_520px] flex-col gap-3">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <figcaption className="text-[14px] text-label">{photo.caption}</figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}
