import React from "react";
import { motion } from "framer-motion";

export default function FormModal({ children, setToggleModal }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setToggleModal(false)}
      className="w-screen h-screen fixed top-0 left-0 bg-charcoal-gray-900/30 backdrop-blur-sm flex justify-center items-center px-4"
    >
      {children}
    </motion.div>
  );
}
