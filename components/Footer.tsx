import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pb-8 pt-16 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Alfaazo"
              width={36}
              height={36}
              className="rounded-xl"
            />
            <div>
              <div className="font-heading font-bold text-[1.15rem] text-ink leading-none">
                Alfaazo
              </div>
              <div className="text-[0.7rem] text-warm-brown/40 mt-0.5">
                by Codefeb
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="no-underline text-[0.82rem] text-warm-brown/45 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/alfaazoapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown/45 hover:text-primary transition-colors duration-300"
              aria-label="Alfaazo on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-primary/6">
          <div className="text-[0.72rem] text-warm-brown/30">
            &copy; 2026 Codefeb. All rights reserved.
          </div>
          <div className="text-[0.72rem] text-warm-brown/25">
            Built with love for the languages we call home
          </div>
        </div>
      </div>
    </footer>
  );
}
