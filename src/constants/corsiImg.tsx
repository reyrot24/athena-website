import { images } from "./images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const DanzaDescrizione = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-t">
        <AccordionTrigger>Danza Moderna (grandi)</AccordionTrigger>
        <AccordionContent>
          Il corso affronta lo studio della tecnica <em>enpointe</em>, si
          perfezionano i <em>port de bras</em>, si iniziano a studiare le
          principali variazioni del balletto romantico.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Danza Classica (debuttanti)</AccordionTrigger>
        <AccordionContent>
          Durante questo corso ci si approccia alla tecnica moderna e
          contemporanea. Viene proposta la partecipazione a stage di danza con
          maestri di fama nazionale e internazionale.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Propedeutica alla Danza</AccordionTrigger>
        <AccordionContent>
          {`Il corso racchiude l'introduzione di tutti gli elementi di cui
          l'allievo ha bisogno per iniziare ad esplorare il mondo della
          danza.`}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Danza Moderna (piccoli)</AccordionTrigger>
        <AccordionContent>
          {`Il corso introduce gli allievi al movimento coordinato con la musica,
          all'utilizzo dello spazio scenico in fluidità, alla
          correlazione con gli allievi durante il movimento danzato.`}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Danza Classica (esordienti)</AccordionTrigger>
        <AccordionContent>
          Il corso fornisce gli elementi portanti della danza classica
          attraverso lo studio del metodo Vaganova, studio delle pose e dei
          passi fondamentali della danza.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const corsiImgEDescrizioni = [
  {
    image: {
      src: images.corsi.salapesi.src,
      alt: images.corsi.salapesi.alt,
    },

    heading: "SALA PESI",
    /* descrizione:
      "Allenati quando vuoi, con la supervizione di un istruttore qualificato sempre presente che ti guiderà verso il tuo obiettivo specifico: tonificare, aumentare la massa muscolare, dimagrire, migliorare le tue performance sportive.",
   */
  },
  {
    image: {
      src: images.corsi.fitnessposturale.src,
      alt: images.corsi.fitnessposturale.alt,
    },

    heading: "FITNESS POSTURALE",
    /*  descrizione:
      "Il corso di Fitness posturale ha come obiettivo la salute e l'allenamento ottimale della persona, tenendo conto delle problematiche di salute che un individuo può avere. Il corso si basa su un'ampia gamma di tecniche ed esercizi: a corpo libero, per la respirazione, di pilates, di pesistica e fisioterapici. La maggior parte del corso si svolge in sala 1 di posturale, un'altra parte del corso si svolgerà nell'area in comune con la sala pesi, utilizzando macchinari isotonici selezionati dal fisioterapista.",
   */
  },
  {
    image: {
      src: images.corsi.kickbox.src,
      alt: images.corsi.kickbox.alt,
    },
    heading: "KICKBOXING",
    /* descrizione:
      "Il Kickboxing è una disciplina sportiva riconosciuta dal CONI che può essere praticata a partire dai 5-6 anni di età. Aiuta a tonificare, rassodare tutti i muscoli del corpo: con i pugni si tonificano spalle e braccia, con i calci si rassodano cosce e glutei e con i salti si ottengono polpacci forti e tonificati.",
   */
  },
  {
    image: {
      src: images.corsi.functional.src,
      alt: images.corsi.functional.alt,
    },

    heading: "GINNASTICA AEROBICA con il metodo FUNCTIONAL",
    /*  descrizione:
      "Gli esercizi dell'allenamento funzionale seguono le linee evolutive, potenziandole tramite tecnica, carico e attrezzi differenti. E' completamente basato su movimenti liberi, eseguiti a corpo libero o con l'utilizzo di strumenti specifici. Prevede esercizi divertenti, stimolanti e mai banali, capaci di mettere alla prova l'aspetto fisico, psicologico ed emotivo. Allenerai Forza, Resistenza, Velocità, Flessibilità, Equilibrio, Coordinazione e Stabilità.",
   */
  },
  {
    image: {
      src: images.corsi.calisthenics.src,
      alt: images.corsi.calisthenics.alt,
    },

    heading: "CALISTHENICS",
    /* descrizione:
      "Il calisthenics è l'arte di usare il proprio peso corporeo come resistenza per allenarsi e sviluppare il fisico. Lo scopo è quello di aumentare la forza pura, la flessibilità e la mobilità articolare sotto sforzo, la produzione e la tolleranza all'acido lattico e la resistenza specifica di breve durata, la capacità funzionale di esercitare forza e migliorare la forma fisica generale, attraverso movimenti come tirare, spingere, piegare, saltare e oscillare.",
  */
  },
  {
    image: {
      src: images.corsi.totalbody.src,
      alt: images.corsi.totalbody.alt,
    },
    heading: "GINNASTICA AEROBICA con il metodo TOTAL BODY",
    /*  descrizione:
      "E' un allenamento completo in grado di allenare tutto il corpo. Vi consentirà di dimagrire e migliorare le vostre capacità fisiche. E' previsto un riscaldamento iniziale di tipo cardio seguito da esercizi utili alla tonificazione di braccia, gambe e glutei.",
   */
  },
  {
    image: {
      src: images.corsi.acrobatica.src,
      alt: images.corsi.acrobatica.alt,
    },

    heading: "ACROBATICA",
    /*  descrizione:
      "La ginnastica acrobatica è una disciplina che unisce tecniche acrobatiche di coppia e di gruppo tipiche della tradizione acrobatica, con tecniche individuali a corpo libero tipiche della ginnastica artistica. Sul piano fisico permette lo sviluppo di molte competenze motorie attraverso la proposta di nuovi stimoli ed esperienze di movimento. Gli allievi di questa disciplina hanno l'opportunità di acquisire specifiche qualità del movimento quali Equilibrio, Elasticità, Mobilità, Forza, Potenza, Resistenza, e Coordinazione.",
   */
  },
  {
    image: {
      src: images.corsi.danza.src,
      alt: images.corsi.danza.alt,
    },

    heading: "Danza",
    /*  descrizione: "",
     */
  },
  {
    image: {
      src: images.corsi.danza2.src,
      alt: images.corsi.danza2.alt,
    },
    heading: "Danza2",
    /*  descrizione: "",
     */
  },
];

export const corsi4Img = [
  {
    image: {
      src: images.corsi.salapesi.src,
      alt: images.corsi.salapesi.alt,
    },
    heading: "Sala pesi",
  },
  {
    image: {
      src: images.corsi.fitnessposturale.src,
      alt: images.corsi.fitnessposturale.alt,
    },
    heading: "Fitness posturale",
  },
  {
    image: {
      src: images.corsi.kickbox.src,
      alt: images.corsi.kickbox.alt,
    },
    heading: "Kickboxing",
  },
  {
    image: {
      src: images.corsi.functional.src,
      alt: images.corsi.functional.alt,
    },
    heading: "Functional",
  },
];
