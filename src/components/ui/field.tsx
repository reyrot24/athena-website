import { cn } from "@/lib/utils";

export const fieldClass =
  "block w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/20 disabled:opacity-60";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("mb-2 block text-sm font-semibold", className)} {...props} />;
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClass, "min-h-32 resize-y", className)} {...props} />;
}
