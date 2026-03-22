export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pb-8 pt-16 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-urdu text-sm shadow-[0_2px_12px_rgba(103,58,183,0.2)]">
              ਅ
            </div>
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
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="no-underline text-[0.82rem] text-warm-brown/45 hover:text-primary transition-colors duration-300"
              >
                {link}
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
