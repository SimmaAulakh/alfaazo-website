"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.alfaazo.app";
const START_HERE = "/blog/learn-punjabi-start-here";

type NavItem = {
  label: string;
  href: string;
  anchor?: string; // scroll anchor on homepage
};

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/#features", anchor: "features" },
  { label: "Languages", href: "/#languages", anchor: "languages" },
  { label: "Blog", href: "/blog" },
  { label: "Start Here", href: START_HERE },
  { label: "About", href: "/about" },
];

// Same event shape as the homepage store badges (components/CTA.tsx), so the
// header button shows up alongside them in GA4.
function trackClick(label: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "click", {
      event_category: "download",
      event_label: label,
    });
  }
}

type Platform = "ios" | "android" | "mac" | "other";

function detectPlatform(): Platform {
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

const CTA_BASE =
  "no-underline inline-flex items-center gap-1.5 rounded-full bg-primary text-white font-semibold tracking-wide shadow-[0_4px_16px_rgba(103,58,183,0.28)] hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap";

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  // Resolved after mount so server and client render the same markup;
  // null until then.
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomepage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ["hero", "features", "languages", "blog", "download"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomepage]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function getItemHref(item: NavItem) {
    // On homepage, use anchor scroll for items that have anchors
    if (isHomepage && item.anchor) {
      return `#${item.anchor}`;
    }
    return item.href;
  }

  function isActive(item: NavItem) {
    if (isHomepage && item.anchor) {
      return activeSection === item.anchor;
    }
    if (item.anchor) return false;
    // "Blog" covers every post except the start-here guide, which has its own item.
    if (item.href === "/blog") {
      return (
        pathname === "/blog" ||
        (pathname.startsWith("/blog/") && pathname !== START_HERE)
      );
    }
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }

  // "Get the App" goes straight to a store on every page (the hero's own
  // badges already offer both): iPhones, iPads and Macs to the App Store,
  // Android and other desktops to Google Play, which can install to a linked
  // Android phone. Until the platform is known (before hydration) it falls
  // back to the download section.
  const appHref =
    platform === null
      ? isHomepage
        ? "#download"
        : "/#download"
      : platform === "ios" || platform === "mac"
        ? APP_STORE_URL
        : PLAY_STORE_URL;
  const appIsExternal = appHref.startsWith("http");
  const appLinkProps = appIsExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const onAppClick = () => {
    trackClick(`get_app_nav_${platform ?? "unknown"}${isHomepage ? "_home" : ""}`);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-cream/85 backdrop-blur-2xl border-b border-primary/8 shadow-[0_1px_30px_rgba(103,58,183,0.06)]"
          : "py-6 px-6 md:px-12 bg-transparent"
      }`}
    >
      <Link href="/" className="no-underline flex items-center gap-2 group shrink-0">
        <Image
          src="/logo.png"
          alt="Alfaazo"
          width={40}
          height={40}
          className="rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col">
          <span className="font-heading font-bold text-[1.3rem] text-primary-dark leading-none tracking-tight">
            Alfaazo
          </span>
          <span className="text-[0.6rem] text-warm-brown/40 tracking-[0.15em] uppercase font-medium leading-none mt-0.5">
            by Codefeb
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="flex gap-1 items-center bg-cream/60 backdrop-blur-md rounded-full px-2 py-1.5 border border-primary/8">
          {NAV_ITEMS.map((item) => {
            const href = getItemHref(item);
            const active = isActive(item);
            const className = `no-underline whitespace-nowrap text-[0.82rem] font-medium tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 ${
              active
                ? "bg-primary text-white shadow-[0_2px_12px_rgba(103,58,183,0.3)]"
                : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
            }`;

            // Use <a> for anchor scrolls, <Link> for routes
            if (isHomepage && item.anchor) {
              return (
                <a key={item.label} href={href} className={className}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} href={href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href={appHref}
          onClick={onAppClick}
          {...appLinkProps}
          className={`${CTA_BASE} text-[0.82rem] px-5 py-2.5`}
        >
          <DownloadIcon />
          Get the App
        </a>
      </div>

      {/* Mobile: compact CTA + hamburger */}
      <div className="flex lg:hidden items-center gap-2">
        <a
          href={appHref}
          onClick={onAppClick}
          {...appLinkProps}
          className={`${CTA_BASE} text-[0.76rem] px-3.5 py-2`}
        >
          <DownloadIcon />
          Get the App
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-[1.5px] bg-primary-dark transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-primary-dark transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-primary-dark transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-cream/98 backdrop-blur-2xl rounded-2xl border border-primary/10 shadow-[0_20px_60px_rgba(103,58,183,0.12)] flex flex-col items-center gap-1 p-4 lg:hidden animate-scaleIn">
          {NAV_ITEMS.map((item) => {
            const href = getItemHref(item);
            const active = isActive(item);
            const className = `no-underline w-full text-center py-3 rounded-xl text-[0.95rem] font-medium transition-all ${
              active
                ? "text-white bg-primary"
                : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
            }`;

            if (isHomepage && item.anchor) {
              return (
                <a
                  key={item.label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={className}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
