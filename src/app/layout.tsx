import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { ModeToggle } from "@/components/dark-mode/toggle";
import {
  IubendaProvider,
  IubendaCookieSolutionBannerConfigInterface,
} from "@mep-agency/next-iubenda";
import Link from "next/link";

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
  floatingPreferencesButtonDisplay: "bottom-left",

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
            {children}
            {<ModeToggle />}
          </ThemeProvider>
        </IubendaProvider>
      </body>
    </html>
  );
}
