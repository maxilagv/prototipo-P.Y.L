import { useLanguage } from "@/lib/useLanguage";

const LABELS = { es: "ES", en: "EN", pt: "PT" };

export default function LanguageSwitcher({ light = false }) {
  const { lang, setLang } = useLanguage();
  const langs = ["es", "en", "pt"];

  return (
    <div className="flex items-center gap-0">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={`text-[9px] tracking-[0.25em] font-sans font-light transition-colors duration-300 px-1.5 py-1 ${
              lang === l
                ? light
                  ? "text-white"
                  : "text-foreground"
                : light
                ? "text-white/35 hover:text-white/70"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            }`}
          >
            {LABELS[l]}
          </button>
          {i < langs.length - 1 && (
            <span className={`text-[8px] ${light ? "text-white/20" : "text-border"}`}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}