"use client";

import { useEffect, useTransition, useOptimistic, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { Character } from "@/store/favoritesStore";

export default function FavoritesList() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hasLoaded = useFavoritesStore((state) => state.hasLoaded);
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const [isPending, startTransition] = useTransition();

  const [optimisticFavorites, updateOptimisticFavorites] = useOptimistic(
    favorites,
    (prev: Character[], action: { type: string; payload?: any }) => {
      switch (action.type) {
        case "remove":
          return prev.filter((char) => char.id !== action.payload);
        case "restore":
          return [action.payload, ...prev];
        default:
          return prev;
      }
    },
  );

  useEffect(() => {
    if (!hasLoaded) loadFavorites();
  }, [hasLoaded, loadFavorites]);

  const handleRemove = (id: string) => {
    const charToRestore = optimisticFavorites.find((char) => char.id === id);
    if (!charToRestore) return;

    startTransition(() => {
      updateOptimisticFavorites({ type: "remove", payload: id });

      removeFavorite(id).catch((err) => {
        console.error("Failed to remove from server:", err);

        // Откат персонажа обратно в UI
        updateOptimisticFavorites({ type: "restore", payload: charToRestore });
      });
    });
  };
  if (optimisticFavorites.length === 0) {
    return <p className="text-gray-600">No favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-100 transition-opacity duration-300">
      {optimisticFavorites.map((char) => (
        <CharacterCard key={char.id} {...char} onRemove={handleRemove} isInFavoritesPage={true} />
      ))}
    </div>
  );
}
