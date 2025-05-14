"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <div className="home-top-gradient"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="px-4 mb-4">
            <Image
              src="/rick-morty.png"
              alt="Rick and Morty"
              width={400}
              height={300}
              className="rounded-xl mx-auto"
              priority
            />
          </div>
          <div className="px-4">
            <div className="home-middle-gradient"></div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Rick & Morty Explorer</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Explore characters from the multiverse
            </p>
            <Link
              href="/characters"
              className="inline-block px-6 py-3 button-primary text-lg transition"
            >
              View Characters
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="home-bottom-gradient"></div>
    </main>
  );
}
