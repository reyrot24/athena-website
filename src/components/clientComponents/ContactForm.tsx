"use client";
import React, { useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";

type ButtonProps = {
  text: string;
};
type ContactProps = {
  button: ButtonProps;
};

export type Props = React.ComponentPropsWithoutRef<"form"> &
  Partial<ContactProps>;

const ContactForm = (props: ContactProps) => {
  const { button } = {
    ...props,
  } as Props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(
    false
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, message, acceptTerms });
  };

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
      <div className="grid w-full items-center">
        <Label htmlFor="name" className="mb-2 text-xl">
          Nome
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center">
        <Label htmlFor="email" className="mb-2 text-xl">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center">
        <Label htmlFor="message" className="mb-2 text-xl">
          Messaggio
        </Label>
        <Textarea
          id="message"
          placeholder="Scrivi il tuo messaggio..."
          className="min-h-[11.25rem] overflow-auto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={setAcceptTerms}
        />
        <Label htmlFor="terms" className="cursor-pointer text-lg">
          Accetto i{" "}
          <a
            className="text-link-primary underline ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termini di Servizio
          </a>
        </Label>
      </div>
      <div>
        <Button variant="default" className="btn-pad">
          {button?.text}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
