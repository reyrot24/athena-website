import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { ModeToggle } from "@/components/dark-mode/toggle";
import {
  IubendaProvider,
  IubendaCookieSolutionBannerConfigInterface,
} from "@mep-agency/next-iubenda";

const inter = Archivo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
