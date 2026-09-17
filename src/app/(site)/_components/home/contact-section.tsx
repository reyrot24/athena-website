import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { GymMap } from "@/components/contact/gym-map";
import { WhatsAppIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { site, whatsappLink } from "@/lib/site";

const tiles = [
  { icon: MapPin, label: "Indirizzo", value: site.address.full, href: site.address.mapsUrl, cta: "Indicazioni", external: true },
  { icon: Phone, label: "Telefono", value: site.phone.display, href: site.phone.href, cta: "Chiama", external: false },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, cta: "Scrivi", external: false },
];

export function ContactSection() {
  return (
    <section id="contatti" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contatti"
            title={
              <>
                Vieni a <span className="txt-gradient">trovarci</span>
              </>
            }
            description="Passa a conoscerci o scrivici per qualsiasi domanda su corsi e abbonamenti."
          />

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex items-center justify-between gap-6 rounded-[1.75rem] bg-whatsapp p-6 text-ink transition hover:brightness-105 sm:p-7"
          >
            <span className="flex items-center gap-4">
              <WhatsAppIcon className="size-10 shrink-0" />
              <span>
                <span className="block text-xs font-bold tracking-[0.2em] uppercase opacity-70">
                  Il modo più veloce
                </span>
                <span className="block font-display text-3xl uppercase">Scrivici su WhatsApp</span>
              </span>
            </span>
            <ArrowUpRight className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {tiles.map(({ icon: Icon, ...tile }, i) => (
              <li key={tile.label} className={i === 0 ? "sm:col-span-2" : undefined}>
                <a
                  href={tile.href}
                  {...(tile.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-3xl border bg-card p-5 transition hover:border-brand"
                >
                  <Icon className="size-6 text-brand-ink" />
                  <span className="mt-4 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {tile.label}
                  </span>
                  <span className="mt-1 font-semibold wrap-break-word">{tile.value}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-brand-ink">
                    {tile.cta}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden rounded-4xl border bg-ink lg:min-h-full">
          <GymMap />
        </div>
      </div>
    </section>
  );
}
