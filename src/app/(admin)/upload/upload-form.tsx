"use client";

import { upload } from "@vercel/blob/client";
import { Check, Copy, FileVideo, RotateCcw, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_BYTES = 500 * 1024 * 1024;

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  function pick(selected: File | undefined) {
    setError(null);
    setUrl(null);
    if (!selected) return;
    if (selected.type !== "video/mp4") return setError("Seleziona un file MP4.");
    if (selected.size > MAX_BYTES) return setError("Il file supera i 500 MB.");
    setFile(selected);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setError(null);
    setProgress(0);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/video",
        multipart: file.size > 50 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });
      setUrl(blob.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Caricamento non riuscito.");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setFile(null);
    setUrl(null);
    setError(null);
    setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (url) {
    return (
      <div className="mt-8 space-y-5">
        <div className="rounded-3xl border border-brand/40 bg-brand/10 p-5">
          <p className="flex items-center gap-2 font-semibold">
            <Check className="size-5 text-brand" /> Video caricato
          </p>
          <p className="mt-3 rounded-xl bg-background/60 p-3 font-mono text-xs break-all">{url}</p>
          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
            }}
          >
            {copied ? <Check /> : <Copy />} {copied ? "Link copiato" : "Copia link"}
          </Button>
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Apri la news su Sanity Studio.</li>
          <li>Attiva «Questo post contiene un video?».</li>
          <li>Incolla il link nel campo «Link video» e pubblica.</li>
        </ol>
        <Button type="button" variant="ghost" onClick={reset} className="w-full">
          <RotateCcw /> Carica un altro video
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          pick(event.dataTransfer.files[0]);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-10 text-center transition",
          dragging ? "border-brand bg-brand/10" : "hover:border-brand/60",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4"
          className="sr-only"
          onChange={(event) => pick(event.target.files?.[0])}
        />
        {file ? (
          <>
            <FileVideo className="size-10 text-brand" />
            <span className="font-semibold break-all">{file.name}</span>
            <span className="text-sm text-muted-foreground">{formatSize(file.size)} · tocca per cambiare</span>
          </>
        ) : (
          <>
            <Upload className="size-10 text-brand" />
            <span className="font-semibold">Trascina qui il video o tocca per sceglierlo</span>
            <span className="text-sm text-muted-foreground">Formato MP4</span>
          </>
        )}
      </label>

      {progress !== null && (
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-right text-sm text-muted-foreground tabular-nums">{Math.round(progress)}%</p>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={!file || progress !== null}>
        <Upload /> {progress !== null ? "Caricamento…" : "Carica video"}
      </Button>
    </form>
  );
}
