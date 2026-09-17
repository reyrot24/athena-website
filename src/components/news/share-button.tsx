"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // Condivisione annullata dall'utente.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" onClick={share} className="w-full">
      {copied ? (
        <>
          <Check /> Link copiato
        </>
      ) : (
        <>
          <Share2 /> Condividi
        </>
      )}
    </Button>
  );
}
