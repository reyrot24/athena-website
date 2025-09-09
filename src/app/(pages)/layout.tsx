import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { ModeToggle } from "@/components/dark-mode/toggle";
import {
  IubendaProvider,
  IubendaCookieSolutionBannerConfigInterface,
} from "@mep-agency/next-iubenda";
import { Navbar } from "@/components/homeSections/Navbar";
import { images } from "@/constants/images";
import { buttons } from "@/constants/buttons";
import { Links } from "@/constants/links";
import { Footer } from "@/components/homeSections/Footer";

const inter = Archivo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSD CAM Athena - Montescaglioso",
  description:
    "SSD CAM Athena | WE ARE ATHENA. Centro Attività Motoria a Montescaglioso (MT). Sala pesi - Fitness posturale - Kick boxing - Functional - Calisthenics - Total body - Acrobatica - Danza.",
  icons: {
    icon: "/favicon.ico",
  },
};

const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: 3822715, // Your site ID
  cookiePolicyId: 94168299, // Your cookie policy ID
  lang: "it",
  /*  floatingPreferencesButtonDisplay: "bottom-left", */

  // See https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        href="/favicon.ico"
        type="image/ico"
        sizes="16x16"
      />
      <body className={`${inter.className} text-black bg-black no-scrollbar`}>
        <IubendaProvider bannerConfig={iubendaBannerConfig}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar
              animation={true}
              logo={images.logo}
              button={buttons[1]}
              navLinks={Links}
            />
            {children}
            {<ModeToggle />}
            <Footer
              button={buttons[4]}
              logo={images.logo}
              columnLinks={Links}
            />
          </ThemeProvider>
        </IubendaProvider>
      </body>
    </html>
  );
}
