"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CharacterCardProps = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export default function CharacterCard({ id, name, image, species }: CharacterCardProps) {
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
    <div className="text-center p-4 border rounded-lg shadow-sm bg-white">
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className="rounded-full mx-auto mb-2"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{species}</p>
      {!isLoading && (
        <button
          onClick={handleAddToFavorites}
          className={`mt-4 px-4 py-2 rounded text-white text-sm transition ${
            isAdded ? "bg-green-500 cursor-default" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isAdded}
        >
          {isAdded ? "Added" : "Add to Favorites"}
        </button>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
