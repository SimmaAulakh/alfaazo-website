// Store links and GA4 tracking for every "get the app" control on the site.
// Everything that can send someone to a store goes through trackStoreClick so
// GA4 can answer "which page and which placement produce installs".

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.alfaazo.app";

export type Platform = "ios" | "android" | "mac" | "other";
export type Store = "app_store" | "play_store";

/** Where a store control lives. Keep this list in step with the GA4 report. */
export type StorePlacement =
  | "nav"
  | "hero"
  | "home_cta"
  | "post_inline"
  | "post_sticky"
  | "app_page"
  | "pricing_page";

export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  // iPadOS identifies as a Mac but has touch points.
  const isIpadOs =
    /Macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || isIpadOs) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Macintosh/i.test(ua)) return "mac";
  return "other";
}

/** Apple devices go to the App Store; Android and other desktops to Google Play,
 *  which can install to a linked Android phone. */
export function storeFor(platform: Platform): Store {
  return platform === "ios" || platform === "mac" ? "app_store" : "play_store";
}

export function storeUrl(store: Store): string {
  return store === "app_store" ? APP_STORE_URL : PLAY_STORE_URL;
}

export function storeLabel(store: Store): string {
  return store === "app_store" ? "App Store" : "Google Play";
}

export function otherStore(store: Store): Store {
  return store === "app_store" ? "play_store" : "app_store";
}

type StoreClick = {
  placement: StorePlacement;
  store: Store;
  /** Detected platform of the visitor, if the caller already resolved it. */
  platform?: Platform | null;
  /** Blog post slug when the control sits on a post. */
  slug?: string;
  /** event_label of the pre-Nov-2026 "click" event this control used to send, so
   *  the existing GA4 "download" report stays continuous. New placements omit it. */
  legacyLabel?: string;
};

export function trackStoreClick({
  placement,
  store,
  platform,
  slug,
  legacyLabel,
}: StoreClick) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const resolvedPlatform = platform ?? detectPlatform();

  // The one event to build reports on. Register placement, store, platform and
  // post_slug as custom dimensions in GA4 to break it down.
  window.gtag("event", "store_click", {
    placement,
    store,
    platform: resolvedPlatform,
    post_slug: slug ?? "(none)",
    page_path: window.location.pathname,
  });

  // Legacy shape (event_category "download") kept for the historical report.
  window.gtag("event", "click", {
    event_category: "download",
    event_label:
      legacyLabel ?? `${store}_${placement}${slug ? `_${slug}` : ""}`,
  });
}
