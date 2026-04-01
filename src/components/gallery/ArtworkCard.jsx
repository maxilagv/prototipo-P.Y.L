import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function ArtworkCard({ artwork, index = 0 }) {
  const { lang } = useLanguage();
  const T = t[lang];

  const availLabel = T.availability[artwork.availability] || artwork.availability;
  const editionLabel = T.edition?.[artwork.edition] || artwork.edition;
  const isSold = artwork.availability === "Sold";
  const isAvailable = artwork.availability === "Available";
  const isOnInquiry = artwork.availability === "On Inquiry";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/artwork/${artwork.slug}`} className="group block">
        <div className="overflow-hidden bg-secondary/20 aspect-[3/4] mb-5">
          <img
            src={artwork.image}
            alt={`${artwork.title} — obra digital de Cristobal P. Y. L.`}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-0.5">
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h3 className="font-serif text-base md:text-lg font-light leading-snug group-hover:text-accent transition-colors duration-300">
              {artwork.title}
            </h3>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">→</span>
          </div>
          <p className="text-[11px] text-muted-foreground/60 font-light">
            {artwork.year} &nbsp;·&nbsp; {editionLabel}
          </p>
          <div className="mt-3">
            <span className={`text-[10px] tracking-[0.2em] uppercase font-sans font-medium ${
              isAvailable ? "text-accent" :
              isSold ? "text-muted-foreground/35 line-through" :
              "text-muted-foreground/55"
            }`}>
              {isOnInquiry ? T.artworkDetail.price_on_request :
               isAvailable && artwork.price ? `USD ${artwork.price.toLocaleString()}` :
               availLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}