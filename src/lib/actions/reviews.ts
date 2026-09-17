"use server";

import { getWriteClient } from "@/sanity/client";

export type ReviewState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitReview(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  // Honeypot: i bot compilano anche il campo nascosto. Fingiamo che sia andata bene.
  if (formData.get("website")) return { status: "success" };

  const rating = Number(formData.get("rating"));
  const name = String(formData.get("name") ?? "").trim().slice(0, 60);
  const message = String(formData.get("message") ?? "").trim();

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { status: "error", message: "Seleziona una valutazione da 1 a 5 stelle." };
  }
  if (message.length < 10 || message.length > 500) {
    return { status: "error", message: "La recensione deve contenere tra 10 e 500 caratteri." };
  }

  const client = getWriteClient();
  if (!client) {
    console.error("CREATE_TOKEN mancante: impossibile salvare la recensione.");
    return { status: "error", message: "Servizio momentaneamente non disponibile. Riprova più tardi." };
  }

  try {
    await client.create({
      _type: "testimonianze",
      valutazione: rating,
      name: name || "Anonimo",
      message,
      approved: false,
      date: new Date().toISOString(),
    });
    return { status: "success" };
  } catch (error) {
    console.error("Invio recensione non riuscito", error);
    return { status: "error", message: "Invio non riuscito. Riprova più tardi." };
  }
}
