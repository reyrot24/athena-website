import { ViewTransition } from "react";

/**
 * Transizione tra pagine con la View Transitions API (header escluso, vedi
 * globals.css). Nei browser che non la supportano la navigazione resta istantanea.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
