import React from "react";
import TextInput from "./ui/text-input";
import { cx } from "@/utils/tw";
import { motion } from "framer-motion";

type Props = {
  left?: React.ReactNode;
  label?: string;
  error?: string;
  description?: string;
} & React.ComponentProps<"input">;

const iconClassName = "absolute top-0 bottom-0 grid p-1 place-items-center";

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ error, left, description, label, className, ...props }, ref) => {
    const id = props.id || React.useId();

    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className={cx(
              "text-sm font-medium text-gray-900",
              error && "text-danger"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {left && (
            <span className={`${iconClassName} left-1 text-gray-700`}>
              {left}
            </span>
          )}
          <TextInput
            id={id}
            className={cx(
              className,
              left && "pl-8",
              error && "border-danger focus:ring-danger"
            )}
            {...props}
            ref={ref}
          />
        </div>
        {error && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-destructive text-danger"
          >
            {error}
          </motion.span>
        )}
        {description && (
          <p className="text-xs font-semibold text-zinc-600">{description}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
