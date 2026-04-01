import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Collection, Artwork } from "@/api/entities";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";
import ArtworkCard from "../components/gallery/ArtworkCard";

export default function CollectionDetail() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const T = t[lang];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [cols, arts] = await Promise.all([
        Collection.filter({ slug }),
        Artwork.filter({ collection: slug }, "sort_order"),
      ]);
      setCollection(cols[0] || null);
      setArtworks(arts);
      setLoading(false);
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

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-light">—</p>
      </div>
    );
  }

  const worksLabel = artworks.length === 1 ? T.collectionDetail.works_singular : T.collectionDetail.works_plural;

  return (
    <div className="bg-background pt-24 md:pt-32 pb-24 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <AnimatedSection className="mb-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans font-light"
          >
            <span className="w-5 h-px bg-current" />
            {T.collectionDetail.back}
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
            <div className="overflow-hidden aspect-[3/4] bg-secondary/20">
              <img
                src={collection.cover_image}
                alt={`${collection.name} — colección de arte digital PYL`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:pb-8 space-y-6">
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
                {T.collectionDetail.collection}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                {collection.name}
              </h1>
              <p className="text-sm text-muted-foreground font-light leading-loose max-w-sm">
                {collection.description}
              </p>
              <p className="text-[11px] tracking-[0.15em] text-muted-foreground/45 font-light">
                {artworks.length} {worksLabel}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-20">
            {artworks.map((artwork, i) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-base italic text-muted-foreground">—</p>
          </div>
        )}

        <AnimatedSection className="text-center mt-20 md:mt-28 space-y-6 border-t border-border/30 pt-16">
          <p className="font-serif text-base italic text-muted-foreground">
            {T.collectionDetail.interested}
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:bg-accent hover:text-white transition-all duration-500"
          >
            {T.collectionDetail.inquiry}
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}