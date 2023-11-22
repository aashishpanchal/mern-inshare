import React from "react";
import { cx } from "@/utils/tw";

export const TextInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cx(
      "outline-none flex w-full rounded-md bg-stone-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-300 focus:ring-1 focus:ring-input",
      className
    )}
    {...props}
  />
));

TextInput.displayName = "TextInput";

export default TextInput;
