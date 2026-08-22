import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative overflow-hidden inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline:
          "border-border bg-transparent aria-expanded:bg-muted aria-expanded:text-foreground dark:border-border",
        secondary:
          "bg-secondary text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "px-[28px] py-[14px] text-[14px] leading-[1.2] min-h-[44px]",
        xs: "h-6 px-2 text-xs min-h-[44px]",
        sm: "h-9 px-4 text-sm min-h-[44px]",
        lg: "h-11 px-8 text-base min-h-[44px]",
        icon: "size-10 min-h-[44px] min-w-[44px]",
        "icon-xs": "size-6 min-h-[44px] min-w-[44px]",
        "icon-sm": "size-8 min-h-[44px] min-w-[44px]",
        "icon-lg": "size-12 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

import { ArrowUpRight } from "lucide-react"

export const AnimatedArrow = ({ className }: { className?: string }) => (
  <span className={cn("relative inline-flex items-center justify-center shrink-0 w-4 h-4", className)}>
    <ArrowUpRight className="w-full h-full transition-transform duration-500 ease-out group-hover/button:rotate-45" />
  </span>
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  hideArrow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, hideArrow = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isIconSize = size?.startsWith("icon")
    const shouldShowArrow = !hideArrow && !isIconSize && !asChild

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[250%] aspect-square rounded-full bg-[#f4f4ec] opacity-0 transition-all duration-500 ease-out scale-0 group-hover/button:scale-100 group-hover/button:opacity-100" />
            </span>
            <span className="relative z-10 flex items-center group-hover/button:text-black transition-colors duration-300">
              {children}
              {shouldShowArrow && <AnimatedArrow className="ml-2" />}
            </span>
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
