"use client";

import { useEffect } from "react";
import { tripadvisor } from "@/content/site";

declare global {
  interface Window {
    taValidate?: () => void;
  }
}

const CONTAINER_ID = "TA_selfserveprop224";

const LOADER_SRC = `https://www.jscache.com/wejs?${new URLSearchParams({
  wtype: "selfserveprop",
  uniq: "224",
  locationId: tripadvisor.locationId,
  lang: "en_US",
  rating: "true",
  nreviews: "5",
  writereviewlink: "true",
  popIdx: "true",
  iswide: "false",
  border: "true",
  display_version: "2",
}).toString()}`;

/**
 * Tripadvisor "self-serve property" widget.
 *
 * Tripadvisor's embed code only draws the widget from `window.onload`. On a plain HTML page
 * the script arrives before that event, but in Next.js scripts load after the page has
 * finished loading, so the event has already fired and the widget never appears (leaving
 * just the oversized placeholder logo). Here we load the script ourselves and, once
 * Tripadvisor's code is ready, run its render step directly.
 */
export default function TripadvisorWidget() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const container = document.getElementById(CONTAINER_ID);
    const isRendered = () => Boolean(container?.querySelector("#CDSWIDSSP"));

    if (!document.querySelector(`script[data-ta-loader="${CONTAINER_ID}"]`)) {
      const script = document.createElement("script");
      script.src = LOADER_SRC;
      script.async = true;
      script.dataset.taLoader = CONTAINER_ID;
      document.body.appendChild(script);
    }

    // Poll for up to ~15s; stops early once the widget has drawn itself.
    const tryRender = (attempt: number) => {
      if (isRendered()) return;
      if (typeof window.taValidate === "function" && document.readyState === "complete") {
        window.taValidate();
        return;
      }
      if (attempt < 75) timer = setTimeout(() => tryRender(attempt + 1), 200);
    };
    tryRender(0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ta-wrap flex-[0_0_auto] text-dark">
      {/* Tripadvisor replaces this placeholder with the live widget. */}
      <div id={CONTAINER_ID} className="TA_selfserveprop">
        <ul id="F2PKQI" className="TA_links GSJWYrX">
          <li id="hIZwAOQvT" className="ZOqDcmVgXw">
            <a target="_blank" rel="noopener" href={tripadvisor.widgetUrl}>
              {/* eslint-disable-next-line @next/next/no-img-element -- Tripadvisor's own badge, read and replaced by their script */}
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                alt="TripAdvisor"
                width={100}
                height={22}
                style={{ width: 100, height: 22 }}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
