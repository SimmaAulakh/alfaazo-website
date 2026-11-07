"use client";

import Image from "next/image";
import {
  otherStore,
  storeFor,
  storeLabel,
  storeUrl,
  trackStoreClick,
} from "@/lib/analytics";
import { usePlatform } from "@/lib/usePlatform";

// Sits inside the article, right after the first vocabulary table (see
// splitForInlineCta). Copy follows the post's tag so it reads as part of the
// piece rather than a banner.
const COPY: Record<string, { heading: string; body: string }> = {
  Script: {
    heading: "Practise reading Gurmukhi with audio",
    body:
      "Alfaazo walks you through every letter and vowel sign with native pronunciation, ten minutes a day.",
  },
  Culture: {
    heading: "Say these to your family, not just read them",
    body:
      "Alfaazo teaches real Punjabi phrases with native audio and bite-sized lessons. Free on iOS and Android.",
  },
  default: {
    heading: "Hear Punjabi spoken by native speakers",
    body:
      "Alfaazo teaches everyday Punjabi with native audio and bite-sized lessons. Free, ten minutes a day.",
  },
};

export default function InlineAppCta({
  slug,
  tag,
}: {
  slug: string;
  tag: string;
}) {
  const platform = usePlatform();
  const copy = COPY[tag] ?? COPY.default;
  const primary = platform ? storeFor(platform) : null;
  const secondary = primary ? otherStore(primary) : null;

  return (
    <aside
      aria-label="Get the Alfaazo app"
      className="my-10 rounded-[22px] px-6 py-6 md:px-8 md:py-7 text-white shadow-[0_12px_40px_rgba(81,45,168,0.22)]"
      style={{
        background:
          "linear-gradient(135deg, #1A0A3E 0%, #2D1660 40%, #512DA8 100%)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <Image
          src="/logo.png"
          alt=""
          width={52}
          height={52}
          className="rounded-2xl shrink-0 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
        />
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-[1.1rem] leading-snug m-0">
            {copy.heading}
          </p>
          <p className="text-[0.88rem] text-white/75 leading-relaxed mt-1.5 mb-0">
            {copy.body}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <a
            href={primary ? storeUrl(primary) : "/#download"}
            {...(primary ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() =>
              primary &&
              trackStoreClick({ placement: "post_inline", store: primary, platform, slug })
            }
            className="no-underline inline-flex items-center justify-center rounded-full bg-white text-primary-dark font-semibold text-[0.9rem] px-5 py-2.5 whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)]"
          >
            Get the App — free
          </a>
          {secondary && (
            <a
              href={storeUrl(secondary)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackStoreClick({ placement: "post_inline", store: secondary, platform, slug })
              }
              className="no-underline text-[0.74rem] text-white/60 hover:text-white transition-colors"
            >
              Also on {storeLabel(secondary)}
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
