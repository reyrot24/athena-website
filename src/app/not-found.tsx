import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundContent } from "@/components/not-found-content";

// Per gli URL che non corrispondono a nessuna route: fuori dal layout (site),
// quindi header e footer vanno inclusi qui.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenuto">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </>
  );
}
