"use client";
import { Header } from "./homeSections/Header";
import { buttons } from "@/constants/buttons";
import Gallery from "./homeSections/Gallery";
import { Contact } from "./homeSections/Contact";
import { Corsi } from "./homeSections/Corsi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/clientComponents/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div exit={{ opacity: 0, z: 100 }}>
          <Loader where="center" />
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
          <Contact heading="Vieni a trovarci" />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
