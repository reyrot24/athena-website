"use client";

import { ConsentAwareWrapper, useIubenda } from "@mep-agency/next-iubenda";
import { AdvancedMarker, APIProvider, Map as GoogleMap, Pin } from "@vis.gl/react-google-maps";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID_MAP;

/** Google Maps viene caricata solo dopo il consenso ai cookie "esperienza". */
export function GymMap() {
  if (!apiKey) return <MapPlaceholder />;

  return (
    <ConsentAwareWrapper
      requiredGdprPurposes={["experience"]}
      useDefaultStyles={false}
      className="size-full"
      customLoadingNodes={<MapPlaceholder />}
      customConsentNotGrantedNodes={<MapPlaceholder askConsent />}
    >
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={site.geo}
          mapId={mapId}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          className="size-full"
        >
          <AdvancedMarker position={site.geo} title={site.name}>
            <Pin background="#f6a14c" borderColor="#0b0b0c" glyphColor="#0b0b0c" scale={1.3} />
          </AdvancedMarker>
        </GoogleMap>
      </APIProvider>
    </ConsentAwareWrapper>
  );
}

function MapPlaceholder({ askConsent = false }: { askConsent?: boolean }) {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-ink p-8 text-center text-bone">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-size-[40px_40px] opacity-25"
      />
      <div aria-hidden className="absolute top-1/2 left-1/2 size-72 -translate-1/2 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative max-w-sm">
        <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-brand text-ink">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-30" />
          <MapPin className="relative size-8" />
        </span>
        <p className="mt-6 font-display text-3xl uppercase">{site.address.street}</p>
        <p className="text-bone/70">
          {site.address.zip} {site.address.city} ({site.address.province})
        </p>
        {askConsent && (
          <p className="mt-4 text-sm text-bone/60">
            La mappa interattiva usa Google Maps: per vederla accetta i cookie di tipo
            &laquo;Esperienza&raquo;.
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {askConsent && <ConsentButton />}
          <Button asChild variant="glass">
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
              Indicazioni <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConsentButton() {
  const { openPreferences } = useIubenda();
  return (
    <Button
      type="button"
      onClick={() => {
        try {
          openPreferences();
        } catch {
          // iubenda non ancora caricato.
        }
      }}
    >
      Gestisci consensi
    </Button>
  );
}
