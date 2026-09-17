import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SSD CAM Athena · Palestra a Montescaglioso",
    template: "%s · SSD CAM Athena",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "palestra Montescaglioso",
    "fitness Montescaglioso",
    "sala pesi Montescaglioso",
    "kickboxing Montescaglioso",
    "calisthenics Montescaglioso",
    "pilates Montescaglioso",
    "danza Montescaglioso",
    "wing chun Matera",
    "SSD CAM Athena",
  ],
  authors: [{ name: site.name }],
  icons: { icon: "/favicon.ico", apple: "/logo.png" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    images: [{ url: "/og", width: 1200, height: 630, alt: "SSD CAM Athena — We are Athena" }],
  },
  twitter: { card: "summary_large_image", images: ["/og"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
