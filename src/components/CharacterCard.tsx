"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useState } from "react";

type CharacterCardProps = {
  id: string;
  name: string;
  image: string;
  species: string;
  onRemove?: (id: string) => void;
  isInFavoritesPage?: boolean;
};

export default function CharacterCard({
  id,
  name,
  image,
  species,
  onRemove,
  isInFavoritesPage,
}: CharacterCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [error, setError] = useState("");

  const isAdded = favorites.some((char) => char.id === id);

  const handleAddToFavorites = async () => {
    try {
      await addFavorite({ id, name, image, species });
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  const handleRemove = () => {
    onRemove?.(id);
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

      {!isAdded && !isInFavoritesPage && (
        <button
          onClick={handleAddToFavorites}
          className="mt-4 px-4 py-2 rounded text-white text-sm button-primary hover:bg-blue-700 transition"
        >
          Add to Favorites
        </button>
      )}

      {isAdded && !isInFavoritesPage && (
        <button className="mt-4 px-4 py-2 text-sm button-sucsess cursor-default">
          Added to favorites
        </button>
      )}

      {isAdded && isInFavoritesPage && (
        <button onClick={handleRemove} className="mt-2 text-sm text-red-600 hover:underline">
          Remove
        </button>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
