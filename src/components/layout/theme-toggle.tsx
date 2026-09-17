"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Le icone cambiano via CSS (classe `dark`), quindi nessun mismatch di idratazione.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative grid size-11 place-items-center rounded-full transition hover:bg-current/10",
        className,
      )}
      aria-label="Cambia tema chiaro o scuro"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-transform duration-500 ease-snappy dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-transform duration-500 ease-snappy dark:scale-100 dark:rotate-0" />
    </button>
  );
}
