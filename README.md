# Syah Udaipur — reservation landing page

Next.js 16 (App Router) + Tailwind CSS 4 version of the Syah landing page served at
`reserve.syahudaipur.com`. It renders as a fully static page.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start
```

Fonts (Cormorant Garamond and Jost) load through `next/font/google`, so the first build needs
internet access to fonts.googleapis.com. Vercel builds have this by default.

## Where to edit

| What | File |
| --- | --- |
| Reviews, dishes, visit details, prices, phone/WhatsApp/email, Tripadvisor numbers | `src/content/site.ts` |
| Page title, description, search indexing (`ALLOW_INDEXING`) | `src/app/layout.tsx` |
| Colours, fonts, form/carousel styles | `src/app/globals.css` |
| Photos and logo | `public/images/` |

**Before launch:** replace `[PRICE PER GUEST]` (`tastingMenuPrice` in `src/content/site.ts`).

The page is set to `noindex, nofollow`, as the original was. Set `ALLOW_INDEXING = true` in
`src/app/layout.tsx` if it should show up in Google.

## Structure

```
src/
  app/
    layout.tsx          fonts, metadata, <html>
    page.tsx            assembles the sections
    globals.css         Tailwind theme + component styles
  components/
    Hero.tsx            header, hero, Tripadvisor card
    Reviews.tsx         proof strip, review cards, Tripadvisor panel
    TripadvisorWidget.tsx (client) loads Tripadvisor's live widget and triggers its render
    Reasons.tsx         "three reasons" + menu grid
    ThePlace.tsx        dusk banner with review carousel, kitchen photos
    ReviewCarousel.tsx  (client) auto-advancing review carousel
    Visit.tsx           plan-your-visit details
    Reserve.tsx         reservation section, footer, mobile action bar
    ReservationForm.tsx (client) form that composes a WhatsApp booking request
    ui.tsx              icons, rating dots, headings
  content/
    site.ts             all page copy and data
public/images/          optimised WebP photos + Syah logo
```

The reservation form doesn't need a backend. It checks the required fields, builds the booking
message and opens WhatsApp to +91 97119 87495, as the original page did.

## Deploy on Vercel

Import the folder as a new project (framework: Next.js) or replace the `syah-landing` project's
source. Then point `reserve.syahudaipur.com` at the project you deploy.
