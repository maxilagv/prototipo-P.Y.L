import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";

export default function About() {
  const { lang } = useLanguage();
  const T = t[lang];
  const A = T.about;

  return (
    <div className="bg-background pt-24 md:pt-36 pb-24 md:pb-40">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        <AnimatedSection className="mb-20 md:mb-28">
          <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium mb-5">
            {A.eyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight">
            {A.title}
          </h1>
          <p className="font-serif text-base italic text-muted-foreground mt-4">{A.by}</p>
        </AnimatedSection>

        <div className="space-y-16 md:space-y-20">
          {A.sections.map((section, i) => (
            <AnimatedSection key={section.label} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12">
                <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium md:pt-1">
                  {section.label}
                </p>
                <div className="space-y-4">
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm md:text-[15px] text-muted-foreground font-light leading-[1.9]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-20 md:mt-28 pt-14 md:pt-16 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12">
            <div />
            <div className="space-y-3">
              <p className="font-serif text-xl italic text-foreground">Cristobal P. Y. L.</p>
              <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-sans font-light">{A.role}</p>
              <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 font-sans font-light">{A.gallery_name}</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12">
            <div />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/collections"
                className="inline-block px-8 py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:bg-accent hover:text-white transition-all duration-500"
              >
                {A.cta_enter}
              </Link>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 border border-border/50 text-foreground text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:border-foreground transition-all duration-300"
              >
                {A.cta_contact}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}