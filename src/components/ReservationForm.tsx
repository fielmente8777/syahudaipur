"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, reservation, whatsappUrl } from "@/content/site";

type Field = "name" | "phone" | "date";

type Confirmation = { firstName: string; summary: string; url: string };

const labelClass = "text-[12px] font-medium tracking-[0.18em] text-label uppercase";

const guestLabel = (n: number) => (n === 1 ? "1 guest" : `${n} guests`);

function prettyDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function todayLocalISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(reservation.defaultGuests);
  const [time, setTime] = useState(reservation.defaultTime);
  const [menu, setMenu] = useState("");
  const [occasion, setOccasion] = useState(reservation.occasions[0]);
  const [cab, setCab] = useState(reservation.cabOptions[0]);
  const [notes, setNotes] = useState("");

  const [invalid, setInvalid] = useState<Field[]>([]);
  const [menuInvalid, setMenuInvalid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const firstMenuButton = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Block past dates; set on the client so the server render never depends on "today".
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayLocalISO();
  });

  useEffect(() => {
    if (confirmation) doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [confirmation]);

  function chooseMenu(value: string) {
    setMenu(value);
    setMenuInvalid(false);
    setShowError(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const values: Record<Field, string> = { name, phone, date };
    const missing = (Object.keys(values) as Field[]).filter((f) => !values[f].trim());
    setInvalid(missing);
    setMenuInvalid(!menu);
    setShowError(missing.length > 0 || !menu);

    if (missing.length) {
      const fieldRefs = { name: nameRef, phone: phoneRef, date: dateRef };
      fieldRefs[missing[0]].current?.focus();
      return;
    }
    if (!menu) {
      firstMenuButton.current?.focus();
      return;
    }

    const lines = [
      "Hello Syah, I would like to request a table.",
      `Name: ${name.trim()}`,
      `WhatsApp: ${phone.trim()}`,
      `Date: ${prettyDate(date)}`,
      `Arrival: ${time}`,
      `Guests: ${guests}`,
      `Menu: ${menu}`,
      `Occasion: ${occasion}`,
      `Cab: ${cab}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    lines.push("(Found Syah on Tripadvisor)");

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setConfirmation({
      firstName: name.trim().split(/\s+/)[0] ?? "",
      summary: `Your request for ${guestLabel(guests)} on ${prettyDate(date)} at ${time}, ${menu.toLowerCase()} menu, is ready. Send it to us on WhatsApp and our team will confirm your table there.`,
      url,
    });
    window.open(url, "_blank", "noopener");
  }

  if (confirmation) {
    return (
      <div
        ref={doneRef}
        role="status"
        className="flex flex-col gap-4 border border-gold p-10"
      >
        <p className="m-0 font-serif text-[36px] leading-[1.15] text-ivory">
          Thank you{confirmation.firstName ? `, ${confirmation.firstName}` : ""}.
        </p>
        <p className="m-0 text-[17px] leading-[1.7] text-copy">{confirmation.summary}</p>
        <a
          href={confirmation.url || whatsappUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[52px] items-center justify-center self-start bg-gold px-7 text-[14px] font-semibold tracking-[0.14em] text-dark uppercase"
        >
          Send on WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setConfirmation(null)}
          className="min-h-11 cursor-pointer self-start border-0 bg-transparent p-0 text-[14px] tracking-[0.12em] text-gold uppercase"
        >
          Make another request
        </button>
      </div>
    );
  }

  const fieldClass = (f: Field) => `field${invalid.includes(f) ? " err" : ""}`;

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <label htmlFor="r-name" className={labelClass}>
            Your name
          </label>
          <input
            ref={nameRef}
            id="r-name"
            className={fieldClass("name")}
            type="text"
            autoComplete="name"
            placeholder="Full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <label htmlFor="r-phone" className={labelClass}>
            WhatsApp number
          </label>
          <input
            ref={phoneRef}
            id="r-phone"
            className={fieldClass("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="+91"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <label htmlFor="r-date" className={labelClass}>
            Date
          </label>
          <input
            ref={dateRef}
            id="r-date"
            className={fieldClass("date")}
            type="date"
            required
            style={{ colorScheme: "dark" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <span id="r-guests" className={labelClass}>
            Guests
          </span>
          <div
            role="group"
            aria-labelledby="r-guests"
            className="flex min-h-[52px] items-center justify-between border border-line bg-ink"
          >
            <button
              type="button"
              aria-label="Fewer guests"
              onClick={() => setGuests((g) => Math.max(reservation.minGuests, g - 1))}
              className="size-[52px] cursor-pointer border-0 bg-transparent text-[22px] text-cream"
            >
              −
            </button>
            <span aria-live="polite" className="text-[16px] text-cream">
              {guestLabel(guests)}
            </span>
            <button
              type="button"
              aria-label="More guests"
              onClick={() => setGuests((g) => Math.min(reservation.maxGuests, g + 1))}
              className="size-[52px] cursor-pointer border-0 bg-transparent text-[22px] text-cream"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span id="r-time" className={labelClass}>
          Arrival time
        </span>
        <div role="group" aria-labelledby="r-time" className="flex flex-wrap gap-2.5">
          {reservation.times.map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={time === t}
              onClick={() => setTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span id="r-menu" className={labelClass}>
          Choice of menu
        </span>
        <div
          role="group"
          aria-labelledby="r-menu"
          className={`flex flex-wrap gap-2.5${menuInvalid ? " err-group" : ""}`}
        >
          {reservation.menus.map((m, i) => (
            <button
              key={m}
              ref={i === 0 ? firstMenuButton : undefined}
              type="button"
              className="mchip"
              aria-pressed={menu === m}
              onClick={() => chooseMenu(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-muted">
          Mixed table? Choose one and tell us in the notes.
        </span>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <label htmlFor="r-occasion" className={labelClass}>
            Occasion
          </label>
          <select
            id="r-occasion"
            className="field px-3.5"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            {reservation.occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-[1_1_240px] flex-col gap-2">
          <label htmlFor="r-cab" className={labelClass}>
            Cab from your hotel
          </label>
          <select
            id="r-cab"
            className="field px-3.5"
            value={cab}
            onChange={(e) => setCab(e.target.value)}
          >
            {reservation.cabOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="r-notes" className={labelClass}>
          Dietary needs or notes
        </label>
        <textarea
          id="r-notes"
          rows={3}
          placeholder="Allergies, a mixed table, a surprise we should know about"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="resize-y border border-line bg-ink px-4 py-3.5 text-[16px] leading-normal text-cream"
        />
      </div>

      {showError && (
        <p role="alert" className="m-0 text-[15px] text-error-text">
          Please add your name, WhatsApp number, date and choice of menu.
        </p>
      )}

      <button
        type="submit"
        className="min-h-14 cursor-pointer self-start border-0 bg-gold px-9 text-[14px] font-semibold tracking-[0.16em] text-dark uppercase"
      >
        Request my table
      </button>
    </form>
  );
}
