"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = ["Features", "Languages", "Blog", "Download"] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-cream/85 backdrop-blur-2xl border-b border-primary/8 shadow-[0_1px_30px_rgba(103,58,183,0.06)]"
          : "py-6 px-6 md:px-12 bg-transparent"
      }`}
    >
      <a href="#hero" className="no-underline flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-urdu font-bold text-lg shadow-[0_4px_16px_rgba(103,58,183,0.3)] group-hover:shadow-[0_4px_24px_rgba(103,58,183,0.45)] transition-shadow duration-300">
          ਅ
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-[1.3rem] text-primary-dark leading-none tracking-tight">
            Alfaazo
          </span>
          <span className="text-[0.6rem] text-warm-brown/40 tracking-[0.15em] uppercase font-medium leading-none mt-0.5">
            by Codefeb
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-1 items-center bg-cream/60 backdrop-blur-md rounded-full px-2 py-1.5 border border-primary/8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`no-underline text-[0.82rem] font-medium tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 ${
              activeSection === item.toLowerCase()
                ? "bg-primary text-white shadow-[0_2px_12px_rgba(103,58,183,0.3)]"
                : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
            }`}
          >
            {item}
          </a>
        ))}
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
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`no-underline w-full text-center py-3 rounded-xl text-[0.95rem] font-medium transition-all ${
                activeSection === item.toLowerCase()
                  ? "text-white bg-primary"
                  : "text-warm-brown/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
