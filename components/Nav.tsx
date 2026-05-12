"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  anchor?: string; // scroll anchor on homepage
};

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/#features", anchor: "features" },
  { label: "Languages", href: "/#languages", anchor: "languages" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Download", href: "/#download", anchor: "download" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

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
    // For real routes, check if current pathname matches
    if (!item.anchor) {
      return pathname === item.href || pathname.startsWith(item.href + "/");
    }
    return false;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-cream/85 backdrop-blur-2xl border-b border-primary/8 shadow-[0_1px_30px_rgba(103,58,183,0.06)]"
          : "py-6 px-6 md:px-12 bg-transparent"
      }`}
    >
      <Link href="/" className="no-underline flex items-center gap-2 group">
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
      <div className="hidden md:flex gap-1 items-center bg-cream/60 backdrop-blur-md rounded-full px-2 py-1.5 border border-primary/8">
        {NAV_ITEMS.map((item) => {
          const href = getItemHref(item);
          const active = isActive(item);

          // Use <a> for anchor scrolls, <Link> for routes
          if (isHomepage && item.anchor) {
            return (
              <a
                key={item.label}
                href={href}
                className={`no-underline text-[0.82rem] font-medium tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-primary text-white shadow-[0_2px_12px_rgba(103,58,183,0.3)]"
                    : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.label}
              href={href}
              className={`no-underline text-[0.82rem] font-medium tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 ${
                active
                  ? "bg-primary text-white shadow-[0_2px_12px_rgba(103,58,183,0.3)]"
                  : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-colors"
        aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-cream/98 backdrop-blur-2xl rounded-2xl border border-primary/10 shadow-[0_20px_60px_rgba(103,58,183,0.12)] flex flex-col items-center gap-1 p-4 md:hidden animate-scaleIn">
          {NAV_ITEMS.map((item) => {
            const href = getItemHref(item);
            const active = isActive(item);

            if (isHomepage && item.anchor) {
              return (
                <a
                  key={item.label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`no-underline w-full text-center py-3 rounded-xl text-[0.95rem] font-medium transition-all ${
                    active
                      ? "text-white bg-primary"
                      : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
                  }`}
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
                className={`no-underline w-full text-center py-3 rounded-xl text-[0.95rem] font-medium transition-all ${
                  active
                    ? "text-white bg-primary"
                    : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
                }`}
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
