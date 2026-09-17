"use client";

import { LoaderCircle, LogIn } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { signIn, type SignInState } from "@/lib/actions/auth";

const initialState: SignInState = {};

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <Label htmlFor="user">Nome utente</Label>
        <Input id="user" name="user" autoComplete="username" required autoFocus />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {state.error && (
        <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : <LogIn />} Accedi
      </Button>
    </form>
  );
}
