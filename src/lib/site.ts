import {
  Activity,
  Dumbbell,
  Flame,
  HeartPulse,
  Music,
  PersonStanding,
  Swords,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "SSD CAM Athena",
  url: "https://ssdcamathena.it",
  description:
    "SSD CAM Athena — We are Athena. Centro Attività Motoria a Montescaglioso (MT): sala pesi, fitness posturale, pilates, functional, total body, calisthenics, kickboxing, wing chun e danza.",
  foundedYear: 2022,
  address: {
    street: "Via Bernalda snc",
    zip: "75024",
    city: "Montescaglioso",
    province: "MT",
    full: "Via Bernalda snc, 75024 Montescaglioso (MT)",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=40.549448,16.657666",
  },
  geo: { lat: 40.549448, lng: 16.657666 },
  phone: { display: "392 059 5980", href: "tel:+393920595980" },
  email: "ssdathena@libero.it",
  whatsappNumber: "393920595980",
  socials: {
    instagram: "https://www.instagram.com/ssd.cam.athena/",
    facebook: "https://www.facebook.com/profile.php?id=61552120251038",
  },
  legal: { company: "S.S.D. CAM Athena S.R.L.", vat: "01433420773" },
  credits: { label: "Web By Rey", url: "https://www.instagram.com/web.byrey/" },
} as const;

/** Progetto cofinanziato FESR: la pagina e il link nel footer sono obblighi di pubblicità del bando. */
export const fesrProject = {
  href: "/progetti-finanziati",
  title: "Innovazione tecnologica e potenziamento dei servizi della SSD CAM Athena SRL",
  programme: "Programma Regionale Basilicata FESR FSE+ 2021-2027",
  cup: "F45H26000230007",
  poster: "/fesr/poster-progetto-fesr.pdf",
  logos: "/fesr/loghi-fesr.png",
} as const;

export function whatsappLink(message = "Ciao Athena! Vorrei informazioni su corsi e abbonamenti.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { title: "Chi siamo", href: "/chisiamo" },
  { title: "Corsi", href: "/corsi" },
  { title: "Orari", href: "/orari" },
  { title: "Galleria", href: "/galleria" },
  { title: "News", href: "/news" },
  { title: "Testimonianze", href: "/testimonianze" },
] as const;

export type Discipline = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  /** Nomi con cui il corso compare negli "Orari corsi" su Sanity. */
  aliases: string[];
};

// Testi scritti dalla palestra (ripresi dal vecchio sito); Pilates e Wing Chun
// sono stati aggiunti perché compaiono negli orari pubblicati su Sanity.
export const disciplines: Discipline[] = [
  {
    slug: "sala-pesi",
    name: "Sala pesi",
    icon: Dumbbell,
    description:
      "Allenati quando vuoi, con un istruttore qualificato sempre presente che ti guida verso il tuo obiettivo: tonificare, aumentare la massa muscolare, dimagrire, migliorare le performance sportive.",
    aliases: ["Sala pesi"],
  },
  {
    slug: "functional",
    name: "Functional",
    icon: Zap,
    description:
      "Allenamento funzionale basato su movimenti liberi, a corpo libero o con attrezzi specifici. Esercizi stimolanti e mai banali per forza, resistenza, velocità, equilibrio e coordinazione.",
    aliases: ["Allenamento Funzionale", "Functional"],
  },
  {
    slug: "posturale",
    name: "Posturale",
    icon: PersonStanding,
    description:
      "Fitness e rieducazione posturale per la salute e l'allenamento ottimale della persona, tenendo conto delle sue problematiche: corpo libero, respirazione, pilates, pesistica ed esercizi fisioterapici.",
    aliases: ["Posturale", "Fitness Posturale"],
  },
  {
    slug: "pilates",
    name: "Pilates",
    icon: HeartPulse,
    description:
      "Esercizi a basso impatto per rinforzare il core, migliorare postura, flessibilità e controllo del movimento. Adatto a ogni età e livello di allenamento.",
    aliases: ["Pilates"],
  },
  {
    slug: "total-body",
    name: "Total body",
    icon: Flame,
    description:
      "Un allenamento completo che coinvolge tutto il corpo: riscaldamento cardio seguito da esercizi di tonificazione per braccia, gambe e glutei. Ideale per dimagrire e migliorare le capacità fisiche.",
    aliases: ["Total body"],
  },
  {
    slug: "calisthenics",
    name: "Calisthenics",
    icon: Activity,
    description:
      "L'arte di usare il proprio peso corporeo come resistenza: forza pura, mobilità articolare e controllo del corpo attraverso movimenti come tirare, spingere, saltare e oscillare.",
    aliases: ["Calisthenics"],
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    icon: Trophy,
    description:
      "Disciplina riconosciuta dal CONI, praticabile dai 5-6 anni. Tonifica tutto il corpo: con i pugni spalle e braccia, con i calci cosce e glutei, con i salti polpacci forti. Corsi per bambini, principianti e avanzati.",
    aliases: ["Kickboxing", "Kick Boxing"],
  },
  {
    slug: "wing-chun",
    name: "Wing Chun",
    icon: Swords,
    description:
      "Arte marziale tradizionale cinese basata su tecnica, riflessi e controllo: sviluppa coordinazione, rapidità e sicurezza in se stessi.",
    aliases: ["Wing chun"],
  },
  {
    slug: "danza",
    name: "Danza",
    icon: Music,
    description:
      "Classica, moderna e propedeutica: dal metodo Vaganova alla tecnica moderna e contemporanea, con percorsi per piccoli e grandi, debuttanti ed esordienti.",
    aliases: ["Danza"],
  },
];

/** Tappe mostrate se su Sanity non c'è ancora nessun documento "La nostra storia". */
export const fallbackMilestones = [
  { date: "2022-09-05", title: "Inaugurazione A.S.D. CAM Athena", description: null },
  { date: "2023-08-18", title: "Ampliamento sala pesi e attrezzi", description: null },
  { date: "2025-01-01", title: "Da A.S.D. a SSD CAM Athena S.r.l.", description: null },
  { date: "2025-05-08", title: "Innovazione digitale", description: null },
  {
    date: "2025-06-23",
    title: "Collaborazione con il Comune di Montescaglioso per il Campus Sportivo Balneare",
    description: null,
  },
];
