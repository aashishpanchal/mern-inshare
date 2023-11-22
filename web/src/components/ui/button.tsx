import React from "react";
import { cx } from "@/utils/tw";
import { cva, type VariantProps } from "class-variance-authority";

export const button = cva(
  "inline-flex gap-1 items-center justify-center rounded-md text-sm font-medium active:scale-95 shadow-sm hover:cursor-pointer duration-300 disabled:opacity-70 disabled:cursor-default disabled:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        light: "border text-gray-700 border-gray-400 bg-white",
        outline: "border-2 border-primary text-primary bg-white font-semibold",
        link: "hover:bg-stone-100 shadow-none hover:shadow-sm",
      },
      size: {
        xs: "h-7 px-2 py-1 text-xs",
        sm: "h-9 px-3.5 py-2",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-5 py-2 text-md",
        icon: "h-10 w-10 rounded-full bg-stone-200 border-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

export const buttonProps = ({
  size,
  variant,
  className,
}: VariantProps<typeof button> & { className?: string } = {}) =>
  cx(button({ variant, size, className }));

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonProps({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
