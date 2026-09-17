import { SignInForm } from "./sign-in-form";

export default function SignInPage() {
  return (
    <>
      <h1 className="heading-display text-4xl">Area riservata</h1>
      <p className="mt-2 text-muted-foreground">Accedi per caricare i video delle news.</p>
      <SignInForm />
    </>
  );
}
