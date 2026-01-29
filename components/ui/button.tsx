import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Brand Primary - Main CTA (Blue)
        primary:
          "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 hover:shadow-lg hover:shadow-[var(--brand-primary)]/30 focus-visible:ring-[var(--brand-primary)]",
        // Brand Secondary - Secondary actions (Teal/Dark)
        secondary:
          "bg-[var(--brand-teal)] text-white hover:bg-[var(--brand-teal)]/90 hover:shadow-lg hover:shadow-[var(--brand-teal)]/30 focus-visible:ring-[var(--brand-teal)]",
        // Brand Accent - Highlight/Special (Yellow)
        accent:
          "bg-[var(--brand-accent)] text-[var(--brand-dark)] hover:brightness-110 hover:shadow-lg hover:shadow-[var(--brand-accent)]/30 focus-visible:ring-[var(--brand-accent)]",
        // Outline Primary - Outlined with primary color
        "outline-primary":
          "border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] bg-transparent hover:bg-[var(--brand-primary)]/10 focus-visible:ring-[var(--brand-primary)]",
        // Outline Light - For dark backgrounds
        "outline-light":
          "border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 focus-visible:ring-white",
        // Ghost - Transparent with hover
        ghost:
          "text-[var(--brand-dark)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)]",
        // Ghost Light - For dark backgrounds
        "ghost-light":
          "text-white hover:bg-white/10",
        // Default shadcn variants preserved
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-transparent border-[var(--brand-primary)] text-white shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        link: "text-[var(--brand-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        xs: "h-7 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4",
        lg: "h-12 px-8 text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "h-14 px-10 text-lg [&_svg:not([class*='size-'])]:size-6",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
