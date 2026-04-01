import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { lang } = useLanguage();
  const T = t[lang];
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const transparent = !scrolled && !menuOpen && isHome;
  const headerBg = transparent
    ? "bg-transparent"
    : "bg-background/95 backdrop-blur-xl border-b border-border/30";
  const textColor = transparent ? "text-white" : "text-foreground";
  const mutedColor = transparent ? "text-white/45" : "text-muted-foreground";

  const NAV = [
    { to: "/collections", label: T.nav.collections },
    { to: "/about", label: T.nav.about },
    { to: "/contact", label: T.nav.contact },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg} py-4 md:py-5`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className={`font-serif text-base md:text-lg tracking-[0.2em] font-medium transition-colors duration-500 ${textColor}`}>
            PYL
          </span>
          <span className={`text-[8px] tracking-[0.3em] uppercase font-sans font-light transition-colors duration-500 ${mutedColor}`}>
            Digital Art Gallery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[10px] tracking-[0.2em] uppercase font-sans font-light transition-colors duration-300 ${
                location.pathname.startsWith(link.to) ? textColor : `${mutedColor} hover:${transparent ? "text-white/80" : "text-foreground"}`
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: lang switcher + mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher light={transparent} />
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-[5px] p-1 transition-colors duration-300 ${textColor}`}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-current" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-current" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-background/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-6 pt-7 pb-8 gap-6 border-t border-border/20 mt-4">
              <Link to="/" className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans font-light">
                {T.nav.home}
              </Link>
              {NAV.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[10px] tracking-[0.3em] uppercase font-sans font-light transition-colors ${
                    location.pathname.startsWith(link.to) ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.3em] uppercase text-accent font-sans font-light"
                >
                  {T.nav.whatsapp}
                </a>
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}