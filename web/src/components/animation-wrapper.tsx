import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimationProps } from "framer-motion";

interface Props extends React.PropsWithChildren, AnimationProps {
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.5 },
  ...props
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
