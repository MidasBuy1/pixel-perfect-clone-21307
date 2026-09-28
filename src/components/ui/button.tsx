import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        player:
          "size-12 rounded-full border border-player-border bg-player-surface/70 text-foreground shadow-player-control backdrop-blur-md hover:-translate-y-0.5 hover:bg-player-surface",
        play:
          "size-20 rounded-full border border-player-highlight/55 bg-player-action text-primary-foreground shadow-player-action hover:scale-105",
        ghost: "size-10 rounded-full text-foreground hover:bg-player-surface/70",
      },
      size: {
        default: "h-10 px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "player",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };