"use client";

import { buttons } from "@/constants/buttons";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/clientComponents/Loader";
import Head from "next/head";
import { Header } from "@/components/homeSections/Header";
import { Corsi } from "@/components/homeSections/Corsi";
import Gallery from "@/components/homeSections/Gallery";
import { Contact } from "@/components/homeSections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Controlla se il loader è già stato mostrato in questa sessione
    const hasVisitedSession = sessionStorage.getItem("hasVisitedSession");

    if (hasVisitedSession) {
      // Se l'utente ha già visitato la home in questa sessione, non mostrare l'animazione
      setIsLoading(false);
    } else {
      // Se è la prima visita in questa sessione, mostra l'animazione
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisitedSession", "true");
      }, 4000);
    }
  }, []);

  return (
    <section>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        {isLoading ? (
          <motion.div exit={{ opacity: 0, z: 100 }}>
            <Loader />
          </motion.div>
        ) : (
          <motion.main
            /*    initial={{
            opacity: 0,
          }} */
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 2 }}
          >
            <Header button={buttons[2]} />
            <Corsi />
            <Gallery />
            <Contact heading="Vieni a trovarci o scrivici" />
          </motion.main>
        )}
      </AnimatePresence>
    </section>
  );
}
