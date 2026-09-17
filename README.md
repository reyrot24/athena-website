# SSD CAM Athena — sito web

Sito della palestra **SSD CAM Athena** di Montescaglioso: [ssdcamathena.it](https://ssdcamathena.it).

## Stack

- **Next.js 16** (App Router, Turbopack, **Cache Components** con `'use cache'`)
- **React 19** con View Transitions tra le pagine
- **Tailwind CSS 4** (configurazione CSS-first in `src/app/globals.css`)
- **motion** per le animazioni, **Radix UI** per dialog e lightbox accessibili
- **Sanity** come CMS: `next-sanity` 13 con **Sanity Live** (contenuti aggiornati in tempo reale)
- **Vercel Blob** per i video delle news, **iubenda** per i cookie

## Avvio in locale

```bash
npm install
npm run dev        # http://localhost:3000
```

Altri comandi: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

### Variabili d'ambiente (`.env.local`)

| Variabile | A cosa serve |
| --- | --- |
| `PROJECT_ID` (o `NEXT_PUBLIC_SANITY_PROJECT_ID`) | Progetto Sanity (se manca si usa `b0b0ndzw`) |
| `CREATE_TOKEN` | Token Sanity con permesso di scrittura, per salvare le recensioni |
| `NEXT_PUBLIC_GOOGLE_MAPS_API` | Chiave Google Maps per la mappa nei contatti |
| `NEXT_PUBLIC_GOOGLE_MAPS_ID_MAP` | Map ID di Google Maps (necessario per il marker) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob, per l'upload dei video |
| `ADMIN_USER`, `ADMIN_PASS` | Credenziali dell'area riservata `/sign-in` → `/upload` |
| `SESSION_SECRET` | Consigliato: segreto per firmare il cookie di sessione (se manca si usa `ADMIN_PASS`) |

## Struttura

```
src/
  app/
    (site)/            pagine pubbliche: home, chisiamo, corsi, orari, galleria, news, testimonianze
      _components/home sezioni della home
    (admin)/           area riservata: sign-in, upload video
    api/video/         token per l'upload su Vercel Blob (solo con sessione valida)
    og/                immagine di anteprima per i social
  components/          UI e componenti condivisi (layout, orari, galleria, news, trainer…)
  lib/                 dati del sito (contatti, discipline), orari, autenticazione, server actions
  sanity/              client, query GROQ, tipi e fetch con cache
sanity/                Sanity Studio (progetto separato)
```

Testi fissi come contatti, social e descrizioni delle discipline sono in `src/lib/site.ts`.

## Come si aggiornano i contenuti

Tutto quello che cambia spesso si gestisce da **Sanity Studio**: news, orari, locandine, galleria, trainer,
tappe della storia e moderazione delle recensioni (vista «Recensioni da approvare»).

Le pagine sono prerenderizzate e servite dalla cache. Quando pubblichi su Sanity:

- con **Sanity Live** la modifica compare subito per chi sta navigando sul sito;
- in ogni caso la cache si rinnova al massimo ogni **5 minuti**.

> Perché Sanity Live funzioni, il dominio del sito deve essere tra le origini CORS del progetto:
> [sanity.io/manage](https://sanity.io/manage/project/b0b0ndzw/api) → API → CORS origins →
> aggiungi `https://ssdcamathena.it` (e `http://localhost:3000` per lo sviluppo).

### Orari

Nel documento «Orari corsi» scrivi un orario per riga nel formato `17:30-18:30`, con un'eventuale
etichetta: `Bambini: 17:30-18:30`. Il sito estrae l'orario per mostrare cosa è «in corso» oggi.

## Sanity Studio

```bash
cd sanity
npm install
npm run dev       # studio in locale
npm run deploy    # pubblica su https://ssdcamathena.sanity.studio
```
