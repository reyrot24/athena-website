import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali degli utenti del sito di SSD CAM Athena.",
  alternates: { canonical: "/privacy" },
};

// Testo scritto sui trattamenti reali del sito: se si aggiungono servizi (analytics, pixel,
// moduli di contatto) va aggiornato insieme alla Cookie policy.
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={
        <>
          Privacy <span className="txt-gradient">policy</span>
        </>
      }
      description="Come trattiamo i dati personali di chi visita il sito, ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)."
      updatedAt="23 settembre 2026"
    >
      <LegalSection title="Titolare del trattamento">
        <p>
          <strong>{site.legal.company}</strong>, {site.address.full}, P.IVA {site.legal.vat}.
          <br />
          Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Telefono:{" "}
          <a href={site.phone.href}>{site.phone.display}</a>
        </p>
      </LegalSection>

      <LegalSection title="Quali dati trattiamo e perché">
        <p>
          <strong>Dati di navigazione.</strong> Come ogni sito, i server che lo ospitano registrano in
          automatico alcuni dati tecnici delle visite: indirizzo IP, tipo di browser, pagine richieste, data e
          ora. Servono solo a far funzionare il sito e a proteggerlo da abusi; non li usiamo per
          identificarti. Base giuridica: legittimo interesse del titolare (art. 6.1.f GDPR).
        </p>
        <p>
          <strong>Recensioni.</strong> Se scrivi una recensione raccogliamo la valutazione, il testo e, solo
          se decidi di inserirlo, il tuo nome (altrimenti compari come &laquo;Anonimo&raquo;). La recensione
          viene letta dallo staff e, se approvata, pubblicata sul sito. Base giuridica: il tuo consenso,
          espresso inviando il modulo (art. 6.1.a GDPR), che puoi ritirare in qualsiasi momento chiedendoci
          di rimuoverla. Ti chiediamo di non inserire nel testo dati personali tuoi o di altre persone.
        </p>
        <p>
          <strong>Contatti.</strong> Se ci scrivi via email, telefono o WhatsApp usiamo i dati che ci fornisci
          solo per risponderti e, se lo chiedi, per darti informazioni su corsi e abbonamenti (art. 6.1.b
          GDPR). WhatsApp è un servizio di Meta, che tratta i dati secondo la propria informativa.
        </p>
        <p>
          <strong>Mappa.</strong> La mappa di Google Maps si carica solo se la attivi tu: i dettagli sono
          nella <Link href="/cookie-policy">Cookie policy</Link>.
        </p>
        <p>
          Il sito non usa strumenti di statistica, profilazione o pubblicità e non vende né cede dati a
          terzi.
        </p>
      </LegalSection>

      <LegalSection title="Per quanto tempo">
        <ul>
          <li>Dati di navigazione: per il periodo limitato previsto dal fornitore di hosting per i log tecnici.</li>
          <li>Recensioni: finché restano pubblicate o fino a quando ci chiedi di cancellarle.</li>
          <li>Contatti: per il tempo necessario a rispondere alla tua richiesta.</li>
        </ul>
      </LegalSection>

      <LegalSection title="A chi arrivano i dati">
        <p>I dati sono trattati dallo staff autorizzato e dai fornitori tecnici che ci servono per gestire il sito:</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (USA): hosting del sito e archiviazione dei video delle news.
          </li>
          <li>
            <strong>Sanity AS</strong> (Norvegia): gestione dei contenuti del sito e archiviazione delle
            recensioni.
          </li>
          <li>
            <strong>Google</strong>: solo se attivi la mappa, come spiegato nella Cookie policy.
          </li>
        </ul>
        <p>
          Alcuni fornitori possono trattare dati negli Stati Uniti. Il trasferimento avviene sulla base della
          decisione di adeguatezza della Commissione europea (EU-US Data Privacy Framework) o delle clausole
          contrattuali standard previste dall&apos;art. 46 GDPR.
        </p>
      </LegalSection>

      <LegalSection title="I tuoi diritti">
        <p>
          In qualsiasi momento puoi chiedere di accedere ai tuoi dati, correggerli, cancellarli, limitarne il
          trattamento o opporti, oltre a ritirare il consenso dato (artt. 15-22 GDPR). Basta scrivere a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Se ritieni che il trattamento non sia corretto puoi presentare reclamo al{" "}
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
            Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Modifiche">
        <p>
          Potremmo aggiornare questa informativa, per esempio se aggiungiamo nuovi servizi al sito. La data in
          alto indica l&apos;ultima versione.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
