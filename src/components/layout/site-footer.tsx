import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DAYS, findCourse, slotsFor } from "@/lib/schedule";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { getSchedule } from "@/sanity/data";
import { CookiePreferencesButton } from "./cookie-preferences-button";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass = "text-bone/70 transition hover:text-brand";

export async function SiteFooter() {
  const [schedule, year] = await Promise.all([getSchedule(), getCurrentYear()]);
  const gym = findCourse(schedule, ["Sala pesi"]);
  const gymHours = gym ? DAYS.map((day) => ({ ...day, slots: slotsFor(gym, day.key) })) : [];

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-10 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
      />

      <div className="container-page grid items-end gap-10 border-b border-white/10 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
        <h2 className="heading-display text-6xl sm:text-7xl lg:text-8xl">
          Il tuo allenamento <span className="txt-gradient">inizia qui.</span>
        </h2>
        <div>
          <p className="text-lg text-bone/70">
            Scrivici per informazioni su corsi, abbonamenti e orari: ti aiutiamo a scegliere il
            percorso giusto per te.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href={site.phone.href}>
                <Phone /> {site.phone.display}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="SSD CAM Athena, home">
            <span className="relative size-12 overflow-hidden rounded-full bg-white/5">
              <Image src="/logo.png" alt="" fill sizes="48px" className="scale-[1.9] object-contain" />
            </span>
            <span className="font-display text-3xl uppercase">Athena</span>
          </Link>
          <p className="mt-5 max-w-xs text-bone/60">
            Centro Attività Motoria a Montescaglioso. Sport, benessere e comunità dal{" "}
            {site.foundedYear}.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-brand hover:text-ink"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-brand hover:text-ink"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Link del sito">
          <h3 className="text-xs font-bold tracking-[0.28em] text-brand uppercase">Esplora</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold tracking-[0.28em] text-brand uppercase">Contatti</h3>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-3 ${linkClass}`}
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city} ({site.address.province})
                </span>
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={`flex gap-3 ${linkClass}`}>
                <Phone className="size-5 shrink-0 text-brand" /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`flex gap-3 ${linkClass}`}>
                <Mail className="size-5 shrink-0 text-brand" /> {site.email}
              </a>
            </li>
          </ul>
        </div>

        {gymHours.length > 0 && (
          <div>
            <h3 className="text-xs font-bold tracking-[0.28em] text-brand uppercase">Sala pesi</h3>
            <dl className="mt-5 space-y-2 text-sm">
              {gymHours.map((day) => (
                <div key={day.key} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <dt className="text-bone/50">{day.short}</dt>
                  <dd className="text-right text-bone/85 tabular-nums">
                    {day.slots.length
                      ? day.slots.map((slot) => (slot.start ? `${slot.start}–${slot.end}` : slot.raw)).join(" · ")
                      : "Chiuso"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-bone/50 lg:flex-row lg:items-center lg:justify-between">
        <p>
          © {year} {site.legal.company} · P.IVA {site.legal.vat}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={site.iubenda.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            Privacy Policy
          </a>
          <a href={site.iubenda.cookieUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
            Cookie Policy
          </a>
          <CookiePreferencesButton className="hover:text-bone" />
          <a
            href={site.credits.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-brand"
          >
            Sito di {site.credits.label} <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="heading-display txt-stroke pointer-events-none -mb-[5vw] text-center text-[24vw] leading-[0.8] text-white/10 select-none"
      >
        Athena
      </p>
    </footer>
  );
}
