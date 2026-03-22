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
          <div className="flex gap-8">
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
