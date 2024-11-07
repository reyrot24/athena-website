import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const loadingContainerVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen bg-black flex justify-center items-center"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
        exit="exit"
      >
        <Image
          src="/Intro_logo.gif"
          alt="Intro_logo"
          width={0}
          height={0}
          unoptimized={true}
          className="w-1/2 object-contain"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
