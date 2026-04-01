import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Artwork } from "@/api/entities";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";
import CertificateSection from "../components/gallery/CertificateSection";

export default function ArtworkDetail() {
  const { slug } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const T = t[lang];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const arts = await Artwork.filter({ slug });
      setArtwork(arts[0] || null);
      setLoading(false);
      window.scrollTo(0, 0);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-px h-10 bg-foreground/20 animate-pulse" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-light">—</p>
      </div>
    );
  }

  const detailImages = [artwork.image_2, artwork.image_3].filter(Boolean);
  const isAvailable = artwork.availability === "Available";
  const isOnInquiry = artwork.availability === "On Inquiry";
  const isSold = artwork.availability === "Sold";
  const editionLabel = T.edition?.[artwork.edition] || artwork.edition;
  const availLabel = T.availability[artwork.availability] || artwork.availability;

  const whatsappMsg = `${lang === "es" ? "Hola, me interesa adquirir" : lang === "pt" ? "Olá, tenho interesse em adquirir" : "Hello, I am interested in acquiring"} "${artwork.title}" ${lang === "es" ? "de" : "from"} PYL — Digital Art Gallery.`;
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-background pt-24 md:pt-32 pb-24 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <AnimatedSection className="mb-12 md:mb-16">
          <Link
            to={`/collections/${artwork.collection}`}
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans font-light"
          >
            <span className="w-5 h-px bg-current" />
            {T.artworkDetail.back_collection}
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-20 xl:gap-28">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden bg-secondary/20 aspect-[3/4]">
              <img
                src={artwork.image}
                alt={`${artwork.title} — obra digital original de Cristobal P. Y. L.`}
                className="w-full h-full object-cover"
              />
            </div>
            {detailImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-2 md:mt-3">
                {detailImages.map((img, i) => (
                  <div key={i} className="overflow-hidden bg-secondary/20 aspect-square">
                    <img src={img} alt={`${artwork.title} — detalle ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <div className="lg:pt-2">
            <AnimatedSection delay={0.15} className="space-y-10">

              <div className="space-y-4">
                <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
                  {T.artworkDetail.back_collection}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl font-light leading-tight tracking-tight">
                  {artwork.title}
                </h1>
                <p className="font-serif text-sm italic text-muted-foreground">
                  Cristobal P. Y. L. · {artwork.year}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-accent" />
                <div className="w-1 h-1 rounded-full bg-accent/40" />
              </div>

              <p className="text-sm md:text-[15px] text-muted-foreground font-light leading-[1.9]">
                {artwork.description}
              </p>

              {/* Technical */}
              <div className="space-y-0 border-t border-border/40 pt-8">
                <DetailRow label={T.artworkDetail.technique} value={artwork.technique} />
                <DetailRow label={T.artworkDetail.dimensions} value={artwork.dimensions} />
                <DetailRow label={T.artworkDetail.year} value={artwork.year} />
                <DetailRow label={T.artworkDetail.edition} value={editionLabel} isEdition />
                <DetailRow label={T.artworkDetail.status} value={availLabel} isStatus available={isAvailable || isOnInquiry} />
                {isAvailable && artwork.price && (
                  <DetailRow label={T.artworkDetail.price} value={`USD ${artwork.price.toLocaleString()}`} />
                )}
              </div>

              {/* CTAs */}
              <div className="pt-4 space-y-3">
                {(isAvailable || isOnInquiry) ? (
                  <>
                    <Link
                      to={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                      className="block text-center w-full px-8 py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:bg-accent hover:text-white transition-all duration-500"
                    >
                      {isAvailable ? T.artworkDetail.acquire : T.artworkDetail.inquire}
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full px-8 py-4 border border-border/60 text-foreground text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:border-foreground transition-all duration-300"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-55">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {T.artworkDetail.whatsapp}
                    </a>
                  </>
                ) : (
                  <div className="px-8 py-4 border border-border/40 text-center">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-sans font-light">
                      {isSold ? T.artworkDetail.sold : availLabel}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 pb-8 border-t border-border/40">
                <p className="text-[10px] text-muted-foreground/50 font-light leading-relaxed">
                  {T.artworkDetail.assurance}
                </p>
              </div>
            </AnimatedSection>

            <CertificateSection artwork={artwork} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isEdition, isStatus, available }) {
  return (
    <div className="flex justify-between items-baseline py-3.5 border-b border-border/30 last:border-0">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 font-sans font-light">{label}</span>
      <span className={`text-[13px] font-light text-right max-w-[60%] ${
        isEdition ? "font-serif italic text-foreground" :
        isStatus && available ? "text-accent font-medium" :
        "text-foreground"
      }`}>{value}</span>
    </div>
  );
}