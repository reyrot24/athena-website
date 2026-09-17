import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none",
    "transition-[background-color,color,border-color,box-shadow,transform,filter] duration-300 ease-snappy active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-ink shadow-[0_12px_32px_-14px_rgb(246_161_76/0.9)] hover:bg-brand-strong hover:shadow-[0_18px_40px_-14px_rgb(246_161_76/1)]",
        outline: "border border-foreground/20 hover:border-brand hover:text-brand-ink",
        ghost: "hover:bg-foreground/5",
        glass: "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        whatsapp: "bg-whatsapp text-ink hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
