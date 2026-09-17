"use client";

import { useIubenda } from "@mep-agency/next-iubenda";

export function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useIubenda();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          openPreferences();
        } catch {
          // Lo script di iubenda non è ancora pronto: il banner comparirà da solo.
        }
      }}
    >
      Preferenze cookie
    </button>
  );
}
