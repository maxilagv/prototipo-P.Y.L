import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const T = t[lang];

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16 md:mb-20">

          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <p className="font-serif text-lg tracking-[0.2em] font-medium">PYL</p>
              <p className="text-[8px] tracking-[0.35em] uppercase text-muted-foreground font-sans font-light mt-0.5">
                Digital Art Gallery
              </p>
            </div>
            <p className="text-[12px] text-muted-foreground font-light leading-relaxed max-w-[200px]">
              {T.footer.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60 font-sans font-medium">
              {T.footer.gallery_label}
            </p>
            <div className="space-y-3">
              {[
                { to: "/collections/classic", label: "Classic" },
                { to: "/collections/doodle", label: "Doodle" },
                { to: "/collections/resin", label: "Resin" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60 font-sans font-medium">
              {T.footer.navigate_label}
            </p>
            <div className="space-y-3">
              <Link to="/about" className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">
                {T.footer.about}
              </Link>
              <Link to="/contact" className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">
                {T.footer.inquiries}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/60 font-sans font-medium">
              {T.footer.contact_label}
            </p>
            <div className="space-y-3">
              <a href="mailto:gallery@pyl.art" className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">
                gallery@pyl.art
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground/50 font-light">
            © {new Date().getFullYear()} Cristobal P. Y. L. — {T.footer.copyright}
          </p>
          <p className="text-[10px] text-muted-foreground/30 font-light tracking-[0.15em]">
            PYL — Digital Art Gallery
          </p>
        </div>
      </div>
    </footer>
  );
}