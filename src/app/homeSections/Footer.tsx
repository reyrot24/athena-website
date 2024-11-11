/* import { Input } from "@/components/ui/Input"; */
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi";
/* import { Button } from "@/components/ui/Button"; */
import Link from "next/link";
import Image from "next/image";
import {
  CookiePolicyLink,
  PrivacyPolicyLink,
} from "@/components/clientComponents/Privacy";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  url: string;
  title: string;
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type Address = {
  label: string;
  value: string;
};

type Contact = {
  label: string;
  phone: string;
  email: string;
};

type FooterLink = {
  title: string;
  url: string;
};

type ButtonProps = {
  text: string;
};

type Props = {
  logo: ImageProps;
  newsletterHeading: string;
  newsletterDescription: string;
  inputPlaceholder?: string;
  button: ButtonProps;
  termsAndConditions: string;
  columnLinks: Links[];
  socialMediaLinks: SocialMediaLinks[];
  footerText?: string;
  footerLinks: FooterLink[];
  address: Address;
  contact: Contact;
};

export type Footer2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Footer = (props: Footer2Props) => {
  const {
    logo,
    /* newsletterHeading,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions, */
    columnLinks,
    socialMediaLinks,
    footerText,
    address,
    contact,
  } = {
    ...Footer2Defaults,
    ...props,
  } as Props;
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:pb-10 lg:pt-20 bg-bg text-text">
      <div className="container border-[1px] border-accentYellow px-8">
        <div className="grid grid-cols-1 items-start gap-y-12 pb-6 md:gap-y-16 md:pb-8 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-10">
          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-12 lg:grid-cols-2">
            <div>
              <Link
                href={logo.url!}
                className="sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto"
              >
                <Image src={logo.src} alt={logo.alt!} width={80} height={80} />
              </Link>
              <div className="mb-6 md:mb-8">
                <div className="mt-6">
                  <p className="mb-1 text-2xl tracking-wider font-medium">
                    {address.label}
                  </p>
                  <p className="mb-5 text-lg tracking-wide md:mb-6  ">
                    {address.value}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-2xl tracking-wider font-medium ">
                    {contact.label}
                  </p>
                  <p className="flex flex-col text-lg tracking-wide underline decoration-accentYellow underline-offset-1 md:mb-6">
                    <a
                      href={`tel:${contact.phone}`}
                      className="focus-visible:outline-none "
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="focus-visible:outline-none"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              </div>
              <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3 gap-y-0">
                {socialMediaLinks.map((link, index) => (
                  <a
                    key={index}
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice
                    href={link.url}
                    className="focus-visible:outline-none border-[0.5px] border-transparent hover:border-accentYellow rounded-full"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-10">
              <h2 className="mb-3 text-2xl tracking-wider font-medium md:mb-4">
                Tutti i link
              </h2>
              {columnLinks.map((link, index) => (
                <div
                  key={index}
                  className="py-2 block text-lg tracking-wider focus-visible:outline-none animation-linkFooter"
                >
                  <Link
                    href={link.url}
                    className="flex items-center gap-3 focus-visible:outline-none "
                  >
                    {link.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden flex-col mt-10 md:flex">
            <h1 className="mb-3 text-2xl tracking-wider font-medium md:mb-4">
              La <span className="text-accentYellow underline">Newsletter</span>{" "}
              sarà presto disponibile!
            </h1>
          </div>
          {/*
            <p className="mb-3 text-base tracking-wider md:mb-4">
              {newsletterDescription}
            </p>
            <div className="max-w-md">
              <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4">
                <Input placeholder={inputPlaceholder} />
                <Button variant="default">{button.text}</Button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex items-center justify-between flex-col gap-4 my-6 text-sm md:pb-0 md:my-8 lg:flex-row ">
          <div className="flex items-center justify-center gap-4  md:flex-row md:justify-center">
            <PrivacyPolicyLink />
            <CookiePolicyLink />
          </div>
          <div className="flex justify-end">
            <p className="">{footerText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer2Defaults: Footer2Props = {
  logo: {
    url: "#",
    src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
    alt: "Logo image",
  },
  newsletterHeading: "Iscriviti",
  newsletterDescription:
    "Unisciti alla nostra newsletter per future offerte e promozioni.",
  inputPlaceholder: "Inserisci la tua email",
  termsAndConditions: `
  <p class='text-base tracking-wider'>
  Iscrivendoti accetti la nostra 
    <a href='#' class='underline focus-visible:outline-none'>Privacy</a>
    e dai il consenso a ricevere aggiornamenti dalla nostra palestra.
  </p>
  `,
  address: {
    label: "Indirizzo:",
    value: "Via Bernalda, 75024 Montescaglioso MT",
  },
  contact: {
    label: "Contatti:",
    phone: "3920595980",
    email: "ssdathena@libero.it",
  },
  socialMediaLinks: [
    {
      url: "https://www.facebook.com/profile.php?id=61552120251038",
      icon: <BiLogoFacebookCircle className="size-6 text-accentYellow" />,
    },
    {
      url: "https://www.instagram.com/ssd.cam.athena/",
      icon: <BiLogoInstagram className="size-6 text-accentYellow" />,
    },
  ],
  footerText: "© 2024 SSDCamAthena. Tutti i diritti sono riservati.",
};
