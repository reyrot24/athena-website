"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { BiSolidStar } from "react-icons/bi";
import { toast, Toaster } from "react-hot-toast";

export default function TestimonialBanner() {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0); // for star rating
  const [hover, setHover] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/add-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valutazione: rating,
          name: formData.get("name"),
          message: formData.get("message"),
          hiddenField: formData.get("website"), // honeypot
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast("✅ Grazie per la tua recensione.");
        form.reset();
      } else {
        toast(
          `❌ ${data.error || "Qualcosa è andato storto. Riprova più tardi."}`
        );
      }
    } catch (err) {
      console.log(err);
      toast("❌ C'è stato un errore. Riprova più tardi.");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  }

  return (
    <div className="mt-[80px] w-full bg-accentYellow text-text text-center py-6 px-4 mb-8">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenDialog(true)}
            className="p-4 h-fit text-text text-wrap font-semibold text-xl md:text-3xl cursor-pointer underline hover:no-underline"
          >
            💬 Scrivi una recensione sulla tua esperienza nella nostra palestra
            👈🏻
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invia una Recensione</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 text-text">
            {/* Honeypot */}
            <Input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Valutazione
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <BiSolidStar
                    key={star}
                    className={`cursor-pointer w-7 h-7 ${
                      (hover || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="name">
                Nome (facoltativo)
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-lg p-2 "
                placeholder="Anonimo"
              />
            </div>

            <div>
              <Label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Recensione
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                maxLength={500}
                rows={4}
                className="w-full rounded-lg border p-2"
                placeholder="Scrivi la tua recensione..."
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Sto inviando..." : "Invia"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
