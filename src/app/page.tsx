"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Rick & Morty Explorer</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Explore characters from the multiverse
        </p>
        <div className="mb-8">
          <Image
            src="/rick-morty.webp"
            alt="Rick and Morty"
            width={400}
            height={300}
            className="rounded-xl shadow-lg mx-auto"
            priority
          />
        </div>
        <Link
          href="/characters"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          View Characters
        </Link>
      </motion.div>
    </main>
  );
}
