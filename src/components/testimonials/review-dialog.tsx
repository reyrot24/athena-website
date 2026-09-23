"use client";

import { ArrowRight, Check, LoaderCircle, MessageCircle, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/field";
import { submitReview, type ReviewState } from "@/lib/actions/reviews";
import { cn } from "@/lib/utils";

const initialState: ReviewState = { status: "idle" };

export function ReviewDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        // A ogni apertura un modulo nuovo (lo stato di useActionState non si resetta da solo).
        if (value) setFormKey((key) => key + 1);
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className={className}>
          <MessageCircle /> Scrivi una recensione
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="review-description">
        <ReviewForm key={formKey} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function ReviewForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          className="mx-auto grid size-20 place-items-center rounded-full bg-brand text-ink"
        >
          <Check className="size-10" />
        </motion.span>
        <DialogTitle className="mt-6">Grazie!</DialogTitle>
        <DialogDescription id="review-description" className="mx-auto mt-3 max-w-sm">
          La tua recensione è stata inviata e sarà pubblicata dopo l&apos;approvazione dello staff.
        </DialogDescription>
        <Button className="mt-8" onClick={onClose}>
          Chiudi
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="pr-8">
        <DialogTitle>La tua esperienza</DialogTitle>
        <DialogDescription id="review-description" className="mt-2">
          Raccontaci com&apos;è allenarsi da Athena. Pubblicheremo la recensione dopo averla letta.
        </DialogDescription>
      </div>

      {/* Honeypot anti-spam: invisibile alle persone. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Valutazione</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              onMouseEnter={() => setHover(value)}
              className="cursor-pointer rounded-xl p-1 transition-transform hover:scale-110 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                required
                className="sr-only"
              />
              <Star
                aria-hidden
                className={cn(
                  "size-9 transition-colors",
                  (hover || rating) >= value ? "fill-brand text-brand" : "text-muted-foreground/40",
                )}
              />
              <span className="sr-only">{value === 1 ? "1 stella" : `${value} stelle`}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="review-name">
          Nome <span className="font-normal text-muted-foreground">(facoltativo)</span>
        </Label>
        <Input
          id="review-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
          placeholder="Anonimo"
          autoComplete="given-name"
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <Label htmlFor="review-message">Recensione</Label>
          <span className="text-xs text-muted-foreground tabular-nums">{message.length}/500</span>
        </div>
        <Textarea
          id="review-message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={10}
          maxLength={500}
          rows={5}
          placeholder="Scrivi qui la tua esperienza…"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" /> Invio in corso…
          </>
        ) : (
          <>
            Invia recensione <ArrowRight />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Inviando la recensione acconsenti alla sua pubblicazione dopo l&apos;approvazione dello staff.{" "}
        <Link href="/privacy" onClick={onClose} className="font-semibold text-brand-ink underline-offset-2 hover:underline">
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
