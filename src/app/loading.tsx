"use client";

import CharacterCardSkeleton from "@/components/CharacterCardSkeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}
