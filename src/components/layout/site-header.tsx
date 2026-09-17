"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled && !open;

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500",
        solid
          ? "bg-background/80 text-foreground shadow-[0_1px_0_var(--border)] backdrop-blur-xl"
          : "text-bone",
      )}
    >
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Vai al contenuto
      </a>

      <div className="container-page flex h-18 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          onClick={close}
          className="group flex items-center gap-3"
          aria-label="SSD CAM Athena, torna alla home"
        >
          <span className="relative size-11 overflow-hidden rounded-full bg-white/5 ring-1 ring-current/15 transition group-hover:ring-brand">
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="44px"
              className="scale-[1.9] object-contain transition-transform duration-500 group-hover:rotate-[-8deg]"
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl tracking-wide uppercase">Athena</span>
            <span className="mt-1 hidden text-[0.6rem] font-bold tracking-[0.3em] uppercase opacity-60 sm:block">
              SSD CAM · Montescaglioso
            </span>
          </span>
        </Link>

        <nav aria-label="Principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Scrivici
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            className="grid size-11 place-items-center rounded-full transition hover:bg-current/10 lg:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute top-0 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-snappy",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute top-1.5 left-0 h-0.5 w-6 rounded-full bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute top-3 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-snappy",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{open && <MobileMenu onNavigate={close} />}</AnimatePresence>
    </header>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const links = [{ title: "Home", href: "/" }, ...navLinks];

  return (
    <motion.div
      id="menu-mobile"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink px-6 pt-28 pb-10 text-bone lg:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-brand/25 blur-3xl"
      />
      <nav aria-label="Menu" className="relative">
        <ul className="space-y-1">
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
              transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Link href={link.href} onClick={onNavigate} className="group flex items-baseline gap-4 py-1.5">
                <span className="w-6 text-xs font-bold text-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="heading-display text-5xl transition duration-300 group-hover:translate-x-2 group-hover:text-brand sm:text-6xl">
                  {link.title}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.45 }}
        className="relative mt-auto space-y-6 pt-10"
      >
        <Button asChild variant="whatsapp" size="lg" className="w-full">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Scrivici su WhatsApp
          </a>
        </Button>
        <div className="flex items-end justify-between gap-6 text-sm text-bone/60">
          <p>
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city} ({site.address.province})
          </p>
          <div className="flex gap-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-bone transition hover:bg-brand hover:text-ink"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-bone transition hover:bg-brand hover:text-ink"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
