"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession } from "@/lib/auth";

export type SignInState = { error?: string };

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const user = String(formData.get("user") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(user, password)) {
    // Piccolo ritardo per rendere meno comodi i tentativi a raffica.
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { error: "Nome utente o password non corretti." };
  }

  await createSession();
  redirect("/upload");
}

export async function signOut() {
  await destroySession();
  redirect("/sign-in");
}
