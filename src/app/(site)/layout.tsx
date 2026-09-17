import { IntroSplash } from "@/components/layout/intro-splash";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SanityLive } from "@/sanity/live";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroSplash />
      <SiteHeader />
      <main id="contenuto">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
      {/* Aggiorna le pagine in tempo reale quando lo staff pubblica su Sanity. */}
      <SanityLive />
    </>
  );
}
