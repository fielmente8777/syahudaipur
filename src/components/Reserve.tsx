import Image from "next/image";
import { contact, tripadvisor, whatsappUrl } from "@/content/site";
import ReservationForm from "./ReservationForm";
import { Eyebrow, MailIcon, PhoneIcon, SectionTitle, WhatsAppIcon } from "./ui";

const contactLinkClass = "flex min-h-11 items-center gap-3 text-[17px] text-cream";

export function Reserve() {
  return (
    <section id="reserve" className="border-t border-[rgba(238,231,218,0.08)] bg-ink-2">
      <div className="wrap section-y flex flex-wrap gap-[clamp(40px,6vw,88px)]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow>Reservations</Eyebrow>
            <SectionTitle>Reserve your evening at Syah</SectionTitle>
            <p className="m-0 text-[17px] leading-[1.7] text-copy">
              We seat only six tables each evening. Send a request and our team will confirm your
              table on WhatsApp.
            </p>
          </div>
          <ReservationForm />
        </div>

        <aside className="flex flex-[1_1_340px] flex-col gap-7">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/napkin.webp"
              alt="A folded Syah napkin on a set table"
              fill
              sizes="(max-width: 960px) 100vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="m-0 mb-3 text-[12px] font-medium tracking-[0.18em] text-label uppercase">
              Prefer to talk?
            </p>
            <a href={whatsappUrl} className={contactLinkClass}>
              <WhatsAppIcon size={20} color="#C49A6C" />
              WhatsApp {contact.whatsappDisplay}
            </a>
            <a href={`tel:${contact.phone}`} className={contactLinkClass}>
              <PhoneIcon color="#C49A6C" />
              Call the restaurant
            </a>
            <a href={`mailto:${contact.email}`} className={contactLinkClass}>
              <MailIcon color="#C49A6C" />
              {contact.email}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[rgba(238,231,218,0.10)] max-[760px]:pb-24">
      <div className="wrap flex flex-wrap items-start justify-between gap-8 py-14">
        <div className="flex flex-col gap-2.5">
          <Image
            src="/images/syah-logo.svg"
            alt="Syah"
            width={147}
            height={80}
            unoptimized
            className="h-20 w-auto self-start"
          />
          <span className="text-[14px] leading-[1.7] text-label">
            {contact.address.line1}
            <br />
            {contact.address.line2}
          </span>
        </div>
        <div className="flex max-w-[420px] flex-col gap-2.5">
          <a
            href={tripadvisor.url}
            className="inline-flex min-h-11 items-center text-[14px] tracking-[0.12em] text-gold uppercase underline"
          >
            Syah on Tripadvisor →
          </a>
          <span className="text-[13px] leading-[1.7] text-muted">
            Rating, ranking and reviews from Tripadvisor as of {tripadvisor.asOf}. Review excerpts
            are shortened; translated reviews use Tripadvisor&apos;s translation.
          </span>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 hidden gap-2.5 border-t border-[rgba(238,231,218,0.14)] bg-[rgba(15,14,12,0.94)] px-4 py-3 backdrop-blur-[10px] max-[760px]:flex">
      <a
        href="#reserve"
        className="inline-flex min-h-[50px] flex-auto items-center justify-center bg-gold text-[14px] font-semibold tracking-[0.14em] text-dark uppercase"
      >
        Reserve a table
      </a>
      <a
        href={whatsappUrl}
        aria-label="WhatsApp Syah"
        className="inline-flex min-h-[50px] flex-[0_0_50px] items-center justify-center border border-[rgba(238,231,218,0.5)] text-cream"
      >
        <WhatsAppIcon size={22} />
      </a>
    </div>
  );
}
