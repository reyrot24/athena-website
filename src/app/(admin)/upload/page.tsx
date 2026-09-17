import { ExternalLink, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { isAuthenticated } from "@/lib/auth";
import { studioUrl } from "@/sanity/env";
import { UploadForm } from "./upload-form";

export default async function UploadPage() {
  if (!(await isAuthenticated())) redirect("/sign-in");

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl">Carica un video</h1>
          <p className="mt-2 text-muted-foreground">MP4 fino a 500 MB, per le news con video.</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="icon" aria-label="Esci">
            <LogOut />
          </Button>
        </form>
      </div>

      <UploadForm />

      <a
        href={studioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-brand"
      >
        Apri Sanity Studio <ExternalLink className="size-4" />
      </a>
    </>
  );
}
