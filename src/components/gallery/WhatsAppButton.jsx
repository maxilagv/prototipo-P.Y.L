import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ artworkTitle = "" }) {
  const message = artworkTitle
    ? `Hello, I'm interested in the artwork "${artworkTitle}" from PYL Digital Art Gallery.`
    : "Hello, I'd like to inquire about artworks from PYL Digital Art Gallery.";
  
  const url = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-6 py-3.5 border border-foreground/20 text-foreground text-[12px] tracking-[0.15em] uppercase font-sans font-light hover:bg-foreground hover:text-background transition-all duration-300"
    >
      <MessageCircle size={16} />
      Inquire via WhatsApp
    </a>
  );
}