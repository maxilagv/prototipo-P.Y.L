import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "./AnimatedSection";

export default function CertificateSection({ artwork }) {
  const { lang } = useLanguage();
  const T = t[lang];
  const editionLabel = T.edition?.[artwork.edition] || artwork.edition;

  return (
    <AnimatedSection className="mt-10">
      <div className="relative border border-border/50 bg-secondary/20 p-8 md:p-10">
        <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-accent" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-accent" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-accent" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-accent" />

        <div className="space-y-5 text-center">
          <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">
            {T.certificate.title}
          </p>
          <div className="w-8 h-px bg-accent/60 mx-auto" />
          <p className="font-serif text-lg italic font-light text-foreground">{artwork.title}</p>
          <p className="text-[12px] text-muted-foreground font-light">
            {editionLabel} &nbsp;·&nbsp; {artwork.year}
          </p>
          <p className="text-[11px] text-muted-foreground/65 font-light leading-relaxed max-w-xs mx-auto">
            {artwork.certificate_note}
          </p>
          <div className="w-8 h-px bg-border/60 mx-auto" />
          <div className="space-y-1">
            <p className="font-serif text-base italic text-foreground">{T.certificate.founder}</p>
            <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-sans font-light">
              {T.certificate.gallery}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}