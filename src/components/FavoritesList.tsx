"use client";

import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch("/api/favorites", { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setFavorites(data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error loading favorites:", err);
          setError("Failed to load favorites");
          setLoading(false);
        }
      }
    };

    load();

    return () => controller.abort();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await fetch(`/api/favorites?id=${id}`, { method: "DELETE" });
      setFavorites((prev) => prev.filter((char) => char.id !== id));
    } catch (err) {
      console.error("Failed to remove character", err);
    }
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (favorites.length === 0) return <p className="text-gray-600">No favorites yet.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((char) => (
        <CharacterCard key={char.id} {...char} onRemove={handleRemove} />
      ))}
    </div>
  );
}
