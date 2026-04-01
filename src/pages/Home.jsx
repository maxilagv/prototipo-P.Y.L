import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collection, Artwork } from "@/api/entities";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";
import ArtworkCard from "../components/gallery/ArtworkCard";

export default function Home() {
  const [collections, setCollections] = useState([]);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const T = t[lang];

  useEffect(() => {
    async function load() {
      const [cols, arts] = await Promise.all([
        Collection.list("sort_order"),
        Artwork.filter({ featured: true }, "sort_order"),
      ]);
      setCollections(cols);
      setFeaturedArtworks(arts);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-px h-10 bg-foreground/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-background">

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=2000&q=90"
            alt="PYL Digital Art Gallery — obras digitales exclusivas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute top-28 md:top-32 right-8 md:right-12"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/35 font-sans">{T.home.badge}</p>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/45 font-sans font-light mb-6">
              {T.home.eyebrow}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-[1.05] tracking-tight mb-8">
              {T.home.title1}<br />
              <em>{T.home.title2}</em>
            </h1>
            <p className="text-sm md:text-base text-white/45 font-sans font-light leading-relaxed mb-12 max-w-sm">
              {T.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/collections"
                className="inline-block px-8 py-3.5 border border-white/30 text-white text-[11px] tracking-[0.25em] uppercase font-sans font-light hover:bg-white hover:text-black transition-all duration-500"
              >
                {T.home.cta_enter}
              </Link>
              <Link
                to="/about"
                className="inline-block px-8 py-3.5 text-white/45 text-[11px] tracking-[0.25em] uppercase font-sans font-light hover:text-white transition-colors duration-300"
              >
                {T.home.cta_vision}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-white/20" />
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/25 font-sans [writing-mode:vertical-lr]">Scroll</p>
        </motion.div>
      </section>

      {/* ── STATEMENT ── */}
      <section className="py-28 md:py-40 px-6 md:px-12">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="flex items-start gap-8 md:gap-16">
            <div className="hidden md:block w-px self-stretch bg-border/50 mt-2 shrink-0" />
            <div className="space-y-8">
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
                {T.home.statement_eyebrow}
              </p>
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] text-foreground">
                {T.home.statement_title1}<br />
                <em>{T.home.statement_title2}</em>
              </p>
              <p className="text-sm text-muted-foreground font-light leading-loose max-w-lg">
                {T.home.statement_body}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-foreground/55 font-sans hover:text-foreground transition-colors duration-300"
              >
                {T.home.statement_link}
                <span className="w-8 h-px bg-foreground/40 inline-block" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── COLLECTIONS ── */}
      <section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16 md:mb-20 flex items-end justify-between">
            <div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium mb-3">
                {T.home.collections_eyebrow}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light">{T.home.collections_title}</h2>
            </div>
            <Link
              to="/collections"
              className="hidden md:inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {T.home.collections_view_all}
              <span className="w-6 h-px bg-current inline-block" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            {collections.map((col, i) => (
              <AnimatedSection key={col.id} delay={i * 0.12}>
                <Link to={`/collections/${col.slug}`} className="group block relative">
                  <div className="overflow-hidden aspect-[2/3] bg-muted">
                    <img
                      src={col.cover_image}
                      alt={`${col.name} — arte digital exclusivo PYL`}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 px-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-lg tracking-wide">{col.name}</h3>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 font-light mt-1">
                      {col.description?.split(".")[0]}.
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link to="/collections" className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              {T.home.collections_view_all} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORKS ── */}
      {featuredArtworks.length > 0 && (
        <section className="py-28 md:py-40 px-6 md:px-12 border-t border-border/40">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="mb-16 md:mb-20">
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium mb-3">
                {T.home.works_eyebrow}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light">{T.home.works_title}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-20">
              {featuredArtworks.slice(0, 6).map((artwork, i) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={i} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING STATEMENT ── */}
      <section className="py-28 md:py-40 px-6 md:px-12 border-t border-border/40">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8">
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
                {T.home.closing_eyebrow}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-[1.4]">
                {T.home.closing_title1}<br />
                <em>{T.home.closing_title2}</em>
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
                {T.home.closing_body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3.5 bg-foreground text-background text-[11px] tracking-[0.25em] uppercase font-sans font-light hover:bg-accent hover:text-white transition-all duration-500"
                >
                  {T.home.cta_inquiry}
                </Link>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 border border-border text-foreground text-[11px] tracking-[0.25em] uppercase font-sans font-light hover:border-foreground transition-all duration-300"
                >
                  {T.home.cta_whatsapp}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=85"
                  alt="Luxury art collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}