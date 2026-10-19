import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Set to true when this page should appear in Google search results.
// Keep it false while the page is only used as an ads / Tripadvisor landing page.
const ALLOW_INDEXING = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://reserve.syahudaipur.com"),
  title: "Syah Udaipur · Farm-to-table tasting menu, rated 5.0 on Tripadvisor",
  description:
    "Fine dining on Kasotia Ji Farm, Udaipur. A seasonal tasting menu rated 5.0 by 293 Tripadvisor travellers. Travellers' Choice 2026. Reserve your evening.",
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "Syah Udaipur · Farm-to-table tasting menu",
    description:
      "Rated 5.0 by 293 travellers on Tripadvisor. Travellers' Choice 2026.",
    images: ["/images/hero-night.webp"],
  },
  icons: { icon: "data:," },
};

export const viewport: Viewport = {
  themeColor: "#0F0E0C",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="I8MF4zNI-wSZNhQR4MGVdtNAennJtB6zMofPRZJIRLc"
        />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K10QFDEBS5"
        ></Script>
        <Script id="google-analytics-config" strategy="afterInteractive">
          {` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-K10QFDEBS5');`}
        </Script>

        {/* <!-- Google Tag Manager --> */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PPW6NQNQ');`,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z00dy4ki9x");
          `}
        </Script>
      </head>
      <body className="font-sans font-light">
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PPW6NQNQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

        {children}
      </body>

      {/* Eazbot (Next.js, e.g. in app/layout.jsx) */}
      <Script id="eazbot-config" strategy="afterInteractive">
        {`
          window.eazbotConfig = {
            ndid: "35a8859a-34c7-4f32-98a8-00c61d5eeb9c",
            hid: "37307193",
          };
        `}
      </Script>
      <Script
        src="https://cb-script.dyq28lyxrazm2.amplifyapp.com/widget/lead-chatbot.js"
        strategy="afterInteractive"
      />
      <Script id="whatsapp-config" strategy="afterInteractive">
        {`window.eazbotConfig = {
          ndid: "35a8859a-34c7-4f32-98a8-00c61d5eeb9c",
          hid: "37307193",
          phoneNumber: "17116894930",
          message: "Hello",
          position: "left",
        };`}
      </Script>
      <Script
        strategy="afterInteractive"
        src="https://whatsapp-widget-tau.vercel.app/widget/whatsapp.js"
      ></Script>
    </html>
  );
}
