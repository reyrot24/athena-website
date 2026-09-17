import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Area riservata",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark grain relative isolate grid min-h-dvh place-items-center overflow-hidden bg-background px-5 py-16 text-foreground">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgb(246_161_76/0.25),transparent_70%)]"
      />
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="relative size-12 overflow-hidden rounded-full bg-white/5">
            <Image src="/logo.png" alt="" fill sizes="48px" className="scale-[1.9] object-contain" />
          </span>
          <span className="font-display text-3xl uppercase">Athena</span>
        </Link>
        <main className="rounded-4xl border bg-card p-7 shadow-2xl sm:p-9">{children}</main>
      </div>
    </div>
  );
}
