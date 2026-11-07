"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { storeFor, storeUrl, trackStoreClick } from "@/lib/analytics";
import { usePlatform } from "@/lib/usePlatform";

const DISMISS_KEY = "alfaazo-sticky-app-bar-dismissed";
// Appear once the reader is into the article, hide again near the end so the
// bar never covers the post's own closing CTA or the footer.
const SHOW_AFTER_PX = 480;
const HIDE_WITHIN_BOTTOM_PX = 360;

// "Dismissed for this tab" lives in sessionStorage, with an in-memory fallback
// for private windows where storage throws. Exposed as an external store so the
// component can read it during render without a setState-in-effect.
let dismissedInMemory = false;
const dismissListeners = new Set<() => void>();

function subscribeDismissed(onChange: () => void) {
  dismissListeners.add(onChange);
  return () => {
    dismissListeners.delete(onChange);
  };
}

function getDismissed(): boolean {
  if (dismissedInMemory) return true;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

// Hidden on the server and until hydration, so the bar never flashes.
const getDismissedOnServer = () => true;

function dismiss() {
  dismissedInMemory = true;
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Storage blocked: the in-memory flag still hides it for this page.
  }
  dismissListeners.forEach((listener) => listener());
}

// Phone-only bottom bar on blog posts. Desktop readers already have the header
// button in view; on a phone the header scrolls away in the first screen.
export default function StickyAppBar({ slug }: { slug: string }) {
  const platform = usePlatform();
  const dismissed = useSyncExternalStore(
    subscribeDismissed,
    getDismissed,
    getDismissedOnServer
  );
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const remaining =
        document.documentElement.scrollHeight - scrolled - window.innerHeight;
      setInRange(scrolled > SHOW_AFTER_PX && remaining > HIDE_WITHIN_BOTTOM_PX);
    };
    // Initial check runs on the next frame (covers reloads that restore a mid-
    // page scroll position) rather than synchronously inside the effect.
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = inRange && !dismissed;
  const store = platform ? storeFor(platform) : null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[900] lg:hidden transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-3 mb-3 rounded-2xl bg-cream/95 backdrop-blur-xl border border-primary/12 shadow-[0_-4px_30px_rgba(81,45,168,0.14)] px-3.5 py-3 flex items-center gap-3 [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]">
        <Image
          src="/logo.png"
          alt=""
          width={38}
          height={38}
          className="rounded-xl shrink-0"
        />
        <div className="flex-1 min-w-0 leading-tight">
          <p className="m-0 text-[0.86rem] font-semibold text-primary-dark truncate">
            Learn Punjabi in 10 min a day
          </p>
          <p className="m-0 text-[0.72rem] text-warm-brown/60">
            Free · iOS &amp; Android
          </p>
        </div>
        <a
          href={store ? storeUrl(store) : "/#download"}
          {...(store ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          tabIndex={visible ? 0 : -1}
          onClick={() =>
            store &&
            trackStoreClick({ placement: "post_sticky", store, platform, slug })
          }
          className="no-underline shrink-0 inline-flex items-center rounded-full bg-primary text-white font-semibold text-[0.8rem] px-4 py-2.5 shadow-[0_4px_16px_rgba(103,58,183,0.28)] hover:bg-primary-dark transition-colors whitespace-nowrap"
        >
          Get the App
        </a>
        <button
          type="button"
          aria-label="Hide"
          tabIndex={visible ? 0 : -1}
          onClick={dismiss}
          className="shrink-0 -mr-1 p-1.5 rounded-full text-warm-brown/45 hover:text-primary hover:bg-primary/5 bg-transparent border-none cursor-pointer transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
