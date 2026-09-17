"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = { href: string; children: React.ReactNode };

function PendingHint() {
  const { pending } = useLinkStatus();
  return <span aria-hidden className={cn("link-hint", pending && "is-pending")} />;
}

function NavLinkBase({ href, children, active }: NavLinkProps & { active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-opacity",
        active ? "opacity-100" : "opacity-75 hover:opacity-100",
      )}
    >
      {children}
      <PendingHint />
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3.5 bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-500 ease-snappy",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

function NavLinkWithPathname(props: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === props.href || pathname.startsWith(`${props.href}/`);
  return <NavLinkBase {...props} active={active} />;
}

// usePathname sospende durante il prerender delle route con parametri non noti
// (es. una news nuova): il fallback è lo stesso link senza stato attivo.
export function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkBase {...props} active={false} />}>
      <NavLinkWithPathname {...props} />
    </Suspense>
  );
}
