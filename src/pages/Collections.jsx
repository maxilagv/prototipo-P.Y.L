import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collection } from "@/api/entities";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const T = t[lang];

  useEffect(() => {
    async function load() {
      const cols = await Collection.list("sort_order");
      setCollections(cols);
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
    <div className="bg-background pt-24 md:pt-36 pb-24 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="mb-20 md:mb-28">
          <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium mb-4">
            {T.collections.eyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
            {T.collections.title}
          </h1>
        </AnimatedSection>

        <div className="space-y-24 md:space-y-36">
          {collections.map((col, i) => (
            <AnimatedSection key={col.id} delay={i * 0.05}>
              <Link
                to={`/collections/${col.slug}`}
                className="group grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                <div className={`overflow-hidden aspect-[3/4] bg-secondary/20 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={col.cover_image}
                    alt={`${col.name} — colección PYL`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className={`space-y-6 md:space-y-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
                    {T.collections.collection_num} {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                    {col.name}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light leading-loose max-w-sm">
                    {col.description}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/55 font-sans font-light group-hover:text-foreground transition-colors duration-300">
                      {T.collections.explore}
                    </span>
                    <span className="w-6 h-px bg-foreground/25 group-hover:w-10 group-hover:bg-foreground transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}