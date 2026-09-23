import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferences } from "@/components/layout/cookie-preferences-button";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Quali cookie e strumenti simili usa il sito di SSD CAM Athena e come gestire le tue preferenze.",
  alternates: { canonical: "/cookie-policy" },
};

// Elenco da tenere allineato con il codice: cookie in `lib/auth.ts`, storage in `lib/consent.ts`,
// `next-themes` e `intro-splash.tsx`.
const technical = [
  {
    name: "athena_admin",
    type: "Cookie",
    purpose: "Mantiene l'accesso all'area riservata allo staff. Non viene impostato per i visitatori.",
    duration: "8 ore",
  },
  {
    name: "theme",
    type: "Archivio locale",
    purpose: "Ricorda se preferisci il tema chiaro o scuro.",
    duration: "Finché non lo cancelli",
  },
  {
    name: "athena-consent-maps",
    type: "Archivio locale",
    purpose: "Ricorda se hai scelto di mostrare la mappa di Google.",
    duration: "Finché non lo cancelli",
  },
  {
    name: "athena-intro",
    type: "Archivio di sessione",
    purpose: "Evita di mostrare l'animazione iniziale a ogni pagina.",
    duration: "Fino alla chiusura del browser",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookie"
      title={
        <>
          Cookie <span className="txt-gradient">policy</span>
        </>
      }
      description="Il sito usa solo cookie tecnici. Nessuna statistica, nessuna profilazione, nessuna pubblicità."
      updatedAt="23 settembre 2026"
    >
      <LegalSection title="Cosa sono i cookie">
        <p>
          I cookie e gli strumenti simili (come l&apos;archivio locale del browser) sono piccoli file che un
          sito salva sul tuo dispositivo. Quelli <strong>tecnici</strong> servono a far funzionare il sito e,
          per legge, non richiedono il consenso. Gli altri, come quelli di statistica o pubblicità, si possono
          usare solo se li accetti.
        </p>
      </LegalSection>

      <LegalSection title="Cookie tecnici">
        <p>Questi sono tutti gli strumenti che il sito salva sul tuo dispositivo:</p>
        <div className="overflow-x-auto rounded-3xl border">
          <table className="w-full min-w-xl text-left text-base">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th scope="col" className="p-4 font-semibold">Nome</th>
                <th scope="col" className="p-4 font-semibold">Tipo</th>
                <th scope="col" className="p-4 font-semibold">A cosa serve</th>
                <th scope="col" className="p-4 font-semibold">Durata</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {technical.map((item) => (
                <tr key={item.name}>
                  <td className="p-4 font-mono text-sm text-foreground">{item.name}</td>
                  <td className="p-4">{item.type}</td>
                  <td className="p-4">{item.purpose}</td>
                  <td className="p-4">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="Google Maps">
        <p>
          Nella home trovi la mappa interattiva della palestra, fornita da Google. <strong>Non viene caricata
          finché non premi &laquo;Mostra mappa&raquo;</strong>: prima di quel momento il tuo browser non si
          collega ai server di Google. Una volta attivata, Google può ricevere il tuo indirizzo IP e usare
          cookie propri, secondo la sua{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            informativa privacy
          </a>{" "}
          e la sua{" "}
          <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
            politica sui cookie
          </a>
          .
        </p>
        <p>
          Se non vuoi attivarla puoi comunque aprire le indicazioni stradali su Google Maps con il pulsante
          &laquo;Indicazioni&raquo;.
        </p>
      </LegalSection>

      <LegalSection title="Link esterni">
        <p>
          I pulsanti di WhatsApp, Instagram e Facebook sono semplici link: non caricano nulla finché non ci
          clicchi. Una volta aperti, valgono le informative di quei servizi.
        </p>
      </LegalSection>

      <LegalSection title="Le tue preferenze">
        <p>
          Puoi attivare o disattivare la mappa qui sotto, oppure in qualsiasi pagina con &laquo;Preferenze
          cookie&raquo; in fondo al sito. Puoi anche cancellare cookie e dati salvati dalle impostazioni del
          tuo browser: in questo caso ti chiederemo di nuovo se vuoi vedere la mappa.
        </p>
        <div className="rounded-4xl border bg-card p-6 text-base text-card-foreground sm:p-8">
          <CookiePreferences standalone />
        </div>
        <p>
          Per sapere come trattiamo i dati personali leggi la <Link href="/privacy">Privacy policy</Link>. Per
          domande scrivi a <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
