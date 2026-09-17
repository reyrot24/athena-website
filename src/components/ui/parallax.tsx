"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = { children: React.ReactNode; offset?: number; className?: string };

export function Parallax({ children, offset = 50, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("relative", className)}>
      {children}
    </motion.div>
  );
}
