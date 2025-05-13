import CharacterCard from "@/components/CharacterCard";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

export default async function FavoritesPage() {
  const res = await fetch("http://localhost:3000/api/favorites", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const favorites: Character[] = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((char) => (
            <CharacterCard key={char.id} {...char} />
          ))}
        </div>
      )}
    </main>
  );
}
