"use client";
import { Header } from "./homeSections/Header";
import { buttons } from "@/constants/buttons";
import Gallery from "./homeSections/Gallery";
import { Contact } from "./homeSections/Contact";
import { Corsi } from "./homeSections/Corsi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/clientComponents/Loader";
import { Navbar } from "./homeSections/Navbar";
import { images } from "@/constants/images";
import { Links } from "@/constants/links";
import { Footer } from "./homeSections/Footer";
import Head from "next/head";

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
            <Navbar
              animation={true}
              logo={images.logo}
              button={buttons[1]}
              navLinks={Links}
            />
            <Header button={buttons[2]} />
            <Corsi />
            <Gallery />
            <Contact heading="Vieni a trovarci o scrivici" />
            <Footer
              button={buttons[4]}
              logo={images.logo}
              columnLinks={Links}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </section>
  );
}
