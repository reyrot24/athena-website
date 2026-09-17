import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bone opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-sm:hidden">
        Scrivici su WhatsApp
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-ink shadow-[0_14px_32px_-10px_rgb(37_211_102/0.8)] transition-transform duration-300 ease-snappy group-hover:scale-110">
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30 [animation-duration:2.6s]"
        />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
