import { useState, useEffect } from "react";
import { Inquiry } from "@/api/entities";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import AnimatedSection from "../components/gallery/AnimatedSection";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", artwork_title: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const T = t[lang].contact;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artwork = params.get("artwork");
    if (artwork) {
      const msgMap = {
        es: `Me interesa adquirir "${artwork}" y me gustaría recibir más información.`,
        en: `I am interested in acquiring "${artwork}" and would like to receive further information.`,
        pt: `Tenho interesse em adquirir "${artwork}" e gostaria de receber mais informações.`,
      };
      setForm((prev) => ({ ...prev, artwork_title: artwork, message: msgMap[lang] || msgMap.en }));
    }
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await Inquiry.create({
      name: form.name,
      email: form.email,
      message: form.message,
      artwork_title: form.artwork_title || undefined,
      status: "New",
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  const whatsappMsg = form.artwork_title
    ? `${lang === "es" ? "Hola, consulto sobre" : lang === "pt" ? "Olá, consulto sobre" : "Hello, I am inquiring about"} "${form.artwork_title}" — PYL Digital Art Gallery.`
    : `${lang === "es" ? "Hola, me gustaría consultar sobre obras disponibles en PYL — Galería de Arte Digital." : lang === "pt" ? "Olá, gostaria de consultar sobre obras disponíveis na PYL — Galeria de Arte Digital." : "Hello, I would like to inquire about available works from PYL — Digital Art Gallery."}`;
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-background pt-24 md:pt-36 pb-24 md:pb-40">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        <AnimatedSection className="mb-16 md:mb-24">
          <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium mb-4">{T.eyebrow}</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">{T.title}</h1>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">{T.subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] gap-14 md:gap-20">

          <AnimatedSection>
            {submitted ? (
              <div className="py-10 space-y-6">
                <div className="w-8 h-px bg-accent" />
                <p className="font-serif text-2xl font-light italic">{T.thanks_title}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{T.thanks_body}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-foreground font-sans font-light border-b border-border/60 pb-1 hover:border-foreground transition-colors duration-300"
                >
                  {T.whatsapp_continue}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField label={T.name} type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <FormField label={T.email} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                {form.artwork_title && (
                  <FormField label={T.artwork_ref} type="text" value={form.artwork_title} onChange={() => {}} readOnly />
                )}
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-sans font-light block mb-3">{T.message}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={T.message_placeholder}
                    className="w-full bg-transparent border-b border-border/50 py-2.5 text-[13px] font-light text-foreground placeholder:text-muted-foreground/25 focus:outline-none focus:border-foreground/50 transition-colors duration-300 resize-none leading-relaxed"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-8 py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-40"
                  >
                    {submitting ? T.sending : T.send}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border border-border/50 text-foreground text-[11px] tracking-[0.3em] uppercase font-sans font-light hover:border-foreground transition-all duration-300"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-55">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {T.whatsapp}
                  </a>
                </div>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="space-y-10 pt-1">
            <div className="space-y-3">
              <p className="text-[9px] tracking-[0.5em] uppercase text-accent font-sans font-medium">{T.sidebar_name}</p>
              <p className="font-serif text-base font-light leading-relaxed whitespace-pre-line">{T.sidebar_role}</p>
            </div>
            <div className="space-y-5 border-t border-border/30 pt-8">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/45 font-sans mb-1.5">{T.email_label}</p>
                <a href="mailto:gallery@pyl.art" className="text-[13px] text-foreground/75 font-light hover:text-foreground transition-colors duration-300">gallery@pyl.art</a>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/45 font-sans mb-1.5">{T.whatsapp_label}</p>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-[13px] text-foreground/75 font-light hover:text-foreground transition-colors duration-300">+1 (234) 567-890</a>
              </div>
            </div>
            <div className="border-t border-border/30 pt-8">
              <p className="text-[11px] text-muted-foreground/50 font-light leading-relaxed">{T.sidebar_note}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, type, value, onChange, required, readOnly }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-sans font-light block mb-3">{label}</label>
      <input
        type={type}
        required={required}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent border-b border-border/50 py-2.5 text-[13px] font-light text-foreground placeholder:text-muted-foreground/25 focus:outline-none focus:border-foreground/50 transition-colors duration-300 ${readOnly ? "opacity-45 cursor-default" : ""}`}
      />
    </div>
  );
}