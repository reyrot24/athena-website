"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
};

/** Entrata morbida quando l'elemento entra nel viewport. Non usarlo sopra la piega. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Component = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Component>
  );
}
