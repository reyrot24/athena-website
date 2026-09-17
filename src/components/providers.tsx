"use client";

import {
  IubendaProvider,
  type IubendaCookieSolutionBannerConfigInterface,
} from "@mep-agency/next-iubenda";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { site } from "@/lib/site";

const iubendaConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: site.iubenda.siteId,
  cookiePolicyId: site.iubenda.cookiePolicyId,
  lang: "it",
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IubendaProvider bannerConfig={iubendaConfig}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </IubendaProvider>
  );
}
