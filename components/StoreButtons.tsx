"use client";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  trackStoreClick,
  type StorePlacement,
} from "@/lib/analytics";

/**
 * The App Store / Google Play pair used on the app and pricing pages. Both
 * buttons report through trackStoreClick with the page's placement. The
 * colour sits on an inner span because `.prose-alfaazo a` recolours anchors;
 * `.store-buttons` in globals.css removes the prose underline.
 */
export default function StoreButtons({
  placement,
  className = "",
}: {
  placement: StorePlacement;
  className?: string;
}) {
  return (
    <div className={`store-buttons flex gap-3 flex-wrap ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick({ placement, store: "app_store" })}
        className="group block pl-5 pr-7 py-3 rounded-2xl bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark shadow-[0_4px_16px_rgba(103,58,183,0.28)]"
      >
        <span className="flex items-center gap-3 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71,19.5C17.88,20.5 17,21.4 15.66,21.41C14.32,21.42 13.87,20.6 12.37,20.6C10.87,20.6 10.37,21.39 9.1,21.42C7.79,21.45 6.8,20.44 5.96,19.47C4.25,17.47 2.94,13.87 4.72,11.42C5.59,10.21 6.94,9.45 8.4,9.43C9.68,9.41 10.89,10.31 11.66,10.31C12.43,10.31 13.91,9.22 15.46,9.39C16.13,9.42 17.83,9.67 18.95,11.25C18.86,11.3 16.58,12.62 16.61,15.41C16.64,18.72 19.53,19.79 19.56,19.8C19.53,19.87 19.16,21.14 18.71,19.5ZM13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
          </svg>
          <span className="block">
            <span className="block text-[0.6rem] opacity-70 uppercase tracking-[0.08em] leading-none">Download on the</span>
            <span className="block text-[0.95rem] font-semibold leading-tight">App Store</span>
          </span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick({ placement, store: "play_store" })}
        className="group block pl-5 pr-7 py-3 rounded-2xl bg-white border border-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
      >
        <span className="flex items-center gap-3 text-primary-dark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          <span className="block">
            <span className="block text-[0.6rem] opacity-60 uppercase tracking-[0.08em] leading-none">Get it on</span>
            <span className="block text-[0.95rem] font-semibold leading-tight">Google Play</span>
          </span>
        </span>
      </a>
    </div>
  );
}
