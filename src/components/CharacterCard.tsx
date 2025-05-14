"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type CharacterCardProps = {
  id: string;
  name: string;
  image: string;
  species: string;
  onRemove?: (id: string) => void;
};

export default function CharacterCard({ id, name, image, species, onRemove }: CharacterCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;

        const data = await res.json();
        const exists = data.find((char: any) => char.id === id);
        setIsAdded(!!exists);
      } catch (err) {
        console.error("Failed to check favorites");
      } finally {
        setIsLoading(false);
      }
    };

    check();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, image, species }),
      });

      if (res.status === 409) {
        setError("Already in favorites");
      } else if (res.ok) {
        setIsAdded(true);
        setError("");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="text-center p-4 rounded-lg shadow-lg border border-[rgba(57,57,57,1)]">
      <Link href={`/characters/${id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative w-[128px] h-[128px] overflow-hidden rounded-full mx-auto"
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </motion.div>
        <h2 className="text-lg text-gray-300 hover:text-white font-semibold transition">{name}</h2>
        <p className="text-gray-500">{species}</p>
      </Link>
      {!isLoading && (
        <button
          onClick={handleAddToFavorites}
          className={`mt-4 px-4 py-2 rounded text-white text-sm transition  ${
            isAdded ? "button-sucsess cursor-default" : "button-primary hover:bg-blue-700"
          }`}
          disabled={isAdded}
        >
          {isAdded ? "Added" : "Add to Favorites"}
        </button>
      )}
      {onRemove && (
        <button onClick={() => onRemove(id)} className="mt-2 text-sm text-red-600 hover:underline">
          Remove
        </button>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
