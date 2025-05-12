"use client";

import { motion } from "framer-motion";

export default function CharacterCardSkeleton() {
  return (
    <motion.div
      className="text-center p-4 border rounded-lg shadow-sm bg-white"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-2" />
      <div className="h-5 w-2/3 bg-gray-200 mx-auto rounded mb-1" />
      <div className="h-4 w-1/2 bg-gray-100 mx-auto rounded" />
    </motion.div>
  );
}
