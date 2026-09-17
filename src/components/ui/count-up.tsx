"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = { to: number; suffix?: string; duration?: number };

/** Il valore reale è sempre nel DOM per screen reader e motori di ricerca. */
export function CountUp({ to, suffix = "", duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduceMotion) {
      node.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reduceMotion]);

  return (
    <>
      <span className="sr-only">{`${to}${suffix}`}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {`0${suffix}`}
      </span>
    </>
  );
}
